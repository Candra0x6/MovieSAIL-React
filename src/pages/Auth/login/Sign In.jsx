import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  const [UserName, setUserName] = useState("");
  const [Password, setPassword] = useState("");
  const [alertInput, setAlertInput] = useState({
    username: "",
    password: "",
  });
  const Session = localStorage.getItem("account");
  const usernameLocal = localStorage.getItem("username");
  const passwordLocal = localStorage.getItem("password");
  const userTokenID = localStorage.getItem("requestToken");

  const FetchAccount = () => {
    const account = async () => {
      try {
        const account = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/account?session_id=${Session}&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const getaccount = account.data;
        getaccount.username = usernameLocal;
        getaccount.password = passwordLocal;
        getaccount.user_id = userTokenID;
        localStorage.setItem("userData", JSON.stringify(getaccount));
      } catch (e) {
        console.log(e);
      }
    };
    if (UserName === "") {
      setAlertInput((prev) => ({
        ...prev,
        username: "Username is required",
      }));
    } else {
      setAlertInput((prev) => ({
        ...prev,
        username: "",
      }));
    }

    if (Password === "") {
      setAlertInput((prev) => ({
        ...prev,
        password: "Password is required",
      }));
    } else {
      setAlertInput((prev) => ({
        ...prev,
        password: "",
      }));
    }

    if (UserName === usernameLocal && Password === passwordLocal) {
      account();
      toast.success("Login was Successful", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      toast.error("Username or Password Maybe Incorrect !!", {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="flex-col h-[100vh] flex sticky overflow-hidden bg-[#13123A] justify-center items-center">
      <div className="absolute -bottom-20 xl:-bottom-40 -rotate-45 xl:-rotate-[60deg] -left-40 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[60vh] xl:w-[50vh] xl:h-[80vh] rounded-full "></div>
      <div className="absolute -bottom-20 -rotate-45 left-20 xl:left-56 xl:bottom-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[30vh] xl:h-[40vh]  rounded-full "></div>
      <div className="absolute  xl:-top-40 top-0 rotate-45 right-20 bg-[#812DE2] bg-opacity-50 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[40vh] xl:h-[70vh]  rounded-full "></div>
      <ToastContainer className="font-medium " />
      <div className="flex flex-col bg-[#25274C] w-[24rem] md:w-[40rem] lg:w-[50rem] bg-opacity-50 backdrop-blur-md rounded-lg">
        <div className="flex text-white font-medium gap-y-6 flex-col items-start p-14">
          <div className="w-full gap-y-1 md:text-center mb-10">
            <h1 className="text-lg font-semibold">Sign In</h1>
            <h2 className="text-xs font-light">
              Input your Username & Password
            </h2>
          </div>
          <form action="submmit" className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="username"
              className="text-xs font-semibold flex justify-between "
            >
              Username
              <span className="text-red-700">{alertInput.username}</span>
            </label>
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              className="rounded-md py-1 pl-5 w-full bg-[#25274C]"
              placeholder="Input Your Username"
            />
            <label
              htmlFor="password"
              className="text-xs font-semibold mt-3 flex justify-between"
            >
              Password
              <span className="text-red-700">{alertInput.password}</span>
            </label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md py-1 pl-5 w-full bg-[#25274C]"
              placeholder="Input Your Password"
            />
          </form>
          <button
            onClick={FetchAccount}
            className="py-2 w-1/2 mx-auto rounded-md bg-[#3239b4] mt-10"
          >
            Submit
          </button>
          <div className="text-center text-xs w-full mt-10">
            <h1 className="">
              Don't have account ?{" "}
              <Link to={`/sign-up`}>
                <span className="text-[#C25050] font-bold">Sign Up</span>
              </Link>
            </h1>
            <h1 className="text-[#C25050] font-semibold">Forget Password ?</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
