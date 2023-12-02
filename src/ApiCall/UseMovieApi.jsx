import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ErorNetworkPop from "../components/erorNetwork/ErorNetworkPop";

export const UseMovieDataApi = () => {
  const [isLoading, setisLoading] = useState(true);
  const [isEror, setisEror] = useState(false);
  const [SortMovie, setSortMovie] = useState(``);
  const [dataMovies, setDataMovies] = useState([]);

  const getMovies = async () => {
    
    try {
      const resultGetMovie = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}${SortMovie}`
      );
      setisLoading(false);
      const resultCore = resultGetMovie.data.results;
      setDataMovies(resultCore);
    } catch (error) {
      
      setisEror(true);
    }
  };

  return {
    isLoading,
    isEror,
    setSortMovie,
    setDataMovies,
    dataMovies,
    data : getMovies
  };
};

export const UseMovieWeek = () => {
  const {ErorMsg} = ErorNetworkPop()
  const [movie, setMovie] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const getMoviesWeek =useCallback( async () => {
    try {
      const resultGetMovie = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/trending/all/week?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      setisLoading(false);
      const coreResult = resultGetMovie.data.results;
      setMovie(coreResult);
    } catch (eror) {
      ErorMsg()
    }
  },[ErorMsg]);
  useEffect(() => {
    getMoviesWeek();
  }, [getMoviesWeek]);
 
   return {
    movie,
    setMovie,
    isLoading,
    data : getMoviesWeek
  };
};
