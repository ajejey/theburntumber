import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

function ImageComponent({ images }) {
    // console.log("IMAGES ", images)
    const blurredBase64 = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN89fLlfwAJPgO9NgsRFQAAAABJRU5ErkJggg==";

    const widthHeightRatio = images[0].height / images[0].width
    const galleryHeight = Math.ceil(250 * widthHeightRatio)
    const photoSpans = Math.ceil(galleryHeight / 10) + 1

    return (
        <div style={{display: "grid", gridRowEnd: `span ${photoSpans}`}} >
            <Image
                src={images[0].url}
                alt={images[0].name || 'art'}
                width={250}
                style={{ width: "100%", height: "100%" }}
                // height={images[0].height}
                height={galleryHeight}
                sizes='250px'
                placeholder='blur'
                blurDataURL={blurredBase64}
            />
        </div>
            
        
    )
}

export default ImageComponent




// style={{ objectFit: 'cover' }}
// sizes="(min-width: 1400px) 303px, (min-width: 1320px) 258px, (min-width: 1120px) calc(2.78vw + 222px), (min-width: 860px) calc(33.33vw - 32px), (min-width: 580px) calc(50vw - 39px), calc(95.38vw - 36px)"


//     <div style={{ width: '250px', justifySelf: 'center', gridRow: `span ${photoSpans}`, height: galleryHeight }}>
//     <Link href={images[0].url} target="_blank" className="grid place-content-center">
//     <div style={{ overflow: 'hidden'}}>
//         <Image
//             src={images[0].url}
//             alt={images[0].name || 'art'}
//             width={250}
//             // height={images[0].height}
//             height={galleryHeight}
//             sizes='250px'
//             placeholder='blur'
//             blurDataURL={blurredBase64}
//         />
//     </div>
//     </Link>
// </div>
// <h4>{images[0].height}</h4>