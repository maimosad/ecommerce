import React from "react";
import img1 from "../../img/slider-image-1.jpeg";
import img2 from "../../img/slider-image-2.jpeg";
import img3 from "../../img/slider-image-3.jpeg";
import img4 from "../../img/1.png";
import img5 from "../../img/2.png";
import Slider from '../Slider/Slider'
import style from "./MainSlider.module.css";

export default function ProductDetails() {

  return (
    <>
      <section id={style.mainSlider}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9 p-0">
              <Slider dots={true}>
                <img src={img1} alt="img1" className={style.sliderImg} />
                <img src={img2} alt="img2" className={style.sliderImg} />
                <img src={img3} alt="img3" className={style.sliderImg} />
              </Slider>
            </div>
            <div className={`${style.right} col-3 p-0`}>
              <img src={img4} alt="" className={`img-fluid h-50`} />
              <img src={img5} alt="" className={`img-fluid h-50`} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
