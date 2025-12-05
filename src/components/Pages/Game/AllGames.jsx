import React, { use, useEffect, useState } from "react";
import { FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../../Loader";
import TableBody from "./TableBody";
import { motion, AnimatePresence } from "framer-motion";

const AllGames = () => {
  const [games, setGames] = useState([]);

  const [gamesLoading, setGamesLoading] = useState(true);
  const { loading } = use(AuthContext);

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

  if (gamesLoading || loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table h-[94vh]">
          <thead className="py-2">
            <tr className="bg-blue-600 text-white">
              <th className="hidden lg:block">
                <label>S.l No.</label>
              </th>

              <th className="">
                <label>Game Name</label>
              </th>

              <th className="">
                <label>
                  <p className="flex gap-2 items-center">Rating</p>
                </label>
              </th>

              <th className="hidden sm:block">Type</th>
              <th>Action</th>
            </tr>
          </thead>

          {games.map((game, index) => {
            return (
              
                <TableBody
                  key={game.id}
                  game={game}
                  count={index + 1}></TableBody>

            );
          })}
        </table>
      </div>
    </div>
  );
};

export default AllGames;
