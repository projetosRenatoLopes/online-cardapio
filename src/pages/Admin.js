import { RiMenuLine, RiMenuUnfoldFill } from 'react-icons/ri'
import { useState } from "react";
import { CompannyName } from "../components/Companny/index.js";
import api from "../services/api.js";
import LogoPage from '../components/Logo/index.js';
import { Link } from 'react-router-dom';

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
                            <input type='text' className="ad-inp" id="ad-tag" defaultValue={data[0].tag} style={{ 'width': '70%' }}></input>
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
                <button id='btn-cad' className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
                <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'height': '100px', 'backgroundColor': 'black', 'color': 'white' }}></textarea>
            </>
            )
        } else if (screen === 'Produtos') {

            return (<>
                <div className="data-checkout">
                    <div>
                        <p style={{ 'width': '100%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '30px 0 7px 0' }}>Categorias dos produtos:</p>
                        <div style={{ 'width': '100%', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'center' }}>
                            <CategOptions ></CategOptions>
                        </div>
                    </div >
                </div >
                <button id='btn-cad' className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
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
                    <button id='btn-cad' className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
                    <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'height': '100px', 'backgroundColor': 'black', 'color': 'white' }}></textarea>
                </>
            )
        } else {
            return (<>
                <LogoPage />
            </>)
        }
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

    const reqServer = async () => {
        document.getElementById('btn-cad')['disabled'] = true
        
        setTimeout(() => {
            colorMsg('RED', 'ERROR 500 - INTERNAL SERVER ERROR')
        }, 5000);

        document.getElementById('btn-cad')['disabled'] = false
    }

    const colorMsg = (color, msg) => {
        document.getElementById('ad-resposta')['value'] = `${msg}`
        document.getElementById('ad-resposta').style.border = `2px solid ${color}`
    }

    const veriFyChecks = (obj) => {
        let categsServer = [];
        obj.forEach(element => {
            var checkek = document.getElementById(element.desc)
            // @ts-ignore
            if (checkek.checked === true) {
                categsServer.push(checkek['value'])
            }
        });
        return categsServer.join(',')

    }

    const menuOpen = () => {
        const token = sessionStorage.getItem('token')
        if (token !== null) {
            const menu = document.getElementById('menu');
            if (menu.style.display === 'none') {
                document.getElementById('icon-menu').style.display = 'none'
                document.getElementById('icon-menu-open').style.display = 'flex'
                menu.style.display = 'inline'
            } else {
                document.getElementById('icon-menu').style.display = 'flex'
                document.getElementById('icon-menu-open').style.display = 'none'
                menu.style.display = 'none'
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