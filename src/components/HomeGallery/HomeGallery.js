import Image from 'next/image'
import React from 'react'
import styles from './HomeGallery.module.css'
import ImageComponent from '../ImageComponent/ImageComponent'

function HomeGallery({ artWorks }) {
    return (
        <div className="container">
            <div>
                <div className={styles.homeGallery}>
                    {artWorks.length > 0 && artWorks.map((artwork) => (
                        <ImageComponent key={artwork._id} images={artwork.images} />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomeGallery