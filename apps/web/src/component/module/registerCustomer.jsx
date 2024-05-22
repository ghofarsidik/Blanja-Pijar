import React, { useState } from 'react'
import Input from '../base/input'
import Button2 from '../base/button/button2'
import api from '../../configs/api'
import { useNavigate } from 'react-router-dom'

const RegisterCustomer = () => {

  const DisplayingErrorMessagesSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

  function validateEmail(value) {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }
  
  function validateUsername(value) {
    let error;
    if (value === 'admin') {
      error = 'Nice try!';
    }
    return error;
  }
 

  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: '',
    phone: '',
    password: '',
    gender:'',
    name: '',
  })

  const handleRegister = (e) => {
    e.preventDefault()
    api.post('/register/customers', {
      email: form.email,
      password: form.password,
      phone: form.phone,
      gender:form.gender,
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
          validate={validateEmail}
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
              <div className='flex flex-col gap-10 w-full items-center'>
                        <ul className='flex rounded-md border border-[#9b9b9b] overflow-hidden w-fit items-center'>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle2(1)}>
                                <div className={toggle === 1 ? 'p-[10px] bg-[#DB3022] font-bold text-base text-center leading-5 leading text-[#FFFFFF] w-32' : 'p-[10px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Male</div>
                            </li>
                            <li className='flex flex-col gap-[11px] cursor-pointer' onClick={() => handleToggle2(2)}>
                                <div className={toggle === 2 ? 'p-[10px] bg-[#DB3022] font-bold text-base text-center leading-5 text-[#FFFFFF] w-32' : 'p-[10px] bg-white font-bold text-base text-center leading-5 text-[#9b9b9b] w-32'}>Female</div>
                            </li>
                        </ul>
                </div>
        {/* <Input
          type='text'
          value={form.gender}
          onChange={handleChange}
          name="gender"
          label=""
          placeholder="Masukkan gender"
        /> */}

      </div>
      <Button2 className='w-full' onClick={handleRegister} text='Daftar' />
    </div>
  )
}

export default RegisterCustomer