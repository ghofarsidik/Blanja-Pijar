import * as Yup from "yup";

const registSeller = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least 1 digit of number")
    .matches(/[A-Z]/, "Password must contain at least 1 of uppercase letter")
    .matches(/[a-z]/, "Password must contain at least 1 of lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      'Password must contain at least 1 special character (!@#$%^&*(),.?":{}|<>_-)'
    )
    .required("Password is required"),
  phone_number: Yup.string()
    .min(10, "Phone number must be at least 10 characters")
    .max(13, "Phone number max in 13 characters")
    .required("Phone number is required"),
  name: Yup.string().required("Name is required"),
  // gender: Yup.string()
  // .oneOf(["male", "female"], "Gender is required")
  // .required("Gender is required"),
  // store_name: Yup.string().required("Nama toko wajib diisi"),
});

export default registSeller;
