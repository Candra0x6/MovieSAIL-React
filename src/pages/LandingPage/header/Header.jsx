import React, { useEffect, useState } from "react";
import navBarData from "../../../data/navBarData";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoIMG from "../../../data/MovieSAILlogo.png";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import ButtonLogSign from "../../../components/ButtonLogSign";
import Navbar from "../../../components/Navbar";
import Search from "../../../components/Search";

export default function HeaderPages() {
  const [menu, setMenu] = useState(false);
  const [visibleNav, setvisibleNav] = useState(true);
  const [prevNav, setprevNav] = useState(0);
  const [visibleUserAccount, setVisibleUserAccount] = useState(false);
  const userData = localStorage.getItem("userData");

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      setvisibleNav(prevNav > currentScroll || currentScroll < 10);
      setprevNav(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevNav]);

  const handleMenu = () => {
    setMenu(!menu);
  };

  const on = () => {
    setVisibleUserAccount(!visibleUserAccount);
  };
  return (
    <header id="header">
      <div
        className={`pt-10 fixed w-full justify-center z-50 backdrop-blur-sm flex transition-all duration-500 ${
          visibleNav ? "translate-y-[0%]" : "-translate-y-[24rem]"
        }`}
      >
        <div className="container">
          <div className="justify-between flex items-center border-b-[1px] border-opacity-10 border-white pb-7">
            <div className="flex items-center lg:gap-11 lg:ml-0 ml-5">
              <a href="/">
                <img src={LogoIMG} alt="LogoImg" className="w-20 h-20" />
              </a>
              <ul className="lg:flex p-4 gap-7 font-medium text-slate-300 hidden ">
                {navBarData.map((nav) => (
                  <Navbar key={nav._id} nama={nav} />
                ))}
              </ul>
              <Search />
            </div>
            <button
              id="hamburger menu"
              aria-label="Hamburger Menu Navbar"
              onClick={handleMenu}
              className={`lg:hidden fixed right-5 `}
            >
              <div className={`${menu ? "hidden" : " text-white"}`}>
                <MenuIcon sx={{ fontSize: 35 }} />
              </div>
              <div className={`${menu ? "text-white" : "hidden"}`}>
                <CloseIcon sx={{ fontSize: 35 }} />
              </div>
            </button>

            {userData ? (
              <div className="flex items-end justify-center text-white sticky">
                <button
                  aria-label="Profile Button"
                  onClick={on}
                  className="ring-2 rounded-full ring-white mr-20 md:mr-0 "
                >
                  <PersonIcon sx={{ fontSize: 45 }} className="p-2" />
                </button>
                <div
                  className={`absolute top-20 bg-transparent border-2 border-opacity-10 backdrop-blur-md border-white duration-500 ease-out transition-all  ${
                    visibleUserAccount
                      ? "translate-y-0 opacity-100  flex flex-col"
                      : "opacity-0 -translate-y-[15rem]"
                  }`}
                >
                  <ul className="flex flex-col text-center gap-y-3 py-5 px-10 text-slate-300 ">
                    <Link to={`/user/profile`}>
                      <li className="border-b-[1px] border-white pb-2">
                        Profile
                      </li>
                    </Link>
                    <Link to={`/user/setting`}>
                      <li className="pb-2">Setting</li>
                    </Link>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex">
                <ButtonLogSign />
              </div>
            )}
          </div>
          <div
            className={`fixed z-50 lg:hidden backdrop-blur-xl border-[1px] border-slate-300 border-opacity-25 w-[99%]  transition-all duration-1000 ${
              menu ? "" : "-translate-y-[100vh]"
            }`}
          >
            <ul className="lg:flex p-4 ml-4 flex flex-col gap-7 font-medium text-slate-300 ">
              {navBarData.map((nav) => (
                <Navbar key={nav._id} nama={nav} visibleNav={visibleNav} />
              ))}

              <ButtonLogSign />
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
