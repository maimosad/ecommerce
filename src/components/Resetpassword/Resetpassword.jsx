import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import useNotify from "../../Hooks/useNotify";

import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import MainBtn from "../MainBtn/MainBtn";

export default function Login({ setUseVerify }) {
  let { ToastContainer, notify } = useNotify();

  const [islaoding, setIslaoding] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    return () => {
      localStorage.removeItem("userVerify");
    };
  }, []);

  function sendDataToapi(data) {
    setError(null);
    setIslaoding(true);
    axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        data
      )
      .then((res) => {
        setIslaoding(false);
        console.log(res);
        // setUseVerify(res.data.status)
        localStorage.setItem("userVerify", res.data.status);
        navigate("/update");
      })
      .catch((error) => {
        // console.log(error)
        setIslaoding(false);
        // setError(error.response.data.message);
      });
  }

  let myValidation = Yup.object({
    resetCode: Yup.string().required("Your Reset Code is Required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema: myValidation,
    onSubmit: sendDataToapi,
  });

  return (
    <>
      <ToastContainer />
      <section className="py-3" id="Register">
        <h2>Enter Reset Code :</h2>
        {error ? <div className="alert h5 fw-bold">{error}</div> : null}
        <form onSubmit={formik.handleSubmit} className="form">
          <div className="mb-2">
            <label htmlFor="InputInput2" className="form-label fw-bolder">
              Reset Code :
            </label>
            <input
              id="resetCode"
              name="resetCode"
              onChange={formik.handleChange}
              value={formik.values.email}
              type="text"
              className="form-control input"
              onBlur={formik.handleBlur}
            />
            {formik.errors.resetCode && formik.touched.resetCode ? (
              <div className="alert">{formik.errors.resetCode}</div>
            ) : null}
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {islaoding ? (
              <MainBtn
                theam={"main-btn"}
                icon={"fa-solid fa-spinner fa-spin-pulse"}
                text={"loading"}
              />
            ) : (
              <MainBtn theam={"main-btn"} text={"Enter"} type={"submit"} />
            )}
          </div>
        </form>
      </section>
    </>
  );
}
