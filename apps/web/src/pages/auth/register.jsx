import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.svg'
import RadioRole from '../../components/base/radio/radioRole'
import RegisterCustomer from '../../components/module/registerCustomer'
import RegisterSeller from '../../components/module/registerSeller'

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
                    <RadioRole handleToggle={handleToggle} />
                    {toggle === 1 ? <RegisterCustomer /> : <RegisterSeller />}
                    </div>
                    <p className="w-full text-center font-normal text-base text-[#1F2A36]">Already have a  account? <Link className="text-[#DB3022]" to="/login">Login</Link></p>
                </div>
            </div>
        </div>
    )
}



export default Register