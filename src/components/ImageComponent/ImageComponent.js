import Image from 'next/image'
import React from 'react'

function ImageComponent({ images }) {
    // console.log("IMAGES ", images)
    return (
        <div>
            <div style={{ position: 'relative', overflow: 'hidden', height: '16rem' }}>
                <Image
                    src={images[0].url}
                    alt={images[0].name || 'art'}
                    fill={true}
                    style={{ objectFit: 'cover' }}
                    sizes="(min-width: 1400px) 303px, (min-width: 1320px) 258px, (min-width: 1120px) calc(2.78vw + 222px), (min-width: 860px) calc(33.33vw - 32px), (min-width: 580px) calc(50vw - 39px), calc(95.38vw - 36px)"
                />
            </div>
            <h4>{images[0].name}</h4>
        </div>
    )
}

export default ImageComponent