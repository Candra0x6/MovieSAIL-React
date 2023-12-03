import React, { useState, useRef } from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import Img from "../../../profile.jpg";
import StarIcon from "@mui/icons-material/Star";
import ReactPlayer from "react-player";
import Loading from "../../../components/loading/Loading";
import { UseMoviebyID } from "../../../ApiCall/UseDatabyID";

export default function PageMovieId() {
  
  const {Video,
    trailer,
    recommend,
    review,
    Loading : isLoading,
    movie,
    cast,
    videos,
    setVideos
  } = UseMoviebyID()
  const [visreview, setVisreview] = useState(2);
  const [visible, setVisible] = useState(8);
  const [show, setShow] = useState(false);
  const [showvideos, setShowVideos] = useState(false);
  const trailerVideo = useRef(null);

  const handleShow = () => {
    setShow(!show);
  };

  const handleVisible = () => {
    setVisible((prevValue) =>
      prevValue + 8 >= cast.casts.length ? cast.casts.length : prevValue + 8
    );
  };

  const handleReview = () => {
    setVisreview((prevValue) =>
      prevValue + 2 >= review.length ? review.length : prevValue + 2
    );
  };
  const handleShowAll = () => {
    setVisible(cast.casts.length);
  };

  
  const handleNonClick = (inside) => {
    if (inside.target.id === "modal") {
      setShow(!show);
    }
  };
  const handleCloseVideo = (inside) => {
    if (inside.target.id === "video") {
      setShowVideos(!showvideos);
    }
  };

  const handleVideos = (key) => {
    setVideos(key);
  };
 

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex justify-center bg-gradient-to-t from-[#13123A] via-[#13123A] to-transparent">
        <div className="container">
          {movie && (
            <>
              <div className="flex flex-wrap justify-center mt-7 px-3">
                <div className="rounded-md h-[21rem] w-[15rem] flex overflow-hidden bg-cover bg-center shadow-lg">
                  <img alt="Poster movie"
                    src={`${process.env.REACT_APP_IMG_URL}${movie.poster_path}`}
                    className="hover:scale-110 transition-all duration-500 w-full object-cover object-center h-full rounded-md"
                  />
                </div>
                <div className="flex-row ml-6 lg:w-[70vh] md:w-[30rem] w-[40vh] md:mt-0 mt-5 ">
                  <div className="text-white mb-4">
                    <h1 className="text-2xl mb-4 font-medium">{movie.title}</h1>
                    {movie.genres.map((val, id) => (
                      <span
                        className="bg-red-500 px-2 py-[2px] text-[10px] rounded-md mr-2"
                        key={val.id}
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
                      {movie.overview}
                    </p>
                  </div>
                  <div className="flex gap-10 pb-2 border-b-[1px] border-slate-500 ">
                    <div className="flex gap-2 items-center text-white">
                      <h1 className="font-medium text-[10px]">Status :</h1>
                      <span className="text-slate-300 text-[10px] font-medium border-white">
                        {movie.status}
                      </span>
                    </div>
                    <div className="flex gap-2 w-auto items-center text-white">
                      <h1 className="font-medium text-[10px]">
                        Release Date :
                      </h1>
                      <span className="text-slate-300 text-[10px]  font-medium border-white">
                        {movie.release_date}
                      </span>
                    </div>

                    <div className="flex gap-2 w-auto text-white">
                      <h1 className="font-medium text-[10px]">Language :</h1>
                      {movie.spoken_languages.slice(0, 1).map((val, id) => (
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
                    <div className="flex gap-2 w-auto text-white pb-2 border-b-[1px] border-slate-500">
                      <h1 className="font-medium text-[10px]">Direction :</h1>
                      {cast &&
                        cast.direct.slice(0, 1).map((val, id) => (
                          <span
                            key={val.id}
                            className="text-slate-300 text-[10px] font-medium border-white"
                          >
                            {val.original_name}
                          </span>
                        ))}
                    </div>
                    <div className="flex gap-2 mt-2 mb-4 w-auto text-white">
                      <h1 className="font-medium text-[10px]">Length :</h1>
                      <span className="text-slate-300 mt-[2px] text-[10px] font-mono border-white">
                        {movie.runtime} m
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {movie && (
        <div className="absolute -top-2 right-0 -z-10 contrast-75 brightness-150 bg-black">
          <img
          alt="background"
            className="w-[195vh]  lg:h-[47vh] sm:h-[50vh] h-[100vh]  object-fill opacity-20 saturate-200"
            src={`${process.env.REACT_APP_IMG_URL}${movie.backdrop_path}`}
          />
        </div>
      )}
      <div className="flex justify-center  pb-40 sticky overflow-hidden bg-[#13123A] h-auto px-3">
        <div className={`container mt-10`}>
          <div className="absolute top-40 -left-20 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[50vh]  rounded-full "></div>
          <div className="absolute top-40 -right-20 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[60vh] h-[50vh]  rounded-full "></div>
          <div className="absolute top-64 left-40 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[30vh]  rounded-full "></div>
          <div className="absolute top-1/2 -right-20 bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>
          <div className="absolute top-[75%] left-0 bg-[#423EE0] bg-opacity-40 rotate-45 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>
          <div className="absolute md:top-[30%] top-[20%] left-1/2 bg-[#3EE0D6] bg-opacity-40 rotate-45 blur-[100px] z-0 w-[30vh] h-[50vh]  rounded-full "></div>
          <div className={`text-white flex justify-between items-center `}>
            <h1 className=" font-bold text-lg my-5">Cast</h1>
            <div className="flex z-10">
              <button
                onClick={() => setVisible(8)}
                className={`mr-5 ${visible > 8 ? "" : "hidden"}`}
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
          <div className="flex flex-wrap z-10 justify-center gap-14 overflow-x-auto">
            {cast.casts.slice(0, visible).map((val, key) => (
              <div key={val.id} className="flex-col w-32 flex justify-center z-10 items-center gap-2">
                <Link to={`/person/${val.id}`}>
                  <div className="rounded-full w-28 h-24">
                    <img
                      alt="profil people"
                      src={`${process.env.REACT_APP_IMG_URL}${val.profile_path}`}
                      key={key}
                      className="w-full h-full cursor-pointer rounded-full"
                    />
                  </div>
                </Link>
                <div className="text-white text-center ml-2 w-full h-full">
                  <h1 className="font-medium text-sm">{val.name}</h1>
                  <h1 className="font-normal text-xs text-slate-400 ">
                    {val.character}
                  </h1>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center z-10 mt-20 mb-10 rounded-full">
            <button
              onClick={handleVisible
                
              }
              className={`py-2 px-8 rounded-full ring-2 ring-red-500 hover:bg-red-500 transition-all duration-500 text-white ${
                visible === cast.casts.length ? "hidden" : ""
              }`}
            >
              Load More
            </button>
          </div>
          <h1 className="mt-10 font-bold z-10 text-lg mb-5 text-white">
            Official Videos
          </h1>
          <div className="grid grid-flow-col z-10 w-auto overflow-scroll h-[30vh] gap-5 hide-scrollbar">
            {Video.map((val) => (
              <div
                className="rounded-lg h-[9rem] w-[17rem] group cursor-pointer flex-row"
                key={val.id}
              >
                <div
                  onClick={() => {
                    handleVideos(val.key);
                    setShowVideos(!showvideos);
                  }}
                  className="w-full rounded-xl h-full relative group-hover:opacity-70 transition-all duration-500 flex justify-center items-center bg-black"
                >
                  <div className="overflow-hidden">
                    <img
                    alt="thumbnail video"
                      className="rounded-xl group-hover:scale-105 transition-all duration-500"
                      src={`https://img.youtube.com/vi/${val.key}/mqdefault.jpg`}
                    />
                  </div>
                  <div className="absolute flex items-center z-0 justify-center">
                    <button className="rounded-full z-10 group-hover:border-red-500  border-[1px] p-3 border-white">
                      <PlayArrowIcon className="text-white group-hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="text-white text-xs mt-4 font-medium w-full">
                  <h1>{val.name}</h1>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between md:px-2 z-10">
            <h1 className="text-white font-medium text-left text-lg">Review</h1>
            <button
              className={`${visreview > 2 ? "" : "hidden"} `}
              onClick={() => {
                setVisreview(2);
              }}
            >
              <CloseIcon className="text-white" />
            </button>
          </div>
          <div className="flex flex-col items-center mb-10 z-10">
            {review.slice(0, visreview).map((val, id) => (
              <>
                {id % 2 === 0 && (
                  <div key={id} className="grid grid-cols-3 z-10 place-items-center">
                    {/* rv 1 */}
                    <div className="flex flex-col items-center z-10 w-auto xl:ml-28 lg:ml-[9rem]">
                      <div
                        className="bg-red-800 mt-10 shadow-[inset_-12px_-8px_40px_#46464620] w-[7.5rem] h-[7.5rem] flex items-center justify-center"
                        style={{
                          clipPath:
                            " polygon(100.00% 50.00%,75.00% 93.30%,25.00% 93.30%,0.00% 50.00%,25.00% 6.70%,75.00% 6.70%)",
                        }}
                      >
                        <img
                          key={id}
                          alt=" Deleted"
                          className="aspect-ratio-1 w-[7em] h-[7rem]"
                          style={{
                            clipPath:
                              " polygon(100.00% 50.00%,75.00% 93.30%,25.00% 93.30%,0.00% 50.00%,25.00% 6.70%,75.00% 6.70%)",
                          }}
                          src={
                            val.author_details.avatar_path
                              ? `${process.env.REACT_APP_IMG_URL}${val.author_details.avatar_path}`
                              : Img
                          }
                        />
                      </div>
                      <div className="flex text-white font-medium flex-col items-center">
                        <StarIcon className="text-red-500 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]" />
                        <h1 className="text-[8px] text-red-500">
                          {val.author_details.rating}
                        </h1>
                      </div>
                    </div>
                    <div className="flex flex-col xl:w-[50rem] md:w-[25rem] justify-start">
                      <div className="text-red-500 my-2 font-medium text-xs">
                        <h1>{val.author_details.name}</h1>
                      </div>
                      <div className="bg-[#0e1b43] -ml-3 p-4 md:w-full w-[28vh] rounded-lg shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                        <p className="text-white font-normal text-[10px] w-full text-justify">
                          {val.content}
                        </p>
                      </div>
                    </div>
                    <div>j</div>
                  </div>
                )}{" "}
                {/* RV 2 */}
                {id % 2 !== 0 && (
                  <div key={id} className="grid grid-cols-3 place-items-center z-10">
                    <div>j</div>
                    <div className="flex flex-col justify-start xl:w-[50rem] md:w-[25rem]">
                      <div className="text-red-500 text-right my-2 font-medium text-xs">
                        <h1>
                          {val.author_details.name ||
                            val.author_details.username}
                        </h1>
                      </div>
                      <div className="bg-[#0e1b43] p-4 -mr-3 md:w-full w-[28vh] rounded-lg shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]">
                        <p className="text-white font-normal text-[10px] w-full text-justify">
                          {val.content}
                        </p>
                      </div>
                    </div>
                    <div className=" items-center justify-center xl:mr-28 -mb-10 lg:mr-[9rem] ">
                      <div
                        className="bg-red-800 shadow-[inset_-12px_-8px_40px_#46464620] w-[7.5rem] h-[7.5rem] flex items-center justify-center"
                        style={{
                          clipPath:
                            " polygon(100.00% 50.00%,75.00% 93.30%,25.00% 93.30%,0.00% 50.00%,25.00% 6.70%,75.00% 6.70%)",
                        }}
                      >
                        <img
                          alt=" deleted component"
                          className="aspect-ratio-1 w-[7em] h-[7rem]"
                          style={{
                            clipPath:
                              " polygon(100.00% 50.00%,75.00% 93.30%,25.00% 93.30%,0.00% 50.00%,25.00% 6.70%,75.00% 6.70%)",
                          }}
                          src={
                            val.author_details.avatar_path
                              ? `${process.env.REACT_APP_IMG_URL}${val.author_details.avatar_path}`
                              : Img
                          }
                        />
                      </div>
                      <div className="flex text-white font-medium flex-col items-center ">
                        <StarIcon className="text-red-500 shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)]" />
                        <h1 className="text-[8px] text-red-500">
                          {val.author_details.rating}
                        </h1>
                      </div>
                    </div>
                  </div>
                )}
              </>
            ))}
            <div className="flex justify-center mt-20 mb-10 rounded-full z-10">
              <button
                onClick={handleReview}
                className={`py-2 px-8 rounded-full ring-2 ring-red-500 hover:bg-red-500 transition-all duration-500 text-white ${
                  visreview === review.length ? "hidden" : ""
                }`}
              >
                Load More
              </button>
            </div>
          </div>
          <h1 className="font-medium md:px-2 text-white text-lg">
            Recommendation Movie
          </h1>
          <div className="flex flex-wrap md:gap-[37px] mb-20  z-10 justify-center gap-x-5">
            {recommend &&
              recommend.slice(0, 18).map((val, key) => (
                <div key={val.id} className="mt-10 w-56 z-10">
                  <Link
                    to={`/movie/${val.id}`}
                    onClick={() => {
                      
                    }}
                  >
                    <div className="rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                      <img
                        src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                        key={key}
                        alt="there is no "
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
                      {val.release_date}
                    </h6>
                    <h1 className="text-white text-lg font-medium -mt-1">
                      {val.title}
                    </h1>
                  </div>
                </div>
              ))}
          </div>
          <div
            id="modal"
            onClick={handleNonClick}
            className={`fixed flex items-center justify-center inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm ${
              show ? "" : "hidden"
            }`}
          >
            <ReactPlayer
              controls
              playing={show}
              ref={trailerVideo}
              url={`https://www.youtube.com/watch?v=${trailer}`}
              height="30rem"
              width="50rem"
            />
          </div>
          <div
            id="video"
            onClick={handleCloseVideo}
            className={`fixed flex items-center justify-center inset-0 z-10 bg-black bg-opacity-20 backdrop-blur-sm ${
              showvideos ? "" : "hidden"
            }`}
          >
            <ReactPlayer
              controls
              playing={showvideos}
              ref={trailerVideo}
              url={`https://www.youtube.com/watch?v=${videos}`}
              height="30rem"
              width="45rem"
            />
          </div>
        </div>
      </div>
    </>
  );
}
