
import React, { use, useEffect, useState } from "react";
import TableBody from "./TableBody";
import { FaSortNumericDown, FaSortNumericDownAlt } from "react-icons/fa";
import { AuthContext } from "../../Authentication/AuthContext";
import Loader from "../../Loader";

const AllGames = () => {
  const [books, setBooks] = useState([]);
  const [ascending, setAscending] = useState(false);

  const [booksLoading, setLoading] = useState(true);
  const { loading } = use(AuthContext);


  if (booksLoading || loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="md:mt-10">
      <div className="overflow-x-auto">
        <table className="table h-[94vh]">
          <thead >
            <tr className="bg-green-200 text-black">
              <th className="hidden lg:block">
                <label>S.l No.</label>
              </th>

              <th className="">
                <label>Book Name & Author</label>
              </th>

              <th className="">
                <label>
                  <p className="flex gap-2 items-center">Rating {
                    ascending ? (<FaSortNumericDown className=" text-xl p-0.5 font-normal cursor-pointer border rounded-md" onClick={()=>setAscending(!ascending)} data-tooltip-id="my-tooltip" data-tooltip-content="Sort Descending"/>) : (<FaSortNumericDownAlt className=" text-xl p-0.5 font-normal cursor-pointer border rounded-md" onClick={()=>setAscending(!ascending)} data-tooltip-id="my-tooltip" data-tooltip-content="Sort Ascending" />) }</p>
                  
                </label>
              </th>

              <th className="hidden sm:block">Genre</th>
              <th>Action</th>
            </tr>
          </thead>

          {books.map((book, index) => {
            return (
              <TableBody
                key={book._id}
                book={book}
                count={index + 1}></TableBody>
            );
          })}
        </table>
      </div>
    </div>
  );
};


export default AllGames;