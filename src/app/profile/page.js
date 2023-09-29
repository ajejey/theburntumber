import ProfilePage from '@/components/ProfilePage/ProfilePage'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

async function Profile() {
    const session = await getServerSession(authOptions)
    if (!(session)) {
        redirect('/login')
    }
    const user = { ...session, id: session.id.toString() }
    return (
        <ProfilePage user={user} />
    )
}

export default Profile