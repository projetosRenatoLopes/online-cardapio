import React, { memo, useState } from 'react'
import Card from '.'

function CardsGalerry(props) {
  const { cards } = props

  // eslint-disable-next-line no-unused-vars
  const [gallery, setGallery] = useState(cards)

  function pesquisarProd() {
    const pesq = document.getElementById('ad-pesq')['value']
    const listProd = JSON.parse(sessionStorage.getItem('listProduct'))  
    var newList = [];
    listProd.forEach(element => {
        if (element.nomeprod.toLowerCase().includes(pesq.toLowerCase())) {
            newList.push(element)
        }
    });
    sessionStorage.setItem('viewProducts', JSON.stringify(newList))
    setGallery(newList)
}


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
        <input type='text' className="pesq-prod" id='ad-pesq' placeholder='Pesquisar' onChange={pesquisarProd}></input>
        {gallery.map(renderCards)}
      </div>
    )
  }


}

export default memo(CardsGalerry)



