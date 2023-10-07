import Image from 'next/image'
import React from 'react'
import styles from './HomeGallery.module.css'

function HomeGallery({ artWorks }) {
    return (
        <div className="container">
            <div>
                <div className={styles.homeGallery}>
                    {artWorks.length > 0 && artWorks.map((artwork) => (
                        <div>
                            <div key={artwork._id} style={{ position: 'relative', width: '200px', height: '200px' }}>
                                <Image
                                    src={artwork.images[0]}
                                    layout="fill"
                                    objectFit="contain"
                                    alt={artwork.name}
                                />
                            </div>
                            <h4>{artwork.name}</h4>
                        </div>



                    ))}
                </div>
            </div>

        </div>
    )
}

export default HomeGallery