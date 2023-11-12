import { Typography } from '@mui/joy';
import Image from 'next/image'
import React from 'react'

function ArtPage({ artWork }) {
  console.log("INSIDE ArtPage ", artWork)
  const blurredBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89fLlfwAJPgO9NgsRFQAAAABJRU5ErkJggg==";

  const widthHeightRatio = artWork.images[0].height / artWork.images[0].width
  const galleryHeight = Math.ceil(800 * widthHeightRatio)
  return (
    <div>
      <div>ART WORK</div>
      <div>
        <Image
          src={artWork.images[0].url}
          alt={artWork.images[0].name || 'art'}
          width={800}
          style={{ width: '100%', height: '100%', objectFit: 'contain',  maxHeight: '60vh' }}
          height={galleryHeight}
          sizes="70vw"
          placeholder='blur'
          blurDataURL={blurredBase64}
          />
      </div>
      <Typography level="title-lg">{artWork.name}</Typography>
      <Typography level="body-md">{artWork.description}</Typography>
          

    </div>
  )
}

export default ArtPage