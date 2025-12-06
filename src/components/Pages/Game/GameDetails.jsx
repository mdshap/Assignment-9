import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../../Loader";
import {motion, AnimatePresence} from "framer-motion"

const GameDetails = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load data.json");
        return res.json();
      })
      .then((data) => {
        const found = data.find((g) => String(g.id) === String(id));
        if (!found) {
          setNotFound(true);
          setGame(null);
        } else {
          found._numericRating =
            Number(found.ratings) || Number(found.rating) || 0;
          setGame(found);
          setNotFound(false);
        }
      })
      .catch((err) => {
        console.error("Error loading game data:", err);
        setNotFound(true);
        setGame(null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;

  if (notFound)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Game not found</h2>
          <p className="text-sm text-gray-500">
            We couldn't find the game you're looking for.
          </p>
        </div>
      </div>
    );

  if (!game) return <Loader />;

  const fullStars = Math.floor(game._numericRating);
  const halfStar = game._numericRating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="min-h-screen md:py-12">
      <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
        <AnimatePresence>
        <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}
      >
        <div className="bg-transparent md:rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 place-content-center md:grid-cols-3 gap-6 p-6 md:p-8">
            <div className="md:col-span-1 flex items-start">
              <div className="w-full">
                <div className="rounded-xl overflow-hidden shadow-2xl transform transition hover:scale-[1.01]">
                  <img
                    src={game.coverPhoto}
                    alt={game.title}
                    className="w-full h-auto object-cover aspect-2/3"
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col justify-center ">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-secondary leading-tight">
                {game.title}
              </h1>

              <p className="mt-2 text-sm lg:text-lg text-gray-600">
                by{" "}
                <span className="font-medium text-blue-600">
                  {game.developer}
                </span>
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-yellow-400 px-3 py-1 rounded-full text-sm lg:text-lg text-secondary">
                  <span className="font-medium">{game.category}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-sm">
                  <div className="flex items-center">
                    {Array.from({ length: fullStars }).map((_, i) => (
                      <svg
                        key={`f-${i}`}
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                      </svg>
                    ))}
                    {halfStar && (
                      <svg
                        className="w-4 h-4 text-yellow-400"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                      </svg>
                    )}
                    {Array.from({ length: emptyStars }).map((_, i) => (
                      <svg
                        key={`e-${i}`}
                        className="w-4 h-4 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.45a1 1 0 00-.364 1.118l1.287 3.955c.3.921-.755 1.688-1.538 1.118l-3.37-2.45a1 1 0 00-1.175 0l-3.37 2.45c-.783.57-1.838-.197-1.538-1.118l1.287-3.955a1 1 0 00-.364-1.118L2.063 9.382c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.955z" />
                      </svg>
                    ))}
                  </div>
                  <div className="text-sm lg:text-md text-gray-700 ml-2">
                    {game.ratings} / 5
                  </div>
                </div>
              </div>

              <div className="mt-6 text-black leading-relaxed text-base lg:text-lg">
                {game.description}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    Genre
                  </div>
                  <div className="mt-1 font-medium text-gray-800 dark:text-gray-100">
                    {game.category}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-xs text-gray-500 dark:text-gray-300">
                    Developer
                  </div>
                  <div className="mt-1 font-medium text-gray-800 dark:text-gray-100">
                    {game.developer}
                  </div>
                </div>

                <div className="col-span-full mt-4">
                  <a
                    href={game.downloadLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-6 py-3 bg-secondary text-white rounded-md">
                    Download / Visit Official Page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default GameDetails;
