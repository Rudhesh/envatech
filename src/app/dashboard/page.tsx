"use client"
import { signOut, useSession } from 'next-auth/react'
import React from 'react'

export default function Dashboard() {

    const { data: session, status }: any = useSession();
    console.log(session?.user)
    return (
    <div><h1>Dashboard</h1>
      Signed in as  {session?.user?.realname} <br />
      <button onClick={() => signOut({ callbackUrl: "/" })}>Sign out</button>
    </div>
  )
}
