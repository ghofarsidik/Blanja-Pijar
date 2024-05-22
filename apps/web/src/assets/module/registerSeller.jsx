import React, { useState } from 'react'
import Input from '../base/input'
import Button2 from '../base/button/button2'
import api from '../../../configs/api'
import { useNavigate } from 'react-router-dom'

const RegisterSeller = () => {

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    store_name: '',
    password: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    api.post('/register/stores', {
      name: form.name,
      email: form.email,
      phone: form.phone,
      store_name: form.store_name,
      password: form.password,
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
          type='text'
          value={form.store_name}
          onChange={handleChange}
          name="store_name"
          label=""
          placeholder="Masukkan nama toko"
        />
        <Input
          type='password'
          value={form.password}
          onChange={handleChange}
          name="password"
          label=""
          placeholder="Masukkan password"
        />
      </div>
      <Button2 className='w-full' onClick={handleRegister} text='Daftar' />
    </div>
  )
}

export default RegisterSeller