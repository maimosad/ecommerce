import React from "react";
import style from "./Footer.module.css";
import amazonPay from "../../img/amazonPay.png";
import americanExpress from "../../img/americanExpress.png";
import Mastercard from "../../img/Mastercard.png";
import PayPal from "../../img/PayPal.png";
import appStore from "../../img/appStore.png";
import googleStore from "../../img/googleStore.png";
import MainBtn from "../MainBtn/MainBtn";

export default function Footer() {
  return (
    <>
      <footer className="  py-5" id={style.footer}>
        <div className="container">
          <h3 className="fw-bold">Get the FreshCart app</h3>
          <p>
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className={style.inputBtn}>
            <input
              type="email"
              className={`${style.input} form-control`}
              id="exampleInputEmail1"
              placeholder="Email ..."
            />
            <MainBtn theam={"main-btn"} text={"Share App Link"} />
          </div>
          <hr />
          <div className={style.inputBtn}>
            <div className={style.right}>
              <p className="h5 fw-bold">Payment Partners</p>
              <div className={style.partners}>
                <img src={amazonPay} alt="amazon Pay" />
                <img src={americanExpress} alt="american Express" />
                <img src={Mastercard} alt="Mastercard" />
                <img src={PayPal} alt="PayPal" />
              </div>
            </div>
            <div className={style.left}>
              <p className="h5 fw-bold">Get deliveries with FreshCart</p>
              <div className={style.partners}>
                <img src={appStore} alt="app Store" />
                <img src={googleStore} alt="google Store" />
              </div>
            </div>
          </div>
          <hr />
        </div>
      </footer>
    </>
  );
}
