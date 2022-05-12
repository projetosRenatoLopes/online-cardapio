// @ts-nocheck
import React from "react";
import { Routes, Route} from 'react-router-dom';
import MyCart from './pages/MyCart'
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import CheckOut from "./pages/ChekOut";
import Cupom from "./pages/Cupom";
import Load from "./pages/Load.js";
import Erro from "./pages/Erro";
import NotFound from "./pages/NotFound";
import CardapioOnline from './pages/CardapioOnline'
import Administrador from "./pages/Administrador";
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
    const company = sessionStorage.getItem('tag')
    return (
        <Routes >    
            <Route exact path=":company" element={<Load />} />
            <Route exact path={`${company}/home`} element={<Home />} />
            <Route exact path={`/admingpco`} element={<Administrador />} />
            <Route exact path={`${company}/mycart`} element={<MyCart />} />
            <Route exact path={`${company}/filter`} element={<Filter />} />
            <Route exact path={`${company}/checkout`} element={<CheckOut />} />
            <Route exact path={`${company}/cupom`} element={<Cupom />} />
            <Route exact path={`${company}/erro`} element={<Erro />} />
            <Route exact path={'/erro'} element={<Erro />} />
            <Route exact path={'/clientes'} element={<CardapioOnline />} />
            <Route exact path={`:uuid/*`} element={<NotFound />} />
            <Route exact index element={<div><Load /></div>} />
        </Routes>
    );
}
