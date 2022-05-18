import { useState } from 'react'
import Button from '../Button';
import { CountItens } from '../../services/listCart';
import ReactDOM from 'react-dom';
import { compare } from '../../services/orderById'
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';

const Card = ({ uuid, nomeprod, preco, img, ingr }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(false);
    const handleClose = () => setOpen(false);
    const [imgModal, setImg] = useState(undefined);

    var [vstatus, setValor] = useState(0);
    var [totalPrice, setTotalPrice] = useState(parseFloat(preco.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }))

    function btnshow() {
        const open = sessionStorage.getItem('ofp')
        if (open === 'true') {
            var newListCart;
            var arrListCart = JSON.parse(sessionStorage.getItem('listCart'));

            if (arrListCart !== null) {
                var listCart = arrListCart;
                newListCart = listCart.filter((item) => item.uuid === uuid);
                if (newListCart.length !== 0) {
                    if (newListCart[0].count === null || newListCart[0].count === 0) {
                        vstatus = 0;
                    } else {
                        vstatus = newListCart[0].count;
                    }
                } else {
                    vstatus = 0;
                }
            } else {
                vstatus = 0;
            }
            if (vstatus === 0 || vstatus === null) {
                return (<><Button className="btn-co btn-l btn-g" onClick={Adicionar}>Adicionar</Button></>)
            } else if (vstatus >= 1) {
                return (<>
                    <div className='btns-cards-add-rem'>
                        <div className='btn-group'>
                            <div className='price' style={{ 'margin': '5px 5px 0 0' }}>
                               Total: {totalPrice}
                            </div>
                            <Button className="btn-co btn-l" onClick={Add}><strong>+</strong></Button>
                            {/* <button className="btn btn-outline-secondary">{vstatus}</button> */}
                            <div className='quan-prod'><p>{vstatus}</p></div>
                            <Button className="btn-co btn-r" onClick={Rem}><strong>-</strong></Button>
                        </div>
                        <Button className="btn-co btn-r btn-g" onClick={Remover}>Remover</Button>
                    </div>
                </>)
            };
        }
    }

    function Adicionar() {
        setValor(1)
        // adicionando itens do card em variavel
        let itemAdd = { "uuid": uuid, "nomeprod": nomeprod, "preco": preco, "img": img, "ingr": ingr, "count": 1 }
        // coletando dados do sessionStorage se houver
        let arrListCart = sessionStorage.getItem('listCart');
        // Variavel que recebera um array com a lista atual
        let listCart = [];
        // Variavel que recebera a lista atualizada
        let newListCart = [];
        if (arrListCart === null) {
            newListCart = [itemAdd];
            sessionStorage.setItem('listCart', JSON.stringify(newListCart));
        } else {
            listCart = JSON.parse(arrListCart);
            newListCart = listCart.concat(itemAdd);
            //ordena a lista do carrinho por ID
            newListCart.sort(compare);
            sessionStorage.setItem('listCart', JSON.stringify(newListCart));
        }
        ReactDOM.render(<CountItens />, document.getElementById('Iten-Count'));
    }


    function Remover() {
        const resp = window.confirm(`Deseja remover ${nomeprod} da cesta?`)
        if (resp === true) {
            var arrListCart = JSON.parse(sessionStorage.getItem('listCart'));
            if (arrListCart !== null) {
                var listCart = arrListCart;
            } else {
                sessionStorage.removeItem('listCart')
            }
            var newListCart = listCart.filter((item) => item.uuid !== uuid);
            if (arrListCart.length === 1) {
                sessionStorage.removeItem('listCart')
            } else {
                sessionStorage.setItem('listCart', JSON.stringify(newListCart));
            }
            setValor(null)
            ReactDOM.render(<CountItens />, document.getElementById('Iten-Count'));

        }
    }

    function Add() {
        setValor(vstatus + 1)
        var total = (vstatus + 1) * preco;
        // salvando a quantidade de itens 
        let arrItems = JSON.parse(sessionStorage.getItem('listCart'));
        if (arrItems !== null) {
            arrItems.forEach(item => {
                if (item.uuid === uuid) {
                    item.count = (vstatus + 1.0);
                }
            })
        }
        sessionStorage.setItem('listCart', JSON.stringify(arrItems));
        setTotalPrice(total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }));
    }

    function Rem() {
        if (vstatus === 1) {
        } else {
            setValor(vstatus - 1)
            var total = (vstatus - 1) * preco;
            // salvando a quantuuidade de itens 
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


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    function openModal(imgView) {
        console.log(imgView)
        setImg(imgView);
        setOpen(true)
    }
    return (
        <>
            <div className="card">
                <div style={{'display':'flex','justifyContent':'space-between','margin':'0 7px 0 0'}}>
                    <h5 className="card-title">{nomeprod}</h5>
                    <div className='price'>
                        <strong>{parseFloat(preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong>
                    </div>
                </div>
                <div className="img-text">
                    <img onClick={() => openModal(img)} src={img} className="card-img-top" alt='img-card'></img>
                    <div className="card-text">
                        <p >{ingr}</p>
                    </div>
                </div>
                <div className="card-body" style={{'display':'flex','justifyContent':'flex-end'}}>
                    <div className="bottom-Card">
                        <div className="add-remove-item">
                            {btnshow()}
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2" style={{ 'display': 'flex', 'justifyContent': 'center' }}>
                            <strong>{nomeprod}</strong>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div style={{ 'justifyContent': 'center', 'display': 'flex' }}>
                                <img src={img} alt='img-load-error' style={{ 'width': '100%' }}></img>
                            </div>
                        </Typography>
                    </Box>
                </Modal >
            </div >
        </>
    )
}


export default Card;