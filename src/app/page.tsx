"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useChat } from "ai/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ChatSidebar } from "@/components/chat-sidebar";
import { AIResponseIndicator } from "@/components/ai-response-indicator";
import { UserAvatar } from "@/components/user-avatar";

export default function ChatPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      onResponse: (response) => {
        if (response.status === 200) {
          toast.success("Message sent successfully");
        } else {
          toast.error("Failed to send message");
        }
      },
      onError: (error) => {
        toast.error(`Error: ${error.message}`);
      },
    });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleSubmit(e);
    } else {
      toast.warning("Please enter a message");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex-col lg:ml-[250px]">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background/50 backdrop-blur">
          <div className="flex h-14 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            {session?.user && <UserAvatar user={session.user} />}
          </div>
        </header>

        {/* Chat Messages */}
        <div className="max-w-3xl mx-auto">
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
                <h2 className="font-heading text-2xl font-semibold text-muted-foreground mb-2">
                  Welcome to Viro!
                </h2>
                <p className="font-sans text-muted-foreground">
                  What can I help you with today?
                </p>
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex mb-4 ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p>{m.content}</p>
                  </div>
                </div>
              ))
            )}

            {/* AI Response Indicator */}
            <div className="pl-4 mb-4">
              <AIResponseIndicator
                isLoading={isLoading}
                isError={error ? true : false}
              />
            </div>
          </div>

          {/* Floating Message Input */}
          <div className="fixed bottom-6 left-4 right-4 mx-auto max-w-3xl lg:left-[270px]">
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
  );
}
