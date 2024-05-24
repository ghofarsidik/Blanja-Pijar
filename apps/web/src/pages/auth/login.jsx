import React, { useState } from 'react';
import logoBlanja from '../../assets/logo/Group 1158.png';
import LoginCustomer from '../../components/module/loginCustomer';
import LoginSeller from '../../components/module/loginSeller';

const Login = () => {
    const [role, setRole] = useState('customer');

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="py-10">
                <img src={logoBlanja} alt="logoblanja" className="h-12" />
            </div>
            <div className="font-metropolis font-semibold text-lg mb-6">
                <p>Please login with your account</p>
            </div>
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
            {role === 'customer' ? <LoginCustomer role={role} /> : <LoginSeller role={role} />}
        </div>
    );
};

export default Login;