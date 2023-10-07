import Image from 'next/image'
import styles from './page.module.css'
import Header from '../components/Header/Header'
import Artwork from '@/models/Artwork'
import HomeGallery from '@/components/HomeGallery/HomeGallery'

const fetchArtWorks = async () => {
  try {
    //Get all artworks from db
    const artWorks = await Artwork.find()
    return artWorks
  } catch (error) {
    console.log("ERROR FETCHING ARTWORKS", error)
  }
}

export default async function Home() {
  const artWorks = await fetchArtWorks()
  console.log("artWorks", artWorks)
  return (
    <main className={styles.main}>
      <Header />
      <HomeGallery artWorks={artWorks} />
    </main>
  )
}
