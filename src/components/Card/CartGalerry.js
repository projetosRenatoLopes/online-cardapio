import React, { memo, useState } from 'react'
import CartCard from '../CartCard'

function CartGalerry(props) {
    const { cards } = props

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(cards)


    const renderCards = (gallery, key) => {
        return (
            <div key={gallery.id}>
                <CartCard
                    id={gallery.id}
                    nomeprod={gallery.nomeprod}
                    preco={gallery.preco}
                    img={gallery.img}
                    ingr={gallery.ingr}
                    count={gallery.count}
                />
            </div>
        )
    }

    return (
        <div>
            {gallery.map(renderCards)}
        </div>
    )
}

export default memo(CartGalerry)