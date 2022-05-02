// @ts-nocheck
import { useState } from 'react';
import totalCart from '../../services/totalCart';

const Cupom = ({ nomeprod, preco, count }) => {
    //recebndo o valor total dos itens
    let itemCount = 1 * count;
    var [vstatus, setValor] = useState(itemCount)
    //Calculo do valor total do iten (quantiade X valor)
    let priceTotal = vstatus * preco;
    // Setando o valor total na variavel
    var [totalPrice, setTotalPrice] = useState(parseFloat(priceTotal.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
    // somando valor total dos itens do carrinho

    totalCart();

    return (<>
        <div className='cp-nameprod'>
            <h5 className="card-title">{nomeprod}</h5>
        </div>
        <div className='cp-line-price'>
            <div>{parseFloat(preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
            <div>{vstatus}</div>
            <div>{totalPrice}</div>
        </div>
        <br></br>
    </>
    )
}

export default Cupom;