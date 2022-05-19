import LogoPage from '../components/Logo';
import InfoCompanny, { CompannyName } from '../components/Companny'
import LogoCart from '../components/Cart'
import CardsGalerry from '../components/Card/CardsGalerry'
import { listProducts } from '../services/products';
import CategGallery from '../components/Categories/Categs'
import { myCategs } from "../components/Companny";
import refreshData from '../utils/refreshData'
import React, { useEffect } from 'react';
import backcolor from '../utils/backColor'

const Home = () => {
  backcolor()

  useEffect(() => {
    const interval = setInterval(() => {
      refreshData()
    }, 10000);
    return () => clearInterval(interval)
  }, []);

  var products = listProducts();
  return (
    <>
      <div className='title-page'>
        {CompannyName}
        <LogoCart />
      </div>
      <LogoPage />
      <InfoCompanny />
      <div className="btns-categ">
        <CategGallery categs={myCategs} />
      </div>
      <br></br>
      <div className="Cont-Cards" id="card">
        <CardsGalerry cards={products} />
      </div>
    </>
  )
}

export default Home;