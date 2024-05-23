import React, { useState } from 'react'
import Input from '../base/input'
import Button from '../base/button/button'
import api from '../../configs/api'
import { useNavigate } from 'react-router-dom'


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
    console.log(setForm)
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
          type='text'
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
        <Input
          type='text'
          value={form.gender}
          onChange={handleChange}
          name="gender"
          label=""
          placeholder="Masukan Gender kalian Male/Female"
        />

        {/* <div className="flex gap-20">
          <Radio name="type" value={form.gender} onChange={handleChange} color="red" label="Male" />
          <Radio name="type" value={form.gender} onChange={handleChange} color='red' label="Female"  defaultChecked />
        </div> */}
      </div>
      <Button name="Daftar" className='flex justify-center w-full' onClick={handleRegister} text='Daftar' />
    </div>
  )
}

export default RegisterCustomer