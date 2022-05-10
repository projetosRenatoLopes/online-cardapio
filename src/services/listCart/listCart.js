import React, { useEffect, useState } from "react"

export var CountItens = () => {
    var contador = sessionStorage.getItem('listCart');
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (contador === null) {
            setCount(0)
        } else {
            var arrContador = []
            arrContador = JSON.parse(contador);
            setCount(arrContador.length);
        }
    }, [contador])
    return (
        <><p>{count}</p></>
    )
}

var listItensCart = () => {

    var itensCart = sessionStorage.getItem('listCart');
    var arrItens = JSON.parse(itensCart);
    return arrItens;
}
export default listItensCart;