import LogoCart from '../components/Cart'
import CupomGallery from '../components/Cupom/CupomGallery'
import listItensCart from '../services/listCart/listCart';
import Button from '../components/Button';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';


function sendOrder() {
    localStorage.removeItem("listCart")
    const resp = window.confirm('Deseja enviar o pedido?')
    if (resp === true) {
        alert("Pedido enviado com sucesso!")
        window.location.href = './home'
    }
}

const Cupom = () => {
    var products = listItensCart();
    if (products === null) {
        products = [];
        window.location.href = './home'
    }
    const dadosPedido = JSON.parse(localStorage.getItem('dadosPedido'))
    if (dadosPedido === null) {
        window.location.href = './checkout'
    }


    return (
        <>
            <div className='title-page'>
                <div className='title-mycart'><Link to='/home'><AiOutlineClose style={{ color: '#FFFFFF' }} /></Link><p>Minha Cesta</p></div>
                <LogoCart />
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className="Cont-Cards" id="Cart-Cards">
                <CupomGallery cards={products} />
            </div>


            <br></br>


            <div className='bottomArea'>
                <Link to='/checkout'><button className="btn btn-success" >Voltar</button></Link>
                <Button className="btn btn-success" onClick={sendOrder} >Enviar pedido</Button>
            </div>

        </>
    )
}

export default Cupom;