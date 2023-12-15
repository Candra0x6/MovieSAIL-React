import React from "react";
import Crown from "../data/crown.png";
import show from "../data/showline.png";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Loading from "../components/loading/SliderLoading";
import UsePopularPeople from "../ApiCall/UsePopularPeople";

export default function TopPeople() {
  const { isLoading, TopPeopleData } = UsePopularPeople();
  const handleGender = (people) => {
    let result = "";
    const genderId = people.gender; // Mengambil nilai gender dari people
    if (genderId === 0) {
      result = "not set";
    } else if (genderId === 1) {
      result = "Female";
    } else if (genderId === 2) {
      result = "Male";
    } else {
      result = "Non-Binary";
    }
    return result;
  };

  return (
    <div className="flex items-center sticky overflow-hidden pb-40 flex-col">
      <div className="container">
        <div className="md:text-[40px] text-xl text-white font-medium">
          <h1 className="mt-20 mb-10">Top People</h1>
        </div>

        <div className="flex items-end justify-center sm:gap-x-5">
          <>
            <div className="lg:h-[30vh] lg:w-[80vh] rotate-[17deg] w-[40vh] h-[25vh] bg-opacity-30 bg-[#423EE0] blur-[100px] z-0 absolute"></div>
            <div className="absolute bg-[#812DE2] bg-opacity-50 blur-[100px] lg:w-[30vh] lg:h-[20vh] w-[40vh] h-[10vh] z-0 rounded-full right-0 bottom-[30%]"></div>
            {isLoading && <Loading />}
            {TopPeopleData.slice(1, 2).map((val2, id) => (
              <div key={val2.id} className="flex flex-col mx-1 z-10">
                <Link to={`/person/${val2.id}`}>
                  <div className="flex flex-col items-center justify-end shadow-2xl shadow-blue-900 w-[13vh] h-[13vh] lg:w-[22vh] lg:h-[22vh] 2xl:h-[30vh] 2xl:w-[30vh] bg-blue-400 rounded-full">
                    <img
                      alt="people profile"
                      src={`${process.env.REACT_APP_IMG_URL}${val2.profile_path}`}
                      className="w-full h-full rounded-full p-2"
                    />
                  </div>
                </Link>
                <div className=" text-white text-lg flex flex-col items-center">
                  <h1 className="bg-blue-400 z-10 -mt-5 text-black rounded-full py-1 px-3 items-center">
                    <span className="font-bold">2</span>
                  </h1>
                  <h1 className="mb-4 md:text-lg md:w-full md:h-full w-24 h-14  text-sm text-center">
                    {val2.name}
                  </h1>
                  <span className="before:block before:absolute px-2 shadow-lg shadow-blue-900 before:-inset-1 before:skew-y-3  before:bg-blue-500 relative inline-block">
                    <span className="relative text-black font-medium text-md">
                      {val2.popularity}
                    </span>
                  </span>
                </div>
              </div>
            ))}
            {TopPeopleData.slice(0, 1).map((val1, id) => (
              <div
                key={val1.id}
                className="flex flex-col mx-auto z-20 justify-center items-center"
              >
                <img src={Crown} alt="crown" className="w-10 h-10 mb-2" />
                <Link to={`/person/${val1.id}`}>
                  <div className="flex flex-col items-center z-10 justify-end shadow-2xl shadow-yellow-900 cursor-pointer w-[17vh] h-[17vh] lg:w-[29vh] lg:h-[29vh] 2xl:h-[40vh] 2xl:w-[40vh] bg-yellow-400 rounded-full">
                    <img
                      alt="profile top 1"
                      src={`${process.env.REACT_APP_IMG_URL}${val1.profile_path}`}
                      className="w-full z-10 h-full rounded-full p-2"
                    />
                  </div>
                </Link>
                <img
                  alt="show line "
                  src={show}
                  className="brightness-200 contrast-0 w-[50%] opacity-20 xl:top-20 lg:top-32 top-40 absolute z-0"
                />
                <div className=" text-white text-lg flex flex-col items-center">
                  <h1 className="bg-yellow-400 z-10 -mt-5 text-black rounded-full px-4  py-1 items-center">
                    <span className="font-bold">1</span>
                  </h1>
                  <h1 className="mb-4 md:text-lg md:w-full md:h-full w-24 h-14 text-center text-sm">
                    {val1.name}
                  </h1>
                  <span className="before:block before:absolute px-2 shadow-lg shadow-yellow-900  before:-inset-1 before:skew-y-3  before:bg-yellow-500 relative inline-block">
                    <span className="relative text-black font-medium text-md">
                      {val1.popularity}
                    </span>
                  </span>
                </div>
              </div>
            ))}
            {TopPeopleData.slice(2, 3).map((val3, id) => (
              <div key={val3.id} className="flex flex-col z-10">
                <Link to={`/person/${val3.id}`}>
                  <div className="flex flex-col items-center justify-end shadow-2xl w-[13vh] h-[13vh] lg:w-[22vh] lg:h-[22vh] 2xl:h-[30vh] 2xl:w-[30vh] shadow-purple-900 bg-purple-400 rounded-full">
                    <img
                      alt="profile top 3"
                      src={`${process.env.REACT_APP_IMG_URL}${val3.profile_path}`}
                      className="w-full h-full rounded-full p-2"
                    />
                  </div>
                </Link>
                <div className=" text-white text-lg flex flex-col items-center">
                  <h1 className="bg-purple-400 z-10 -mt-5  text-black rounded-full py-1 px-3 items-center">
                    <span className="font-bold">3</span>
                  </h1>
                  <h1 className="mb-4 md:text-lg md:w-full md:h-full w-24 h-14  text-sm text-center">
                    {val3.name}
                  </h1>
                  <span className="before:block before:absolute px-2 shadow-lg shadow-purple-900 before:-inset-1 before:skew-y-3  before:bg-purple-500 relative inline-block">
                    <span className="relative text-black font-medium text-md">
                      {val3.popularity}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </>
        </div>
        <div className="flex flex-col z-10 justify-center pb-20 mt-20 text-white gap-x-10 gap-y-10">
          {TopPeopleData.length > 0 &&
            TopPeopleData.slice(3, 9).map((people, id) => (
              <div
                key={id}
                className="rounded-2xl flex justify-between z-10 p-5 bg-[#27294E] bg-opacity-40"
              >
                <div className="flex z-10 gap-x-6 w-full ">
                  <div className="md:w-[7rem] md:h-[7rem] rounded-full w-[6rem] h-[6rem]">
                    <img
                      className="rounded-full w-full h-full"
                      src={`${process.env.REACT_APP_IMG_URL}${people.profile_path}`}
                      alt={people.name}
                    />
                  </div>

                  <div className="flex font-medium mt-2 flex-col gap-y-3">
                    <h1 className="text-xl">{people.name}</h1>
                    <h1 className="text-base text-slate-300">
                      {handleGender(people)}
                    </h1>
                    <h1 className="py-[1px] w-16 px-2 bg-[#DC2064] rounded-md text-xs">
                      <span>{people.popularity}</span>
                    </h1>
                  </div>
                </div>
                <Link to={`/person/${people.id}`}>
                  <ArrowForwardIosIcon
                    sx={{ fontSize: 100 }}
                    className="text-[#626082]"
                  />
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
