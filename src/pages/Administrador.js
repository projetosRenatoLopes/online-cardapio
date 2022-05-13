import { integerPropType } from "@mui/utils";
import axios from "axios";
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
                <div  style={{ 'width': '100%', 'display': 'flex','alignItems': 'center', 'justifyContent': 'center'}}>
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
                            <input type='text' className="ad-inp" id="ad-tag" placeholder="Tag para link (Ex: pizzariadoseujoao)" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Link Logo:</p>
                            <input type='text' className="ad-inp" id="ad-logo" placeholder="Link da Logo" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>WhatsApp:</p>
                            <input type='text' className="ad-inp" id="ad-wha" placeholder="WhatsApp (Ex: 5534987654321)" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Taxa de entrega:</p>
                            <input type='text' className="ad-inp" id="ad-tax" placeholder="Taxa de Entrega (Ex: 7.0)" style={{ 'width': '70%' }}></input>
                        </div>
                    </div>
                    <h4>Horário de Funcionamento:</h4>
                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Domingo:</p>
                            <input type='text' className="ad-inp" id="ad-dom" placeholder="Fechado" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Segunda:</p>
                            <input type='text' className="ad-inp" id="ad-seg" placeholder="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Terça:</p>
                            <input type='text' className="ad-inp" id="ad-ter" placeholder="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quarta:</p>
                            <input type='text' className="ad-inp" id="ad-qua" placeholder="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quinta:</p>
                            <input type='text' className="ad-inp" id="ad-qui" placeholder="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sexta:</p>
                            <input type='text' className="ad-inp" id="ad-sex" placeholder="08:00-18:00" style={{ 'width': '70%' }}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sábado:</p>
                            <input type='text' className="ad-inp" id="ad-sab" placeholder="08:00-12:00" style={{ 'width': '70%' }}></input>
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
                            <input type='text' className="ad-inp" id="ad-est" placeholder="UF (Ex: MG)" style={{ 'width': '70%' }} autoComplete="off"></input>
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

    const login = async () => {
        const user = await document.getElementById('ad-user')['value']
        const pass = await document.getElementById('ad-pass')['value']
        const dadosUser = await {
            "user": user,
            "password": pass
        }

        await axios({
            method: 'POST',
            url: 'https://api-cardapio-online.onrender.com/admin/login',
            data: dadosUser,
        }).then(res => {
            if (res.status === 204) {
                document.getElementById('msg')['textContent'] = 'Usuário e/ou senha incorretos'
                document.getElementById('msg').style.color = 'red'
            } else if (res.status === 200) {
                console.log(res)
                if(res.data.token !== undefined && res.data.toke !== undefined){
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userId', res.data.id)
                }
                window.location.href = '/admingpco'
                document.getElementById('msg')['textContent'] = res.data.name
                document.getElementById('msg').style.color = 'green'
            }
        }).catch(error => {
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