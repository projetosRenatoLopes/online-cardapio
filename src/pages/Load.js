import api from '../../src/services/api';

const Load = () => {



  setTimeout(async () => {
    const products = await api.get('/produtos/renato-lanches')
    var list = products.data[0].products;
    sessionStorage.setItem('listProduct', JSON.stringify(list))
    const info = await api.get('/empresa/renato-lanches')
    sessionStorage.setItem('info', JSON.stringify(info.data.company))
    window.location.href = '/home'

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