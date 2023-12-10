import React from "react";
import Img from "../data/createProfil.jpeg";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
export default function Footer() {
  return (
      <div className="z-0 mx-auto flex bg-[#27294E] flex-col items-center sm:px-6 lg:px-8">
        <div className="flex flex-col z-0 bg-[#27294E] -mt-20 w-[10rem] h-[10rem] items-center justify-end bg-[27294E] rounded-full">
          <img
            src={Img}
            className="h-full z-40 w-full rounded-full p-3"
            alt="Profil Creator"
          />
        </div>
        <div className="flex flex-col text-base text-white mt-7 items-center justify-center">
          <p>
            © 2023 All rights reserved. | Created with passion by{" "}
            <span className="font-bold">CN</span>
          </p>
          <p className="text-center mt-2 w-[80%]">
            This website was carefully crafted by me , using HTML5, CSS3, and
            JavaScript. It is powered by a range of cutting-edge Tailwind Css
            and React JS, ensuring a seamless and engaging user experience.
            Additionally, also use TMDB API have been seamlessly integrated,
            enhancing the functionality and interactivity of the site.
          </p>
        </div>
        <div className="flex  mb-10 justify-center mt-8 space-x-6">
          <a
            href="https://x.com/supimcn?t=hdtdnw1_1UEvYj174JBybA&s=09"
            className="text-gray-400 hover:text-gray-500 px-2 py-2 bg-slate-800 rounded-full"
          >
            <span className="sr-only">Twitter ( X )</span>
            <TwitterIcon />
          </a>
          <a
            href="https://github.com/Candra0x6"
            className="text-gray-400 hover:text-gray-500 px-2 py-2 bg-slate-800 rounded-full"
          >
            <span className="sr-only">GitHub</span>
            <GitHubIcon />
          </a>
          <a
            href="https://instagram.com/yo6cann?igshid=OGQ5ZDc2ODk2ZA=="
            className="text-gray-400 hover:text-gray-500 px-2 py-2 bg-slate-800 rounded-full"
          >
            <span className="sr-only">Instagram</span>
            <InstagramIcon />
          </a>
        </div>
      </div>
  );
}
