import React, { useEffect, useState } from "react";
import Img from "../../../profile.jpg";

function UserSetting() {
  const [user, setUser] = useState([]);
  const [userAuth, setUserAuth] = useState({
    username: "",
  });


  const getUserData = localStorage.getItem("userData");
  const userData = JSON.parse(getUserData);

const handleChangeUser = () => {
    if (userAuth.username !== '') {
        setUser({
        ...user,
        username: userAuth.username,
    })
    localStorage.setItem('userData', JSON.stringify(user))
    }
    
    console.log(user)
    console.log(localStorage)

}
  useEffect(() => {
    setUser(userData);
  }, []);
  return (
    <section className="text-white bg-[#121139] pb-40 sticky overflow-hidden ">
        <div className="absolute -bottom-20 xl:-top-20 -rotate-45 xl:-rotate-[60deg] -left-40 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[60vh] xl:w-[70vh] xl:h-[30vh] rounded-full "></div>
        <div className="absolute -bottom-20 -rotate-45 left-20 xl:left-60 xl:top-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[30vh] xl:h-[20vh]  rounded-full "></div>
        <div className="absolute  xl:-top-40 top-0 rotate-45 right-20 bg-[#812DE2] bg-opacity-50 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[40vh] xl:h-[40vh]  rounded-full "></div>
      <div className="items-center flex flex-col z-10 pt-[10rem]">
        <div className="container">
          <div className=" flex flex-col ">
            <div className="flex lg:flex-row flex-col items-center lg:justify-start justify-center mt-20">
              <div className="flex flex-col z-20 w-[20rem] h-[20rem] items-center justify-end  rounded-md">
                <img
                  src={Img}
                  className="h-full z-40 w-full rounded-md p-3"
                  alt="Profil Creator"
                />
                 <div className="">
                <h1>{user.username}</h1>
              </div>
              </div>
             
              <div className="flex flex-col justify-center">
                <form className="flex flex-col gap-y-2 lg:ml-20 w-full">
                  <label
                    htmlFor="username"
                    className="text-xs justify-between flex font-semibold mt-3"
                  >
                    Change Username
                  </label>
                  <input
                    type="text"
                    className="rounded-md py-1 pl-5 w-full lg:pr-[30rem] bg-[#25274C]"
                    placeholder={`Username ${user.username}`}
                    onChange={(e) => setUserAuth({
                        ...userAuth,
                        username: e.target.value
                    })}
                  />
                 
                </form>
                <button
            onClick={handleChangeUser}
            className="py-2 w-1/2 mx-auto rounded-md bg-[#3239b4] mt-40"
          >
            Submit
          </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSetting;
