import React, { memo, useState } from 'react'
import Cupom from './Cupom'
import { CompannyName } from '../Companny/index'

function totalProducts() {
    var arrItensCart = JSON.parse(localStorage.getItem('listCart'));
    var totalCart = 0;
    for (let i in arrItensCart) {
        let iCount = arrItensCart[i].count;
        let iPrice = arrItensCart[i].preco;
        totalCart += (parseInt(iCount) * parseFloat(iPrice));
        localStorage.setItem('totalCart', totalCart.toString())
        // eslint-disable-next-line no-loop-func
    }
    const total = (totalCart + txEntrega())
    setTimeout(() => {
        document.getElementById('total-products').innerText = (`${totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
        document.getElementById('total-pedido').innerText = (`${total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
    }, 500);
}

const txEntrega = () => {
    var entrega = JSON.parse(localStorage.getItem('dadosPedido'));
    var taxaEntrega = 0.0;
    if (entrega[0].delivery === true) {
        var taxa = require("../../services/compannyInfo/info.json")
        taxaEntrega = parseFloat(taxa[5].txEntrega)
    }
    setTimeout(() => {
        document.getElementById('taxa-entrega').innerText = (`${taxaEntrega.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
    }, 500);
    return taxaEntrega
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
        <div className='Cupom'>
            <div className="card">
                <div className='cp-top'>
                    <div ><strong className='cp-companny'>{CompannyName}</strong></div>
                    <div><h4>CUPOM NÃO FISCAL</h4></div>
                </div>
                <div className='cp-div'></div>
                <h5 className="card-title">
                    <div className='cp-nameprod'>
                        <div>Descrição</div>
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
                <h5 className="card-title">TOTAIS</h5>
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
                    <div id="desconto">R$ 0,00</div>
                </div>
                <br></br>
                <div className='cp-div'></div>
                <div className='cp-line-price'>
                    <div>TOTAL:</div>
                    <div id="total-pedido">R$ 0,00</div>
                </div>
                <br></br>
            </div>
        </div>
    )
}

export default memo(CupomGallery)