import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function MovieSearchDiscover({ handleFilter }) {
  return (
    <div className="flex z-20">
      <div className={`p-2 z-10 bg-transparent`}>
        <SearchIcon
          sx={{ fontSize: 25 }}
          className="text-[#ffffff63] cursor-pointer "
        />
      </div>
      <div className={`-ml-11`}>
        <input
          type="text"
          placeholder="Search something here...."
          onChange={({ target }) => handleFilter(target.value)}
          className={`font-thin py-2 lg:px-10 px-20 sm:px-20 bg-gray-300 bg-opacity-10 text-white rounded-full`}
        />
      </div>
    </div>
  );
}

export default MovieSearchDiscover;
