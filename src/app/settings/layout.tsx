"use client"

import { useState } from "react"
import { ChatSidebar } from "@/components/chat-sidebar"
import { ChevronLeft, User, PaintBucket } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "next/navigation"

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  
  const currentTab = pathname === "/settings/appearance" ? "appearance" : "account"

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="flex-1 flex-col lg:ml-[250px]">
        <header className="sticky top-0 z-10 bg-background/50 backdrop-blur">
          <div className="flex h-14 items-center px-4">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ChevronLeft className="h-4 w-4" />
              <span>Back</span>
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-2xl px-4 py-12">
          <div className="space-y-0.5 mb-8">
            <h2 className="text-2xl font-bold tracking-tight font-heading">Settings</h2>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>

          <Tabs value={currentTab} className="space-y-6">
            <TabsList>
              <TabsTrigger 
                value="account" 
                onClick={() => router.push("/settings/account")}
                className="flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
              <TabsTrigger 
                value="appearance" 
                onClick={() => router.push("/settings/appearance")}
                className="flex items-center gap-2"
              >
                <PaintBucket className="h-4 w-4" />
                Appearance
              </TabsTrigger>
            </TabsList>
            {children}
          </Tabs>
        </div>
      </main>
    </div>
  )
}
