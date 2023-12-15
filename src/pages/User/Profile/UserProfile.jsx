import React, { useEffect, useState } from "react";
import {
  GetFavoriteMovie,
  GetFavoriteTv,
  PostAddFavoriteMovie,
  PostAddFavoriteTv,
} from "../../../ApiCall/UseAddFavorite";
import Img from "../../../profile.jpg";
import { Link } from "react-router-dom";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import { ToastContainer } from "react-toastify";

function UserProfile() {
  const { favoriteMovie } = GetFavoriteMovie();
  const { favoriteTv } = GetFavoriteTv();
  const { AddFavorite } = PostAddFavoriteMovie();
  const { addFavoriteTv } = PostAddFavoriteTv();
  const [user, setUser] = useState([]);

  const getUserData = localStorage.getItem("userData");
  const userData = JSON.parse(getUserData);
  const ProfileUser = localStorage.getItem("profile_user");
  useEffect(() => {
    setUser(userData);
  }, []);
  return (
    <section className="text-white bg-[#121139] pb-40 ">
      <ToastContainer />
      <div className="bg-[#25274C] bg-opacity-50 z-10 h-[20rem] flex sticky overflow-hidden backdrop-blur-md">
        <div className="absolute -bottom-20 xl:-top-20 -rotate-45 xl:-rotate-[60deg] -left-40 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[60vh] xl:w-[70vh] xl:h-[30vh] rounded-full "></div>
        <div className="absolute -bottom-20 -rotate-45 left-20 xl:left-60 xl:top-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[30vh] xl:h-[20vh]  rounded-full "></div>
        <div className="absolute  xl:-top-40 top-0 rotate-45 right-20 bg-[#812DE2] bg-opacity-50 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[40vh] xl:h-[40vh]  rounded-full "></div>
      </div>
      <div className="items-center flex flex-col">
        <div className="container">
          <div className=" flex flex-col ">
            <div className="flex flex-col items-center">
              <div className="flex flex-col z-40 bg-[#121139] -mt-[5.3rem] w-[10rem] h-[10rem] items-center justify-end  rounded-full">
                <img
                  src={ProfileUser || Img}
                  className="h-full z-40 w-full rounded-full p-3"
                  alt="Profil Creator"
                />
              </div>
              <div className="flex flex-col mt-5 pb-40 text-2xl font-medium items-center">
                {user && <h1>{user.username}</h1>}
              </div>
            </div>
            <div className="flex flex-col gap-y-32 mx-2">
              <div className="flex flex-col">
                <h1 className="text-[1.3rem] font-semibold z-10 text-white">
                  Favorite Movie
                </h1>
                <div className="flex flex-wrap z-10 md:gap-[37px] justify-start gap-x-5">
                  {favoriteMovie &&
                    favoriteMovie?.map((val, key) => (
                      <div key={val.id} className="mt-10 z-10 w-56">
                        <Link to={`/movie/${val.id}`}>
                          <div className="rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                            <img
                              alt="poster"
                              src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                              key={key}
                              className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-md"
                            />
                          </div>
                        </Link>

                        <div className="flex items-end justify-end mt-2 -mr-2 ">
                          <div className=" absolute py-[2px] text-black text-center items-center px-2 rounded-full bg-yellow-400">
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
                          <div className="flex items-start mt-2">
                            <button
                              className=" text-[#DC2064] rounded-full"
                              onClick={() => {
                                AddFavorite(val.id, false);
                              }}
                            >
                              <BookmarkRemoveIcon
                                sx={{ fontSize: 30 }}
                                className=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[1.3rem] font-semibold z-10 text-white">
                  Favorite Tv Series
                </h1>
                <div className="flex z-20 flex-wrap lg:gap-[37px] justify-start gap-x-5">
                  {favoriteTv &&
                    favoriteTv?.map((val, key) => (
                      <div key={key} className="mt-10 w-56">
                        <Link to={`/tv/${val.id}`}>
                          <div className="rounded-lg w-[14rem] h-[20rem] shadow-lg overflow-hidden">
                            <img
                              alt="tv poster"
                              src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                              key={key}
                              className="hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-lg"
                            />
                          </div>
                        </Link>

                        <div className="flex items-end justify-end mt-2 -mr-2">
                          <div className=" absolute py-[2px] text-center text-black items-center px-2 rounded-full bg-yellow-400">
                            <span className="font-medium text-[12px]">
                              {val.vote_average}/ 10
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <div className="">
                            <h6 className="text-teal-600 font-mono text-[11px]">
                              {val.first_air_date}
                            </h6>
                            <h1 className="text-white text-lg font-medium -mt-1">
                              {val.name}
                            </h1>
                          </div>
                          <div className="flex items-start mt-2">
                            <button
                              className=" text-[#DC2064] rounded-full"
                              onClick={() => {
                                addFavoriteTv(val.id, false);
                              }}
                            >
                              <BookmarkRemoveIcon
                                sx={{ fontSize: 30 }}
                                className=""
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
