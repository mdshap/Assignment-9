import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";

import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../../Loader";
import GameCard from "./GameCard";

const PopularGames = () => {

  const [games, setGames] = useState([]);
  const [gamesLoading, setGamesLoading] = useState(true)
  const [showAll, setShowAll] = useState(false);

  const {loading } =use(AuthContext)


  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setGames(data);
        setGamesLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load game data:", err);
        setGamesLoading(false);
      });
  }, []);

  const handleShowAll = () =>{
    setShowAll(!showAll)
  }

  if(loading || gamesLoading){
    return(
      <Loader></Loader>
    )
  }

  return (
    <div className="">

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {games.slice(0,3).map((game) => (
          <GameCard key={game.id} game={game}></GameCard>
        ))}
      </div>
      
      <div className="w-full flex justify-center mt-5">
        <button 
        onClick={handleShowAll}
        className="btn btn-ghost mx-auto">{ showAll ? 'Show Less' : 'Show All'}</button>
      </div>
    </div>
  );
};

export default PopularGames;
