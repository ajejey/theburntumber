import Header from '@/components/Header/Header'
import React from 'react'

function ArtistLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="container">
                {children}
            </div>
        </div>
    )
}

export default ArtistLayout