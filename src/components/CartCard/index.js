// @ts-nocheck
import { useState } from 'react';
import ReactDOM from 'react-dom';
import { CountItens } from '../../services/listCart';
import totalCart from '../../services/totalCart';
import Button from '../Button';



const CartCard = ({ uuid, nomeprod, preco, img, ingr, count }) => {
    //recebndo o valor total dos itens
    let itemCount = 1 * count;
    var [vstatus, setValor] = useState(itemCount)
    //Calculo do valor total do iten (quantiade X valor)
    let priceTotal = vstatus * preco;
    // Setando o valor total na variavel
    var [totalPrice, setTotalPrice] = useState(parseFloat(priceTotal.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))
    // somando valor total dos itens do carrinho

    function Adicionar() {
        setValor(vstatus + 1)
        var total = (vstatus + 1) * preco;
        // salvando a quantidade de itens 
        let arrItems = JSON.parse(sessionStorage.getItem('listCart'));
        if (arrItems !== null) {
            arrItems.forEach(item => {
                if (item.uuid === uuid) {
                    item.count = (vstatus + 1);
                }
            })
        }
        sessionStorage.setItem('listCart', JSON.stringify(arrItems));
        setTotalPrice(total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    }

    function Remover() {
        if (vstatus === 1) {
        } else {
            setValor(vstatus - 1)
            var total = (vstatus - 1) * preco;
            // salvando a quantidade de itens 
            let arrItems = JSON.parse(sessionStorage.getItem('listCart'));
            if (arrItems !== null) {
                arrItems.forEach(item => {
                    if (item.uuid === uuid) {
                        item.count = (vstatus - 1);
                    }
                })
            }
            sessionStorage.setItem('listCart', JSON.stringify(arrItems));
            setTotalPrice(total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
        }

    }

    function Excluir() {
        const resp = window.confirm(`Deseja remover ${nomeprod} da cesta?`)
        if (resp === true) {


            var arrListCart = JSON.parse(sessionStorage.getItem('listCart'));
            if (arrListCart !== null) {
                var listCart = arrListCart;
            }
            var newListCart = listCart.filter((item) => item.uuid !== uuid);
            if (arrListCart.length === 1) {
                sessionStorage.removeItem('listCart')
            } else {
                sessionStorage.setItem('listCart', JSON.stringify(newListCart));
            }
            ReactDOM.render(<CountItens />, document.getElementById('Iten-Count'));
            window.location.href = './mycart'

        }
    }

    totalCart();



    return (
        <>
            <div className="card">
                <h5 className="card-title">{nomeprod}</h5>
                <div className="img-text">
                    <img src={img} className="card-img-top" alt="img-card"></img>
                    <p className="card-text">{ingr}</p>
                </div>
                <div className="card-body">
                    <div className="btns-Card">
                        <div className='precos'>
                            <div className="preco">Unitário: {parseFloat(preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</div>
                            <div className="preco">Total: {totalPrice}</div>
                        </div>
                        <div className='btn-group'>
                            <Button className="btn btn-success" onClick={Adicionar}>+</Button>
                            <div className='quan-prod'><p>{vstatus}</p></div>
                            <Button className="btn btn-danger" onClick={Remover}> - </Button>
                        {/* <div className='obs-prod'><input type='text' placeholder='Obeservação'></input></div> */}
                        </div>
                        <div className="btn-remove">
                            <Button className="btn btn-danger" onClick={Excluir}>x</Button>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    )
}

export default CartCard;