import React from "react";
import Banner from "./Banner";
import PopularGames from "../Game/PopularGames";

const Home = () => {
  return (
    <div>
      <Banner />

      <div className="`w-full max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 bg-transparent my-20">
        <h3 className="text-3xl md:text-4xl font-bold text-center my-6">
          Top <span className="text-green-500 ">Reviewed Games</span>
        </h3>
        <PopularGames></PopularGames>
      </div>
    </div>
  );
};

export default Home;
