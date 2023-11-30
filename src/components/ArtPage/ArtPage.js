import { Button, Chip, Typography } from '@mui/joy';
import Image from 'next/image'
import React from 'react'
import styles from './artPage.module.css'
import Link from 'next/link';
import { convertSpacesToDashes } from '@/utils/utilFunctions';

// TODO: Implement carousel using Swiperjs: https://swiperjs.com/demos#thumbs-gallery-loop 

const fetchArtist = async (artistID) => {
  try {
    const res = await fetch(`http://localhost:3000/api/user?id=${artistID}`, {
      method: "GET",
    })
    const artist = await res.json()
    return artist
  } catch (error) {
    console.log("ERROR FETCHING Artist", error)
  }
}

async function ArtPage({ artWork }) {
  console.log("INSIDE ArtPage ", artWork)
  const artist = await fetchArtist(artWork.artist)
  console.log("ARTIST", artist)
  const blurredBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89fLlfwAJPgO9NgsRFQAAAABJRU5ErkJggg==";

  const widthHeightRatio = artWork.images[0].height / artWork.images[0].width
  const galleryHeight = Math.ceil(800 * widthHeightRatio)
  return (
    <div>
      {/* TODO: Implement carousel using Swiperjs: https://swiperjs.com/demos#thumbs-gallery-loop */}
      <div>
        <Image
          src={artWork.images[0].url}
          alt={artWork.images[0].name || 'art'}
          width={800}
          style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '60vh' }}
          height={galleryHeight}
          sizes="70vw"
          placeholder='blur'
          blurDataURL={blurredBase64}
        />
      </div>
      <Typography level="title-lg">{artWork.name}</Typography>
      <Link href={`/artist/${artist.slugFullName}`}>
        <Typography level="body-lg">{artist.fullName}</Typography>
      </Link>
      <Typography level='title-md'>Price: INR {artWork.price}</Typography>
      <Typography level="body-md">Size: {artWork.dimensions.height} x {artWork.dimensions.width}</Typography>
      <Typography level="body-md">Medium: {artWork.medium}</Typography>
      {/* Tags */}
      {artWork.tags.map((tag, index) => (
        <Chip key={`tag-${index}`}>{tag}</Chip>
      ))}
      <Typography level="body-md">{artWork.description}</Typography>

      <div className={styles.actionButtons}>
        <Button>Buy Now</Button>
        <Button variant="soft"> Add to Cart</Button>
      </div>



    </div>
  )
}

export default ArtPage