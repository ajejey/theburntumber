import { convertDashesToSpaces } from '@/utils/utilFunctions'
import React from 'react'

const fetchArtist = async (slugFullName) => {
    try {
        const res = await fetch(`http://localhost:3000/api/user?slugFullName=${slugFullName}`, {
            method: "GET",
        })
        const artist = await res.json()
        return artist
    } catch (error) {
        console.log("ERROR FETCHING Artist", error)
    }
}

const ArtistPage = async({ params }) => {
    const artist = await fetchArtist(params.slugFullName)
    console.log("ARTIST", artist)
    return (
        <div>            
            {JSON.stringify(artist, null, 2)}
        </div>
    )
}

export default ArtistPage