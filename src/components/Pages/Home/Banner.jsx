import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "/pubg.png";
import banner2 from "/asphalt9.png";
import banner3 from "/fifa.png";

const Banner = () => {
  return (
      <Carousel className=" mx-auto" autoPlay={true} infiniteLoop={true}>
        <div>
          <img className="w-50" src={banner1} />
        </div>
        <div>
          <img className="w-50"  src={banner2} />
        </div>
        <div>
          <img className="w-50"  src={banner3} />
        </div>
      </Carousel>
  );
};

export default Banner;
