import React from "react";

export default function EpisodesPage({
  dataDetailEpisode,
  detailEpisodesImage,
}) {  
  return (
    <>
      <div className="mt-4 pt-2 border-t-[1px] mx-10 text-white border-slate-500 flex flex-col">
        <div className="flex justify-between mt-5 ">
          <div className="flex flex-col w-40 ">
            <h1 className="font-bold text-base">
              Crew {dataDetailEpisode.crew.length}
            </h1>
            <h1 className=" text-sm">
              Directed By:{" "}
              {dataDetailEpisode.crew.find(
                (val) => val.known_for_department === "Directing"
              )?.name || "Data tidak ada"}
            </h1>
            <h1 className="text-sm">
              Written By:{" "}
              {dataDetailEpisode.crew.find(
                (val) => val.known_for_department === "Writing"
              )?.name || "Data tidak ada"}
            </h1>
          </div>
          <div className="flex flex-col justify-center w-auto">
            <h1 className="font-medium mb-2">Guest Starts</h1>
            <div className="flex flex-wrap lg:w-full w-[30%] gap-10 ">
              {dataDetailEpisode.guest_stars.length === 0
                ? dataDetailEpisode.cast.map((val, id) => (
                    <div key={id} className="flex w-[10rem] items-center">
                      <div className="flex h-[50px] w-[90px] mr-2 justify-center items-center rounded-full">
                        <img
                          alt="cast "
                          className="w-full h-full rounded-full"
                          src={`${process.env.REACT_APP_IMG_URL}${val.profile_path}`}
                        />
                      </div>
                      <div className="flex-col w-[10rem] ml-2 flex justify-center">
                        <h1 className="text-[14px]">
                          {val?.original_name || "Data tidak ada"}
                        </h1>
                        <h1 className="text-[10px]">{val.character}</h1>
                      </div>
                    </div>
                  ))
                : dataDetailEpisode.guest_stars.map((val, id) => (
                    <div key={id} className="flex w-[10rem] items-center">
                      <div className="flex h-[50px] w-[90px] mr-2 justify-center items-center rounded-full">
                        <img
                          alt="cast "
                          className="w-full h-full rounded-full"
                          src={`${process.env.REACT_APP_IMG_URL}${val.profile_path}`}
                        />
                      </div>
                      <div className="flex-col w-[10rem] ml-2 flex justify-center">
                        <h1 className="text-[14px]">
                          {val?.original_name || "Data tidak ada"}
                        </h1>
                        <h1 className="text-[10px]">{val.character}</h1>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
          <div className="flex text-sm font-medium">
            <h1>Full Cast</h1>
          </div>
        </div>
        <div className=" w-[140vh] my-10">
          <h1 className="font-medium text-base mb-2">Episode Images</h1>

          <div className="grid gap-x-5 grid-flow-col  overflow-auto hide-scrollbar ">
            {detailEpisodesImage?.map((val, id) => (
              <div key={id} className="w-[24vh] h-[13vh] rounded-xl">
                <img
                  className="h-full w-full rounded-xl"
                  src={`${process.env.REACT_APP_IMG_URL}${val.file_path}`}
                  alt=" episode"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
