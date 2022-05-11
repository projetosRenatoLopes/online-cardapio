import api from "../services/api.js";

const Administrador = () => {
    const cadastrarEmpresa = () => {
        const admin = sessionStorage.getItem('token')
        if (admin === null) {
            return (<>
                <div className="data-checkout">
                    <h5 style={{ 'width': 'auto', 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center' }}>Entrar.</h5>
                    <input type='text' id="name" placeholder="Login" style={{ 'width': '100%' }}></input>
                    <input type='password' id="co-input" placeholder="Senha" style={{ 'width': '100%' }}></input>
                    <button className="btn btn-success" onClick={login}>Entrar</button>
                </div>
            </>)
        } else if (admin === 'invalid') {
            return (<>Acesso não autorizado</>)
        } else {
            return (<>
                <div className="data-checkout">
                    <h4>Cadastrar Empresa:</h4>
                    <input type='text' className="ad-inp" id="ad-name" placeholder="Nome da empresa" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-tag" placeholder="Tag para link (Ex: pizzariadoseujoao)" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-logo" placeholder="Link da Logo" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-wha" placeholder="WhatsApp (Ex: 5534987654321)" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-tax" placeholder="Taxa de Entrega (Ex: 7.0)" style={{ 'width': '100%' }}></input>

                    <h4>Horário de Funcionamento:</h4>
                    <p>Ex: Fechado ou 08:00-17:00</p>
                    <input type='text' className="ad-inp" id="ad-dom" placeholder="Domingo" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-seg" placeholder="Segunda-Feira" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-ter" placeholder="Terça-Feira" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-qua" placeholder="Quarta-Feira" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-qui" placeholder="Quinta-Feira" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-sex" placeholder="Sexta-Feira" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-sab" placeholder="Sábado" style={{ 'width': '100%' }}></input>

                    <h4>Endereço:</h4>
                    <input type='text' className="ad-inp" id="ad-rua" placeholder="Rua" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-num" placeholder="Número" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-com" placeholder="Complemento (opcional)" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-bai" placeholder="Bairro" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-cid" placeholder="Cidade" style={{ 'width': '100%' }}></input>
                    <input type='text' className="ad-inp" id="ad-est" placeholder="UF (Ex: MG)" style={{ 'width': '100%' }}></input>

                    <input type='password' className="ad-inp" id="ad-pas" placeholder="Senha" style={{ 'width': '100%' }}></input>

                    <button className="btn btn-success" onClick={reqServer} style={{ 'marginTop': '15px', 'marginBottom': '30px' }}>Cadastrar empresa</button>
                    <input type='text' className="ad-inp" id='ad-resposta' placeholder="Resposta do servidor >" disabled style={{ 'height': '100px' }}></input>

                </div>
            </>)
        }
    }

    const login = () => {
        const user = document.getElementById('name')['value']
        const pass = document.getElementById('co-input')['value']
   
        if (user === 'renato.admin') {
            if (pass === 'r') {
                sessionStorage.setItem('token', 'fd98ast4.0fueyqz.v78dsa.q1w')
                window.location.href = '/admingpco'
            } else {
                sessionStorage.setItem('token', 'invalid')
                window.location.href = '/admingpco'
            }
        } else {
            sessionStorage.setItem('token', 'invalid')
            window.location.href = '/admingpco'
        }
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
        var resposta;
        const token = process.env.TOKEN

        await api.post('/cadastro/empresa', JSON.stringify(dadosEmpresa), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
            .then(resp => {
                resposta = resp.data;
                document.getElementById('ad-resposta')['value'] = resposta
                document.getElementById('ad-resposta').style.border = '2px solid blue'
            }).catch(error =>{
                resposta = error;
                document.getElementById('ad-resposta')['value'] = resposta
                document.getElementById('ad-resposta').style.border = '2px solid red'
            })
        console.log(resposta)

    }

    return (
        <>
            <div className='title-page'>
                <p>Cardapio Online - Admin</p>
            </div>

            <div className='logo-page'>
                <h3>Área do admin</h3>
            </div>

            {cadastrarEmpresa()}

        </>
    )
}

export default Administrador;