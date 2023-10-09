import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import SecondSlider from "../SecondSlider/SecondSlider";

export default function Home() {
  return (
    <>
      <MainSlider />
      <SecondSlider />
      <FeaturedProducts sectionTitle="Featured Products"/>
    </>
  );
}
