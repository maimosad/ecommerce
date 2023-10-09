import React, { useRef, useState } from "react";
import MainBtn from "../MainBtn/MainBtn";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import useNotify from "../../Hooks/useNotify";

export default function EditProfileDataPassword() {
  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();
  let { ToastContainer, notify } = useNotify();

  // show and hide password
  const [checked, setChecked] = useState(true);
  const formCheckLabelRef = useRef();
  const passworkRef = useRef();
  const rePassworkRef = useRef();
  const currentPassworkRef = useRef();
  function showPassword() {
    if (checked) {
      formCheckLabelRef.current.innerHTML = "Hide Password";
      rePassworkRef.current.type = "text";
      passworkRef.current.type = "text";
      currentPassworkRef.current.type = "text";
    } else {
      formCheckLabelRef.current.innerHTML = "Show Password";
      rePassworkRef.current.type = "password";
      passworkRef.current.type = "password";
      currentPassworkRef.current.type = "password";
    }
  }

  function sendDataToapi(data) {
    setIslaoding(true);
    setError(null);
    axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        data,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIslaoding(false);
        notify("Password has been updated successfully");
      })
      .catch((err) => {
        console.log(err);
        setIslaoding(false);
        setError(null);
      });
  }

  let myValidation = Yup.object({
    currentPassword: Yup.string().required("Current Password is Required"),
    password: Yup.string()
      .required("Your Password is Required")
      .matches(
        /^[A-Z].{5,9}$/,
        "Your Password Must Start With Uppercase and Consists of 6 to 10 char"
      ),
    rePassword: Yup.string()
      .required("rePassword is Required")
      .oneOf([Yup.ref("password")], "rePassword don't Match Password"),
  });

  let formik = useFormik({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <ToastContainer />

        <h2>Change Your Password :</h2>
        <hr />
        {error ? <div className="alert h5 fw-bold">{error}</div> : null}
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="mb-2">
            <label htmlFor="InputInput3" className="form-label fw-bolder">
              Current Password :
            </label>
            <input
              id="currentPassword"
              name="currentPassword"
              ref={currentPassworkRef}
              onChange={formik.handleChange}
              value={formik.values.currentPassword}
              type="password"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.currentPassword && formik.touched.currentPassword ? (
              <div className="alert">{formik.errors.currentPassword}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="InputInput3" className="form-label fw-bolder">
              New Password :
            </label>
            <input
              id="password"
              name="password"
              ref={passworkRef}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert">{formik.errors.password}</div>
            ) : null}
          </div>

          <div className="mb-2">
            <label htmlFor="InputInput3" className="form-label fw-bolder">
              rePassword :
            </label>
            <input
              id="rePassword"
              name="rePassword"
              ref={rePassworkRef}
              onChange={formik.handleChange}
              value={formik.values.rePassword}
              type="password"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert">{formik.errors.rePassword}</div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className="mb-2 form-check">
              <input
                onChange={() => {
                  showPassword();
                  setChecked(!checked);
                }}
                type="checkbox"
                className="form-check-input inputCleck"
                id="exampleCheck1"
              />
              <label
                className="form-check-label"
                ref={formCheckLabelRef}
                htmlFor="exampleCheck1"
              >
                Show Password
              </label>
            </div>
            {islaoding ? (
              <MainBtn
                theam={"main-btn"}
                icon={"fa-solid fa-spinner fa-spin-pulse"}
                text={"loading"}
              />
            ) : (
              <MainBtn theam={"main-btn"} text={"Update"} type={"submit"} />
            )}
          </div>
        </form>
    </>
  );
}
