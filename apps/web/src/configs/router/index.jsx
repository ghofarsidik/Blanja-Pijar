import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/product" element={<Product />} />
                </Route> */}
            </Routes>
        </BrowserRouter>
    );
}
export default MainRouter