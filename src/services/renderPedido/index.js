
const renderPedido = () => {
    const itens = JSON.parse(sessionStorage.getItem('listCart'))
    var listString = "";
    itens.forEach(item => {
        const qtd = item.count
        const total = item.count * item.preco;
        const preco = parseFloat(item.preco.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        const precoTotal = parseFloat(total.toString()).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
        listString += `*${qtd}* - *${item.nomeprod}*%0APreço Unidade: *${preco}*%0APreço Total: *${precoTotal}*%0A%0A`
    });

    return listString
}

export default renderPedido



