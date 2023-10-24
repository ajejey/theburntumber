import Image from 'next/image'
import styles from './page.module.css'
import Header from '../components/Header/Header'
import Artwork from '@/models/Artwork'
import HomeGallery from '@/components/HomeGallery/HomeGallery'



const fetchArtWorks = async () => {
  try {
    //Get all artworks from db
    // const artWorks = await Artwork.find()
    const res = await fetch('http://localhost:3000/api/artUpload',{
      next: {
        revalidate: 3600,
      },
    })
    const artWorks = await res.json()
    console.log("ART WORKS FETCHED IN HOME")
    return artWorks
  } catch (error) {
    console.log("ERROR FETCHING ARTWORKS", error)
  }
}

export default async function Home() {
  const artWorks = await fetchArtWorks()
  // console.log("ART WORKS", artWorks)
  return (
    <main className={styles.main}>
      <Header />
      <HomeGallery artWorks={artWorks} />
    </main>
  )
}
