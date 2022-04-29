import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom';
import Home from '../../pages/Home';
import Button from '../Button';
import CardsGalerry from '../Card/CardsGalerry';


function CategGallery(props) {
    const { categs } = props;

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(categs)

    const renderCateg = (gallery, key) => {

        function listActual() {
            console.log(gallery)
            let arrProduct = JSON.parse(localStorage.getItem('listProduct'));
            var newArrProduct = arrProduct.filter((item) => item.categ === gallery)
            localStorage.setItem('viewProducts', JSON.stringify(newArrProduct))
            window.location.href = './filter'
        }

        return (
            <Button className="btn btn-primary" onClick={listActual}>{gallery}</Button>
        )
    }

    return (
        <div>
            {gallery.map(renderCateg)}
        </div>
    )
}

export default memo(CategGallery)

