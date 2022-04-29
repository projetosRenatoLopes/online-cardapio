import React, { memo, useState } from 'react'
import Card from '.'

function CardsGalerry(props) {
  const { cards } = props

  // eslint-disable-next-line no-unused-vars
  const [gallery, setGallery] = useState(cards)


  const renderCards = (gallery, key) => {
    return (
      <div key={gallery.id}>
        <Card
          id={gallery.id}
          nomeprod={gallery.nomeprod}
          preco={gallery.preco}
          img={gallery.img}
          ingr={gallery.ingr}
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

export default memo(CardsGalerry)



