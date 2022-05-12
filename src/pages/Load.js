import React from 'react';
import { useLocation } from 'react-router-dom'
import api from '../../src/services/api';

const Load = () => {
  const company = useLocation()
  const companyTag = company.pathname
  const regex = /\W|_/;

  if(companyTag === '/clientes'){
    sessionStorage.removeItem('tag')
    window.location.href = '/cardapioonline'
  }
  
  if (regex.test(companyTag.substring(1)) === false) {
    sessionStorage.setItem('tag', company.pathname)
  } else {
    sessionStorage.removeItem('tag')
    window.location.href = `erro/notfound`
  }
  
  if(companyTag === '/erro' || companyTag === '/null'){
    sessionStorage.removeItem('tag')
    window.location.href = '/'
  }


  setTimeout(async () => {
    if (companyTag === '/') {
      await api.get('/empresa').then(res =>{
        if (res.data.companies === undefined) {
          sessionStorage.setItem('page', JSON.stringify([]))
        } else {
          sessionStorage.setItem('page', JSON.stringify(res.data.companies))
        }
        window.location.href = '/clientes'
      }).catch(error =>{
        window.location.href = '/erro'
      })

    } else {
      console.log('Inicio')
      await api.get(`/empresa/${company.pathname}`).then(res => {
        console.log(res.data.company[0].tag )
        if (res.data.company[0].tag === undefined) {
          console.log(res.data.company[0].tag + "Deve ser undefined")
          sessionStorage.removeItem('tag')
         window.location.href = `${company.pathname}/notfound`
        } else {
          console.log(res.data.company[0].tag + "Deve ser renatolanches")
        sessionStorage.setItem('info', JSON.stringify(res.data.company))
        }
      }).catch(error => {
        window.location.href = '/erro'
      })

      await api.get(`/produtos/${company.pathname}`).then(res => {
        var list = res.data[0].products;
        sessionStorage.setItem('listProduct', JSON.stringify(list))
       window.location.href = `${company.pathname}/home`
      }).catch(error => {
       window.location.href = '/erro'
      })

    }
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


