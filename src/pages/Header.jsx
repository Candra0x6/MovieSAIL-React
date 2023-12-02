import React, { useEffect, useState } from "react";
import navBarData from "../data/navBarData";
import Navbar from "../components/Navbar";
import ButtonLogSign from "../components/ButtonLogSign";
import Search from "../components/Search";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import LogoIMG from "../data/MovieSAILlogo.png";

export default function HeaderPages() {
  const [menu, setMenu] = useState(false);
  const [visibleNav, setvisibleNav] = useState(true);
  const [prevNav, setprevNav] = useState(0);

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
  return (
    <>
      <header id="header">
        <div
          className={`pt-10 fixed w-full justify-center z-50 backdrop-blur-sm flex transition-all duration-500 ${
            visibleNav ? "translate-y-[0%]" : "-translate-y-[100%]"
          }`}
        >
          <div className="container">
            <div className="justify-between flex items-center border-b-[1px] border-opacity-10 border-white pb-7">
              <div className="flex items-center md:gap-11 md:ml-0 ml-5">
                <a href="/">
                  <img src={LogoIMG} alt="LogoImg" className="w-20 h-20" />
                </a>
                <ul className="md:flex p-4 gap-7 font-medium text-slate-300 hidden ">
                  {navBarData.map((nav) => (
                    <Navbar key={nav._id} nama={nav} />
                  ))}
                </ul>
                <Search  />
              </div>
              <button
                onClick={handleMenu}
                className={`md:hidden fixed right-5 `}
              >
                <div className={`${menu ? "hidden" : " text-white"}`}>
                  <MenuIcon sx={{ fontSize: 35 }} />
                </div>
                <div className={`${menu ? "text-white" : "hidden"}`}>
                  <CloseIcon sx={{ fontSize: 35 }} />
                </div>
              </button>
              <div className="hidden md:flex">
                <ButtonLogSign />
              </div>
            </div>
            <div
              className={`fixed z-50 md:hidden backdrop-blur-xl border-[1px] border-slate-300 border-opacity-25 w-[99%]  transition-all duration-1000 ${
                menu ? "" : "-translate-y-[100vh]"
              }`}
            >
              <ul className="md:flex p-4 ml-4 flex flex-col gap-7 font-medium text-slate-300 ">
                {navBarData.map((nav) => (
                  <Navbar key={nav._id} nama={nav} visibleNav={visibleNav} />
                ))}
                <ButtonLogSign />
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
