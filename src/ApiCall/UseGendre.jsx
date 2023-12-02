import { useEffect, useState } from "react";
import axios from "axios";

export const UseMovieGendre = () => {
  const [genre, setGenre] = useState([]);
  useEffect(() => {
    const getGendreMovie = async () => {
      const resultGet = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const resultCore = resultGet.data.genres;
      setGenre(resultCore);
    };
    getGendreMovie();
  }, []);
  return {
    genre,
    setGenre,
  };
};

export const UseTvGendre = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getGenre = async () => {
      try {
        const result = await axios(
          `${process.env.REACT_APP_BASE_URL}/genre/tv/list?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const genre = result.data.genres;
        setGenres(genre);
      } catch {
        alert("Error fetching genre");
      }
    };
    getGenre();
  }, []);

  return {
    genres,
  };
};
