import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { User } from "next-auth"
import Link from "next/link"

interface UserAvatarProps {
  user: Pick<User, "name" | "image" | "email">
}

export function UserAvatar({ user }: UserAvatarProps) {
  return (
    <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0" asChild>
      <Link href="/settings/account">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.image ?? ''} alt={user.name ?? ''} />
          <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </Link>
    </Button>
  )
}
