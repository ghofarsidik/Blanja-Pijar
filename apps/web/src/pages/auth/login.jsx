import React, { useState } from 'react';
import logoBlanja from '../../assets/logo/Group 1158.png'
import RadioRole from '../../components/base/radio/radioRole';
import LoginCustomer from '../../components/module/loginCustomer';
import LoginSeller from '../../components/module/loginCustomer';

const Login = () => {
    const [toggle, setToggle] = useState(1);
    const handleToggle = (id) => {
        setToggle(id)
    }
    
  return (
    <div>
        <div className='flex justify-center py-10'>
            <img src={logoBlanja} alt="logoblanja" />
        </div>
        <div className='flex justify-center font-metropolis font-semibold text-lg'>
            <p>Please login with your account</p>
        </div>
        <div className='flex justify-center'>
          <RadioRole handleToggle={handleToggle}/>
        </div>
        {toggle === 1 ? <LoginCustomer/> : <LoginSeller/>}
        <div>
        </div>
    </div>
  )
}

export default Login