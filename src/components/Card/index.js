import { useState } from 'react'
import Button from '../Button';
import { CountItens } from '../../services/listCart';
import ReactDOM from 'react-dom';
import { compare } from '../../services/orderById'

const Card = ({ id, nomeprod, preco, img, ingr }) => {

    var [vstatus, setValor] = useState(0)

    function btnshow() {
        const open = localStorage.getItem('ofp')
        if (open === 'true') {
            var newListCart;
            var arrListCart = JSON.parse(localStorage.getItem('listCart'));
            
            if (arrListCart !== null) {
                var listCart = arrListCart;
                newListCart = listCart.filter((item) => item.id === id);
                if (newListCart.length !== 0) {
                    vstatus = newListCart[0].count;
                } else {
                    vstatus = 0;
                }
            } else {
                vstatus = 0;
            }
            if (vstatus === 0) {
                return (<><Button className="btn btn-success" onClick={Adicionar}>Adicionar</Button></>)
            } else if (vstatus >= 1) {

                return (<>
                    <div className='btns-cards-add-rem'>
                        <div className='btn-group'>
                            <Button className="btn btn-success" onClick={Add}>+</Button>
                            {/* <button className="btn btn-outline-secondary">{vstatus}</button> */}
                            <div className='quan-prod'><p>{vstatus}</p></div>
                            <Button className="btn btn-danger" onClick={Rem}> - </Button>
                        </div>
                        <Button className="btn btn-danger" onClick={Remover}>Remover</Button>
                    </div>
                </>)
            };
        }
    }

    function Adicionar() {
        setValor(1)
        // adicionando itens do card em variavel
        let itemAdd = { "id": id, "nomeprod": nomeprod, "preco": preco, "img": img, "ingr": ingr, "count": 1 }
        // coletando dados do localStorage se houver
        let arrListCart = localStorage.getItem('listCart');
        // Variavel que recebera um array com a lista atual
        let listCart = [];
        // Variavel que recebera a lista atualizada
        let newListCart = [];
        if (arrListCart === null) {
            newListCart = [itemAdd];
            localStorage.setItem('listCart', JSON.stringify(newListCart));
        } else {
            listCart = JSON.parse(arrListCart);
            newListCart = listCart.concat(itemAdd);
            //ordena a lista do carrinho por ID
            newListCart.sort(compare);
            localStorage.setItem('listCart', JSON.stringify(newListCart));
        }

        ReactDOM.render(<CountItens />, document.getElementById('Iten-Count'));
       
    }

    function Remover() {
        const resp = window.confirm(`Deseja remover ${nomeprod} da cesta?`)
        if (resp === true) {
            var arrListCart = JSON.parse(localStorage.getItem('listCart'));
            if (arrListCart !== null) {
                var listCart = arrListCart;
            } else {
                localStorage.removeItem('listCart')
            }
            var newListCart = listCart.filter((item) => item.id !== id);
            if (arrListCart.length === 1) {
                localStorage.removeItem('listCart')
            } else {
                localStorage.setItem('listCart', JSON.stringify(newListCart));
            }
            setValor(null)
            ReactDOM.render(<CountItens />, document.getElementById('Iten-Count'));
           
        }
    }

    function Add() {
        setValor(vstatus + 1)
        // salvando a quantidade de itens 
        let arrItems = JSON.parse(localStorage.getItem('listCart'));
        if (arrItems !== null) {
            arrItems.forEach(item => {
                if (item.id === id) {
                    item.count = (vstatus + 1.0);
                }
            })
        }
        localStorage.setItem('listCart', JSON.stringify(arrItems));
    }

    function Rem() {
        if (vstatus === 1) {
        } else {
            setValor(vstatus - 1)
            // salvando a quantidade de itens 
            let arrItems = JSON.parse(localStorage.getItem('listCart'));
            if (arrItems !== null) {
                arrItems.forEach(item => {
                    if (item.id === id) {
                        item.count = (vstatus - 1);
                    }
                })
            }
            localStorage.setItem('listCart', JSON.stringify(arrItems));
        }
    }



    return (
        <>
            <div className="card">
                <h5 className="card-title">{nomeprod}</h5>
                <div className="img-text">
                    <img src={img} className="card-img-top" alt='img-card'></img>
                    <div className="card-text">
                        <p >{ingr}</p>
                    </div>
                </div>
                <div className="card-body">
                    <div className="bottom-Card">
                        <div className='price'>
                            <strong>{parseFloat(preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
                        </div>
                        <div className="add-remove-item">
                            {btnshow()}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
        </>
    )
}


export default Card;