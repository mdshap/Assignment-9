import React, { use } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../../Loader";

const GameCard = ({ game }) => {
  const r = Math.max(0, Math.min(5, Math.round(game?.ratings)));

  return (

    <motion.div
          whileHover={{
          scale: 1.05,
          boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full max-w-[350px] bg-white  rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl"
        animate={{ rotate: 360 }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01],
        }}>
    <div className="w-full max-w-[350px] bg-white  rounded-xl shadow-md overflow-hidden transform transition hover:-translate-y-1 hover:shadow-xl">
      
          
        <div
          className="h-120 bg-center bg-cover"
          style={{ backgroundImage: `url(${game?.coverPhoto})` }}
        />
        

        <div className="p-4">
          <h3 className="text-xl font-semibold text-secondary line-clamp-2 min-h-12">
            {game?.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">{game?.developer}</p>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < r ? "text-yellow-400" : "text-gray-300"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                </svg>
              ))}
            </div>

            <div className="text-sm font-medium text-secondary bg-yellow-300 rounded-xl px-3 py-1">
              {game?.category}
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <Link
              to={`/game-details/${game?.id}`}
              className="flex-1 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium bg-secondary text-white hover:bg-indigo-700 transition">
              Details
            </Link>
            
            <button className="flex-1 inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium border border-secondary text-secondary hover:bg-indigo-50 dark:hover:bg-indigo-900/40 transition">
              <a target="_blank" href={game.downloadLink}>
                Download
              </a>
            </button>
          </div>
        </div>

    </div>
    </motion.div>
  );
};

export default GameCard;
