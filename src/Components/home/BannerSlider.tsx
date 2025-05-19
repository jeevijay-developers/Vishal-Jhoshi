import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
// Default theme
import "@splidejs/react-splide/css";

// or other themes
// import "@splidejs/react-splide/css/skyblue";
// import "@splidejs/react-splide/css/sea-green";

// or only core styles
// import "@splidejs/react-splide/css/core";
const BannerSlider = () => {
  return (
    <div>
      <Splide aria-label="My Favorite Images">
        <SplideSlide>
          <img src="/assets/images/home/study.jpg" alt="Image 1" />
        </SplideSlide>
        <SplideSlide>
          <img src="/assets/images/home/study.jpg" alt="Image 1" />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default BannerSlider;
