import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Textfield from '../base/textfield/textField';
import Button from '../base/button/button';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../configs/redux/action/auth.action';
import { useNavigate } from 'react-router-dom';

const loginCustomer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const [form, setForm] = useState({
        email: '',
        password: '',
        role: ''
    });
    
    const initialValues = {
      email: '',
      password: '',
      role: ''
  };

  const validationSchema = Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
      password: Yup.string().required('Password is required'),
      role: Yup.string().required('Role is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
      dispatch(loginAction(values.email, values.password, values.role, navigate));
      navigate('/');
      setSubmitting(false);
  };


    const handleChange = (e) => {
       const { id, value } = e.target;
       setForm((prevForm) => ({
        ...prevForm,
        [id]: value
       }));
       console.log({ [id]: value });
    };

    const HandleRegister = () => {
      navigate('/register')
    }

    const handleLoginCustomer = () => {
      dispatch(loginAction(form.email, form.password, form.role, navigate));
      navigate('/')
    };

    return (
      <div>
          <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
          >
              {({ isSubmitting }) => (
                  <Form>
                      <div className='flex justify-center'>
                          <Textfield
                              type="email"
                              name="email"
                              autoComplete="email"
                              spellCheck={false}
                              required
                              placeholder="Email"
                              className='w-96 h-12'
                          />
                          <ErrorMessage name="email" component="div" className="text-red-500" />
                      </div>
                      <div className='flex justify-center pb-5'>
                          <Textfield
                              type="password"
                              name="password"
                              spellCheck={false}
                              required
                              placeholder="Password"
                              className='w-96 h-12'
                              autoComplete="new-password"
                          />
                          <ErrorMessage name="password" component="div" className="text-red-500" />
                      </div>
                      <div className='flex justify-center pb-2'>
                          <Textfield
                              type="text"
                              name="role"
                              autoComplete="off"
                              spellCheck={false}
                              required
                              placeholder="Customer / Seller"
                              className='w-96 h-12'
                          />
                          <ErrorMessage name="role" component="div" className="text-red-500" />
                      </div>
                      <div className='flex justify-center py-5'>
                          <Button
                              name="Primary"
                              type="submit"
                              disabled={isSubmitting}
                              className="flex justify-center "
                          />
                      </div>
                  </Form>
              )}
          </Formik>
          <div className='flex justify-center'>
              <p>Don't have an account?{' '}
                  <span onClick={HandleRegister} className='text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer'>
                      Register
                  </span>
              </p>
          </div>
      </div>
  )
}

export default loginCustomer