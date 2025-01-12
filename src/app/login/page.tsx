'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from 'sonner'

export default function LoginPage() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    const result = await signIn('google', { callbackUrl: '/', redirect: false })
    if (result?.ok) {
      toast.success('Signed in successfully')
      router.push('/')
    } else {
      toast.error('Google Sign-In failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Sign in with your Google account to continue</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleGoogleSignIn} className="w-full">
            Sign in with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

