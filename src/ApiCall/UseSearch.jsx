import axios from "axios";
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import ErorNetworkPop from "../components/erorNetwork/ErorNetworkPop";
export const UseSearchMovie = () => {
  const searchMovie = async (q) => {
    try {
      const Movie = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }${`/search/movie?query=${q}&api_key=${process.env.REACT_APP_TMDB_KEY}`}`
      );
      return Movie.data.results;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    search: searchMovie,
  };
};

export const UseSearchTv = () => {
  const searchTv = async (q) => {
    try {
      const Movie = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }${`/search/tv?query=${q}&api_key=${process.env.REACT_APP_TMDB_KEY}`}`
      );
      return Movie.data.results;
    } catch (error) {
      console.log(error);
    }
  };
  return {
    search: searchTv,
  };
};

export const UseMainSearchMovie = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const episodeNumber = searchParams.get("search");
  const decodeSearch = decodeURI(episodeNumber);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchTv, setSearchTv] = useState([]);
  const {ErorMsg} = ErorNetworkPop()


  useEffect(() => {
    const searchMovie = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/search/movie?query=${decodeSearch}&page=${page}&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setSearch(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie data:", error);
        ErorMsg()
        setLoading(false);
      }
    };

    const fetchSearchTv = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/search/tv?query=${decodeSearch}&page=${page}&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setSearchTv(response.data.results);
        setLoading(false);
        console.log(response);
      } catch (error) {
        console.error("Error fetching TV data:", error);
        setLoading(false);
      }
    };
    searchMovie();
    fetchSearchTv();
    
  }, [page, decodeSearch, ErorMsg]);

  return {
    Loading : isLoading,
    setPage,
    search,
    searchTv,
    decodeSearch,
    page
  };
};
