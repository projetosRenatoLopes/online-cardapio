import Button from '../Button';
import Card from '.';

function viewAddCards() {
    return (
        <>
            <div className="AddItens">
                <input type="text" id="idprod" placeholder="ID do produto..."></input><br></br>
                <input type="text" id="nomeprod" placeholder="Nome do produto..."></input><br></br>
                <input type="text" id="precoprod" placeholder="Pereço do produto..."></input><br></br>
                <input type="text" id="ingrprod" placeholder="Ingredientes do produto..."></input><br></br>
                <input type="file" id="imgprod"></input><br></br>
                <br></br>
                <Button className="btn btn-success" onClick={addNewCard}>Salvar</Button>
                <br></br>
                <br></br>
            </div>
        </>
    );
}

const addNewCard = () => {
    //pega os valores dos campos de adição
    var idcard = document.getElementById('idprod')['value'];
    var nomecard = document.getElementById('nomeprod')['value'];
    var precocard = document.getElementById('precoprod')['value'];
    var imgcard = document.getElementById('imgprod')['value'];
    var ingrcard = document.getElementById('ingrprod')['value'];

    alert(`${nomecard} Produto inserido com sucesso.`)
    return (
        <>
            <Card id={idcard} nomeprod={nomecard} preco={precocard} img={imgcard} ingr={ingrcard} />
        </>
    )
}

export default viewAddCards;