const NotFound = () => {
    const reload = () => {
        const company = sessionStorage.getItem('tag')
        if (company === null) {
            window.location.href = '/'
        } else {
            window.location.href = `${company}/home`
        }
    }
    return (
        <>
            <div className='title-page'>
                <p>404 - Página não encontrada</p>
            </div>

            <div className='logo-page'>
                <img src='http://www.presidenteprudente.sp.gov.br/transparencia/javax.faces.resource/img/404.png.xhtml?ln=global' className="img-logo-page" alt="img-logo" style={{ 'maxWidth': '30rem', 'minWidth': '16rem' }}></img>
            </div>
            <br></br>
            <div className="div-button" style={{ 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                <button className="btn btn-success" onClick={reload}>Voltar ao início </button>
            </div>
        </>
    )
}

export default NotFound;
