import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import LogOutButton from '@/components/logout'

export default async function Home() {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI Chatbot</h1>
      <p className="text-xl mb-4">Hello, {session.user?.name}!</p>
      <div className="space-y-4">
        <Link href="/chat">
          <Button>Go to Chat</Button>
        </Link>
        <LogOutButton />
      </div>
    </div>
  )
}

