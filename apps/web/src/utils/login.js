import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[0-9]/, "Password must contain at least 1 digit of number")
    .matches(/[A-Z]/, "Password must contain at least 1 of uppercase letter")
    .matches(/[a-z]/, "Password must contain at least 1 of lowercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>_-]/,
      'Password must contain at least 1 special character (!@#$%^&*(),.?":{}|<>_-)'
    ).required("Password is required"),
  // role: Yup.string()
  //   .oneOf(["Seller", "Customer"], "Role is required")
  //   .required("Gender is required"),
});

export default loginSchema;
