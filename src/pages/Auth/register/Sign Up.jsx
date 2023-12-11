import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function SignUp() {
  const [ReqToken, setReqToken] = useState(null);
  const [Session, setSession] = useState(null);
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [alertInput, setAlertInput] = useState({
    username: "",
    password: "",
  });
  const storedAccount = localStorage.getItem("account");

  const [alertLogin, setAlertLogin] = useState(false);
  const handleSubmit = () => {
    if (Name === "") {
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
    if (Name !== "" && Password !== "" && alertLogin === false) {
      const GetRegister = async () => {
        try {
          const Token = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/authentication/token/new?api_key=${process.env.REACT_APP_TMDB_KEY}`
          );

          const CoreToken = Token.data.request_token;
          setReqToken(CoreToken);

          localStorage.setItem("username", Name);
          localStorage.setItem("password", Password);

          await axios.post(
            `${process.env.REACT_APP_BASE_URL}/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_TMDB_KEY}`,
            {
              username: "CeLnv",
              password: "NmkCN",
              request_token: CoreToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setAlertLogin(true);
          
          const session = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/authentication/session/new?api_key=${process.env.REACT_APP_TMDB_KEY}`,
            {
              request_token: CoreToken,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const core = session.data.session_id;
          setSession(core);
          toast.success("Account Successfully Registered", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        } catch (e) {
          console.log(e);
        }
      };

      GetRegister();
    }
    if (alertLogin === true) {
      toast.error("You Already Have an Account !!", {
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

  useEffect(() => {
    const storedToken = localStorage.getItem("requestToken");
    if (storedToken) {
      setReqToken(storedToken);
    }
    if (storedAccount) {
      setSession(storedAccount);
    }
  }, []);

  useEffect(() => {
    if (ReqToken) {
      localStorage.setItem("requestToken", ReqToken);
    }
  }, [ReqToken]);

  useEffect(() => {
    if (Session) {
      localStorage.setItem("account", Session);
    }
  }, [Session]);

  useEffect(() => {
    if (storedAccount) {
      setAlertLogin(true);
    } else {
      setAlertLogin(false);
    }
  }, []);
  return (
    <div className="flex-col h-[100vh] flex sticky overflow-hidden bg-[#13123A] justify-center items-center">
      <ToastContainer />
      <div className="absolute -bottom-20 xl:-bottom-40 -rotate-45 xl:-rotate-[60deg] -left-40 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[60vh] xl:w-[50vh] xl:h-[80vh] rounded-full "></div>
      <div className="absolute -bottom-20 -rotate-45 left-20 xl:left-56 xl:bottom-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[30vh] xl:h-[40vh]  rounded-full "></div>
      <div className="absolute  xl:-top-40 top-0 rotate-45 right-20 bg-[#812DE2] bg-opacity-50 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[40vh] xl:h-[70vh]  rounded-full "></div>
      <div className="flex flex-col bg-[#25274C] w-[24rem] md:w-[40rem] lg:w-[50rem] bg-opacity-50 backdrop-blur-md rounded-lg">
        <div className="flex text-white font-medium gap-y-6 flex-col items-start p-14">
          <div className="w-full gap-y-1 md:text-center mb-10">
            <h1 className="text-lg font-semibold">Sign Up</h1>
            <h2 className="text-xs font-light">
              Input your Username, Password and Email
            </h2>
          </div>
          <form className="flex flex-col gap-y-2 w-full">
            <label
              htmlFor="username"
              className="text-xs flex justify-between font-semibold "
            >
              Email
              <span className="text-green-600">* Opsional</span>
            </label>
            <input
              type="email"
              className="rounded-md py-1 pl-5 w-full bg-[#25274C]"
              placeholder="Input Your Email"
            />
            <label
              htmlFor="username"
              className="text-xs justify-between flex font-semibold mt-3"
            >
              Username
              <span className="text-red-700">{alertInput.username}</span>
            </label>
            <input
              type="text"
              className="rounded-md py-1 pl-5 w-full bg-[#25274C]"
              placeholder="Input Your Username"
              onChange={(e) => setName(e.target.value)}
            />
            <label
              htmlFor="password"
              className="text-xs  justify-between flex font-semibold mt-3"
            >
              Password
              <span className="text-red-700">{alertInput.password}</span>
            </label>
            <input
              type="password"
              className="rounded-md py-1 pl-5 w-full bg-[#25274C]"
              placeholder="Input Your Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>
          <button
            onClick={handleSubmit}
            className="py-2 w-1/2 mx-auto rounded-md bg-[#3239b4] mt-10"
          >
            Submit
          </button>

          <div className="text-center text-xs w-full mt-10">
            <h1 className="">
              Already have account ?
              <Link to={`/sign-in`}>
                <span className="text-[#C25050] font-bold"> Sign In</span>
              </Link>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
