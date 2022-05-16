import { RiMenuLine, RiMenuUnfoldFill } from 'react-icons/ri'
import { useState } from "react";
import { CompannyName } from "../components/Companny/index.js";
import api from "../services/api.js";
import LogoPage from '../components/Logo/index.js';

const Admin = () => {

    const Page = () => {
        const admin = sessionStorage.getItem('token')
        const screen = sessionStorage.getItem('screen')
        if (admin === null) {
            return (<>
                <h5 id='msg' style={{ 'width': 'auto', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}> </h5>
                <div className="data-checkout">
                    <input type='text' id="ad-user" placeholder="Login" style={{ 'width': '100%' }}></input>
                    <input type='password' id="ad-pass" placeholder="Senha" style={{ 'width': '100%' }}></input>
                    <button className="btn btn-success" onClick={login}>Entrar</button>
                </div>
            </>)
        } else if (screen === 'Informacoes') {
            const data = JSON.parse(sessionStorage.getItem('info'))
            return (<>
                <div className="data-checkout">
                    <h4>Informações:</h4>
                    <br></br>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Empresa:</p>
                            <input type='text' className="ad-inp" id="ad-name" defaultValue={data[0].name} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Tag:</p>
                            <input type='text' className="ad-inp" id="ad-tag" defaultValue={data[0].tag} style={{ 'width': '70%' }} disabled></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Link Logo:</p>
                            <input type='text' className="ad-inp" id="ad-logo" defaultValue={data[0].logo} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>WhatsApp:</p>
                            <input type='text' className="ad-inp" id="ad-wha" defaultValue={data[0].tel} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Taxa de entrega:</p>
                            <input type='text' className="ad-inp" id="ad-tax" defaultValue={data[0].txentrega} style={{ 'width': '70%' }}></input>
                        </div>
                    </div>
                </div>

                <p style={{ 'width': '100%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '30px 0 7px 0' }}>Modos de pagamento aceitos:</p>
                <div style={{ 'width': '100%', 'display': 'flex' }}>
                    <PayModeOptions ></PayModeOptions>
                </div>
                <div>
                    <p style={{ 'width': '100%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '30px 0 7px 0' }}>Categorias dos produtos:</p>
                    <div style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                        <CategOptions ></CategOptions>
                    </div>
                </div >

                <h4>Endereço:</h4>
                <div style={{ 'width': '100%' }}>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Rua:</p>
                        <input type='text' className="ad-inp" id="ad-rua" defaultValue={data[0].adrrua} style={{ 'width': '70%' }}></input>
                    </div>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Número:</p>
                        <input type='text' className="ad-inp" id="ad-num" defaultValue={data[0].adrnum} style={{ 'width': '70%' }}></input>
                    </div>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Casa/Apto:</p>
                        <input type='text' className="ad-inp" id="ad-com" defaultValue={data[0].adrcom} style={{ 'width': '70%' }}></input>
                    </div>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Bairro:</p>
                        <input type='text' className="ad-inp" id="ad-bai" defaultValue={data[0].adrbai} style={{ 'width': '70%' }}></input>
                    </div>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Cidade:</p>
                        <input type='text' className="ad-inp" id="ad-cid" defaultValue={data[0].adrcid} style={{ 'width': '70%' }}></input>
                    </div>
                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                        <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Estado:</p>
                        <input type='text' className="ad-inp" id="ad-est" defaultValue={data[0].adrest} style={{ 'width': '70%' }} autoComplete="off"></input>
                    </div>
                </div>
                <button id='btn-cad' className="btn btn-success" onClick={updateInfo} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
                <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'height': '100px', 'backgroundColor': 'black', 'color': 'white' }}></textarea>
            </>
            )
        } else if (screen === 'Produtos') {

            return (<>
                <div className="data-checkout">
                    <h4>Adicionar produto:</h4>
                    <br></br>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Nome:</p>
                            <input type='text' className="ad-inp" id="ad-name" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Descição:</p>
                            <input type='text' className="ad-inp" id="ad-desc" style={{ 'width': '70%' }} ></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Link da imagem:</p>
                            <input type='text' className="ad-inp" id="ad-img" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Preço:</p>
                            <input type='number' className="ad-inp" id="ad-price" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Categoria:</p>
                            <CategSelect ></CategSelect>
                        </div>
                    </div>
                </div>

                <button id='btn-cad' className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Produto</button>
                <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'height': '100px', 'backgroundColor': 'black', 'color': 'white' }}></textarea>
            </>
            )
        } else if (screen === 'Horario') {
            const data = JSON.parse(sessionStorage.getItem('info'))
            return (
                <>
                    <h4>Horário de Funcionamento:</h4>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Domingo:</p>
                            <input type='text' className="ad-inp" id="ad-dom" defaultValue={data[0].funcdom} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Segunda:</p>
                            <input type='text' className="ad-inp" id="ad-seg" defaultValue={data[0].funcseg} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Terça:</p>
                            <input type='text' className="ad-inp" id="ad-ter" defaultValue={data[0].functer} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quarta:</p>
                            <input type='text' className="ad-inp" id="ad-qua" defaultValue={data[0].funcqua} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quinta:</p>
                            <input type='text' className="ad-inp" id="ad-qui" defaultValue={data[0].funcqui} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sexta:</p>
                            <input type='text' className="ad-inp" id="ad-sex" defaultValue={data[0].funcsex} style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sábado:</p>
                            <input type='text' className="ad-inp" id="ad-sab" defaultValue={data[0].funcsab} style={{ 'width': '70%' }}></input>
                        </div>
                    </div>
                    <button id='btn-cad' className="btn btn-success" onClick={updateHours} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
                    <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'height': '100px', 'backgroundColor': 'black', 'color': 'white' }}></textarea>
                </>
            )
        } else {
            return (<>
                <LogoPage />
            </>)
        }
    }

    function reqServer() {
        const nameProd = document.getElementById('ad-name')['value'],
            descPro = document.getElementById('ad-desc')['value'],
            imgPro = document.getElementById('ad-img')['value'],
            pricePro = document.getElementById('ad-price')['value'],
            categPro = document.getElementById('sel-categ')['value'];
            if(nameProd !== ''){
                if(descPro !== ''){
                    if(imgPro !== ''){
                        if(pricePro !== ''){
                            const regex = /\d|_/;
                            if (regex.test(pricePro) === true) {
                                colorMsg('GREEN', `${nameProd} ${descPro} ${imgPro} ${pricePro} ${categPro}`)
                
                        } else {colorMsg('RED', 'Preencha corretamente o campo Preço.')}
                        } else {colorMsg('RED', 'Preencha o campo Preço.')}
                    } else {colorMsg('RED', 'Preencha o campo Link da Imagem.')}
                } else {colorMsg('RED', 'Preencha o campo Descrição.')}
            } else {colorMsg('RED', 'Preencha o campo nome.')}

    }

    function CategSelect() {

        // eslint-disable-next-line no-unused-vars
        var categsSel = [];
        const data = JSON.parse(sessionStorage.getItem('info'))
        const descCategs = JSON.parse(sessionStorage.getItem('categDesc'))
        const categ = data[0].categs.split(',')
        categ.forEach(categItem => {
            descCategs.forEach(categPay => {
                console.log(categPay.id + " " + categItem)
                if (categItem === categPay.id) {
                    categsSel.push(categPay)
                }
            });
        });

        const [optionsCateg, setOptionsCateg] = useState(categsSel)


        const renderOptions = (optionsCateg, key) => {

            return (
                <option key={optionsCateg.desc} value={optionsCateg.desc}>{optionsCateg.desc}</option>
            )
        }

        return (
            <select className="ad-inp" id='sel-categ' style={{ 'width': '73%', 'height': '36px', 'fontSize': '15px' }}>
                {optionsCateg.map(renderOptions)}
            </select>
        )
    }

    function CategOptions() {

        const categs = JSON.parse(sessionStorage.getItem('categ'))
        // eslint-disable-next-line no-unused-vars
        const [optionsCateg, setOptionsCateg] = useState(categs)


        const renderOptions = (optionsCateg, key) => {
            var isCheked = false;
            const data = JSON.parse(sessionStorage.getItem('info'))
            const categ = data[0].categs.split(',')
            categ.forEach(categItem => {
                if (optionsCateg.id === categItem) {
                    isCheked = true
                }
            });
            return (
                <div key={optionsCateg.desc} style={{ 'width': '120px', 'marginBottom': '15px' }}>
                    <input type={'checkbox'} id={optionsCateg.desc} value={optionsCateg.id} defaultChecked={isCheked}></input>
                    <label htmlFor={optionsCateg.desc}>{optionsCateg.desc}</label>
                </div>
            )
        }

        return (
            <div className='checkCateg' style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexWrap': 'wrap' }}>
                {optionsCateg.map(renderOptions)}
            </div>
        )
    }

    function PayModeOptions() {

        const payModes = JSON.parse(sessionStorage.getItem('payModes'))
        // eslint-disable-next-line no-unused-vars
        const [optionsPayModes, setOptionsPayModes] = useState(payModes)

        const renderOptions = (optionsPayModes, key) => {
            var isCheked = false;
            const data = JSON.parse(sessionStorage.getItem('info'))
            const payMode = data[0].paymodes.split(',')
            payMode.forEach(payItem => {
                if (optionsPayModes.id === payItem) {
                    isCheked = true
                }
            });
            return (
                <div key={optionsPayModes.desc} style={{ 'width': '120px', 'marginBottom': '15px' }}>
                    <input type={'checkbox'} id={optionsPayModes.desc} value={optionsPayModes.id} defaultChecked={isCheked}></input>
                    <label htmlFor={optionsPayModes.desc}>{optionsPayModes.desc}</label>
                </div>
            )
        }

        return (
            <div className='checkPayModes' style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center', 'flexWrap': 'wrap' }}>
                {optionsPayModes.map(renderOptions)}
            </div>
        )
    }

    const getCategories = async () => {
        const token = sessionStorage.getItem('token')
        var resposta;
        await api({
            method: 'GET',
            url: '/opcoes/categorias',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(resp => {
            resposta = resp.data;
            sessionStorage.setItem('categ', JSON.stringify(resposta))
        }).catch(error => {
            resposta = error.toJSON();
            if (resposta.status === 404) {
                colorMsg('red', 'Erro 404 - Requisição invalida')
            } else if (resposta.status === 500) {
                colorMsg('red', `Erro 500 - ${resposta.message}`)
                sessionStorage.removeItem('token')
                const company = sessionStorage.getItem('tag')
                window.location.href = `${company}/admin`
            }
        })
    }

    const getPayModes = async () => {
        const token = sessionStorage.getItem('token')
        var resposta;
        await api({
            method: 'GET',
            url: '/opcoes/modospagamento',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            }
        }).then(resp => {
            resposta = resp.data;
            sessionStorage.setItem('payModes', JSON.stringify(resposta))

        }).catch(error => {
            resposta = error.toJSON();
            if (resposta.status === 404) {
                colorMsg('red', 'Erro 404 - Requisição invalida')
            } else if (resposta.status === 500) {
                colorMsg('RED', `Erro 500 - ${resposta.message}`)
                sessionStorage.removeItem('token')
                const company = sessionStorage.getItem('tag')
                window.location.href = `${company}/admin`
            }
        })

    }

    const login = async () => {
        document.getElementById('msg')['textContent'] = 'Entrando...'
        document.getElementById('msg').style.color = 'blue'

        const user = await document.getElementById('ad-user')['value']
        const pass = await document.getElementById('ad-pass')['value']

        const dadosUser = await {
            "user": user,
            "password": pass
        }

        await api({
            method: 'POST',
            url: '/admin/login',
            data: dadosUser,
        }).then(async res => {
            if (res.status === 204) {
                document.getElementById('msg')['textContent'] = 'Usuário e/ou senha incorretos'
                document.getElementById('msg').style.color = 'red'
            } else if (res.status === 200) {
                console.log(res)
                if (res.data.token !== undefined && res.data.id !== undefined) {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userId', res.data.id)
                }
                document.getElementById('msg')['textContent'] = res.data.name
                document.getElementById('msg').style.color = 'green'
                await getCategories()
                await getPayModes()
                const company = sessionStorage.getItem('tag')
                window.location.href = `${company}/admin`
            } else {
                document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
                document.getElementById('msg').style.color = 'red'
            }
        }).catch(error => {
            document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
            document.getElementById('msg').style.color = 'red'
        })


    }

    const logout = () => {
        const company = sessionStorage.getItem('tag')
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('screen')
        window.location.href = `${company}/admin`
    }

    const colorMsg = (color, msg) => {
        document.getElementById('ad-resposta')['value'] = `${msg}`
        document.getElementById('ad-resposta').style.border = `4px solid ${color}`
    }

    function veriFyChecks(obj) {
        let categsServer = [];
        obj.forEach(element => {
            var checkek = document.getElementById(element.desc);
            // @ts-ignore
            if (checkek.checked === true) {
                categsServer.push(checkek['value']);
            }
        });
        return categsServer.join(',');

    }

    function menuOpen() {
        const token = sessionStorage.getItem('token');
        if (token !== null) {
            const menu = document.getElementById('menu');
            if (menu.style.display === 'none') {
                document.getElementById('icon-menu').style.display = 'none';
                document.getElementById('icon-menu-open').style.display = 'flex';
                menu.style.display = 'inline';
            } else {
                document.getElementById('icon-menu').style.display = 'flex';
                document.getElementById('icon-menu-open').style.display = 'none';
                menu.style.display = 'none';
            }
        }
    }

    const pageProduct = () => {
        sessionStorage.setItem('screen', 'Produtos')
        const company = sessionStorage.getItem('tag')
        window.location.href = `${company}/admin`
    }

    const pageInfo = () => {
        sessionStorage.setItem('screen', 'Informacoes')
        const company = sessionStorage.getItem('tag')
        window.location.href = `${company}/admin`
    }

    const pageHora = () => {
        sessionStorage.setItem('screen', 'Horario')
        const company = sessionStorage.getItem('tag')
        window.location.href = `${company}/admin`
    }


    const updateHours = async () => {
        document.getElementById('btn-cad')['disabled'] = true
        const dom = document.getElementById('ad-dom')['value'],
            seg = document.getElementById('ad-seg')['value'],
            ter = document.getElementById('ad-ter')['value'],
            qua = document.getElementById('ad-qua')['value'],
            qui = document.getElementById('ad-qui')['value'],
            sex = document.getElementById('ad-sex')['value'],
            sab = document.getElementById('ad-sab')['value'];

        const data = JSON.parse(sessionStorage.getItem('info'))
        const dadosEmpresa = {
            "empadrbai": data[0].adrbai,
            "empadrcid": data[0].adrcid,
            "empadrcom": data[0].adrcom,
            "empadrest": data[0].adrest,
            "empadrnum": data[0].adrnum,
            "empadrrua": data[0].adrrua,
            "empcategs": data[0].categs,
            "empfuncdom": dom,
            "empfuncqua": qua,
            "empfuncqui": qui,
            "empfuncsab": sab,
            "empfuncseg": seg,
            "empfuncsex": sex,
            "empfuncter": ter,
            "emplogo": data[0].logo,
            "empname": data[0].name,
            "emppaymodes": data[0].paymodes,
            "emptag": data[0].tag,
            "emptel": data[0].tel,
            "emptxentrega": data[0].txentrega
        }

        let verifyProp = true;
        Object.entries(dadosEmpresa).forEach(([key, value]) => {
            if (value === "") {
                verifyProp = false
            }
        });
        if (verifyProp === true) {
            colorMsg('blue', 'Aguardando resposta do servidor >')
            if ((!isNaN(parseFloat(data[0].tel)) && isFinite(data[0].tel)) === true && data[0].tel.length === 13) {
                const regex = /\W|_/;
                if (regex.test(data[0].tag) === false) {
                    if (!isNaN(parseFloat(data[0].txentrega)) && isFinite(data[0].txentrega)) {
                        const token = sessionStorage.getItem('token')
                        if (token !== undefined) {
                            if (data[0].categs !== "") {
                                if (data[0].paymodes !== "") {

                                    var resposta;
                                    await api({
                                        method: 'PUT',
                                        url: `/empresa/${data[0].tag}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: token
                                        },
                                        data: dadosEmpresa
                                    })
                                        .then(resp => {
                                            resposta = resp.data;
                                            colorMsg('GREEN', resposta.message)

                                            api.get(`/empresa/${data[0].tag}`).then(res => {
                                                if (res.data.company[0].tag === undefined) {
                                                    sessionStorage.removeItem('info')
                                                } else {
                                                    sessionStorage.setItem('info', JSON.stringify(res.data.company))
                                                }
                                            }).catch(error => {
                                                colorMsg('yellow', 'Dados atualizados! Porém houve um erro ao recuperar as informações do servidor. Feche a página e entre novamente para obter os dados atualizados.')
                                            })


                                        }).catch(error => {
                                            resposta = error.toJSON();
                                            if (resposta.status === 404) {
                                                colorMsg('RED', 'Erro 404 - Requisição invalida')
                                            } else {
                                                colorMsg('RED', `Erro ${resposta.status} - ${resposta.message}`)
                                            }
                                        })

                                } else { colorMsg('red', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                            } else { colorMsg('red', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                        } else {
                            alert('Usuário não autenticado.')
                            window.location.href = '/admingpco'
                        }
                    } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
            } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
        } else { colorMsg('RED', 'Preencha todos os campos...') }


        document.getElementById('btn-cad')['disabled'] = false
    }

    const updateInfo = async () => {
        document.getElementById('btn-cad')['disabled'] = true
        const nameEmp = document.getElementById('ad-name')['value'],
            tagEmp = document.getElementById('ad-tag')['value'],
            rua = document.getElementById('ad-rua')['value'],
            num = document.getElementById('ad-num')['value'],
            com = document.getElementById('ad-com')['value'],
            bai = document.getElementById('ad-bai')['value'],
            cid = document.getElementById('ad-cid')['value'],
            est = document.getElementById('ad-est')['value'],
            entrega = document.getElementById('ad-tax')['value'],
            logoEmp = document.getElementById('ad-logo')['value'],
            telEmp = document.getElementById('ad-wha')['value'];

        const arrCateg = JSON.parse(sessionStorage.getItem('categ'));
        const arrCategs = veriFyChecks(arrCateg)
        const arrPayMode = JSON.parse(sessionStorage.getItem('payModes'))
        const arrPayModes = veriFyChecks(arrPayMode)

        const data = JSON.parse(sessionStorage.getItem('info'))
        const dadosEmpresa = {
            "empadrbai": bai,
            "empadrcid": cid,
            "empadrcom": com,
            "empadrest": est,
            "empadrnum": num,
            "empadrrua": rua,
            "empcategs": arrCategs,
            "empfuncdom": data[0].funcdom,
            "empfuncqua": data[0].funcqua,
            "empfuncqui": data[0].funcqui,
            "empfuncsab": data[0].funcsab,
            "empfuncseg": data[0].funcseg,
            "empfuncsex": data[0].funcsex,
            "empfuncter": data[0].functer,
            "emplogo": logoEmp,
            "empname": nameEmp,
            "emppaymodes": arrPayModes,
            "emptag": tagEmp,
            "emptel": telEmp,
            "emptxentrega": entrega
        }

        let verifyProp = true;
        Object.entries(dadosEmpresa).forEach(([key, value]) => {
            if (value === "") {
                verifyProp = false
            }
        });
        if (verifyProp === true) {
            colorMsg('blue', 'Aguardando resposta do servidor >')
            if ((!isNaN(parseFloat(data[0].tel)) && isFinite(data[0].tel)) === true && data[0].tel.length === 13) {
                const regex = /\W|_/;
                if (regex.test(data[0].tag) === false) {
                    if (!isNaN(parseFloat(data[0].txentrega)) && isFinite(data[0].txentrega)) {
                        const token = sessionStorage.getItem('token')
                        if (token !== undefined) {
                            if (data[0].categs !== "") {
                                if (data[0].paymodes !== "") {

                                    var resposta;
                                    await api({
                                        method: 'PUT',
                                        url: `/empresa/${data[0].tag}`,
                                        headers: {
                                            'Content-Type': 'application/json',
                                            Authorization: token
                                        },
                                        data: dadosEmpresa
                                    })
                                        .then(resp => {
                                            resposta = resp.data;
                                            colorMsg('GREEN', resposta.message)

                                            api.get(`/empresa/${data[0].tag}`).then(res => {
                                                if (res.data.company[0].tag === undefined) {
                                                    sessionStorage.removeItem('info')
                                                } else {
                                                    sessionStorage.setItem('info', JSON.stringify(res.data.company))
                                                }
                                            }).catch(error => {
                                                colorMsg('yellow', 'Dados atualizados! Porém houve um erro ao recuperar as informações do servidor. Feche a página e entre novamente para obter os dados atualizados.')
                                            })


                                        }).catch(error => {
                                            resposta = error.toJSON();
                                            if (resposta.status === 404) {
                                                colorMsg('RED', 'Erro 404 - Requisição invalida')
                                            } else {
                                                colorMsg('RED', `Erro ${resposta.status} - ${resposta.message}`)
                                            }
                                        })

                                } else { colorMsg('red', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                            } else { colorMsg('red', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                        } else {
                            alert('Usuário não autenticado.')
                            window.location.href = '/admingpco'
                        }
                    } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
            } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
        } else { colorMsg('RED', 'Preencha todos os campos...') }


        document.getElementById('btn-cad')['disabled'] = false
    }
    return (
        <>
            <div id='menu' className='menu' style={{ 'display': 'none' }}>
                <div className='itens-menu'>
                    <div onClick={pageInfo}>Informações</div>
                    <div onClick={pageProduct}>Produtos</div>
                    <div onClick={pageHora}>Horário</div>
                    <div onClick={logout}>Sair</div>
                </div>
            </div>
            <div className='title-page'>
                <div>
                    {CompannyName}
                </div>
                <div id='icon-menu' style={{ 'display': 'flex' }}>
                    <RiMenuLine onClick={menuOpen} />
                </div>
                <div id='icon-menu-open' style={{ 'display': 'none' }}>
                    <RiMenuUnfoldFill onClick={menuOpen} />
                </div>
            </div>
            <div className='logo-page'>
                <h3>Área Administrativa</h3>
            </div>

            <Page />
        </>
    )

}

export default Admin;