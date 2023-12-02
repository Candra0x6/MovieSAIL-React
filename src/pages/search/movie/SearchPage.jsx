import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { UseMainSearchMovie } from "../../../ApiCall/UseSearch";
import Loading from "../../../components/loading/Loading";
export default function SearchPage() {

  const {Loading : isLoading, setPage, search, searchTv, decodeSearch}  = UseMainSearchMovie()
  
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  },[setPage])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className="bg-[#13123A] flex flex-col sticky overflow-hidden pb-40 items-center">
      <div className="container">
        <div className="absolute right-0 top-20 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[70vh] h-[40vh]  rounded-full "></div>
        <div className="absolute right-[30%] bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[30vh]  rounded-full top-0"></div>
        <div className="absolute left-0 top-[8%] bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[60vh]  rounded-full "></div>
        <div className="absolute right-0 top-[80%] bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[40vh]  rounded-full "></div>
        <div className="absolute right-[10%] top-[75%] bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[20vh]  rounded-full "></div>
        <div className="absolute bottom-40 left-[10%] bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[20vh]  rounded-full "></div>

        {isLoading && (
          <div className="">
            <Loading />
          </div>
        )}
        <div className="flex flex-col mt-40">
          <div className="flex flex-col items-center">
            <div className="bg-[#25274C] rounded-3xl text-slate-300 -mb-10 z-20 font-semibold">
              <h1 className="md:text-[1.5rem] text-[1rem] px-10 py-5">
                Search of <span className="text-red-500">{decodeSearch}</span>
              </h1>
            </div>
            <div className="bg-[#25274C] z-10 h-[30vh] w-[100%] flex flex-col justify-center items-center rounded-3xl bg-opacity-30 border-2 border-slate-500 text-white font-semibold">
              <h1 className="md:text-[2rem] text-[1.3rem]">
                <span className="md:text-[2.3rem] text-[1.5rem] text-red-500">
                  {search.length}{" "}
                </span>
                Movie Found
              </h1>
              <h1 className="md:text-[2rem] text-[1.3rem]">
                <span className="md:text-[2.3rem] text-[1.5rem] text-red-500">
                  {searchTv.length}{" "}
                </span>
                Tv Series Found
              </h1>
            </div>
          </div>
          <h1 className="text-white text-lg z-10 -mb-7 mt-10 font-semibold">
            Movie
          </h1>
          <div className="flex flex-wrap z-10 md:gap-[37px] justify-center gap-x-5">
            {search.map((val, key) => (
              <div className="mt-10 w-56" key={key}>
                <Link to={`/movie/${val.id}`}>
                  <div className="rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                    <img
                      alt="Poster Movie"
                      src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
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
          <h1 className="text-white text-lg -mb-7 mt-20 font-semibold">
            Tv Series
          </h1>
          <div className="flex flex-wrap z-10 md:gap-[37px] justify-center gap-x-5">
            {searchTv.length > 0 &&
              searchTv.slice().map((val, key) => (
                <div key={key} className="z-10 mt-10 w-56">
                  <Link to={`/tv/${val.id}`}>
                    <div className="rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                      <img
                        alt="Poster Movie"
                        src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                        className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-md"
                      />
                    </div>
                  </Link>

                  <div className="flex z-10 items-end justify-end mt-2 -mr-2">
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
  );
}
