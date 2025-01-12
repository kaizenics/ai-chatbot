import { Inter } from 'next/font/google'
import './globals.css'
import { getServerSession } from "next-auth/next"
import { SessionProvider } from "@/components/session-provider"
import { Toaster } from 'sonner'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  )
}

