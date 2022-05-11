import React, { memo, useState } from 'react'
import { Link } from 'react-router-dom';

function Client(props) {
    const { companies } = props;

    // eslint-disable-next-line no-unused-vars
    const [gallery, setGallery] = useState(companies)

    const renderClient = (gallery, key) => {


        return (
            <div key={gallery}>
                <div className="card">
                    <h5 className="card-title">{gallery.name}</h5>
                    <div className="img-text">
                        <img src={gallery.logo} className="card-img-top" alt="img-card" />
                        <div className="card-text">
                            <p>Visite o cardápio de {gallery.name}.</p>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="bottom-Card">
                            <div></div>
                            <div className="add-remove-item">
                                <div className="btns-cards-add-rem">
                                    <Link to={`/${gallery.tag}`} ><button type="button" className="btn btn-success">Visitar</button></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const itens = JSON.parse(sessionStorage.getItem('page'))
    if (itens.length === 0) {
        return (
            <div>
                <h4>Nenhum cliente ainda :(</h4>
            </div>
        )
    } else {
        return (
            <div className='btn-group-categ'>
            {gallery.map(renderClient)}
        </div>
        )
    }

}

export default memo(Client)

