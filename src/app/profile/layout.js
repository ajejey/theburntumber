import Header from '@/components/Header/Header'
import React from 'react'

function ProfileLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default ProfileLayout