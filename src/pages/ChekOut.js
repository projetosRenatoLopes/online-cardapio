import LogoCart from '../components/Cart'
import listItensCart from '../services/listCart/listCart';
import { AiOutlineClose } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import PayementsModes from '../components/PaymentModes'
import backcolor from '../utils/backColor'
import { useEffect } from 'react';
import refreshData from '../utils/refreshData';
import formatTel from '../utils/formatTel'

const CheckOut = () => {
    useEffect(() => {
        const interval = setInterval(() => {
          refreshData()
        }, 10000);
        return () => clearInterval(interval)
      }, []);
    backcolor()

    const company = sessionStorage.getItem('tag')
    var products = listItensCart();
    if (products === null) {
        products = [];
        window.location.href = `${company}/home`
    }

    // metodos de pagamento
    const getInfo = require("../services/compannyInfo/info.json")
    const paymentMode = getInfo[2].paymentMethods;

    // taxa de entrega   
    const getInfoApi = JSON.parse(sessionStorage.getItem('info'))[0]
    const txDelivery = getInfoApi.txentrega

    // dadosPedido
    const dados = JSON.parse(sessionStorage.getItem('dadosPedido'))
    setTimeout(() => {
        document.getElementById('name')["value"] = dados[0].name
        document.getElementById('name')["disabled"] = false
        document.getElementById('co-drive')["checked"] = dados[0].drive
        document.getElementById('co-delivery')["checked"] = dados[0].delivery
        document.getElementById('tel')["value"] = dados[0].tel
        document.getElementById('tel')["disabled"] = false
        document.getElementById('co-input-street')["value"] = dados[0].rua
        document.getElementById('co-input-street')["disabled"] = false
        document.getElementById('co-input-num')["value"] = dados[0].num
        document.getElementById('co-input-num')["disabled"] = false
        document.getElementById('co-input-complement')["value"] = dados[0].comp
        document.getElementById('co-input-complement')["disabled"] = false
        document.getElementById('co-input-district')["value"] = dados[0].bairro
        document.getElementById('co-input-district')["disabled"] = false
        document.getElementById('co-input-city')["value"] = dados[0].cidade
        document.getElementById('co-input-city')["disabled"] = false
        document.getElementById('co-input-sel')["value"] = dados[0].pagamento
        document.getElementById('co-input-sel')["disabled"] = false
        document.getElementById('co-input-obs')["value"] = dados[0].obs
        document.getElementById('co-input-obs')["disabled"] = false
    }, 1000);


    const checkVerify = () => {
        let chkDelivery = document.querySelector('#co-delivery')['checked'];
        let inputStreet = document.querySelector('#co-input-street');
        let inputNum = document.querySelector('#co-input-num');
        let inputComplement = document.querySelector('#co-input-complement');
        let inputDistrict = document.querySelector('#co-input-district');
        let inputCity = document.querySelector('#co-input-city');
        if (chkDelivery === true) {
            inputStreet['disabled'] = false;
            inputNum['disabled'] = false;
            inputComplement['disabled'] = false;
            inputDistrict['disabled'] = false;
            inputCity['disabled'] = false;
            document.getElementById('co-input-street')["value"] = dados[0].rua
            document.getElementById('co-input-num')["value"] = dados[0].num
            document.getElementById('co-input-complement')["value"] = dados[0].comp
            document.getElementById('co-input-district')["value"] = dados[0].bairro
            document.getElementById('co-input-city')["value"] = dados[0].cidade
        } else {
            inputStreet['disabled'] = true;
            inputNum['disabled'] = true;
            inputComplement['disabled'] = true;
            inputDistrict['disabled'] = true;
            inputCity['disabled'] = true;
            document.getElementById('co-input-street')["value"] = ''
            document.getElementById('co-input-num')["value"] = ''
            document.getElementById('co-input-complement')["value"] = ''
            document.getElementById('co-input-district')["value"] = ''
            document.getElementById('co-input-city')["value"] = ''
        }
    }

    const validInput = (tag) => {
        var name = document.getElementById(tag)["value"];
        if (name === "" || name === 'Forma de Pagamento') {
            document.getElementById(tag).style.boxShadow = '1px 1px 1px 1px red';
            return false;
        } else {
            document.getElementById(tag).style.boxShadow = 'none';
            return true;
        }
    }

    const saveInfoClient = () => {
        var nome = false;
        var telefone = false;
        var entrega = false;
        var pagamento;

        validInput('name');
        validInput('tel');
        validInput('co-input-sel');
        //verificação do nome
        const name = document.getElementById('name')["value"]
        if (name === "") {
            nome = false;
        } else {
            nome = true;
        }
        // verificação telefone
        const tel = document.getElementById('tel')["value"];
        if (tel === "") {
            telefone = false;
        } else {
            telefone = true;
        }
        // verificação do pagamento
        const pag = document.getElementById('co-input-sel')["value"];
        if (pag === "Forma de Pagamento") {
            pagamento = false;
        } else {
            pagamento = true;
        }

        // verificação do tipo de entrega
        const delivery = document.getElementById('co-delivery')["checked"];
        if (delivery === true) {
            const rua = document.getElementById('co-input-street')["value"],
                num = document.getElementById('co-input-num')["value"],
                bairro = document.getElementById('co-input-district')["value"],
                cidade = document.getElementById('co-input-city')["value"];
            if (rua !== "" && num !== "" && bairro !== "" && cidade !== "") {
                entrega = true
            } else {
                entrega = false;
                alert('Preencha os dados para a entrega.')
            }
        } else {
            entrega = true;
        }


        if (nome === true && telefone === true && pagamento === true && entrega === true) {
            const open = sessionStorage.getItem('ofp')

            if (open === 'true') {

                //coletando os dados digitados pelo usuário
                const name = document.getElementById('name')["value"],
                    tel = document.getElementById('tel')["value"],
                    drive = document.getElementById('co-drive')["checked"],
                    delivery = document.getElementById('co-delivery')["checked"],
                    rua = document.getElementById('co-input-street')["value"],
                    num = document.getElementById('co-input-num')["value"],
                    comp = document.getElementById('co-input-complement')["value"],
                    bairro = document.getElementById('co-input-district')["value"],
                    cidade = document.getElementById('co-input-city')["value"],
                    pagamento = document.getElementById('co-input-sel')["value"],
                    obs = document.getElementById('co-input-obs')["value"];

                // passando os dados do digitados para uma Array
                const infoClient = [{ name, tel, drive, delivery, rua, num, comp, bairro, cidade, pagamento, obs }];
                sessionStorage.setItem('dadosPedido', JSON.stringify(infoClient));
                window.location.href = `${company}/cupom`

            } else {
                alert("Estamos fechados no momento!\nConfira nosso hórario de atendimento na página inicial.")
                window.location.href = `${company}/home`
            }

        } else {
            if (entrega === true) {
                alert('Por favor, preencha todos com campos.')
            }
        }

    }

    const cleanData = () => {
        sessionStorage.removeItem('dadosPedido')
        document.getElementById('name')["value"] = ""
        document.getElementById('co-drive')["checked"] = ""
        document.getElementById('co-delivery')["checked"] = ""
        document.getElementById('tel')["value"] = ""
        document.getElementById('co-input-street')["value"] = ""
        document.getElementById('co-input-num')["value"] = ""
        document.getElementById('co-input-complement')["value"] = ""
        document.getElementById('co-input-district')["value"] = ""
        document.getElementById('co-input-city')["value"] = ""
        document.getElementById('co-input-sel')["value"] = "Forma de Pagamento"
        document.getElementById('co-input-obs')["value"] = ""
    }

    const verifyTel = () => {
    const tel = document.getElementById('tel')['value']
    document.getElementById('tel')['value'] = formatTel(tel)    
    }
    return (
        <>
            <div className='title-page'>
                <div className='title-mycart'><Link to={`${company}/home`}><AiOutlineClose style={{ color: '#FFFFFF' }} /></Link><p>Dados do pedido</p></div>
                <LogoCart />
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div className='data-checkout'>

                <h3>Dados do pedido:</h3>
                <input type="text"  id='name' className='co-data' placeholder='Nome completo' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} ></input>
                <input type='text' id='tel' className='co-data' placeholder='Telefone' onChange={verifyTel} required style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}}></input>
                <div className='co-chk-drive-delivery'>
                    <input type='radio' className='co-drive' id='co-drive' name='chkradio' value='drive' onClick={checkVerify} defaultChecked></input>
                    <label htmlFor='co-drive'>Retirar no local</label>
                    <br></br>
                    <input type='radio' className='co-delivery' id='co-delivery' name='chkradio' value='delivery' onClick={checkVerify} ></input>
                    <label htmlFor='co-delivery'>Receber em casa: (Taxa: {parseFloat(txDelivery.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })})</label>
                </div>

                <input className='co-data' id='co-input-street' type='text' placeholder='Rua' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} disabled></input>
                <div className='co-addr-div'>
                    <input className='co-data' id='co-input-num' type='text' placeholder='Número' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} disabled></input>
                    <input className='co-data' id='co-input-complement' type='text' placeholder='Complemento' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} disabled></input>
                </div>
                <input className='co-data' id='co-input-district' type='text' placeholder='Bairro' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} disabled></input>
                <input className='co-data' id='co-input-city' type='text' placeholder='Cidade' style={{'backgroundColor':'rgba(235, 235, 235, 0.726)'}} disabled></input>
                <PayementsModes options={paymentMode} />
                <textarea style={{'width':'100%','height':'100px','backgroundColor':'rgba(235, 235, 235, 0.726)'}} className='co-data' id='co-input-obs' placeholder='Observações'></textarea >
            </div>
            <br></br>
            <div className='bottomArea'>
                <Link to={`${company}/mycart`}><button className="btn-co btn-g btn-c" >Voltar</button></Link>
                <button className="btn-co btn-g btn-r" onClick={cleanData}>Limpar dados</button>
                <button className="btn-co btn-g btn-l" type="submit" onClick={saveInfoClient}>Confirmar</button>
            </div>

        </>
    )

}

export default CheckOut;