import ArtPage from '@/components/ArtPage/ArtPage'
import ModalComponent from '@/components/ModalComponent/ModalComponent'
import React from 'react'

const fetchArtWorks = async () => {
    try {
      //Get all artworks from db
      // const artWorks = await Artwork.find()
      const res = await fetch('http://localhost:3000/api/artUpload',{
        next: {
          revalidate: 10,
        },
      })
      const artWorks = await res.json()
      console.log("ART WORKS FETCHED IN HOME")
      return artWorks
    } catch (error) {
      console.log("ERROR FETCHING ARTWORKS", error)
    }
  }

async function Art({params}) {
    const artWorks = await fetchArtWorks();
    const artWork = artWorks.find((artwork) => artwork._id === params.id)
  return (
    <ModalComponent> 
        <ArtPage artWork={artWork} />
    </ModalComponent>
  )
}

export default Art