import React, { useState } from "react";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Product } from "./StarRating";
import axios from "axios";
import ReactPlayer from "react-player";

export default function SliderModal({
  showEmptyPage,
  selectedImage,
  handleClose,
  selectedMovieDetails,
}) {
  const [trailer, setTrailer] = useState([]);
  const [showTrailer, setShowTrailer] = useState(false);
  const id = selectedMovieDetails.id;
  const trailerVideos = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
    );
    const foundTrailer = result.data.results.find(
      (trailer) =>
        trailer.name.toLowerCase() === "Official Trailer".toLowerCase()
    );
    if (foundTrailer) {
      const findTrailer = foundTrailer.key;
      setTrailer(findTrailer);
    }
  };

  const handleNonClick = (inside) => {
    if (inside.target.id === "modal") {
      handleClose();
      setShowTrailer(false);
    }
  };

  const handleTrailer = () => {
    setShowTrailer(!showTrailer);
    trailerVideos();
  };
  return (
    <div
      id="modal"
      onClick={handleNonClick}
      className={`fixed items-center flex inset-0 bg-black bg-opacity-25 backdrop-blur-sm z-50 transition-all ease-in-out duration-1000 justify-center ${
        showEmptyPage ? " " : "invisible"
      }`}
    >
      <div
        id="modal"
        onClick={handleNonClick}
        className={`fixed z-20 backdrop-blur-lg bg-black ${showTrailer ? "" : "hidden"}`}
      >
        <div className="flex justify-end ">
          <button onClick={() => setShowTrailer(false)} className="text-white">
            <CloseIcon />
          </button>
        </div>

        <ReactPlayer
          controls
          playing={showTrailer}
          url={`https://www.youtube.com/watch?v=${trailer}`}
          className="z-40"
          height="30rem"
          width="45rem"        />
      </div>
      <div
        className={`lg:flex items-center transition-all ease-in-out duration-500 ${
          showEmptyPage ? "" : "-translate-y-[100vh]"
        } `}
      >
        <div className="z-10 md:flex hidden items-center justify-center ">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="selected"
              className={`lg:w-[22rem] lg:h-[35rem] md:w-[40rem] md:h-[20rem] rounded-md `}
            />
          )}
          <div
            onClick={handleTrailer}
            className={`px-6 py-3 absolute z-10 rounded-full hover:bg-red-500 transition-all duration-500 bg-transparent ${
              showEmptyPage ? "" : "-translate-y-[100vh]"
            }`}
          >
            <button className="text-sm text-white font-medium">
              <PlayArrowIcon /> <br />
              Watch <br /> Trailer
            </button>
          </div>
        </div>
        <div
          className={`lg:h-[530px] lg:w-[800px] md:h-[35vh] md:w-[40vh] md:mx-0 mx-10 rounded-md bg-white`}
        >
          <div className="p-10">
            <div className="flex justify-between">
              <h1 className="font-semibold pb-4 text-2xl ">
                {selectedMovieDetails.title || selectedMovieDetails.name}
              </h1>
              <CloseIcon
                sx={{ fontSize: 30 }}
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>
            <div className="grid-cols-2 h-[19rem] grid border-t-2 border-slate-300 pt-4">
              <div className="gap-5 flex flex-col">
                <div>
                  <h2 className="text-slate-500 font-medium">Release date</h2>
                  <h2 className="text-slate-500">
                    {selectedMovieDetails.date || selectedMovieDetails.release_date}
                  </h2>
                </div>
                <h2 className="text-slate-500 font-medium -mt-4 -mb-6">
                  Directed by
                </h2>
                <div className="h-6 overflow-y-auto  hide-scrollbar">
                  {selectedMovieDetails &&
                    selectedMovieDetails.directed &&
                    selectedMovieDetails?.directed?.slice(0 , 1)?.map((val, id) => (
                      <h2 key={id} className="font-medium">
                        {val || 'Not found Direct'} 
                      </h2>
                    ))}
                </div>
                <h2 className="text-slate-500 font-medium -mt-3 -mb-5">
                  Casting
                </h2>
                <div className="overflow-auto h-[174px] hide-scrollbar">
                  {selectedMovieDetails &&
                    selectedMovieDetails.cast &&
                    selectedMovieDetails?.cast?.map((val, id) => (
                      <h2 key={id} className="font-medium">
                        {val}
                      </h2>
                    ))}
                </div>
              </div>
              <div className="grid grid-flow-row gap-1">
                <div className="">
                  <h2 className="text-slate-500 font-medium">Genre</h2>
                  <h2 className="font-medium">{selectedMovieDetails.genre}</h2>
                </div>
                <h2 className="text-slate-500 font-medium sm:-mt-2 -mb-2">
                  Description
                </h2>
                <div className="w-auto h-[126px] overflow-auto hide-scrollbar">
                  <p className="font-medium overflow-hidden">
                    {selectedMovieDetails.overview}
                  </p>
                </div>
                <div className="flex justify-between">
                  <Link to={`/${selectedMovieDetails.media_type || 'tv' }/${selectedMovieDetails.id}`}>
                    <div className=" hover:bg-red-500 items-center flex hover:text-white duration-300 font-medium sm:px-10 px-2 py-2 sm:h-14 my-auto bg-transparent rounded-full text-red-500 ring-red-500 ring-2">
                      <button className="">See More</button>
                    </div>
                  </Link>

                  <div
                    className={`lg:px-6 z-0 lg:-mr-24 -mr-16 text-center px-4 py-3 lg:py-5 md:px-4 md:-mr-18 md:py-4 left-[78%] 
                                    shadow-[0_2.8px_2.2px_rgba(0,_0,_0,_0.034),_0_6.7px_5.3px_rgba(0,_0,_0,_0.048),_0_12.5px_10px_rgba(0,_0,_0,_0.06),_0_22.3px_17.9px_rgba(0,_0,_0,_0.072),_0_41.8px_33.4px_rgba(0,_0,_0,_0.086),_0_100px_80px_rgba(0,_0,_0,_0.12)] rounded-full transition-all bg-green-500`}
                  >
                    <Link to={`/give-review`}>
                      <button className="text-sm text-white mt-2 mx-1 font-medium">
                        Give <br /> Review
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-3 grid mt-9 border-t-2 border-slate-300 pt-2">
              <div className="flex flex-col gap-3 text-center border-r-2 border-slate-300">
                <h2 className="md:text-4xl text-xl line-clamp-1">
                  {selectedMovieDetails.popularity}
                </h2>
                <h2 className="text-slate-500">
                  Popularity <span className="font-bold">SAIL ¿</span>
                </h2>
              </div>
              <div className="flex flex-col gap-3 text-center border-r-2 border-slate-300">
                <h2 className="md:text-4xl text-xl">
                  {selectedMovieDetails.voting_count}
                </h2>
                <h2 className="text-slate-500">Vote Count</h2>
              </div>
              <div className="flex flex-col gap-3 text-center ">
              <Product rating={selectedMovieDetails.voting}/>

                <h2 className="text-slate-500 mt-2">
                  Rating by <span className="font-bold ">Users</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
