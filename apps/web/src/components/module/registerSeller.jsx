import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '../base/input';
import Button from '../base/button/button';
import api from '../../configs/api';
import { useNavigate } from 'react-router-dom';
import registSeller from '../../utils/registSeller.js'
const RegisterSeller = () => {
  const navigate = useNavigate();
  const validationSchema = registSeller;

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      store_name: '',
      password: '',
      showPassword: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        //data dummy
        const response = await api.post('/register/stores', values);

        alert(`Register berhasil dengan email ${values.email} dan password ${values.password}. Silakan Login`);

        navigate('/login');
      } catch (error) {
        console.error('Register error:', error);
        alert('Gagal melakukan registrasi');
      } finally {
        setSubmitting(false);
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
              name="phone"
              placeholder="Masukkan telepon"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.phone}</div>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="border border-gray-500 rounded py-2 px-2"
              type="text"
              name="store_name"
              placeholder="Masukkan email"
              value={formik.values.store_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.store_name && formik.errors.store_name && (
              <div className="text-red-500 text-[12px] font-poppins">{formik.errors.store_name}</div>
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
        </div>
        <Button name="Daftar" type="submit" className="flex justify-center w-full" disabled={formik.isSubmitting} text="Daftar" />
      </form>
    </div>
  );
};

export default RegisterSeller;
