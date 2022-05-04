import LogoCart from '../components/Cart'
import CupomGallery from '../components/Cupom/CupomGallery'
import listItensCart from '../services/listCart/listCart';
import Button from '../components/Button';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import renderPedido from '../services/renderPedido';
import { alertTitleClasses } from '@mui/material';

function totalProducts(opc) {
    var arrItensCart = JSON.parse(localStorage.getItem('listCart'));
    var totalCart = 0;
    for (let i in arrItensCart) {
        let iCount = arrItensCart[i].count;
        let iPrice = arrItensCart[i].preco;
        totalCart += (parseInt(iCount) * parseFloat(iPrice));
        localStorage.setItem('totalCart', totalCart.toString())
        // eslint-disable-next-line no-loop-func
    }
    const total = (totalCart + txEntrega('calc'))

    if (opc === 'total') {
        return `${totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
    } else if (opc === 'totalPedido') {
        return `${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`
    } else {
        return "R$ 0,00"
    }
}

const txEntrega = (opc) => {
    var entrega = JSON.parse(localStorage.getItem('dadosPedido'));
    var taxaEntrega = 0.0;
    if (entrega[0].delivery === true) {
        var taxa = require("../services/compannyInfo/info.json")
        taxaEntrega = parseFloat(taxa[5].txEntrega)
    }
    if (opc === 'calc') {
        return taxaEntrega
    } else {
        return taxaEntrega.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    }
}

function sendOrder() {
    const open = localStorage.getItem('ofp')
    if (open === 'true') {

        const resp = window.confirm('Deseja enviar o pedido?')
        if (resp === true) {
            const dados = JSON.parse(localStorage.getItem('dadosPedido')),
                tel = 5534999508680,
                cliente = dados[0].name,
                pagamento = dados[0].pagamento,
                delivery = dados[0].delivery;
            var entrega = 'Erro ao obter dados (Entre em contato com o cliente)'
            // verificando o tipo da entrega
            if (delivery === true) {
                entrega = `${dados[0].rua} ${dados[0].num} ${dados[0].comp} - ${dados[0].bairro} - ${dados[0].cidade}`
            }
            else {
                entrega = `Retirar no local`
            }
            const date = new Date()
            const ano = `${date.getFullYear()}`
            const produtos = renderPedido()
            const npedido = `${ano.slice(2, 4)}${date.getMonth() + 1}${date.getDay() + 1}${date.getHours()}${date.getMinutes()}`
            const msg = `Pedido: *${npedido}* %0ACliente: *${cliente}* %0AForma de Pagamento: *${pagamento}* %0AEndereço para entrega: *${entrega}* %0A%0AProdutos: %0A%0A${produtos}%0ATotal dos Produtos: *${totalProducts('total')}* %0ATaxa da Entrega: *${txEntrega('toString')}* %0ADesconto: *${totalProducts('desconto')}* %0ATotal: *${totalProducts('totalPedido')}*`

            const url = `https://web.whatsapp.com/send?phone=${tel}&text=${msg}`
            window.open(url, '_blank')



            const resp = window.confirm("Seu pedido foi enviado via WhatsApp?\n'OK' para 'Sim'\n'Cancelar' para 'Não'")
            if (resp === true) {
                localStorage.removeItem("listCart")
                alert("Obrigado, pela Preferência!")
                window.location.href = './home'
            }
        }
    } else {
        alert("Estamos fechados no momento!\nConfira nosso hórario de atendimento na página inicial.")
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

    const exportPDF = () => {
        var cupom = document.getElementById('cupom-id').innerHTML;
        var style = '<style>'
        style = style + '.Cupom {background: #000000;}';
        style = style + 'body {max-width: 350px;}';
        style = style + '#info-client p {margin-left: 10px;margin-bottom: 5px;margin-top: 5px;}';
        style = style + '.cp-line-price {display: flex;justify-content: space-between;margin-right: 10px;margin-left: 10px;margin-bottom: 3px;margin-top: 3px;}';
        style = style + '.cp-top p {font-size: 20px;margin-top: 10px;margin-bottom: 10px;padding: 0px;}';
        style = style + '.cp-companny {text-transform: uppercase;}';
        style = style + '.cp-top div {justify-content: center;align-items: center;display: flex;margin-top: 0px;padding: 0px;}';
        style = style + '.cp-top h4 {margin-top: 10px;margin-bottom: 10px;}';
        style = style + '.cp-div { border-bottom: 1px dashed #000000; margin-left: 5px; margin-right: 5px; }';
        style = style + '.cp-nameprod h5 {margin-bottom: 1px;}'
        style = style + '#cp-desconto {margin-bottom: 5px;}'
        style = style + '.cp-totais {font-size: 16px;margin-bottom: .5rem;margin: 3px 0px 0px 5px;}'
        style = style + '</style>'
        var win = window.open(",", 'height=100,width=100');
        win.document.write('<html><body>');
        win.document.write(style);
        win.document.write(cupom);
        win.document.write('</body></html>');
        win.document.close();

        win.print();
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
                <Button className='btn btn-success' onClick={exportPDF}>Imprimir</Button>
                <Button className="btn btn-success" onClick={sendOrder} >Enviar pedido</Button>
            </div>

        </>
    )
}

export default Cupom;