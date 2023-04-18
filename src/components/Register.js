import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function Register() {
  const [responseMessage, setResponseMessage] = useState(null);
  const formik = useFormik({
    initialValues: {
      user_name: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      user_name: Yup.string()
        .max(15, "Must be 15 characters or less.")
        .min(3, "Must be 3 characters or more.")
        .required("Please enter a user name."),
      password: Yup.string()
        .required("Please enter a password.")
        .matches(
          /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
          "Password must contain at least 8 characters, one uppercase, one number and one special case character."
        ),
      confirmPassword: Yup.string()
        .required("Please confirm your password.")
        .oneOf([Yup.ref("password"), null], "Passwords must match."),
    }),

    onSubmit: async (values) => {
      const newUser = {
        user_name: values.user_name,
        password: values.password,
      };
      const response = await axios.post("/api/users/register", newUser);

      const data = await response;
      if (data.status === 201) {
        setResponseMessage(data.data);
      } else {
        setResponseMessage("Failed to register");
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="user_name">User Name</label>
      <input
        id="user_name"
        name="user_name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_name}
      />
      {formik.touched.user_name && formik.errors.user_name ? (
        <div>{formik.errors.user_name}</div>
      ) : null}
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.confirmPassword}
      />
      {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
        <div>{formik.errors.confirmPassword}</div>
      ) : null}

      <button type="submit">Register</button>
      {responseMessage ? <div>{responseMessage}</div> : null}
    </form>
  );
}
