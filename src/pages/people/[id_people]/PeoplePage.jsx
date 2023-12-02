import React, { useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import { UsePeoplebyID } from "../../../ApiCall/UseDatabyID";
import SkeletonLoadingPeople from "../../../components/loading/SkeletonLoadingPeople";


export default function PeoplePage() {
  const {isLoading, PeopleData, PeopleMovieData} = UsePeoplebyID()
  
  const scrollTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  useEffect(() => {
    scrollTop();
  }, []);
  return (
    <div className="flex flex-col items-center bg-[#13123A] pb-40 overflow-hidden sticky">
      <div className="container">
        <div className="absolute left-0 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[70vh] h-[40vh]  rounded-full top-0"></div>
        <div className="absolute left-[30%] bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 md:w-[50vh] h-[30vh] w-[40vh]  rounded-full top-20"></div>
        <div className="absolute right-0 top-[15%] bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[70vh] rounded-full "></div>
        <div className="absolute left-0 :top-[30%] top-[25%] bg-[#423EE0] bg-opacity-40 blur-[100px] rotate-12 z-0 w-[60vh] h-[40vh] rounded-full "></div>
        <div className="absolute right-0 top-2/3 bg-[#423EE0] bg-opacity-40 blur-[100px] rotate-12 z-0 w-[20vh] h-[30vh] rounded-full "></div>
        <div className="absolute right-0 md:top-[73%] top-[70%] bg-[#3EE0D6] bg-opacity-40 blur-[100px] rotate-12 z-0 w-[20vh] h-[30vh]  rounded-full "></div>
        <div className="absolute left-0 bottom-[10%] bg-[#812DE2] bg-opacity-40 blur-[100px] rotate-12 z-0 w-[20vh] h-[30vh] rounded-full "></div>
        <div className="flex-col z-10 flex items-center">
          <div className="flex z-10 flex-col items-center bg-[#25274C] mt-40 w-[80%] bg-opacity-30">
            {
              isLoading && <SkeletonLoadingPeople/>
            }
            {PeopleData.length !== 0 && PeopleData && (
              <>
                <div className="flex flex-col p-20 gap-y-5 items-center text-white font-medium">
                  <div className="md:w-[20rem] md:h-[20rem] w-[10rem] h-[10rem] rounded-full">
                    <img
                      src={`${process.env.REACT_APP_IMG_URL}${PeopleData.profile_path}`}
                      alt="profile "
                      className="rounded-full w-full h-full"
                    />
                  </div>
                  <div className="text-center mb-10">
                    <h1 className="text-2xl font-semibold">
                      {PeopleData.name}
                    </h1>
                    <h1 className="mt-2">{PeopleData.place_of_birth}</h1>
                  </div>
                  <div className="md:w-3/4 w-full">
                    <h1 className="font-semibold mb-2 text-lg">Biography</h1>
                    <p className="text-justify">
                      {PeopleData.biography.length
                        ? PeopleData.biography
                        : "Empty data"}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="bg-[#25274C] z-10 my-40 w-[80%] bg-opacity-30 ">
            {PeopleData.length !== 0 && PeopleData && (
              <>
                <div className="grid grid-cols-3 p-10 object-center place-items-center text-white font-semibold text-center ">
                  <div className="flex flex-col justify-center">
                    <h1 className="md:text-[2rem] text-xl font-medium">
                      {PeopleData.known_for_department || <Skeleton width={400} height={40} />}
                    </h1>
                    <h1 className="md:text-2xl text-lg mt-3">Roles</h1>
                  </div>
                  <div className="flex flex-col justify-center border-x-2 border-slate-500 w-full h-full">
                    <h1 className="md:text-[2rem] text-xl font-medium">
                      {PeopleData.birthday ? PeopleData.birthday : "Empty data" || <Skeleton width={400} height={40}/>}
                    </h1>
                    <h1 className="md:text-2xl text-lg  mt-3">Birthday</h1>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h1 className="md:text-[2rem] text-xl font-medium">
                      {PeopleData.popularity || <Skeleton width={400} height={40} />}
                    </h1>
                    <h1 className="md:text-2xl text-lg  mt-3">Popularity</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex-col flex mb-20">
          <h1 className="text-[2.3rem] font-semibold z-10 text-white">
            Acted in Movie
          </h1>
          <div className="flex flex-wrap z-10 md:gap-[37px] justify-center gap-x-5">
            {PeopleMovieData &&
              PeopleMovieData?.cast?.map((val, key) => (
                <div key={val.id} className="mt-10 z-10 w-56">
                  <Link
                    to={`/movie/${val.id}`}
                    onClick={() => {
                      setTimeout(() => {
                        window.location.reload();
                      }, 200);
                    }}
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
                      {val.release_date}
                    </h6>
                    <h1 className="text-white text-lg font-medium -mt-1">
                      {val.title}
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
