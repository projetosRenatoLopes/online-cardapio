import React, { memo, useState } from 'react'
import CartCard from '../CartCard'

function CartGalerry(props) {
    const { cards } = props

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(cards)


    const renderCards = (gallery, key) => {
        return (
            <div key={gallery.uuid}>
                <CartCard
                    uuid={gallery.uuid}
                    nomeprod={gallery.nomeprod}
                    preco={gallery.preco}
                    img={gallery.img}
                    ingr={gallery.ingr}
                    count={gallery.count}
                />
            </div>
        )
    }

    const itens = JSON.parse(sessionStorage.getItem('listCart'))
    if (itens === null) {
        return (
            <div>
                <h3>Cesta vazia.</h3>
            </div>
        )
    } else {
        return (
            <div>
                {gallery.map(renderCards)}
            </div>
        )
    }
}

export default memo(CartGalerry)