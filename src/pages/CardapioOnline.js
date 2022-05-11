import { Link } from "react-router-dom";

const CardapioOnline = () => {

    return (
        <>
            <div className='title-page'>
                <p>Cardapio Oline</p>
            </div>

            <div className='logo-page'>
                <h3>Conheça nossos clientes:</h3>

            </div>
            
            <div className="card">
                <h5 className="card-title">Renato Lanches</h5>
                <div className="img-text">
                    <img src="https://www.manollopizzaria.com.br/wp-content/uploads/2021/02/X_TUDO_DE_HAMBURGUER1-1.jpg" className="card-img-top" alt="img-card" />
                        <div className="card-text">
                            <p>Sanduiches, Batatas, HotDogs e mais.</p>
                        </div>
                </div>
                <div className="card-body">
                    <div className="bottom-Card">
                    <div></div>
                        <div className="add-remove-item">
                            <div className="btns-cards-add-rem">
                                <Link to={`renato-lanches`} ><button type="button" className="btn btn-success">Visitar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="card">
                <h5 className="card-title">Bruna Pizzas</h5>
                <div className="img-text">
                    <img src="http://3.bp.blogspot.com/-iENBnv2wj6c/UY-k-u16vsI/AAAAAAAACHE/Y_l5jVvx_KI/s400/a+piza.jpg" className="card-img-top" alt="img-card" />
                        <div className="card-text">
                            <p>Pizzas, Massas, Sobremesas e mais.</p>
                        </div>
                </div>
                <div className="card-body">
                    <div className="bottom-Card">
                            <div></div>
                        <div className="add-remove-item">
                            <div className="btns-cards-add-rem">
                                <Link to={`/bruna-pizzas`} ><button type="button" className="btn btn-success">Visitar</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default CardapioOnline;

