import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails(props) {
  var settings = {
    dots: props.dots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: false,
    prevArrow: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <Slider {...settings}>
        {props.children.map((el,i)=>(
          <img key={i} src={el.props.src} className={`${el.props.className} cursor-grab`} alt={el.props.alt}/>
        ))}
      </Slider>
    </>
  );
}
