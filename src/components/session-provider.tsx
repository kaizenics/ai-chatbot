'use client'

import { SessionProvider as Provider } from "next-auth/react"

type Props = {
  children: React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any
}

export function SessionProvider({ children, session }: Props) {
  return (
    <Provider session={session}>
      {children}
    </Provider>
  )
}

