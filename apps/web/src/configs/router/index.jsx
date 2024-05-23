import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../../pages/auth/login';
import Register from '../../pages/auth/register';
import Home from '../../pages/home/home';

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                    <Route path="/" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}
export default MainRouter