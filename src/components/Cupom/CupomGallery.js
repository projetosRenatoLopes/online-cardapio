import React, { memo, useState } from 'react'
import Cupom from './Cupom'
import { CompannyName } from '../Companny/index'
import backcolor from '../../utils/backColor'

function totalProducts() {
    backcolor()
    var arrItensCart = JSON.parse(sessionStorage.getItem('listCart'));
    var totalCart = 0;
    for (let i in arrItensCart) {
        let iCount = arrItensCart[i].count;
        let iPrice = arrItensCart[i].preco;
        totalCart += (parseInt(iCount) * parseFloat(iPrice));
        sessionStorage.setItem('totalCart', totalCart.toString())
        // eslint-disable-next-line no-loop-func
    }
    const total = (totalCart + txEntrega())
    setTimeout(() => {
        document.getElementById('total-products').innerText = (`${totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
        document.getElementById('total-pedido').innerText = (`${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
    }, 500);
}

const txEntrega = () => {
    var entrega = JSON.parse(sessionStorage.getItem('dadosPedido'));
    var taxaEntrega = 0.0;
    if (entrega[0].delivery === true) {
        const getInfoApi = JSON.parse(sessionStorage.getItem('info'))[0]
        taxaEntrega = parseFloat(getInfoApi.txentrega)
    }
    setTimeout(() => {
        document.getElementById('taxa-entrega').innerText = (`${taxaEntrega.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
    }, 500);
    return taxaEntrega
}
const dadosPedido = (info) => {
    var dados = JSON.parse(sessionStorage.getItem('dadosPedido'));
    if (info === 'pagamento') {
        return dados[0].pagamento
    } else if (info === 'cliente') {
        return dados[0].name
    } else if (info === 'endereco') {
        if (dados[0].delivery === false) {
            return 'Retirar no local'
        } else {
            return `${dados[0].rua} ${dados[0].num} ${dados[0].comp} - ${dados[0].bairro} - ${dados[0].cidade}`
        }
    } else if (info === 'obs') {
        return dados[0].obs
    } else if (info === 'tel') {
        return dados[0].tel
    }
}

const dateActual = () => {
    const date = new Date();
    return (`${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} `)
}

function CupomGallery(props) {
    const { cards } = props

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(cards)


    const renderCards = (gallery, key) => {
        return (
            <Cupom key={gallery.id}
                nomeprod={gallery.nomeprod}
                preco={gallery.preco}
                count={gallery.count}
            />
        )
    }
    txEntrega()
    totalProducts()
    return (
        <div className='Cupom' id='cupom-id' key='cupom-key'>
            <div className="card-cp">
                <div className='cp-top'>
                    <div ><strong className='cp-companny'>{CompannyName}</strong></div>
                    <div><h4>RESUMO DO PEDIDO</h4></div>
                </div>
                <div id='info-client'><p>Cliente: {dadosPedido('cliente')}</p></div>
                <div id='info-client'><p>Telefone: {dadosPedido('tel')}</p></div>
                <div id='info-client'><p>Data: {dateActual()}</p></div>

                <div className='cp-div'></div>
                <h5 className="card-title">
                    <div className='cp-nameprod'>
                        <div>Descri????o</div>
                    </div>
                    <div className='cp-line-price'>
                        <div>R$ Unit.</div>
                        <div>Qtd. Item</div>
                        <div>R$ Total Item</div>
                    </div>
                </h5>

                {gallery.map(renderCards)}
                <div className='cp-top'>
                </div>
                <div className='cp-div'></div>
                <h5 className="cp-totais">TOTAIS</h5>
                <div className='cp-line-price'>
                    <div>Produtos:</div>
                    <div id="total-products">R$ 0,00</div>
                </div>
                <div className='cp-line-price'>
                    <div>Entrega:</div>
                    <div id="taxa-entrega">R$ 0,00</div>
                </div>
                <div className='cp-line-price'>
                    <div>Desconto:</div>
                    <div id="cp-desconto">R$ 0,00</div>
                </div>
                <div className='cp-div'></div>
                <div className='cp-line-price'>
                    <div>TOTAL:</div>
                    <div id="total-pedido">R$ 0,00</div>
                </div>
                <div className='cp-div'></div>
                <div id='info-client'><p>Forma de Pagamento: {dadosPedido('pagamento')}</p></div>
                <div id='info-client'><p>Endere??o para entrega: {dadosPedido('endereco')} </p></div>
                <div id='info-client'><p>Observa????es: {dadosPedido('obs')}</p></div>
                <br></br>
            </div>
        </div>
    )
}

export default memo(CupomGallery)