import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import EpisodesPage from "./episodes/[episodes_number]/EpisodesPage";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Loading from "../../../../../components/loading/Loading";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { UseSeasonEpisodesTv } from "../../../../../ApiCall/UseDatabyID";
function SeasonsPage() {
  const { id } = useParams();
  const {
    episodes,
    setDetailEpisode,
    dataDetailEpisode,
    detailEpisodesImage,
    isLoading,  
  } = UseSeasonEpisodesTv();
  const [elementChanged, setElementChanged] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const episodeNumber = searchParams.get("episode");
  const scrollToElement = () => {
    const element = document.getElementById(episodeNumber);
    if (element) {
      const windowHeight = window.innerHeight;
      const elementHeight = element.clientHeight;

      const scrollPosition =
        element.offsetTop - (windowHeight - elementHeight) / 2;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
      element.style.border = "2px solid white";
      setElementChanged(true);
    }
  };

  useEffect(() => {
    if (elementChanged === false) {
      return scrollToElement();
    }
  }, [scrollToElement]);

  return (
    <div className="flex flex-col justify-center pb-40 sticky overflow-hidden items-center bg-gradient-to-r from-[#13123A] via-[#071c4d] to-[#13123A]">
      <div className="container">
        <div className="flex flex-col items-center mt-5 gap-y-20">
          {isLoading && <Loading />}
          {episodes && (
            <>
              <Link to={`/tv/${id}`}>
                  <button className="flex mt-40  lg:mx-0 mx-5 justify-center items-center text-white lg:py-3 lg:px-3 py-3 px-[17vh] -mb-10 mr-10 hover:bg-blue-950 bg-slate-500 backdrop-blur-md bg-opacity-30 rounded-full">
                    <KeyboardBackspaceIcon fontSize="large" className="" />
                  </button>
                </Link>
              <div className="flex flex-wrap items-start justify-center px-3 ">
                <div className="rounded-md h-[15rem] w-[10rem] flex overflow-hidden bg-cover bg-center shadow-lg">
                  <img
                    alt="poster episode"
                    src={`${process.env.REACT_APP_IMG_URL}${episodes.poster_path}`}
                    className="hover:scale-110 transition-all duration-500 w-full object-cover object-center h-full rounded-md"
                  />
                </div>
                <div className="flex flex-col ml-6 lg:w-[70vh] md:w-[30rem] w-[40vh] ">
                  <div className="text-white mb-3">
                    <h1 className="text-2xl font-medium">{episodes.name}</h1>
                  </div>
                  <div className="flex gap-4 mb-7">
                    <div className="flex bg-pink-500 items-center gap-2 text-white rounded-full px-3 py-[1px]">
                      <StarIcon fontSize="small" className="" />
                      <span className="text-white font-mono">
                        {episodes.vote_average}
                      </span>
                    </div>
                    <h1 className="text-white font-mono">
                      {" "}
                      {episodes.air_date}
                    </h1>
                  </div>
                  <div className="text-white mb-4">
                    <h1 className="font-medium mb-2">Overview</h1>
                    <p className="w-full text-justify text-xs">
                      {episodes.overview}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="pt-28 border-t-[1px]  border-slate-700 flex items-center flex-col gap-14">
            {episodes?.episodes?.map((val, id) => (
              <div
                id={val.id}
                className="flex flex-wrap w-[50vh] sm:w-[45rem] lg:w-[110vh] xl:w-[135vh] rounded-3xl drop-shadow-lg overflow-hidden"
              >
                <div key={id} className="flex ">
                  <div
                    className="fixed inset-0 -z-10 rounded-lg opacity-50 blur-xl"
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_IMG_URL}${val.still_path})`,
                      backgroundSize: "cover",
                      overflow: "hidden",
                    }}
                  >
                    <div className="flex"></div>
                  </div>
                  <div
                    className=" group grid lg:grid-flow-col grid-flow-row place-items-center justify-items-center gap-x-5 p-4 h-auto my-auto cursor-pointer"
                    onClick={() => {
                      setDetailEpisode(val.episode_number);
                    }}
                  >
                    <img
                      alt="poster season"
                      className="rounded-lg w-[40vh] h-[20vh]"
                      src={`${process.env.REACT_APP_IMG_URL}${val.still_path}`}
                    />
                    {dataDetailEpisode.id === val.id ? null : (
                      <div className="fixed z-20 text-white bg-slate-700 p-1 bottom-0 rounded-full opacity-0 transition-all animate-bounce duration-500 group-hover:opacity-100 ">
                        <ExpandMoreIcon sx={{ fontSize: 30 }} className="" />
                      </div>
                    )}
                    <div className="flex text-white font-medium flex-col justify-center">
                      <h1 className="mb-1">{val.name}</h1>
                      <div className="flex mb-5 gap-2">
                        <div className="flex bg-pink-500 items-center gap-2 text-white rounded-full px-3 py-[1px]">
                          <StarIcon fontSize="small" className="" />
                          <span className="text-white font-mono">
                            {dataDetailEpisode.vote_average}
                          </span>
                        </div>
                        <h1 className="font-mono">{val.air_date}</h1>
                        <h1 className="font-mono">{val.runtime}m</h1>
                      </div>
                      <p className="font-normal drop-shadow-lg w-[80%]">
                        {val.overview}
                      </p>
                    </div>
                  </div>
                </div>
                {dataDetailEpisode.id === val.id && (
                  <EpisodesPage
                    dataDetailEpisode={dataDetailEpisode}
                    detailEpisodesImage={detailEpisodesImage}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeasonsPage;
