'use client'

import { useSession } from 'next-auth/react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LogOutButton from '@/components/logout'
import { toast } from 'sonner'
import { ThemeToggle } from "@/components/theme-toggle"
import { ChatSidebar } from "@/components/chat-sidebar"
import { AIResponseIndicator } from "@/components/ai-response-indicator"

export default function ChatPage() {
  const { data: session } = useSession()
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    onResponse: (response) => {
      if (response.status === 200) {
        toast.success('Message sent successfully')
      } else {
        toast.error('Failed to send message')
      }
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`)
    }
  })

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleSubmit(e)
    } else {
      toast.warning('Please enter a message')
    }
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar />
      
      <main className="flex-1 flex-col ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/50 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4">
            <h1 className="text-xl font-semibold">Viro</h1>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <span className="hidden sm:inline text-sm text-muted-foreground">
                {session?.user?.name}
              </span>
              <LogOutButton />
            </div>
          </div>
        </header>

        {/* Chat Messages */}
        <div className="max-w-3xl mx-auto">
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex mb-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-4 py-2 ${
                  m.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p>{m.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {/* AI Response Indicator */}
          <div className="pl-4 mb-4">
            <AIResponseIndicator isLoading={isLoading} isError={error ? true : false} />
          </div>
        </div>
       

        {/* Floating Message Input */}
        <div className="fixed bottom-6 left-[270px] right-6 mx-auto max-w-3xl">
          <form onSubmit={handleFormSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow rounded-full border bg-background shadow-lg"
            />
            <Button 
              type="submit" 
              size="icon"
              className="rounded-full shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
        </div>
      </main>
    </div>
  )
}

