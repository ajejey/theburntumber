import Header from '@/components/Header/Header'
import React from 'react'

function ProfileLayout({ children }) {
    return (
        <div>
            <Header />
            {children}
        </div>
    )
}

export default ProfileLayout