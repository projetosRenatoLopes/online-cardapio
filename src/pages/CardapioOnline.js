import { Link } from "react-router-dom";
import Client from "../components/Client/Client.js";
import api from "../services/api.js";

const CardapioOnline = () => {
    
        const companies = JSON.parse(sessionStorage.getItem('page'))
    return (
        <>
            <div className='title-page'>
                <p>Cardapio Oline</p>
            </div>

            <div className='logo-page'>
                <h3>Conheça nossos clientes:</h3>
            </div>

            <Client companies={companies} />

        </>
    )
}

export default CardapioOnline;

