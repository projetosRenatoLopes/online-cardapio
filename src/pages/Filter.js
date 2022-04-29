import { CompannyName } from '../components/Companny'
import LogoCart from '../components/Cart'
import CardsGalerry from '../components/Card/CardsGalerry'
import CategGallery from '../components/Categories/Categs'
import { myCategs } from "../components/Companny";
import Button from '../components/Button';

function backHome() {
    window.location.href = './home'
}

const Filter = () => {
    var arrProduct = JSON.parse(localStorage.getItem('viewProducts'));
    var products = arrProduct;
    return (
        <>
            <div className='title-page'>
                {CompannyName}
                <LogoCart />
            </div>
            <br></br>
            <br></br>
            <div className="btns-categ">
                <CategGallery categs={myCategs} />
            </div>
            <br></br>
            <div className="Cont-Cards" id="card">
                <CardsGalerry cards={products} />
            </div>
            <div className='bottomArea'>
                <Button className="btn btn-success" onClick={backHome}>Voltar à pagina principal</Button>
            </div>
        </>
    )
}

export default Filter;