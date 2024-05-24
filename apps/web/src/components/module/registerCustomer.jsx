import React from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {Button} from '@material-tailwind/react'
import registCustomer from '../../utils/registCustomer.js';



const RegisterCustomer = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      phone_number: '',
      password: '',
      showPassword: false,
      name: '',
      gender: '',
      role:'customer',
    },
    validationSchema: registCustomer,
    onSubmit: async (values) => {
      console.log('Submitting form with values:', values);
      try {
        const response = await fetch('http://localhost:3000/v1/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });
  
        if (!response.ok) {
          throw new Error('Something went wrong');
        }
  
        const data = await response.json();
        console.log('Success:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    },
  });

  return (
    <div className="w-full flex flex-col gap-10">
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="name"
              placeholder="Masukkan nama"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.name}</div>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="email"
              name="email"
              placeholder="Masukkan email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.email}</div>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="phone_number"
              placeholder="Masukkan telepon"
              value={formik.values.phone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.phone}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <input
                className="border border-gray-500 rounded py-2 px-2 w-full"
                type={formik.values.showPassword ? "text" : "password"}
                name="password"
                placeholder="Masukkan password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="absolute right-2 top-2 text-sm"
                onClick={() => formik.setFieldValue("showPassword", !formik.values.showPassword)}
              >
                {formik.values.showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.password}</div>
            )}
          </div>
          <h1>Gender:</h1>
          <div className="flex space-x-4">
            <button
              type="button"
              className={`px-4 py-2 rounded ${formik.values.gender === 'Male' ? 'bg-[#DB3022]' : 'bg-[#FFF5E0]'}`}
              onClick={() => formik.setFieldValue('gender', 'Male')}
            >
              Male
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded ${formik.values.gender === 'Female' ? 'bg-[#DB3022]' : 'bg-[#FFF5E0]'}`}
              onClick={() => formik.setFieldValue('gender', 'Female')}
            >
              Female
            </button>
          </div>
          {formik.touched.gender && formik.errors.gender && (
            <div className="text-red-500 text-[12px] font-poppins">{formik.errors.gender}</div>
          )}
        </div>
          <Button type="submit" className={`bg-red-500  justify-center w-full h-12 py-2 text-white text-lg font-semibold border rounded-full cursor-pointer hover:bg-[#DB3022]`}>Daftar</Button>
       </form>
    </div>
  );
};
export default RegisterCustomer;
