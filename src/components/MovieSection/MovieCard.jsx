import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import DiscoverTv from "../tvSeries/DiscoverTv";
import "react-loading-skeleton/dist/skeleton.css";
import ErorNetworkPop from "../erorNetwork/ErorNetworkPop";
import SkeletonLoading from "../loading/SkeletonLoadingMovie";
import { UseMovieDataApi } from "../../ApiCall/UseMovieApi";
import { ToastContainer } from "react-toastify";
import { AddFavoriteButtonMovie } from "../AddFavoriteButton";
import { UseSearchMovie } from "../../ApiCall/UseSearch";
import MovieFilteredMenu from "./MovieFilteredMenu";
import NotFoundIMG from "../../data/not-found-image.jpg";

export default function MovieCard() {
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

  return (
    <div className="justify-center items-center overflow-hidden flex sticky pt-10 mt-20">
      <ToastContainer />
      <div className="container">
        <div className="absolute bg-[#812DE2] bg-opacity-30 top-40 blur-[100px] lg:w-[50vh] lg:h-[20vh] w-[40vh] h-[10vh] z-0 right-0 rounded-full"></div>
        <div className="absolute -left-40 bottom-[40%] bg-[#423EE0] bg-opacity-20 blur-[100px] z-10 w-[50vh] h-[70vh] rounded-full "></div>
        <div className="absolute left-[40%] bottom-[38%] bg-[#3EE0D6] bg-opacity-30 blur-[100px] z-10 w-[30vh] h-[20vh] rounded-full "></div>
        <div className="absolute right-0 bottom-28 bg-[#423EE0] bg-opacity-30 blur-[100px] z-10 w-[30vh] h-[40vh] rounded-full "></div>
        <div className="z-20 flex flex-col">
          <MovieFilteredMenu
            searchMovie={searchMovie}
            setDataMovies={setDataMovies}
            filterList={filterList}
            setFilterList={setFilterList}
          />
          <div className="flex z-20 flex-wrap lg:gap-[37px] justify-center gap-x-5">
            {isLoading && <SkeletonLoading cards={12} />}
            {dataMovies.slice(0, 12).map((val, key) => (
              <div key={key} className="mt-10 w-56">
                <div className="rounded-lg w-[14rem]  h-[20rem] shadow-lg overflow-hidden">
                  <Link to={`/movie/${val.id}`}>
                    <img
                      alt="poster movie"
                      src={
                        val.poster_path
                          ? `${process.env.REACT_APP_IMG_URL}${val.poster_path}`
                          : NotFoundIMG
                      }
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
                    <h6 className="text-[#0FBDB3] font-mono text-[11px]">
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
