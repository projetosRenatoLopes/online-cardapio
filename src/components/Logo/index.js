import React from "react";

const getInfoApi = JSON.parse(sessionStorage.getItem('info'))[0]
//var compannyLogo = 'https://imagensemoldes.com.br/wp-content/uploads/2020/07/Desenho-Lanche-PNG.png';
var compannyLogo = getInfoApi.logo
//var compannyLogo = 'https://yourimageshare.com/ib/eLJjfrf5ji.png';


const LogoPage = () => {
    return (
        <>
            <div className='logo-page'>
                <img src={compannyLogo} className="img-logo-page" alt="img-logo" style={{ 'maxWidth': '20rem', 'minWidth': '16rem' }}></img>
            </div>
        </>
    )
}

export default LogoPage