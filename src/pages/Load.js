import React from 'react';
import { useLocation } from 'react-router-dom'
import api from '../../src/services/api';

const Load = () => {



  const company = useLocation()
  sessionStorage.setItem('tag', company.pathname)
  setTimeout(async () => {
    const info = await api.get(`/empresa/${company.pathname}`)
    console.log(info.data.company[0].tag)
    if(info.data.company[0].tag === undefined){
      sessionStorage.removeItem('tag')
      window.location.href = `${company.pathname}/notfound`
    } else{

    }
    const products = await api.get(`/produtos/${company.pathname}`)
    
    var list = products.data[0].products;
    sessionStorage.setItem('listProduct', JSON.stringify(list))
    sessionStorage.setItem('info', JSON.stringify(info.data.company))
     window.location.href = `${company.pathname}/home`

  }, 5000);




  return (
    <>
      <div className='title-page'>
        <p>Carregando...</p>
      </div>

      <div className='logo-page'>
        <img src='https://acegif.com/wp-content/uploads/loading-23.gif' className="img-logo-page" alt="img-logo" style={{ 'maxWidth': '20rem', 'minWidth': '16rem' }}></img>
      </div>
    </>
  )
}

export default Load;


