import React, { useState } from 'react'
import Input from '../../components/module/base/input'
import Button2 from '../../components/module/base/button/button2'
import api from '../../configs/api'
import { useNavigate } from 'react-router-dom'
import { Radio } from "@material-tailwind/react";
const RegisterCustomer = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
    gender: '',
    name: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    api.post('/register/customers', {
      email: form.email,
      password: form.password,
      phone: form.phone,
      gender: form.gender,
      name: form.name,
    })
      .then((res) => {
        console.log(res.response);
        alert(`Register berhasil dengan email ${form.email} dan password ${form.password}. Silakan Login`)
        navigate('/login')
      })
      .catch((err) => {
        console.log(err.response);
        const error = err.response.data
        alert(`Anda gagal register - ${error.message}`)
      })
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const [toggle, setToggle] = useState(1)
  const handleToggle = (id) => {
    setToggle(id)
  }
  const handleToggle2 = (id) => {
    setToggle(id)
  }


  return (
    <div className='w-full flex flex-col gap-10'>
      <div className='w-full flex flex-col gap-4'>

        <Input
          type='text'
          value={form.name}
          onChange={handleChange}
          name="name"
          label=""
          placeholder="Masukkan nama"
        />
        <Input
          type='email'
          required
          value={form.email}
          onChange={handleChange}
          name="email"
          label=""
          placeholder="Masukkan email"
        />
        <Input
          type='tel'
          value={form.phone}
          onChange={handleChange}
          name="phone"
          label=""
          placeholder="Masukkan telepon"
        />
        <Input
          type='password'
          value={form.password}
          onChange={handleChange}
          name="password"
          label=""
          placeholder="Masukkan password"
        />
        <div className="flex gap-20">
          <Radio name="type" value={form.gender} color="red"  label="Male" />
          <Radio name="type" value={form.gender} color='red'  label="Female"  defaultChecked />
        </div>

        {/* <div className='flex flex-col gap-10 w-full items-center'>
                        <ul className='flex rounded-md border border-[#9b9b9b] overflow-hidden w-fit items-center'>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle2(1)}>
                                <div className={toggle === 1 ? 'p-[10px] bg-[#DB3022] font-bold text-base text-center leading-5 leading text-[#FFFFFF] w-32' : 'p-[10px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Male</div>
                            </li>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle2(2)}>
                                <div className={toggle === 2 ? 'p-[10px] bg-[#DB3022] font-bold text-base text-center leading-5 text-[#FFFFFF] w-32' : 'p-[10px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Female</div>
                            </li>
                        </ul>
                </div>
     */}
      </div>
      <Button2 className='w-full' onClick={handleRegister} text='Daftar' />
    </div>
  )
}

export default RegisterCustomer