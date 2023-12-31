import React from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UseSearchTv } from "../../ApiCall/UseSearch";
import { UseTvSeries } from "../../ApiCall/UseTvSeries";
import SkeletonLoading from "../loading/SkeletonLoadingMovie";
import FIlterDiscoverTv from "./FIlterDiscoverTv";
import SearchDiscoverTv from "./SearchDiscoverTv";
import { AddFavoriteButtonTv } from "../AddFavoriteButton";
import NotFoundIMG from "../../data/not-found-image.jpg";

export default function DiscoverTv({ isLoadind }) {
  const { getTvSeries, setSortTv, setTvSeries, tvSeries } = UseTvSeries();
  const { search: searchTv } = UseSearchTv();
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col mt-20">
        <div className="flex flex-col z-20 lg:flex-row gap-5 mt-20 lg:flex justify-center lg:justify-between items-center">
          <h2 className="text-white text-xl font-semibold">
            Discover{" "}
            <span className=" before:absolute before:inset-3.5 before:left-0 before:w-full before:h-1/2 before:bg-sky-700 relative inline-block">
              <span className="relative ">Tv</span>
            </span>
          </h2>
          <FIlterDiscoverTv setSortTv={setSortTv} getTv={getTvSeries} />
          <SearchDiscoverTv setTvSeries={setTvSeries} searchTv={searchTv} />
        </div>
        <div className="flex z-20 flex-wrap lg:gap-[37px] justify-center gap-x-5">
          {isLoadind && <SkeletonLoading cards={12} />}
          {tvSeries.slice(0, 12).map((val, key) => (
            <div key={key} className="mt-10 w-56">
              <Link to={`/tv/${val.id}`}>
                <div className="rounded-lg w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                  <img
                    alt="tv poster"
                    src={
                      val.poster_path
                        ? `${process.env.REACT_APP_IMG_URL}${val.poster_path}`
                        : NotFoundIMG
                    }
                    key={key}
                    className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-lg"
                  />
                </div>
              </Link>

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
                    {val.first_air_date}
                  </h6>
                  <h1 className="text-white text-lg font-medium -mt-1">
                    {val.name}
                  </h1>
                </div>
                <AddFavoriteButtonTv id={val.id} />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-20">
          <Link to={`/tv/all-tv-series`}>
            <div className="px-8 py-3 rounded-full text-sm text-white bg-[#DC2064] hover:bg-[#ab194e]">
              <button>See All Tv Series</button>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
