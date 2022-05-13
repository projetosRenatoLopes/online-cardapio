import { Checkbox } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import api from "../services/api.js";

const Administrador = () => {
    const cadastrarEmpresa = () => {
        const admin = sessionStorage.getItem('token')

        if (admin === null) {
            return (<>
                <div className="data-checkout">
                    <input type='text' id="ad-user" placeholder="Login" style={{ 'width': '100%' }}></input>
                    <input type='password' id="ad-pass" placeholder="Senha" style={{ 'width': '100%' }}></input>
                    <button className="btn btn-success" onClick={login}>Entrar</button>
                </div>
            </>)
        } else if (admin === 'invalid') {
            return (<>Acesso não autorizado</>)
        } else {

            return (<>
                <div style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                    <button className='btn' onClick={logout}>Sair</button>
                </div>
                <div className="data-checkout">
                    <h4>Cadastrar Empresa:</h4>
                    <br></br>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Empresa:</p>
                            <input type='text' className="ad-inp" id="ad-name" placeholder="Nome da empresa" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Tag:</p>
                            <input type='text' className="ad-inp" id="ad-tag" placeholder="Ex: cardapio-online....com/pizzariadoseujoao)" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Link Logo:</p>
                            <input type='text' className="ad-inp" id="ad-logo" placeholder="Link da Logo" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>WhatsApp:</p>
                            <input type='text' className="ad-inp" id="ad-wha" placeholder="Ex: 5534987654321" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Taxa de entrega:</p>
                            <input type='text' className="ad-inp" id="ad-tax" placeholder="Ex: 7.0" style={{ 'width': '70%' }}></input>
                        </div>
                        <p style={{ 'width': '100%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '30px 0 7px 0' }}>Categorias dos produtos:</p>
                        <div style={{ 'width': '100%', 'display': 'flex', 'alignItems':'center','justifyContent':'center' }}>
                            <CategOptions ></CategOptions>
                        </div>

                        <p style={{ 'width': '100%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '30px 0 7px 0' }}>Modos de pagamento aceitos:</p>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <PayModeOptions ></PayModeOptions>
                        </div>
                        
                    </div>
                    <h4>Horário de Funcionamento:</h4>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Domingo:</p>
                            <input type='text' className="ad-inp" id="ad-dom" defaultValue="Fechado" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Segunda:</p>
                            <input type='text' className="ad-inp" id="ad-seg" defaultValue="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Terça:</p>
                            <input type='text' className="ad-inp" id="ad-ter" defaultValue="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quarta:</p>
                            <input type='text' className="ad-inp" id="ad-qua" defaultValue="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quinta:</p>
                            <input type='text' className="ad-inp" id="ad-qui" defaultValue="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sexta:</p>
                            <input type='text' className="ad-inp" id="ad-sex" defaultValue="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sábado:</p>
                            <input type='text' className="ad-inp" id="ad-sab" defaultValue="08:00-12:00" style={{ 'width': '70%' }}></input>
                        </div>
                    </div>

                    <h4>Endereço:</h4>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Rua:</p>
                            <input type='text' className="ad-inp" id="ad-rua" placeholder="Rua" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Número:</p>
                            <input type='text' className="ad-inp" id="ad-num" placeholder="Número" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Casa/Apto:</p>
                            <input type='text' className="ad-inp" id="ad-com" placeholder="Complemento (opcional)" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Bairro:</p>
                            <input type='text' className="ad-inp" id="ad-bai" placeholder="Bairro" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Cidade:</p>
                            <input type='text' className="ad-inp" id="ad-cid" placeholder="Cidade" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Estado:</p>
                            <input type='text' className="ad-inp" id="ad-est" placeholder="UF" style={{ 'width': '70%' }} autoComplete="off"></input>
                        </div>
                    </div>
                    <div style={{ 'width': '100%', 'marginBottom': '0' }}>
                        <p style={{ 'marginLeft': '4px', 'marginBottom': '4px' }}>Senha para acesso ao painel da empresa:</p>
                    </div>
                    <input type='password' className="ad-inp" id="ad-pas" placeholder="Senha" style={{ 'width': '100%' }} autoComplete="off"></input>

                    <button className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Cadastrar empresa</button>
                    <textarea className="ad-inp" id='ad-resposta' placeholder="Resposta do servidor >" disabled style={{ 'height': '100px' }}></textarea>
                </div>
            </>)
        }
    }
    function CategOptions(props) {
        getCategories()
        const categs = JSON.parse(sessionStorage.getItem('categ'))
        // var options = [];
        // categs.forEach(element => {
        // options.push({"desc":element.desc, "id":element.id})
        // });        

        // eslint-disable-next-line no-unused-vars
        const [optionsCateg, setGallery] = useState(categs)

        const renderOptions = (optionsCateg, key) => {
            const label = optionsCateg.desc
            return (
                <div style={{ 'width': '120px','marginBottom':'15px' }}>
                    <input type={'checkbox'} id={optionsCateg.desc} value={optionsCateg.id}></input>
                    <label htmlFor={optionsCateg.desc}>{optionsCateg.desc}</label>
                </div>
            )
        }

        return (
            <div className='checkCateg' style={{ 'width': '100%', 'display': 'flex', 'alignItems':'center','justifyContent':'center', 'flexWrap': 'wrap' }}>

                {optionsCateg.map(renderOptions)}

            </div>
        )
    }

    function PayModeOptions(props) {
        getPayModes()
        const payModes = JSON.parse(sessionStorage.getItem('payModes'))

        // eslint-disable-next-line no-unused-vars
        const [optionsPayModes, setGallery] = useState(payModes)

        const renderOptions = (optionsPayModes, key) => {
            return (
                <div style={{ 'width': '120px','marginBottom':'15px' }}>
                    <input type={'checkbox'} id={optionsPayModes.desc} value={optionsPayModes.id}></input>
                    <label htmlFor={optionsPayModes.desc}>{optionsPayModes.desc}</label>
                </div>
            )
        }

        return (
            <div className='checkPayModes' style={{ 'width': '100%', 'display': 'flex', 'alignItems':'center','justifyContent':'center', 'flexWrap': 'wrap' }}>
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
                alert(`Erro 500 - ${resposta.message}`)
                sessionStorage.removeItem('token')
                window.location.href = '/admingpco'
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
                alert(`Erro 500 - ${resposta.message}`)
                sessionStorage.removeItem('token')
                window.location.href = '/admingpco'
            }
        })
    }

    const login = async () => {
        document.getElementById('msg')['textContent'] = 'Entrando...'
        document.getElementById('msg').style.color = 'blue'
        document.getElementById('msg').style.animation = 'mynewmove 4s 2'
        console.log('Coletando dados digitados')
        const user = await document.getElementById('ad-user')['value']
        const pass = await document.getElementById('ad-pass')['value']
        console.log('Passando dados para objeto')
        const dadosUser = await {
            "user": user,
            "password": pass
        }
        console.log('Entrnado na requisição do login')
        await axios({
            method: 'POST',
            url: 'https://api-cardapio-online.onrender.com/admin/login',
            data: dadosUser,
        }).then(res => {
            console.log('Entrando na resposta')
            if (res.status === 204) {
                console.log('STATUS 204')
                document.getElementById('msg')['textContent'] = 'Usuário e/ou senha incorretos'
                document.getElementById('msg').style.color = 'red'
            } else if (res.status === 200) {
                console.log('STATUS 200')
                console.log(res)
                if (res.data.token !== undefined && res.data.id !== undefined) {
                    console.log('TOKEN E ID RECEBIDOS')
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userId', res.data.id)
                }
                document.getElementById('msg')['textContent'] = res.data.name
                document.getElementById('msg').style.color = 'green'
                window.location.href = '/admingpco'
            } else {
                console.log('STATUS OUTRO')
                document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
                document.getElementById('msg').style.color = 'red'
            }
        }).catch(error => {
            console.log('Obteve Erro')
            document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
            document.getElementById('msg').style.color = 'red'
        })


    }

    const logout = async () => {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
        window.location.href = '/admingpco'
    }

    const reqServer = async () => {
        const nameEmp = document.getElementById('ad-name')['value'],
            tagEmp = document.getElementById('ad-tag')['value'],
            dom = document.getElementById('ad-dom')['value'],
            seg = document.getElementById('ad-seg')['value'],
            ter = document.getElementById('ad-ter')['value'],
            qua = document.getElementById('ad-qua')['value'],
            qui = document.getElementById('ad-qui')['value'],
            sex = document.getElementById('ad-sex')['value'],
            sab = document.getElementById('ad-sab')['value'],
            rua = document.getElementById('ad-rua')['value'],
            num = document.getElementById('ad-num')['value'],
            com = document.getElementById('ad-com')['value'],
            bai = document.getElementById('ad-bai')['value'],
            cid = document.getElementById('ad-cid')['value'],
            est = document.getElementById('ad-est')['value'],
            entrega = document.getElementById('ad-tax')['value'],
            logoEmp = document.getElementById('ad-logo')['value'],
            telEmp = document.getElementById('ad-wha')['value'];

        const dadosEmpresa = {
            name: nameEmp,
            tag: tagEmp,
            funcdom: dom,
            funcseg: seg,
            functer: ter,
            funcqua: qua,
            funcqui: qui,
            funcsex: sex,
            funcsab: sab,
            adrrua: rua,
            adrnum: num,
            adrcom: com,
            adrbai: bai,
            adrcid: cid,
            adrest: est,
            txentrega: entrega,
            logo: logoEmp,
            tel: telEmp
        }

        let verifyProp = true;
        Object.entries(dadosEmpresa).forEach(([key, value]) => {
            if (value === "") {
                verifyProp = false
            }
        });

        if (verifyProp === true) {
            colorMsg('black', 'Resposta do servidor >')
            if ((!isNaN(parseFloat(telEmp)) && isFinite(telEmp)) === true && telEmp.length === 13) {
                const regex = /\W|_/;
                if (regex.test(tagEmp) === false) {
                    if (!isNaN(parseFloat(entrega)) && isFinite(entrega)) {
                        const token = sessionStorage.getItem('token')
                        if (token !== undefined) {


                            var resposta;
                            await axios({
                                method: 'POST',
                                url: 'https://api-cardapio-online.onrender.com/cadastro/empresa',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: token
                                },
                                data: dadosEmpresa
                            })
                                .then(resp => {
                                    resposta = resp.data;
                                    colorMsg('Blue', resposta)
                                }).catch(error => {
                                    resposta = error.toJSON();
                                    if (resposta.status === 404) {
                                        colorMsg('RED', 'Erro 404 - Requisição invalida')
                                    } else {
                                        colorMsg('RED', `Erro ${resposta.status} - ${resposta.message}`)
                                    }
                                })
                        } else {
                            alert('Usuário não autenticado.')
                            window.location.href = '/admingpco'
                        }
                    } else { colorMsg('RED', 'Taxa de entrega deve conter somente números separado por ponto (.) - Ex: (R% 7,50) deve se escrever (7.50)') }
                } else { colorMsg('RED', 'Tag deve conter somente letras') }
            } else { colorMsg('RED', 'WhatsApp deve conter 13 digitos e somente números') }
        } else { colorMsg('RED', 'Preencha todos os campos...') }


    }

    const colorMsg = (color, msg) => {
        document.getElementById('ad-resposta')['value'] = `${msg}`
        document.getElementById('ad-resposta').style.border = `2px solid ${color}`
    }

    return (
        <>
            <div className='title-page'>
                <p>Cardapio Online - Admin</p>
            </div>

            <div className='logo-page'>
                <h3>Área Administrativa</h3>
            </div>
            <h5 id='msg' style={{ 'width': 'auto', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}> </h5>
            {cadastrarEmpresa()}

        </>
    )
}

export default Administrador;