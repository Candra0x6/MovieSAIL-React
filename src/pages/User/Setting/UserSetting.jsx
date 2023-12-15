import React, { useEffect, useState } from "react";
import Img from "../../../profile.jpg";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import UseDeleteSession from "../../../ApiCall/UseDeleteSession";
import { toast, ToastContainer } from "react-toastify";
function UserSetting() {
  const { deletedSession } = UseDeleteSession();

  const [ImgProfile, setImgProfile] = useState(null);
  const [user, setUser] = useState([]);
  const [userAuth, setUserAuth] = useState({
    username: "",
  });
  const [deleteAccount, setDeleteAccount] = useState("");
  const getUserData = localStorage.getItem("userData");
  const userData = JSON.parse(getUserData);
  const ProfileUser = localStorage.getItem("profile_user");
  const getUserPassword = localStorage.getItem("password");
  const account = localStorage.getItem("account");
  const handleChangeUser = () => {
    if (userAuth.username !== "") {
      setUser({
        ...user,
        username: userAuth.username,
      });
      localStorage.setItem("userData", JSON.stringify(user));
    }
  };
  useEffect(() => {
    setUser(userData);
  }, []);
  const handleChangeProfile = (event) => {
    const ImgUp = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      const dataUrl = event.target.result;

      localStorage.setItem("profile_user", dataUrl);
      setImgProfile(dataUrl);
    };
    reader.readAsDataURL(ImgUp);
  };

  const handleDeleteSessionUser = () => {
    if (deleteAccount === getUserPassword) {
      deletedSession();
      localStorage.clear();
      window.location.href = "/";
      toast.success("Successfully Deleted Account", {
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
      toast.error("Incorrect Account Password !", {
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
    <section className="text-white bg-[#121139] pb-40 sticky overflow-hidden ">
      <ToastContainer className={`z-20`} />
      <div className="absolute -bottom-20 xl:-top-20 -rotate-45 xl:-rotate-[60deg] -left-40 bg-[#423EE0] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[60vh] xl:w-[70vh] xl:h-[30vh] rounded-full "></div>
      <div className="absolute -bottom-20 -rotate-45 left-20 xl:left-60 xl:top-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[30vh] xl:h-[20vh]  rounded-full "></div>
      <div className="absolute  xl:-top-40 top-0 rotate-45 right-20 bg-[#812DE2] bg-opacity-50 blur-[100px] z-0 w-[20vh] h-[30vh] xl:w-[40vh] xl:h-[40vh]  rounded-full "></div>
      <div className="items-center flex flex-col z-10 pt-[10rem]">
        <div className="container">
          <div className=" flex flex-col ">
            <div className="flex lg:flex-row flex-col bg-[#25274C] mx-10 rounded-md p-10 items-center lg:justify-start justify-center mt-20">
              <div className="flex flex-col z-20  items-center justify-end rounded-md">
                <div className="w-[20rem] h-[20rem] flex justify-center relative items-center">
                  <img
                    src={ImgProfile || ProfileUser || Img}
                    className="h-full w-full  flex justify-center items-center rounded-md"
                    alt="Profil Creator"
                  />

                  <div className="flex items-center justify-center gorup absolute opacity-0 hover:opacity-100 w-full overflow-hidden max-w-full max-h-full h-full">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center 
                      w-full h-full rounded-lg cursor-pointer
                       hover:bg-black hover:bg-opacity-20"
                    >
                      <div className=" flex flex-col  items-center justify-center pt-5 pb-6">
                        <CloudUploadIcon
                          sx={{ fontSize: 60 }}
                          className=" translate-y-0"
                        />
                        <p className="mb-2 text-md font-medium">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleChangeProfile}
                      />
                    </label>
                  </div>
                </div>

                <div className="mt-5 lg:mb-0 mb-14">
                  <h1 className="text-xl font-semibold tracking-widest">
                    {user.username || "No Name"}
                  </h1>
                </div>
              </div>

              <div className="flex flex-col justify-center w-full">
                <form className="flex flex-col gap-y-2 ml-10 w-full">
                  <label
                    htmlFor="username"
                    className="text-xs justify-between flex font-semibold mt-3"
                  >
                    Change Username
                  </label>
                  <input
                    type="text"
                    className="rounded-md py-1 pl-5 w-[90%] ring-1 ring-white bg-[#25274C]"
                    placeholder={`Username ${user.username}`}
                    onChange={(e) =>
                      setUserAuth({
                        ...userAuth,
                        username: e.target.value,
                      })
                    }
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
            <div className=" flex flex-col bg-[#25274C] p-10 mt-20 mx-10">
              <h1 className="lg:text-2xl text-xl text-red-500 font-semibold tracking-widest">
                Delete Account !!
              </h1>
              <h1 className="whitespace-pre-line tracking-wider mt-4 lg:text-xl text-md">
                You've just entered the danger zone! If you would like to
                continue and remove your account, you can do so by entering your
                password below and confirming the prompts.
              </h1>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDeleteSessionUser();
                }}
                className="flex flex-col gap-y-2 mt-10 w-full"
              >
                <label
                  htmlFor="username"
                  className="text-sm tracking-wider justify-between flex font-semibold mt-3"
                >
                  Password{" "}
                </label>
                <input
                  type="password"
                  className="rounded-md py-1 pl-5 w-full ring-1 ring-white bg-[#25274C]"
                  placeholder={`Enter your current password to continue...`}
                  onChange={(e) => setDeleteAccount(e.target.value)}
                />
                <button
                  type="submit"
                  className={`py-2 w-1/2 mx-auto rounded-md bg-red-500 mt-20 ${
                    deleteAccount === "" ? "bg-red-400" : ""
                  }`}
                  disabled={deleteAccount === ""}
                >
                  Delete Account
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSetting;
