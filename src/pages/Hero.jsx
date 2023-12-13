import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DiscoverTv from "../components/tvSeries/DiscoverTv";
import "react-loading-skeleton/dist/skeleton.css";
import ErorNetworkPop from "../components/erorNetwork/ErorNetworkPop";
import SkeletonLoading from "../components/loading/SkeletonLoadingMovie";
import { UseSearchMovie } from "../ApiCall/UseSearch";
import { UseMovieDataApi } from "..//ApiCall/UseMovieApi";
import { ToastContainer } from "react-toastify";
import { AddFavoriteButtonMovie } from "../components/AddFavoriteButton";

export default function Hero() {

  const {
    isEror,
    isLoading,
    setSortMovie,
    data: getMovies,
    setDataMovies,
    dataMovies,
  } = UseMovieDataApi();
  const { search: searchMovie } = UseSearchMovie();

  const [filterList, setFilterList] = useState([
    {
      _id: 1,
      name: "Random",
      type: "random",
      active: true,
    },
    {
      _id: 2,
      name: "Popular",
      type: "popular",
      active: false,
    },
    {
      _id: 3,
      name: "Upcoming",
      type: "upcoming",
      active: false,
    },
  ]);
  const [filterChanged, setFilterChanged] = useState(false);

  const filterMenuDiscover = useCallback(
    (type) => {
      if (type === "popular") {
        setSortMovie(`&sort_by=vote_average.desc`);
      } else if (type === "upcoming") {
        setSortMovie(`&sort_by=primary_release_date.desc`);
      } else {
        setSortMovie(``);
      }
    },
    [setSortMovie]
  );

  useEffect(() => {
    const filtering = filterList.find((item) => item.active);
    filterMenuDiscover(filtering.type);
    setFilterChanged(true);
  }, [filterList, filterMenuDiscover]);

  useEffect(() => {
    if (filterChanged) {
      const timerId = setTimeout(() => {
        getMovies();
        setFilterChanged(false);
      }, 300);
      return () => clearTimeout(timerId);
    }
  }, [filterChanged, filterList, getMovies]);
  if (isEror === true) {
    return <ErorNetworkPop />;
  }

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
    <div className="justify-center items-center overflow-hidden flex sticky pt-10 mt-20">
      <ToastContainer />
      <div className="container">
        <div className="absolute bg-[#812DE2] bg-opacity-30 top-40 blur-[100px] lg:w-[50vh] lg:h-[20vh] w-[40vh] h-[10vh] z-0 right-0 rounded-full"></div>
        <div className="absolute -left-40 bottom-[40%] bg-[#423EE0] bg-opacity-20 blur-[100px] z-10 w-[50vh] h-[70vh] rounded-full "></div>
        <div className="absolute left-[40%] bottom-[38%] bg-[#3EE0D6] bg-opacity-30 blur-[100px] z-10 w-[30vh] h-[20vh] rounded-full "></div>
        <div className="absolute right-0 bottom-28 bg-[#423EE0] bg-opacity-30 blur-[100px] z-10 w-[30vh] h-[40vh] rounded-full "></div>
        <div className="z-20 flex flex-col">
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
          </div>
          <div className="flex z-20 flex-wrap lg:gap-[37px] justify-center gap-x-5">
            {isLoading && <SkeletonLoading cards={12} />}
            {dataMovies.slice(0, 12).map((val, key) => (
              <div key={key} className="mt-10 w-56">
                <div className="rounded-lg w-[14rem]  h-[20rem] shadow-lg overflow-hidden">
                  <Link to={`/movie/${val.id}`}>
                    <img
                      alt="poster movie"
                      src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                      key={key}
                      className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-lg"
                    />
                  </Link>
                </div>

                <div className="flex items-end justify-end mt-2 -mr-2">
                  <div className=" absolute py-[2px] text-center items-center px-2 rounded-full bg-yellow-400">
                    <span className="font-medium text-[12px]">
                      {val.vote_average}/ 10
                    </span>
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="">
                    <h6 className="text-teal-600 font-mono text-[11px]">
                      {val.release_date}
                    </h6>
                    <h1 className="text-white text-lg font-medium -mt-1">
                      {val.title}
                    </h1>
                  </div>
                  <AddFavoriteButtonMovie id={val.id} />
                </div>
              </div>
            ))}
          </div>
          <Link to={`/movie/all-movie`}>
            <div className="flex w-full justify-center mt-20">
              <button className="px-11 py-3 lg:w-auto rounded-full text-sm text-white bg-[#DC2064] hover:bg-[#c61858]">
                See All Movie
              </button>
            </div>
          </Link>

          <DiscoverTv isLoadind={isLoading} />
        </div>
      </div>
    </div>
  );
}
