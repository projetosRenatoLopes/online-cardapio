import { RiMenuLine, RiMenuUnfoldFill } from 'react-icons/ri'
import { useState } from "react";
import { CompannyName } from "../components/Companny/index.js";
import api from "../services/api.js";
import LogoPage from '../components/Logo/index.js';
import { useLocation } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Admin = () => {
    const company = useLocation()
    const companyTag = company.pathname.split('/')[2]
    sessionStorage.setItem('tag', companyTag)

    const Page = () => {
        const info = JSON.parse(sessionStorage.getItem('info'))

        //LOAD ATÉ CARREGAR OS DADOS
        if (info === null) {


            setTimeout(async () => {
                //categorias 
                await api.get(`/opcoes/categorias`).then(res => {
                    if (res.data === undefined) {
                        sessionStorage.removeItem('categDesc')
                    } else {
                        sessionStorage.setItem('categDesc', JSON.stringify(res.data))
                    }
                }).catch(error => {
                    window.location.href = '/erro'
                })

                //modos de pagamento
                await api.get(`/opcoes/modospagamento`).then(res => {
                    if (res.data === undefined) {
                        sessionStorage.removeItem('payModes')
                    } else {
                        sessionStorage.setItem('payModes', JSON.stringify(res.data))
                    }
                }).catch(error => {
                    window.location.href = '/erro'
                })

                //dados empresa
                await api.get(`/empresa/${companyTag}`).then(res => {
                    if (res.data.company[0].tag === undefined) {
                        sessionStorage.removeItem('tag')
                        window.location.href = `${companyTag}/notfound`
                    } else {
                        sessionStorage.setItem('info', JSON.stringify(res.data.company))
                    }
                }).catch(error => {
                    window.location.href = '/erro'
                })

                //produtos da empresa
                await api.get(`/produtos/${companyTag}`).then(res => {
                    if (res.data[0].length === 0) {
                        sessionStorage.setItem('listProduct', JSON.stringify([]))
                    } else {
                        var list = res.data[0].products;
                        sessionStorage.setItem('listProduct', JSON.stringify(list))
                        sessionStorage.setItem('viewProducts', JSON.stringify(list))
                    }

                    window.location.href = `/admin/${companyTag}`
                }).catch(error => {
                    window.location.href = '/erro'
                })

            }, 5000);

            return (
                <>
                    <div className='logo-page'>
                        <img src='https://acegif.com/wp-content/uploads/loading-23.gif' className="img-logo-page" alt="img-logo" style={{ 'maxWidth': '20rem', 'minWidth': '16rem' }}></img>
                    </div>
                </>
            )
        }


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
                <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'width': '97%', 'height': '100px', 'backgroundColor': 'white', 'color': 'black', 'resize': 'none' }}></textarea>
            </>
            )
        } else if (screen === 'Produtos') {
            return (<>
                <div className="data-checkout">
                    <div style={{ 'width': '100%' }}>
                        <h4>Produtos:</h4>
                    </div>

                    <nav className="accordion arrows" style={{ 'marginBottom': '15px', 'width': '100%' }}>
                        <input type="radio" name="accordion" id="cb1" />
                        <section className="box">
                            <label className="box-title" id='title-cb1' htmlFor="cb1">Adicionar produto</label>
                            <label className="box-close" htmlFor="acc-close"></label>
                            <div className="box-content">
                                <div style={{ 'width': '100%' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Nome:</p>
                                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                                        <textarea className="ad-inp" id="ad-name" style={{ 'width': '100%', 'resize': 'none', 'padding': '8px 0 0 5px' }}></textarea>
                                    </div>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Descrição:</p>
                                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                                        <textarea className="ad-inp" id="ad-desc" style={{ 'width': '100%', 'resize': 'none', 'padding': '8px 0 0 5px' }} ></textarea>
                                    </div>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Link imagem:</p>
                                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                                        <textarea className="ad-inp" id="ad-img" style={{ 'width': '100%', 'resize': 'none', 'padding': '8px 0 0 5px' }}></textarea>
                                    </div>
                                    <p style={{ 'margin': '0 0 1px 0' }} >Preço:</p>
                                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                                        <textarea className="ad-inp" id="ad-price" style={{ 'width': '100%', 'resize': 'none', 'padding': '8px 0 0 5px' }}></textarea>
                                    </div>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Categoria:</p>
                                    <div style={{ 'width': '100%', 'display': 'flex' }}>
                                        <CategSelect idSel='sel-categ'></CategSelect>
                                    </div>
                                    <br></br>
                                </div>
                                <button id='btn-cad' className="btn  btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Registrar Produto</button>
                                <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'width': '97%', 'height': '100px', 'backgroundColor': 'white', 'color': 'black', 'resize': 'none' }}></textarea>
                            </div>
                        </section>
                        <input type="radio" name="accordion" id="acc-close" />
                    </nav>

                    <br></br>
                    <div id='pesq' style={{ 'width': '100%', 'display': 'flex' }}>
                        <ListProducts ></ListProducts>
                    </div>
                </div >
            </>
            )
        } else if (screen === 'Horario') {
            const data = JSON.parse(sessionStorage.getItem('info'))
            var domRadOp = true, domRadCl = false, segRadOp = true, segRadCl = false, terRadOp = true, terRadCl = false, quaRadOp = true, quaRadCl = false, quiRadOp = true, quiRadCl = false, sexRadOp = true, sexRadCl = false, sabRadOp = true, sabRadCl = false;
            if (data[0].funcdom.slice(0, 5) === 'Fecha') { domRadOp = false; domRadCl = true; }
            if (data[0].funcseg.slice(0, 5) === 'Fecha') { segRadOp = false; segRadCl = true; }
            if (data[0].functer.slice(0, 5) === 'Fecha') { terRadOp = false; terRadCl = true; }
            if (data[0].funcqua.slice(0, 5) === 'Fecha') { quaRadOp = false; quaRadCl = true; }
            if (data[0].funcqui.slice(0, 5) === 'Fecha') { quiRadOp = false; quiRadCl = true; }
            if (data[0].funcsex.slice(0, 5) === 'Fecha') { sexRadOp = false; sexRadCl = true; }
            if (data[0].funcsab.slice(0, 5) === 'Fecha') { sabRadOp = false; sabRadCl = true; }

            function verifyRadioCheck(day) {
                const elementOp = document.getElementById(`rd-${day}-closed`)['checked']
                if (elementOp === false) {
                    document.getElementById(`ad-${day}-open`)['disabled'] = false
                    document.getElementById(`ad-${day}-closed`)['disabled'] = false
                } else {
                    document.getElementById(`ad-${day}-open`)['disabled'] = true
                    document.getElementById(`ad-${day}-closed`)['disabled'] = true
                }
            }
            return (
                <>
                    <h4>Horário de Funcionamento:</h4>

                    <div style={{ 'width': '100%' }}>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Domingo:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-dom-closed' name='chk-dom' value='closed' defaultChecked={domRadCl} onChange={() => verifyRadioCheck('dom')}></input>
                                <label htmlFor='rd-dom-closed'>Fechado</label>
                                <input type='radio' id='rd-dom-open' name='chk-dom' value='open' defaultChecked={domRadOp} onChange={() => verifyRadioCheck('dom')}></input>
                                <label htmlFor='rd-dom-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-dom-open" defaultValue={data[0].funcdom.slice(0, 5)} style={{ 'width': '17%' }} disabled={domRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-dom-closed" defaultValue={data[0].funcdom.slice(6, 11)} style={{ 'width': '17%' }} disabled={domRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Segunda:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-seg-closed' name='chk-seg' value='closed' defaultChecked={segRadCl} onChange={() => verifyRadioCheck('seg')}></input>
                                <label htmlFor='rd-seg-closed'>Fechado</label>
                                <input type='radio' id='rd-seg-open' name='chk-seg' value='open' defaultChecked={segRadOp} onChange={() => verifyRadioCheck('seg')}></input>
                                <label htmlFor='rd-seg-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-seg-open" defaultValue={data[0].funcseg.slice(0, 5)} style={{ 'width': '17%' }} disabled={segRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-seg-closed" defaultValue={data[0].funcseg.slice(6, 11)} style={{ 'width': '17%' }} disabled={segRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Terça:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-ter-closed' name='chk-ter' value='closed' defaultChecked={terRadCl} onChange={() => verifyRadioCheck('ter')}></input>
                                <label htmlFor='rd-ter-closed'>Fechado</label>
                                <input type='radio' id='rd-ter-open' name='chk-ter' value='open' defaultChecked={terRadOp} onChange={() => verifyRadioCheck('ter')}></input>
                                <label htmlFor='rd-ter-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-ter-open" defaultValue={data[0].functer.slice(0, 5)} style={{ 'width': '17%' }} disabled={terRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-ter-closed" defaultValue={data[0].functer.slice(6, 11)} style={{ 'width': '17%' }} disabled={terRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quarta:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-qua-closed' name='chk-qua' value='closed' defaultChecked={quaRadCl} onChange={() => verifyRadioCheck('qua')} ></input>
                                <label htmlFor='rd-qua-closed'>Fechado</label>
                                <input type='radio' id='rd-qua-open' name='chk-qua' value='open' defaultChecked={quaRadOp} onChange={() => verifyRadioCheck('qua')}></input>
                                <label htmlFor='rd-qua-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-qua-open" defaultValue={data[0].funcqua.slice(0, 5)} style={{ 'width': '17%' }} disabled={quaRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-qua-closed" defaultValue={data[0].funcqua.slice(6, 11)} style={{ 'width': '17%' }} disabled={quaRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Quinta:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-qui-closed' name='chk-qui' value='closed' defaultChecked={quiRadCl} onChange={() => verifyRadioCheck('qui')}></input>
                                <label htmlFor='rd-qui-closed'>Fechado</label>
                                <input type='radio' id='rd-qui-open' name='chk-qui' value='open' defaultChecked={quiRadOp} onChange={() => verifyRadioCheck('qui')}></input>
                                <label htmlFor='rd-qui-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-qui-open" defaultValue={data[0].funcqui.slice(0, 5)} style={{ 'width': '17%' }} disabled={quiRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-qui-closed" defaultValue={data[0].funcqui.slice(6, 11)} style={{ 'width': '17%' }} disabled={quiRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sexta:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-sex-closed' name='chk-sex' value='closed' defaultChecked={sexRadCl} onChange={() => verifyRadioCheck('sex')}></input>
                                <label htmlFor='rd-sex-closed'>Fechado</label>
                                <input type='radio' id='rd-sex-open' name='chk-sex' value='open' defaultChecked={sexRadOp} onChange={() => verifyRadioCheck('sex')}></input>
                                <label htmlFor='rd-sex-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-sex-open" defaultValue={data[0].funcsex.slice(0, 5)} style={{ 'width': '17%' }} disabled={sexRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-sex-closed" defaultValue={data[0].funcsex.slice(6, 11)} style={{ 'width': '17%' }} disabled={sexRadCl}></input>
                        </div>
                        <div style={{ 'width': '100%', 'display': 'flex' }}>
                            <p style={{ 'width': '20%', 'alignItems': 'center', 'justifyContent': 'center', 'display': 'flex', 'margin': '0 0 7px 0' }}>Sábado:</p>
                            <div style={{ 'display': 'flex', 'alignItems': 'center', 'marginRight': '3px', 'marginBottom': '7px' }}>
                                <input type='radio' id='rd-sab-closed' name='chk-sab' value='closed' defaultChecked={sabRadCl} onChange={() => verifyRadioCheck('sab')}></input>
                                <label htmlFor='rd-sab-closed'>Fechado</label>
                                <input type='radio' id='rd-sab-open' name='chk-sab' value='open' defaultChecked={sabRadOp} onChange={() => verifyRadioCheck('sab')}></input>
                                <label htmlFor='rd-sab-open'>Definir: </label>
                            </div>
                            <input type='time' className="ad-inp" id="ad-sab-open" defaultValue={data[0].funcsab.slice(0, 5)} style={{ 'width': '17%' }} disabled={sabRadCl}></input>
                            <input type='time' className="ad-inp" id="ad-sab-closed" defaultValue={data[0].funcsab.slice(6, 11)} style={{ 'width': '17%' }} disabled={sabRadCl}></input>
                        </div>
                    </div>
                    <button id='btn-cad' className="btn btn-success" onClick={updateHours} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar Dados</button>
                    <textarea className="ad-inp" id='ad-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'width': '97%', 'height': '100px', 'backgroundColor': 'white', 'color': 'black', 'resize': 'none' }}></textarea>
                </>
            )
        } else {
            return (<>
                <LogoPage />
            </>)
        }
    }


    function ListProducts() {

        // eslint-disable-next-line no-unused-vars
        var list = [];
        const products = JSON.parse(sessionStorage.getItem('viewProducts'))

        const [product, setProduct] = useState(products)

        async function pesquisarProd() {
            const pesq = document.getElementById('prod-pesq')['value']
            const listProd = JSON.parse(sessionStorage.getItem('listProduct'))
            var newList = [];
            listProd.forEach(element => {
                if (element.nomeprod.toLowerCase().includes(pesq.toLowerCase())) {
                    newList.push(element)
                }
            });
            sessionStorage.setItem('viewProducts', JSON.stringify(newList))
            setProduct(newList)
        }

        
        const RenderOptions = (product, key) => {
             const [open, setOpen] = useState(false);
            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);

            function delProd() {
                var resp = window.confirm(`Deseja exlcuir ${product.nomeprod}\nAtenção: Isso não poderá ser desfeito.`)
                if (resp === true) {
                    alert(`${product.nomeprod} excluido.`)
                }
            }

            function verifyEditProd() {
                const data = JSON.parse(sessionStorage.getItem('info'))
                const id = product.uuid,
                    nameProd = document.getElementById('name-edit')['value'],
                    descPro = document.getElementById('desc-edit')['value'],
                    imgPro = document.getElementById('img-edit')['value'],
                    pricePro = document.getElementById('price-edit')['value'],
                    categPro = document.getElementById('edit-sel')['value'],
                    tag = data[0].tag;
                const productData = [{ "id": id, "nameprod": nameProd, "priceprod": pricePro, "imgprod": imgPro, "descprod": descPro, "categprod": categPro, "tagprod": tag }]
                console.log(categPro)
                if (nameProd !== '') {
                    if (descPro !== '') {
                        if (imgPro !== '') {
                            if (pricePro !== '') {
                                const regex = /\d|_/;
                                if (regex.test(pricePro) === true) {
                                    if (categPro !== "") {
                                        editProd(productData)
                                    } else { alert('Selecione uma categoria.') }
                                } else { alert('Preencha corretamente o campo Preço.') }
                            } else { alert('Preencha o campo Preço.') }
                        } else { alert('Preencha o campo Link da Imagem.') }
                    } else { alert('Preencha o campo Descrição.') }
                } else { alert('Preencha o campo nome.') }

            }

            const style = {
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
            };


            return (<div key={product.nomeprod}>

                <div id='prod' style={{ 'boxShadow': '0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24)', 'marginBottom': '10px', 'height': 'auto' }}>
                    <div style={{ 'display': 'flex', 'justifyContent': 'space-between', 'alignItems': 'center' }}>
                        <div style={{ 'margin': '5px 0 5px 5px' }}><strong>{product.nomeprod}</strong></div>
                        <div style={{ 'margin': '5px 5px 5px 0' }}><strong>{parseFloat(product.preco).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</strong></div>
                    </div>
                    <div key={product.id} style={{ 'display': 'flex', 'justifyContent': 'space-between', 'marginBottom': '5px' }}>
                        <img src={product.img} alt={product.nomeprod} style={{ 'width': '70px', 'height': '70px', 'boxShadow': '0 -1px 0 #e5e5e5, 0 0 2px rgba(0, 0, 0, .12), 0 2px 4px rgba(0, 0, 0, .24)', 'margin': '0 0 5px 5px' }}></img>
                        <div style={{ 'display': 'flex', 'alignItems': 'center', 'width': '100%' }}>
                            <div style={{ 'padding': '0 5px 0 5px' }}>{product.ingr}</div>
                        </div>
                    </div>
                    <div style={{ 'width': '98%', 'marginBottom': '5px', 'display': 'flex', 'alignItems': 'center', 'justifyContent': 'flex-end', 'padding': '5px' }}>
                        <button className="btn-co btn-l" onClick={handleOpen}>Editar</button>
                        <button className="btn-co btn-r" onClick={delProd}>Excluir</button>
                    </div>
                </div >


                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <strong>Editar: {product.nomeprod}</strong>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <div style={{ 'width': '100%' }}>
                                <div style={{ 'width': '100%', 'display': 'inline' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Nome:</p>
                                    <input defaultValue={product.nomeprod} className="editprod ad-inp" id="name-edit" style={{ 'width': '100%', 'padding': '0 0 0 8px' }}></input>
                                </div>
                                <div style={{ 'width': '100%', 'display': 'inline' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Descrição:</p>
                                    <input defaultValue={product.ingr} className="editprod ad-inp" id="desc-edit" style={{ 'width': '100%', 'padding': '0 0 0 8px' }} ></input>
                                </div>
                                <div style={{ 'width': '100%', 'display': 'inline' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Link imagem:</p>
                                    <input defaultValue={product.img} className="editprod ad-inp" id="img-edit" style={{ 'width': '100%', 'padding': '0 0 0 8px' }}></input>
                                </div>
                                <div style={{ 'width': '100%', 'display': 'inline' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }} >Preço:</p>
                                    <input defaultValue={product.preco} className="editprod ad-inp" id="price-edit" style={{ 'width': '100%', 'padding': '0 0 0 8px' }}></input>
                                </div>
                                <div style={{ 'width': '100%', 'display': 'inline' }}>
                                    <p style={{ 'margin': '0 0 1px 0' }}>Categoria:</p>
                                    <CategSelect select={`${product.categ}`} idSel={'edit-sel'} />
                                </div>
                            </div>
                            <div style={{ 'display': 'flex', 'justifyContent': 'flex-end' }}>
                                <button id='btn-cad' className="btn  btn-success" onClick={verifyEditProd} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Salvar</button>
                            </div>
                            <textarea className="editpod ad-inp" id='edit-resposta' defaultValue="Resposta do servidor >" disabled style={{ 'width': '97%', 'height': '100px', 'backgroundColor': 'white', 'color': 'black', 'resize': 'none' }}></textarea>
                        </Typography>
                    </Box>
                </Modal>


            </div>
            )


        }




        return (
            <div className="list-prod" id='list-prod' style={{ 'width': '100%', 'fontSize': '15px' }}>
                {/* <input type='text' className="pesq-prod" id='prod-pesq' placeholder='Pesquisar' onChange={pesquisarProd} style={{ 'marginBottom': '20px', 'width': '97%' }}></input> */}
                {product.map(RenderOptions)}
            </div>
        )
    }

    async function reqServer() {
        colorMsg('yellow', 'Aguardando reposta do servidor')
        const nameProd = document.getElementById('ad-name')['value'],
            descPro = document.getElementById('ad-desc')['value'],
            imgPro = document.getElementById('ad-img')['value'],
            pricePro = document.getElementById('ad-price')['value'],
            categPro = document.getElementById('sel-categ')['value'];

        const data = JSON.parse(sessionStorage.getItem('info'))
        const tag = data[0].tag

        const product = [{ "nameprod": nameProd, "priceprod": pricePro, "imgprod": imgPro, "descprod": descPro, "categprod": categPro, "tagprod": tag }]
        if (nameProd !== '') {
            if (descPro !== '') {
                if (imgPro !== '') {
                    if (pricePro !== '') {
                        const regex = /\d|_/;
                        if (regex.test(pricePro) === true) {
                            const token = sessionStorage.getItem('token')
                            if (token !== undefined) {
                                var resposta;
                                await api({
                                    method: 'POST',
                                    url: `/cadastro/produto`,
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: token
                                    },
                                    data: product
                                })
                                    .then(resp => {
                                        resposta = resp.data;
                                        colorMsg('GREEN', resposta.message)

                                        api.get(`/produtos/${data[0].tag}`).then(res => {
                                            console.log(res)
                                            if (res.data[0].products === undefined) {
                                                sessionStorage.setItem('listProduct', JSON.stringify([]))
                                                colorMsg('yellow', 'Produto Inserido! Porém houve um erro ao recuperar as informações do servidor. \n\nFeche a página e entre novamente para obter os dados atualizados.')
                                            } else {
                                                sessionStorage.setItem('listProduct', JSON.stringify(res.data[0].products))
                                                sessionStorage.setItem('viewProducts', JSON.stringify(res.data[0].products))
                                                window.location.href = `/admin/${companyTag}`
                                            }
                                        }).catch(error => {
                                            colorMsg('yellow', 'Produto Inserido! Porém houve um erro ao recuperar as informações do servidor. \n\nFeche a página e entre novamente para obter os dados atualizados.')
                                        })

                                    }).catch(error => {
                                        resposta = error.toJSON();
                                        if (resposta.status === 404) {
                                            colorMsg('RED', 'Erro 404 - Requisição invalida')
                                        } else { colorMsg('RED', `Erro ${resposta.status} - ${resposta.message}`) }
                                    })
                            } else { colorMsg('RED', 'Usuário não autenticado.'); window.location.href = `/admin/${companyTag}` }
                        } else { colorMsg('RED', 'Preencha corretamente o campo Preço.') }
                    } else { colorMsg('RED', 'Preencha o campo Preço.') }
                } else { colorMsg('RED', 'Preencha o campo Link da Imagem.') }
            } else { colorMsg('RED', 'Preencha o campo Descrição.') }
        } else { colorMsg('RED', 'Preencha o campo nome.') }

    }

    async function editProd(productEdit) {
        colorMsgEdit('yellow', 'Aguardando reposta do servidor')
        const data = JSON.parse(sessionStorage.getItem('info'))




        const product = productEdit;
        const token = sessionStorage.getItem('token')
        if (token !== undefined) {
            var resposta;
            await api({
                method: 'PUT',
                url: `/produtos/alterar`,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token
                },
                data: product
            })
                .then(resp => {
                    resposta = resp.data;
                    colorMsgEdit('GREEN', resposta.message)

                    api.get(`/produtos/${data[0].tag}`).then(res => {
                        console.log(res)
                        if (res.data[0].products === undefined) {
                            sessionStorage.setItem('listProduct', JSON.stringify([]))
                            colorMsgEdit('yellow', 'Produto Inserido! Porém houve um erro ao recuperar as informações do servidor. \n\nFeche a página e entre novamente para obter os dados atualizados.')
                        } else {
                            sessionStorage.setItem('listProduct', JSON.stringify(res.data[0].products))
                            sessionStorage.setItem('viewProducts', JSON.stringify(res.data[0].products))
                            window.location.href = `/admin/${companyTag}`
                        }
                    }).catch(error => {
                        colorMsgEdit('yellow', 'Produto Inserido! Porém houve um erro ao recuperar as informações do servidor. \n\nFeche a página e entre novamente para obter os dados atualizados.')
                    })

                }).catch(error => {
                    resposta = error.toJSON();
                    if (resposta.status === 404) {
                        colorMsgEdit('RED', 'Erro 404 - Requisição invalida')
                    } else { colorMsgEdit('RED', `Erro ${resposta.status} - ${resposta.message}`) }
                })
        } else { colorMsgEdit('RED', 'Usuário não autenticado.'); window.location.href = `/admin/${companyTag}` }


    }

    function CategSelect(props) {

        // eslint-disable-next-line no-unused-vars
        var categsSel = [];
        const data = JSON.parse(sessionStorage.getItem('info'))
        const descCategs = JSON.parse(sessionStorage.getItem('categDesc'))
        const categ = data[0].categs.split(',')
        categ.forEach(categItem => {
            descCategs.forEach(categPay => {
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
            <select className="editprod ad-inp" id={props.idSel} defaultValue={props.select} style={{ 'width': '73%', 'height': '36px', 'fontSize': '15px' }}>
                <option value='' hidden ></option>
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
                window.location.href = `/admin/${companyTag}`
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
                window.location.href = `/admin/${companyTag}`
            }
        })

    }

    const login = async () => {
        document.getElementById('msg')['textContent'] = 'Entrando...'
        document.getElementById('msg').style.color = 'blue'
        const company = JSON.parse(sessionStorage.getItem('info'))
        const user = await document.getElementById('ad-user')['value']
        const pass = await document.getElementById('ad-pass')['value']

        const dadosUser = await {
            "user": user,
            "password": pass,
            "page": company[0].tag
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
                if (res.data.token !== undefined && res.data.id !== undefined) {
                    sessionStorage.setItem('token', res.data.token)
                    sessionStorage.setItem('userId', res.data.id)
                    sessionStorage.setItem('userAdmin', res.data.name)
                }
                document.getElementById('msg')['textContent'] = res.data.name
                document.getElementById('msg').style.color = 'green'
                await getCategories()
                await getPayModes()
                window.location.href = `/admin/${companyTag}`
            } else {
                document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
                document.getElementById('msg').style.color = 'red'
            }
        }).catch((error) => {
            if (error.message === 'Request failed with status code 401') {
                document.getElementById('msg')['textContent'] = `${error.name} - Você não tem permissão para entrar nesta página.`
                document.getElementById('msg').style.color = 'red'
            } else {
                document.getElementById('msg')['textContent'] = 'Erro ao consultar usuário! Tente novamente.'
                document.getElementById('msg').style.color = 'red'
            }
        })


    }

    const logout = () => {
        sessionStorage.removeItem('userId')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('screen')
        sessionStorage.removeItem('userAdmin')

        window.location.href = `/admin/${companyTag}`
    }

    const colorMsg = (color, msg) => {
        document.getElementById('ad-resposta')['value'] = `${msg}`
        document.getElementById('ad-resposta').style.boxShadow = `4px solid ${color}`
    }

    const colorMsgEdit = (color, msg) => {
        document.getElementById('edit-resposta')['value'] = `${msg}`
        document.getElementById('edit-resposta').style.boxShadow = `0 -1px 0 ${color}, 0 0 2px ${color}, 0 2px 4px ${color}`
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
        window.location.href = `/admin/${companyTag}`
    }

    const pageInfo = () => {
        sessionStorage.setItem('screen', 'Informacoes')
        window.location.href = `/admin/${companyTag}`
    }

    const pageHora = () => {
        sessionStorage.setItem('screen', 'Horario')
        window.location.href = `/admin/${companyTag}`
    }


    const updateHours = async () => {
        document.getElementById('btn-cad')['disabled'] = true

        function verifyHoursOpCl(day, dayWeek) {
            const elementCl = document.getElementById(`rd-${day}-closed`)['checked']
            if (elementCl === true) {
                return 'Fechado'
            } else {
                var horaInicio = document.getElementById(`ad-${day}-open`)['value']
                var horaFim = document.getElementById(`ad-${day}-closed`)['value']
                if (`${horaInicio}-${horaFim}` === '-' || `${horaInicio}-${horaFim}`.length < 11) {
                    alert(`Verifique se preencheu corretamente os campos de ${dayWeek}`)
                    return ""
                } else {
                    if (horaFim < horaInicio) {
                        alert(`A hora final de ${dayWeek} é menor que a hora de inicio.`)
                        return ""
                    } else {
                        return `${horaInicio}-${horaFim}`
                    }
                }
            }
        }

        const dom = verifyHoursOpCl('dom', 'Domingo'),
            seg = verifyHoursOpCl('seg', 'Segunda'),
            ter = verifyHoursOpCl('ter', 'Terça'),
            qua = verifyHoursOpCl('qua', 'Quarta'),
            qui = verifyHoursOpCl('qui', 'Quinta'),
            sex = verifyHoursOpCl('sex', 'Sexta'),
            sab = verifyHoursOpCl('sab', 'Sábado');



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
                            window.location.href = `/admin/${companyTag}`
                        }
                    } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
                } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
            } else { colorMsg('RED', 'Erro ao enviar dados. Recarregue a página e tente novamente.') }
        } else { colorMsg('RED', 'Preencha todos os campos...') }


        document.getElementById('btn-cad')['disabled'] = false
    }

    const userAdmin = sessionStorage.getItem('userAdmin')
    var user;
    if (userAdmin === undefined) {
        user = ''
    } else {
        user = userAdmin
    }

    return (
        <>
            <div id='menu' className='menu' style={{ 'display': 'none' }}>
                <div className='itens-menu'>
                    <div>{user}</div>
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