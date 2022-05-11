import React, { memo, useState } from 'react'
import Card from '.'


export var setCards = (set) => {

}

function CardsGalerry(props) {
  const { cards } = props

  // eslint-disable-next-line no-unused-vars
  const [gallery, setGallery] = useState(cards)

  const renderCards = (gallery, key) => {
    return (
      <div key={gallery.uuid}>
        <Card
          uuid={gallery.uuid}
          nomeprod={gallery.nomeprod}
          preco={gallery.preco}
          img={gallery.img}
          ingr={gallery.ingr}
        />
      </div>
    )
  }



  const itens = JSON.parse(sessionStorage.getItem('listProduct'))
  if (itens === null) {
    return (
      <div>
      </div>
    )
  } else {
    return (
      <div id='gallery'>
        {gallery.map(renderCards)}
      </div>
    )
  }


}

export default memo(CardsGalerry)



