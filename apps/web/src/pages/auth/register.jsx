import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
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
            <div className="flex mb-6">
                <button
                    className={`w-32 py-2 text-center mx-2 ${role === 'customer' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setRole('customer')}
                >
                    Customer
                </button>
                <button
                    className={`w-32 py-2 text-center mx-2 ${role === 'seller' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    onClick={() => setRole('seller')}
                >
                    Seller
                </button>
            </div>
            <div className="w-1/3 flex flex-col gap-10 items-center">
                {role === 'customer' ? <RegisterCustomer /> : <RegisterSeller />}
                <p className="w-full text-center font-normal text-base text-[#1F2A36]">
                    Already have an account? <Link className="text-[#DB3022]" to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
