import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../configs/redux/action/authSlice';
import { useNavigate } from 'react-router-dom';
import loginRegist from '../../utils/login';
import { toastify } from "../base/toastify";

const LoginCustomer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user.role === 'customer') {
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      role: "customer",
      showPassword: false,
    },
    validationSchema: loginRegist,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const action = await dispatch(loginUser(values)).unwrap();
        // if (action.role !== 'customer') {
        //   toastify('error', 'Only customers can log in');
        //   return;
        // }
        toastify('success', 'Login successful');
        navigate('/');
      } catch (error) {
        setSubmitting(false);
        toastify('error', error.message);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="w-full flex flex-col gap-4">
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
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.email}
              </div>
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
                onClick={() => formik.setFieldValue('showPassword', !formik.values.showPassword)}
              >
                {formik.values.showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-[12px] font-poppins">
                {formik.errors.password}
              </div>
            )}
          </div>

          <div className="flex justify-center ml-64 text-red-maroon hover:font-semibold hover:text-orange-500 cursor-pointer">
            Forgot password?
          </div>

          <div className="flex justify-center py-5">
            <button
              type="submit"
              className={`bg-red-500 flex justify-center w-full h-12 py-2 text-white text-lg font-semibold border rounded-full cursor-pointer hover:bg-[#DB3022]`}
              disabled={formik.isSubmitting || loading}
            >
              {loading ? 'Loading...' : 'Login Customer'}
            </button>
          </div>
          {error && <div className="text-red-500 text-center">{error}</div>}
        </div>
      </form>

      <div className="flex justify-center">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-red-maroon hover:font-semibold hover:text-red-500 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginCustomer;
