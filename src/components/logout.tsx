'use client'

import { signOut } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'

export default function LogOutButton() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' })
    toast.success('Signed out successfully')
  }

  return (
    <Button onClick={handleSignOut} variant="outline">
      Sign Out
    </Button>
  )
}

