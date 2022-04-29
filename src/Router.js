import React from "react";
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import MyCart from './pages/MyCart'
import Home from "./pages/Home";
import Filter from "./pages/Filter";


// eslint-disable-next-line import/no-anonymous-default-export
export default () => {

    return (
        <BrowserRouter>
            <Routes >
                <Route path="home" element={<Home />} />
                <Route path="mycart" element={<MyCart />} />
                <Route path="filter" element={<Filter />} />
                <Route index element={<div><Home /></div>} />
            </Routes>
        </BrowserRouter>
    );
}