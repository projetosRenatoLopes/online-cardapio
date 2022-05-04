function totalCart() {
    var arrItensCart = JSON.parse(localStorage.getItem('listCart'));
    var totalCart = 0;
    for (let i in arrItensCart) {
        let iCount = arrItensCart[i].count;
        let iPrice = arrItensCart[i].preco;
        totalCart += (parseInt(iCount) * parseFloat(iPrice));
        localStorage.setItem('totalCart', totalCart.toString())
        // eslint-disable-next-line no-loop-func
        setTimeout(() => {
            document.getElementById('total-order').innerText = (`Total do pedido: ${totalCart.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}`);
        }, 1000);
    }
}

export default totalCart;