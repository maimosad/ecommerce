import React, { useContext } from "react";
 
import { useFormik } from "formik";
import { CartContext } from "../CartContext/CartContext";
 
  
export default function Checkout() {
  let { cartId, generateOnlinePayment } = useContext(CartContext);

  async function handlePayment(values) {
    let { data } = await generateOnlinePayment(cartId, values);
    if (data.session) {
      window.location.href = data.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => handlePayment(values),
  });

  return (
    <>
      <div className="container py-5">
        <form className="w-75 mx-auto" onSubmit={formik.handleSubmit}>
          <label htmlFor="details" className="mb-2 h5">
            Details
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            className="form-control mb-3"
            name="details"
            id="details"
            value={formik.values.details}
          />
          <label htmlFor="phone" className="mb-2 h5">
            Phone
          </label>
          <input
            type="tel"
            onChange={formik.handleChange}
            className="form-control mb-3"
            name="phone"
            id="phone"
            value={formik.values.phone}
          />
          <label htmlFor="city" className="mb-2 h5">
            City
          </label>
          <input
            type="text"
            onChange={formik.handleChange}
            className="form-control mb-3"
            name="city"
            id="city"
            value={formik.values.city}
          />
          <button
            onSubmit={formik.handleSubmit}
            className="btn btn-outline-info w-100"
          >
            Pay
          </button>
        </form>
      </div>
    </>
  );
}
