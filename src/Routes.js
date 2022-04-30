import React from "react";
import { Routes, Route } from 'react-router-dom';
import MyCart from './pages/MyCart'
import Home from "./pages/Home";
import Filter from "./pages/Filter";
import CheckOut from "./pages/CheckOut";


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    return (
        <Routes >
            <Route exact path="home" element={<Home />} />
            <Route exact path="mycart" element={<MyCart />} />
            <Route exact path="filter" element={<Filter />} />
            <Route exact path="checkout" element={<CheckOut />} />
            <Route exact index element={<div><Home /></div>} />
        </Routes>
    );
}