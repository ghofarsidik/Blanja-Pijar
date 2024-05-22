import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import RegisterCustomer from '../../component/module/registerCustomer'
import RegisterSeller from '../../component/module/registerSeller'

const Register = () => {
    
    const [toggle, setToggle] = useState(1)
    const handleToggle = (id) => {
        setToggle(id)
    }

    return (
        <div>
            <div className='mx-auto my-20 flex items-center justify-center'>
                <div className='w-1/3 flex flex-col gap-10 items-center'>

                    <Link to='/'><img className="h-[50px] w-fit" src={Logo} alt="" /></Link>

                    <h1 className='text-center font-bold text-lg'>Please sign up with your account</h1>

                    <div className='flex flex-col gap-10 w-full items-center'>
                        <ul className='flex rounded-md border border-[#9b9b9b] overflow-hidden w-fit items-center'>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle(1)}>
                                <div className={toggle === 1 ? 'p-[15px] bg-[#DB3022] font-bold text-base text-center leading-5 leading text-[#FFFFFF] w-32' : 'p-[15px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Customer</div>
                            </li>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle(2)}>
                                <div className={toggle === 2 ? 'p-[15px] bg-[#DB3022] font-bold text-base text-center leading-5 text-[#FFFFFF] w-32' : 'p-[15px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Seller</div>
                            </li>
                        </ul>

                        <div className={toggle === 1 ? 'block w-full' : 'hidden'}>
                            <RegisterCustomer />
                        </div>

                        <div className={toggle === 2 ? 'block w-full' : 'hidden'}>
                            <RegisterSeller />
                        </div>
                    </div>
                    <p className="w-full text-center font-normal text-base text-[#1F2A36]">Already have a account? <Link className="text-[#DB3022]" to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register