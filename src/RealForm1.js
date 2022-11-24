import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./RealForm1.css";

function RealForm1() {
  const [pwd, setPwd] = useState("password");
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpassword: "",
      email: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(15, "Maximum 15 letters")
        .required("Username required"),
      password: Yup.string()
        .matches(
          /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
          `Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long`
        )
        .required("password is required"),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password must match")
        .required("Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  console.log(formik.errors);
  return (
    <form
      className='form flex flex-col'
      onSubmit={formik.handleSubmit}
    >
      <div className='username flex'>
        <label>Username</label>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='Enter your username'
          value={formik.values.username}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.username && formik.errors.username ? (
          <p>{formik.errors.username}</p>
        ) : null}
      </div>
      <div className='email flex'>
        {" "}
        <label>Email</label>
        <input
          name='email'
          id='email'
          type='text'
          placeholder='Enter your email'
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email ? (
          <p>{formik.errors.email}</p>
        ) : null}
      </div>
      <div className='Password flex'>
        {" "}
        <label>Password</label>
        <input
          name='password'
          type={pwd}
          id='password'
          placeholder='Enter your password'
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        <button
          onClick={() => {
            setPwd(pwd === "text" ? "password" : "text");
          }}
          className='eye'
        >
          {pwd === "password" ? "Show" : "Hide"}
        </button>
        {formik.touched.password && formik.errors.password ? (
          <p>{formik.errors.password}</p>
        ) : null}
      </div>
      <div className='Confirm-Password flex'>
        {" "}
        <label>Confirm Password</label>
        <input
          name='confirmpassword'
          type='password'
          id='confirmpassword'
          placeholder='Confirm your password'
          value={formik.values.confirmpassword}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
        {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
          <p>{formik.errors.confirmpassword}</p>
        ) : null}
      </div>

      <button
        type='submit'
        className='form__button'
      >
        Submit
      </button>
    </form>
  );
}

export default RealForm1;
