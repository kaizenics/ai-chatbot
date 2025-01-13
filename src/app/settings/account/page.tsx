// /settings/account/page.tsx
"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function AccountPage() {
  const { data: session } = useSession()

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <CardContent className="p-0 space-y-4">
          <div className="flex items-center gap-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={session?.user?.image ?? ''} />
              <AvatarFallback>{session?.user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{session?.user?.name}</h3>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            className="w-full text-destructive hover:text-destructive"
            onClick={() => signOut()}
          >
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
