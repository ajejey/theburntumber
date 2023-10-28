import React from 'react'
import styles from './HomeGallery.module.css'
import ImageComponent from '../ImageComponent/ImageComponent'


function HomeGallery({ artWorks }) {
    console.log("ART WORKS in HOME GALLERY", artWorks)
    return (
        <div >
            <div style={{ minHeight: 'min-content' }}>
                <div className={styles.masonry}>
                    {artWorks.length > 0 && artWorks.map((artwork) => (
                        <ImageComponent key={artwork._id} images={artwork.images} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeGallery