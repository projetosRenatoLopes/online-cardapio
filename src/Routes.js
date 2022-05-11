// @ts-nocheck
import React from "react";
import { Routes, Route } from 'react-router-dom';
import MyCart from './pages/MyCart'
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import CheckOut from "./pages/ChekOut";
import Cupom from "./pages/Cupom";
import Load from "./pages/Load.js";
import Erro from "./pages/Erro";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    return (
        <Routes >
            <Route exact path="" element={<Load />} />
            <Route exact path="home" element={<Home />} />
            <Route exact path="mycart" element={<MyCart />} />
            <Route exact path="filter" element={<Filter />} />
            <Route exact path="checkout" element={<CheckOut />} />
            <Route exact path="cupom" element={<Cupom />} />
            <Route exact path="erro500" element={<Erro />} />
            <Route exact index element={<div><Load /></div>} />
        </Routes>
    );
}