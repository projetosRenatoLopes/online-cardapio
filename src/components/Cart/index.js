import React, { memo } from 'react'
import { CountItens } from '../../services/listCart'
import { BsFillBasket2Fill } from 'react-icons/bs'

function openCart (){
    window.location.href = './mycart'
}

var LogoCart = () => {
    return (
        <div className="Cart-Group">
            <div id="Iten-Count">
            {CountItens()}
            </div>
            <BsFillBasket2Fill className="img-logo-cart" onClick={openCart} />
        </div>)
};


export default memo(LogoCart)