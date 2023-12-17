import React from "react";
import MovieSearchDiscover from "./MovieSearchDiscover";

function MovieFilteredMenu({
  searchMovie,
  setDataMovies,
  setFilterList,
  filterList,
}) {
  const handleFilter = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setDataMovies(query);
    }
  };

  const handleFilterClick = (id) => {
    setFilterList((prevFilterList) =>
      prevFilterList.map((item) => ({
        ...item,
        active: item._id === id ? true : false,
      }))
    );
  };
  return (
    <div className="flex z-20 flex-col lg:flex-row gap-5 lg:flex font-medium justify-center lg:justify-between items-center">
      <div>
        <h2 className="text-white text-xl font-semibold">
          Discover{" "}
          <span className=" before:absolute before:inset-3.5 before:left-0 before:w-full before:h-1/2 before:bg-sky-700 relative inline-block">
            <span className="relative ">Movies</span>
          </span>
        </h2>
      </div>
      <div>
        <ul className="text-white items-center text-lg  flex gap-5">
          {filterList.map((val) => (
            <li
              key={val._id}
              className={`cursor-pointer pb-2 ${
                val.active ? "border-b-2 border-red-700 text-red-500" : ""
              }`}
              onClick={() => handleFilterClick(val._id)}
            >
              {val.name}
            </li>
          ))}
        </ul>
      </div>
      <MovieSearchDiscover handleFilter={handleFilter} />
    </div>
  );
}

export default MovieFilteredMenu;
