import ProfilePage from '@/components/ProfilePage/ProfilePage'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

async function Profile() {
    const session = await getServerSession(authOptions)
    console.log("session ", session)
    if (!(session && session.user)) {
        redirect('/login')
    }

    return (
        <ProfilePage user={session.user} />
    )
}

export default Profile