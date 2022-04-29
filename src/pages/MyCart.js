import LogoPage from '../components/Logo';
import LogoCart from '../components/Cart'
import CartGalerry from '../components/Card/CartGalerry'
import listItensCart from '../services/listCart/listCart';
import Button from '../components/Button';

function backHome() {
  window.location.href = './home'
}
function sendOrder() {
  localStorage.removeItem("listCart")
  confirm('Deseja enviar o pedido?')
  alert("Pedido enviado com sucesso!")
  window.location.href = './home'
}
const MyCart = () => {
  var products = listItensCart();
  if (products === null) {
    products = [];
  }

  return (
    <>
      <div className='title-page'>
        <p>Minha Cesta</p>
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
        <Button className="btn btn-success" onClick={backHome}>Voltar à pagina principal</Button>
        <Button className="btn btn-success" onClick={sendOrder} >Enviar pedido</Button>
      </div>

    </>
  )
}

export default MyCart;