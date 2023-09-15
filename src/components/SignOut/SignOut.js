'use client'
import { Button } from '@mui/joy'
import { signOut } from 'next-auth/react'
import React from 'react'

function SignOut() {
    const handleSignOut = () => {
        signOut()
    }
    return (
        <Button variant='plain' onClick={handleSignOut}>SignOut</Button>
    )
}

export default SignOut