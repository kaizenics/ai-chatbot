'use client'

import { useSession } from 'next-auth/react'
import { useChat } from 'ai/react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from 'next/link'
import LogOutButton from '@/components/logout'

export default function ChatPage() {
  const { data: session } = useSession()
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Card className="flex-grow overflow-hidden">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">AI Chatbot</CardTitle>
          <div className="flex items-center space-x-4">
            <span>Hello, {session?.user?.name}</span>
           <LogOutButton/>
          </div>
        </CardHeader>
        <CardContent className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map(m => (
            <div
              key={m.id}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit">Send</Button>
          </form>
        </CardFooter>
      </Card>
      <div className="fixed bottom-4 right-4">
        <Link href="/">
          <Button variant="outline">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}

