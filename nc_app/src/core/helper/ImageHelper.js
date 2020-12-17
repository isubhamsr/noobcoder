import React from 'react'

export default function ImageHelper({product}) {
    
    const imageUrl = product ? product.image : "https://source.unsplash.com/random/800x600"

    return (
        <div className="rounded border border-success p-2">
            <img 
                src={imageUrl}
                style={{maxHeight:"100%", maxWidth:"100%"}}
                className="mb-3 rounded"
                alt='peoduct'
            />
        </div>
    )
}
