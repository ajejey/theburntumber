import Image from 'next/image'
import React from 'react'

function ArtPage({ artWork }) {
  console.log("INSIDE ArtPage ")
  const blurredBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89fLlfwAJPgO9NgsRFQAAAABJRU5ErkJggg==";

  const widthHeightRatio = artWork.images[0].height / artWork.images[0].width
  const galleryHeight = Math.ceil(250 * widthHeightRatio)
  return (
    <div>
      <div>ART WOEK</div>
      {artWork.name}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src={artWork.images[0].url}
          alt={artWork.images[0].name || 'art'}
          width={250}
          style={{ width: "70%", height: "auto" }}
          // height={images[0].height}
          height={galleryHeight}
          sizes='250px'
          placeholder='blur'
          blurDataURL={blurredBase64}
        />
      </div>

    </div>
  )
}

export default ArtPage