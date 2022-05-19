import LogoPage from '../components/Logo';
import LogoCart from '../components/Cart'
import CartGalerry from '../components/Cart/CartGalerry'
import listItensCart from '../services/listCart/listCart';
import { AiOutlineClose } from 'react-icons/ai'
import { Link, Route } from 'react-router-dom';
import { useEffect } from 'react';
import refreshData from '../utils/refreshData';

const MyCart = () => {
  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 10000);
    return () => clearInterval(interval)
  }, []);


  const company = sessionStorage.getItem('tag')

  var products = listItensCart();
  if (products === null) {
    products = [];
  }

  const verifyCestEmpty = () => {

    const itens = JSON.parse(sessionStorage.getItem('listCart'))
    if (itens === null) {
      alert('Cesta vazia. :(\nSelecione pelo menos um item.')
    } else {
      const open = sessionStorage.getItem('ofp')
      if (open === 'true') {
       return (`${company}/checkout`)
        //window.location.href = `${company}/checkout`
      } else {
        alert("Estamos fechados no momento!\nConfira nosso hórario de atendimento na página inicial.")
       
        return (`${company}/home`)
        //window.location.href = `${company}/home`
      }
    }
  }

  return (
    <>
      <div className='title-page'>
        <div className='title-mycart'><Link to={`${company}/home`}><AiOutlineClose style={{ color: '#FFFFFF' }} /></Link><p>Minha Cesta</p></div>
        <LogoCart />
      </div>

      <LogoPage />
      <div className='price-total-order'>
        <p id="total-order">Total do pedido: R$ 0,00</p>
      </div>

      <div className="Cont-Cards" id="Cart-Cards">
        <CartGalerry cards={products} />
      </div>
      <div className='bottomArea'>
        <Link to={`${company}/home`}><button className="btn btn-success" >Voltar</button></Link>
        <Link to={verifyCestEmpty()} ><button className="btn btn-success" >Confirmar</button></Link>
      </div>

    </>
  )
}

export default MyCart;