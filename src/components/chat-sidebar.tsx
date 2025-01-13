import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessagesSquare, Plus, Settings } from "lucide-react"
import Link from "next/link"

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatSidebar({ isOpen, onClose }: ChatSidebarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed left-0 top-0 z-40 flex h-full w-[250px] flex-col bg-zinc-50 dark:bg-zinc-900 
        transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold font-heading">
            <MessagesSquare className="h-5 w-5" />
            <span>Viro</span>
          </Link>
        </div>
        
        <div className="p-3">
          <Button className="w-full justify-start gap-2" variant="outline">
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        <ScrollArea className="flex-1 border-b">
          <div className="p-3 space-y-2">
            {/* Chat history items can be added here */}
          </div>
        </ScrollArea>

        <div className="p-3">
          <Button variant="ghost" className="w-full justify-start gap-2" asChild>
            <Link href="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
