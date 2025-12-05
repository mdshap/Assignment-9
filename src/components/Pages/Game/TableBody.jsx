import React, { use } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../../Loader";




const TableBody = ({ game, count }) => {
    const {loading} = use(AuthContext)

    if(loading){
        return(
            <tbody>
                <Loader></Loader>
            </tbody>
            
        )
    }
  return (

    <tbody>

      <tr className="">
        <td className="hidden lg:block">{count}</td>

        <td>
          <div className="flex items-center gap-3  w-42 lg:w-120">
            <div className="avatar border-2">
              <div className="h-25 w-15 md:h-45 md:w-30">
                <img
                  src={game.coverPhoto}
                  alt="game image"
                />
              </div>
            </div>
            <div className="">
              <div className="font-bold text-sm md:text-xl ">{game.title}</div>
              <div className="text-sm opacity-50">{game.author}</div>
            </div>
          </div>
        </td>
        
        <td className="text-yellow-600 font-bold text-md md:text-lg">{game.ratings}</td>
        <td className=" hidden sm:inline text-md  md:text-lg">
            <p className="my-14">
            {game.category}
            </p>
            </td>

        <td>
          <div className="flex flex-col  justify-center gap-3">
            <Link
              to={`/game-details/${game?.id}`}
              className="btn text-[11px] h-8 sm:text-md p-1.5 sm:p-4 bg-secondary text-white ">
              Details
            </Link>
            <button className="btn text-[11px] h-8 sm:text-md p-1.5 bg-transparent"><a 
            target="_blank"
            href={game.downloadLink}>Download</a></button>
          </div>
        </td>
      </tr>
    </tbody>

  );
};

export default TableBody;
