import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const BannerSlider = () => {
  return (
    <div style={{ maxWidth: "100%", margin: "0 auto" }}>
      <Splide
        aria-label="My Favorite Images"
        options={{
          type: "fade", // or 'loop', 'slide', etc.
          height: "400px", // Adjust slider height
          width: "100%", // Use full width or set custom width like '800px'
          autoplay: true,
          interval: 3000,
          pauseOnHover: true,
          resetProgress: false,
          arrows: true,
          pagination: true,
        }}
      >
        <SplideSlide>
          <img
            src="/assets/images/home/study.jpg"
            alt="Image 1"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SplideSlide>
        <SplideSlide>
          <img
            src="/assets/images/home/study.jpg"
            alt="Image 2"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </SplideSlide>
      </Splide>
    </div>
  );
};

export default BannerSlider;
