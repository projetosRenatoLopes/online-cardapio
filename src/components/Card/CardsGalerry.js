import { memo, useState } from 'react'
import Card from '.'
import * as React from 'react';
import refreshData from '../../utils/refreshData';
import { compare } from '../../services/orderById';
import replaceAccent from '../../utils/replaceAccent';

function CardsGalerry(props) {
  const { cards } = props
  var cardsAct = [];
  cards.forEach(element => {
    if (element.status === 'Ativo') {
      cardsAct.push(element)
    }
  });

  // eslint-disable-next-line no-unused-vars
  const [gallery, setGallery] = useState(cardsAct.sort(compare))

  function pesquisarProd() {
    const pesq = document.getElementById('ad-pesq')['value']
    const listProd = JSON.parse(sessionStorage.getItem('listProduct'))
    var newList = [];
    listProd.forEach(element => {
      const stringElement = replaceAccent(element.nomeprod.toLowerCase())
      const stringSearch = replaceAccent(pesq.toLowerCase())      
      if (stringElement.includes(stringSearch) && element.status === 'Ativo') {
        newList.push(element)
      }
    });
    sessionStorage.setItem('viewProducts', JSON.stringify(newList))
    setGallery(newList.sort(compare))
  }

    React.useEffect(() => {
        const interval = setInterval(() => {
          refreshData()
          const productsView =  JSON.parse(sessionStorage.getItem('viewProducts'))

          setGallery(productsView.sort(compare))
          var newList = [];
          productsView.forEach(element => { 
            if (element.status === 'Ativo') {
              newList.push(element)
            }
          });
          sessionStorage.setItem('viewProducts', JSON.stringify(newList))
          setGallery(newList.sort(compare))


        }, 10000);
        return () => clearInterval(interval)
      }, []);



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
        <h5>Nenhum produto para exibir ainda.</h5>
      </div>
    )
  } else {


    return (
      <div id='gallery'>
        <div style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
          <input type='text' className="pesq-prod" id='ad-pesq' placeholder='Pesquisar' onChange={pesquisarProd} style={{'width':'100%','backgroundColor':'rgb(255 255 255 / 62%)','borderRadius':'10px 10px 10px 10px'}}></input>
        </div>
        {gallery.map(renderCards)}

      </div>
    )
  }


}

export default memo(CardsGalerry)



