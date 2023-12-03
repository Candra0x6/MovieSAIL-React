import React, { useState } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Img from "../../../profile.jpg";
import Loading from "../../../components/loading/Loading";
import { UseTvbyID } from "../../../ApiCall/UseDatabyID";
export default function TvSeriesPage() {
  const { TvCredits, recommend, episode, isLoading, getTv, id } = UseTvbyID();
  const [show, setShow] = useState(false);
  const [seasonNum, setSeasonNum] = useState(null);
  const [visibleTv, setvisibleTv] = useState(8);

  const handleShow = () => {
    setShow(!show);
  };

  const handleVisible = () => {
    setvisibleTv((prevValue) =>
      prevValue + 8 >= TvCredits?.cast?.length
        ? TvCredits?.cast?.length
        : prevValue + 8
    );
  };

  const handleShowAll = () => {
    setvisibleTv(TvCredits?.cast?.length);
  };

  return (
    <>
      <div className="flex justify-center sticky overflow-hidden bg-gradient-to-t from-[#13123A] via-[#13123A] to-transparent">
        <div className="container">
          {isLoading && <Loading />}
          {getTv && (
            <>
              <div className="flex flex-wrap justify-center mt-7 px-3">
                <div className="rounded-md h-[21rem] w-[15rem] flex overflow-hidden bg-cover bg-center shadow-lg">
                  <img
                    alt="poster"
                    src={`${process.env.REACT_APP_IMG_URL}${getTv.poster_path}`}
                    className="hover:scale-110 transition-all duration-500 w-full object-cover object-center h-full rounded-md"
                  />
                </div>
                <div className="flex-row ml-6 lg:w-[70vh] md:w-[30rem] w-[40vh] md:mt-0 mt-5 ">
                  <div className="text-white mb-4">
                    <h1 className="text-2xl mb-4 font-medium">{getTv.title}</h1>
                    {getTv?.genres?.map((val, id) => (
                      <span
                        className="bg-red-500 px-2 py-[2px] text-[10px] rounded-md mr-2"
                        key={id}
                      >
                        {val.name}
                      </span>
                    ))}
                  </div>
                  <div>
                    <div
                      onClick={handleShow}
                      className={`group gap-2 mb-4 items-center text-white cursor-pointer hover:text-red-500 ${
                        show ? "text-red-500" : ""
                      } flex `}
                    >
                      <button
                        className={`rounded-full border-[1px] p-3 border-white group-hover:border-red-500 ${
                          show ? "border-red-500" : ""
                        }`}
                      >
                        <PlayArrowIcon className="" />
                      </button>
                      <h1 className="">Watch Trailer</h1>
                    </div>
                  </div>
                  <div className="text-white mb-4">
                    <h1 className="font-medium">Overview</h1>
                    <p className="w-full text-justify text-xs">
                      {getTv.overview}
                    </p>
                  </div>
                  <div className="flex flex-wrap md:gap-10 gap-2 pb-2 border-b-[1px] border-slate-500 ">
                    <div className="flex gap-2 items-center text-white">
                      <h1 className="font-medium text-[10px]">Status:</h1>
                      <span className="text-slate-300 text-[10px] font-medium border-white">
                        {getTv.status}
                      </span>
                    </div>
                    <div className="flex gap-2 w-auto items-center text-white">
                      <h1 className="font-medium text-[10px]">Release Date:</h1>
                      <span className="text-slate-300 text-[10px]  font-medium border-white">
                        {getTv.first_air_date}
                      </span>
                    </div>

                    <div className="flex gap-2 w-auto text-white">
                      <h1 className="font-medium text-[10px]">Language:</h1>
                      {getTv?.spoken_languages?.map((val, id) => (
                        <span
                          key={id}
                          className="text-slate-300 text-[10px] font-medium border-white"
                        >
                          {val.english_name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-row gap-2 mt-2 items-center">
                    {getTv?.production_companies
                      ?.slice(0, 1)
                      ?.map((val, id) => (
                        <>
                          <div
                            key={id}
                            className="flex gap-2 w-auto text-white pb-2 border-b-[1px] border-slate-500"
                          >
                            <h1 className="font-medium text-[10px]">
                              Production by:
                            </h1>
                            <span className="text-slate-300 mt-[2px] text-[10px] font-mono ">
                              {val.name}
                            </span>
                            <span className="text-slate-300 mt-[2px] text-[10px] font-mono ">
                              [{val.origin_country}]
                            </span>
                          </div>
                        </>
                      ))}

                    <div className="flex gap-2 mt-2 mb-4 w-auto text-white">
                      <h1 className="font-medium text-[10px]">
                        Latest Episodes:
                      </h1>
                      <span className="text-slate-300 mt-[2px] text-[10px] font-mono ">
                        {getTv.number_of_episodes}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {getTv && (
        <div className="absolute -top-2 right-0 -z-10 contrast-75 brightness-150 bg-black">
          <img
            alt="background"
            className="w-[195vh] md:h-[53vh] h-[100vh] object-fill opacity-20 saturate-200"
            src={`${process.env.REACT_APP_IMG_URL}${getTv.backdrop_path}`}
          />
        </div>
      )}
      <div className="flex justify-center sticky  pb-40 overflow-hidden bg-[#13123A] h-auto px-3">
        <div className="absolute top-40 -left-20 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[50vh]  rounded-full "></div>
        <div className="absolute top-40 -right-20 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[60vh] h-[50vh]  rounded-full "></div>
        <div className="absolute top-64 left-40 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[30vh]  rounded-full "></div>
        <div className="absolute top-1/2 -right-20 bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>
        <div className="absolute top-[75%] left-0 bg-[#423EE0] bg-opacity-40 rotate-45 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>
        <div className="absolute top-[30%] lg:left-1/2 -right-[30rem] bg-[#3EE0D6] bg-opacity-40 rotate-45 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>

        <div className={`container mt-10 z-10`}>
          <div className="flex flex-col justify-center">
            <div className={`text-white flex justify-between items-center `}>
              <h1 className=" font-bold text-lg my-5">Cast</h1>
              <div className="flex">
                <button
                  onClick={() => setvisibleTv(8)}
                  className={`mr-5 ${visibleTv > 8 ? "" : "hidden"}`}
                >
                  <CloseIcon />
                </button>
                <h1
                  onClick={handleShowAll}
                  className="text-blue-400 font-medium text-sm border-b-[2px] cursor-pointer border-blue-500"
                >
                  See All
                </h1>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-14 overflow-x-auto">
              {TvCredits?.cast?.slice(0, visibleTv)?.map((val, key) => (
                <div
                  className="flex-col w-32 flex justify-center items-center gap-2"
                  key={key}
                >
                  <div className="rounded-full w-28 h-24">
                  <Link to={`/person/${val.id}`}>
                    <img
                      src={
                        val.profile_path
                          ? `${process.env.REACT_APP_IMG_URL}${val.profile_path}`
                          : Img
                      }
                      alt="cast"
                      className="w-full cursor-pointer h-full rounded-full"
                    />
                    </Link>
                  </div>
                  <div className="text-white text-center ml-2 w-full h-full">
                    <h1 className="font-medium text-sm">{val.name}</h1>
                    {val.roles && val.roles.length > 0 && (
                      <h1 className="font-normal text-xs text-slate-400 ">
                        {val.roles[0].character}
                      </h1>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-20 lg:mb-10 rounded-full">
              <button
                onClick={handleVisible}
                className={`py-2 px-8 rounded-full ring-2 ring-red-500 hover:bg-red-500 transition-all duration-500 text-white ${
                  visibleTv === TvCredits?.cast?.length ? "hidden" : ""
                }`}
              >
                Load More
              </button>
            </div>
          </div>
          <div className="flex flex-col lg:mb-0 -mb-20">
            {episode && (
              <div className="flex justify-between">
                <h1 className="mt-10 font-bold text-lg mb-5 text-white">
                  Last Episodes
                </h1>
                <h1 className="mt-10 font-bold text-lg mb-5 text-white">
                  {episode.name} [{episode.season_number}]
                </h1>
              </div>
            )}
            <div className="grid grid-flow-col w-auto overflow-scroll h-[40vh] gap-5 hide-scrollbar">
              {episode?.episodes?.map((episode) => (
                <div
                  className="rounded-lg w-[25vh] lg:w-[30vh] lg:h-[20vh] items-center flex flex-col h-[15vh] group cursor-pointer sticky overflow-hidden"
                  key={episode.id}
                >
                  <div className="w-full group rounded-xl h-full relative group-hover:opacity-70 transition-all duration-500 flex justify-center items-center">
                    <div className="">
                      <img
                        alt="epidode"
                        className="rounded-xl group-hover:scale-105 transition-all w-full h-full duration-500 hue-rotate-15 brightness-110"
                        src={`${process.env.REACT_APP_IMG_URL}${episode.still_path}`}
                      />
                    </div>

                    <div className="absolute flex group-hover:translate-y-[0%] group-hover:items-center group-hover:from-transparent group-hover:via-transparent  text-center bg-gradient-to-t from-[#000000] via-[#000000] to-transparent inset-0 transition-all duration-500 translate-y-[40%] flex-col items-start z-0 justify-center">
                      <Link
                        to={`/tv/${id}/season/${episode.season_number}?episode=${episode.id}`}
                      >
                        <button className="rounded-full z-10 group-hover:border-red-500 hidden group-hover:flex border-[1px] p-3 border-white">
                          <PlayArrowIcon className="text-white group-hover:text-red-500" />
                        </button>
                      </Link>
                      <div className="text-white text-xs w-3/4 -ml-5 group-hover:hidden">
                        <h1 className="text-base text-gray-200 group-hover:mb-0 font-mono">
                          Episodes {episode.episode_number}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-lg mb-5 text-white">Seasons</h1>
            <div className="grid grid-flow-col w-auto overflow-scroll h-[40vh] gap-5 hide-scrollbar">
              {getTv?.seasons?.map((val, id) => (
                <div
                  onMouseEnter={() => setSeasonNum(val.season_number)}
                  className="rounded-lg lg:w-[12rem] flex flex-col lg:h-[30vh] w-[10vh] h-[20vh] group cursor-pointer overflow-hidden"
                  key={val.id}
                >
                  <div className="w-full group rounded-xl h-full relative group-hover:opacity-70 transition-all duration-500 flex justify-center items-center">
                    <div className="">
                      <img
                        alt="poster"
                        className="rounded-xl group-hover:scale-105 transition-all w-full h-full duration-500"
                        src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                      />
                    </div>
                    <div className="absolute flex text-center group-hover:from-transparent group-hover:via-transparent group-hover:to-transparent group-hover:bg-black group-hover:bg-opacity-50 bg-gradient-to-t from-[#000000] via-[#000000] to-transparent inset-0 transition-all duration-500 translate-y-[50%] group-hover:backdrop-blur-[2px] group-hover:translate-y-0 flex-col items-center z-0 justify-center">
                      <div className="text-white text-xs mt-4 font-medium group-hover:mb-5 w-3/4">
                        <h1 className="text-base text-gray-200 mb-10 group-hover:mb-0 font-medium">
                          {val.name}
                        </h1>
                        <h1> Episodes {val.episode_count}</h1>
                      </div>
                      <div>
                        {
                          <Link to={`/tv/${getTv.id}/season/${seasonNum}`}>
                            <button className="rounded-full z-10 group-hover:border-red-500  border-[1px] p-3 border-white">
                              <PlayArrowIcon className="text-white group-hover:text-red-500" />
                            </button>
                          </Link>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="mt-10 font-bold text-lg mb-5 text-white">
              Recommendation
            </h1>
            <div className="flex flex-wrap md:gap-[37px] justify-center gap-x-5">
              {recommend &&
                recommend?.slice(0, 18)?.map((val, key) => (
                  <div className="mt-10 w-56">
                    <Link
                      to={`/tv/${val.id}`}
                     
                    >
                      <div className="rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                        <img
                          alt="poster"
                          src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                          key={key}
                          className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-md"
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
                    <div className="mt-2">
                      <h6 className="text-teal-600 font-mono text-[11px]">
                        {val.first_air_date}
                      </h6>
                      <h1 className="text-white text-lg font-medium -mt-1">
                        {val.name}
                      </h1>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
