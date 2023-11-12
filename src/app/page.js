import Image from 'next/image'
import styles from './page.module.css'
import Header from '../components/Header/Header'
import Artwork from '@/models/Artwork'
import HomeGallery from '@/components/HomeGallery/HomeGallery'
import { getBase64 } from '@/utils/utilFunctions'
import { CssBaseline } from '@mui/joy'



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

export default async function Home() {
  const artWorks = await fetchArtWorks();

  // // Fetch base64 images for all artworks in parallel
  // const artWorksWithBase64 = await Promise.all(
  //   artWorks.map(async (artwork) => {
  //     const imagesWithBase64 = await Promise.all(
  //       artwork.images.map(async (image) => {
  //         const blurUrl = await getBase64(image.url);
  //         return { ...image, blurUrl };
  //       })
  //     );
  //     return { ...artwork, images: imagesWithBase64 };
  //   })
  // );

  return (
    <main className={styles.main}>
      <CssBaseline enableColorScheme />
      <Header />
      <HomeGallery artWorks={artWorks} />
    </main>
  );
}
