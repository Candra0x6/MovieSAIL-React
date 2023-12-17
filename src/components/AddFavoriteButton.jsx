import React from "react";
import {
  PostAddFavoriteMovie,
  PostAddFavoriteTv,
} from "../ApiCall/UseAddFavorite";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";

export function AddFavoriteButtonMovie({ id }) {
  const { AddFavorite, isLogin } = PostAddFavoriteMovie();
  return (
    <div className="flex items-start mt-2">
      <button
        id="add movie favorite"
        aria-label="Add Movie Favorite"
        className=" text-[#DC2064] rounded-full"
        onClick={() => {
          AddFavorite(id, true);
          isLogin();
        }}
      >
        <BookmarkAddIcon sx={{ fontSize: 30 }} className="" />
      </button>
    </div>
  );
}

export function AddFavoriteButtonTv({ id }) {
  const { addFavoriteTv, isLogin } = PostAddFavoriteTv();

  return (
    <div className="flex items-start mt-2">
      <button
        id="add tv favorite"
        aria-label="Add Tv Favorite"
        className=" text-[#DC2064] rounded-full"
        onClick={() => {
          addFavoriteTv(id, true);
          isLogin();
        }}
      >
        <BookmarkAddIcon sx={{ fontSize: 30 }} className="" />
      </button>
    </div>
  );
}
