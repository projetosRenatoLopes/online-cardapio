import React, { memo, useState } from 'react'
import Button from '../Button';
import { Link } from 'react-router-dom';

function CategGallery(props) {
    const company = sessionStorage.getItem('tag');
    const { categs } = props;

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(categs)

    const renderCateg = (gallery, key) => {

        function listActual() {
            let arrProduct = JSON.parse(sessionStorage.getItem('listProduct'));
            var newArrProduct = arrProduct.filter((item) => item.categ === gallery)
            sessionStorage.setItem('viewProducts', JSON.stringify(newArrProduct))
            sessionStorage.setItem('filter', gallery)
            window.location.href = '/filter'
            
        }

        return (
            <div key={gallery}>
            <Link to=`${company}/filter` ><Button className="btn btn-primary" onClick={listActual}>{gallery}</Button></Link>
            </div>
        )
    }

    return (
        <div className='btn-group-categ'>
            {gallery.map(renderCateg)}
        </div>
    )
}

export default memo(CategGallery)

