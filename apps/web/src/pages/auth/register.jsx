import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo/Group 1158.png';
import RegisterCustomer from '../../components/module/registerCustomer';
import RegisterSeller from '../../components/module/registerSeller';

const Register = () => {
    const [role, setRole] = useState('customer');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="py-10">
                <Link to='/'><img src={Logo} alt="Logo" className="h-[50px] w-fit" /></Link>
            </div>
            <h1 className="font-bold text-lg text-center mb-6">Please sign up with your account</h1>
            <div className="relative flex mb-6 border border-gray-600 rounded">
                <div
                    className={`absolute top-0 left-0 w-32 h-full bg-[#DB3022] transition-transform duration-300 ease-in-out transform ${role === 'customer' ? 'translate-x-0' : 'translate-x-full'}`}
                />
                <button
                    className={`relative w-32 py-2 text-center transition duration-300 ease-in-out ${role === 'customer' ? 'text-white' : 'text-gray-700'}`}
                    onClick={() => setRole('customer')}
                >
                    <span className={`relative z-10 ${role === 'customer' ? 'text-white' : 'text-gray-700'}`}>Customer</span>
                </button>
                <button
                    className={`relative w-32 py-2 text-center transition duration-300 ease-in-out ${role === 'seller' ? 'text-white' : 'text-gray-700'}`}
                    onClick={() => setRole('seller')}
                >
                    <span className={`relative z-10 ${role === 'seller' ? 'text-white' : 'text-gray-700'}`}>Seller</span>
                </button>
            </div>

            <div className="w-1/3 flex flex-col gap-5 items-center">
                {role === 'customer' ? <RegisterCustomer /> : <RegisterSeller />}
            </div>
        </div>
    );
};

export default Register;
