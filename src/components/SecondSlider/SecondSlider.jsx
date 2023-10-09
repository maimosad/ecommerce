import React from "react";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./SecondSlider.module.css";
import useAxios from "../../Hooks/useAxios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function SecondSlider() {
  let { data, isLoading } = useAxios(
    "https://route-ecommerce.onrender.com/api/v1/categories"
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    autoplaySpeed: 2000,
    className: 'sample',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 279,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <>
      <section id={style.secondslider}>
      <h2>Shop Popular Categories</h2>
      <div className="container-fluid">
        {isLoading ? <Loader /> : ""}
        <Slider {...settings}>
          {data?.data?.map((el, i) => (
            <div className="py-3" key={i}>
              <img className={style.SecondSliderImg} src={el.image} alt="s" />
              {/* <Link to={`productDetails/${el._id}`}> */}
                <p className={`${style.categoryName} fw-bold m-0`}>{el.name}</p>
              {/* </Link> */}
            </div>
          ))}
        </Slider>
      </div>
      </section>
    </>
  );
}
