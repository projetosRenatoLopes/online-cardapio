import { AiOutlineClose } from 'react-icons/ai'
import LogoCart from '../components/Cart'
import CardsGalerry from '../components/Card/CardsGalerry'
import CategGallery from '../components/Categories/Categs'
import { myCategs } from "../components/Companny";
import Button from '../components/Button';
import { Link } from 'react-router-dom'


const Filter = () => {
    var arrProduct = JSON.parse(sessionStorage.getItem('viewProducts'));
    var products = arrProduct;
    return (
        <>
            <div className='title-page'>
                <div className='title-mycart'><Link to='/home'><AiOutlineClose style={{ color: '#FFFFFF' }} /></Link><p>Filtro: {sessionStorage.getItem('filter')} </p></div>
                <LogoCart />
            </div>
            <br></br>
            <br></br>
            <div className="btns-categ">
                <CategGallery categs={myCategs} />
            </div>
            <br></br>
            <CardsGalerry cards={products} />
            <div className='bottomArea'>
                <Link to='/home'><Button onClick={myCategs} className="btn btn-success">Voltar</Button></Link>
            </div>
        </>
    )
}

export default Filter;