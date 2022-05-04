import LogoPage from '../components/Logo';
import LogoCart from '../components/Cart'
import CartGalerry from '../components/Card/CartGalerry'
import listItensCart from '../services/listCart/listCart';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';


const MyCart = () => {

  var products = listItensCart();
  if (products === null) {
    products = [];
  }
  const verifyCestEmpty = () => {


    const itens = JSON.parse(localStorage.getItem('listCart'))
    if (itens === null) {
      alert('Cesta vazia. :(\nSelecione pelo menos um item.')
    } else {
      const open = localStorage.getItem('ofp')
      if (open === 'true') {
        window.location.href = './checkout'
      } else {
        alert("Estamos fechados no momento!\nConfira nosso hórario de atendimento na página inicial.")
        window.location.href = './home'
      }
    }
  }

  return (
    <>
      <div className='title-page'>
        <div className='title-mycart'><Link to='/home'><AiOutlineClose style={{ color: '#FFFFFF' }} /></Link><p>Minha Cesta</p></div>
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
        <Link to='/home'><button className="btn btn-success" >Voltar</button></Link>
        <button className="btn btn-success" onClick={verifyCestEmpty}>Confirmar</button>
      </div>

    </>
  )
}

export default MyCart;