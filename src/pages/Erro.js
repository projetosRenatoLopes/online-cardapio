const Erro = () => {
    const reload = () => {
        window.location.href = '/'
    }
    return (
        <>
            <div className='title-page'>
                <p>ERRO 500 :(</p>
            </div>

            <div className='logo-page'>
                <img src='https://i.pinimg.com/originals/f7/5d/e6/f75de6a33bb3e791f5dddd9337d300bc.png' className="img-logo-page" alt="img-logo" style={{ 'maxWidth': '20rem', 'minWidth': '16rem' }}></img>
            </div>
            <div className="div-button" style={{'display':'flex','alignItems':'center','justifyContent':'center'}}>
                <button className="btn btn-success" onClick={reload}>Recarregar página</button>
            </div>
        </>
    )
}

export default Erro;

