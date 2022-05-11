import React, { memo } from 'react'
import { CountItens } from '../../services/listCart'
import { BsFillBasket2Fill } from 'react-icons/bs'
import { Link } from 'react-router-dom';

var LogoCart = () => {
    const company = sessionStorage.getItem('tag')
    return (
        <div className="Cart-Group">
            <div id="Iten-Count">
                {CountItens()}
            </div>
            <Link to={`${company}/mycart`}><BsFillBasket2Fill className="img-logo-cart" /></Link>
        </div>)
};


export default memo(LogoCart)