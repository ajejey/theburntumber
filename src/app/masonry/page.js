'use client'
import React from 'react'
import Masonry from 'react-masonry-css'


function page() {
    var items = [
        { id: 1, name: 'My First Item' },
        { id: 2, name: 'Another item' },
        { id: 3, name: 'Third Item' },
        { id: 4, name: 'Here is the Fourth' },
        { id: 5, name: 'High Five' }
    ];
    return (
        <div>
            <Masonry
                breakpointCols={{default: 4, 800: 2}}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {items.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </Masonry>
        </div>
    )
}

export default page