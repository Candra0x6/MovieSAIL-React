import { useState, useEffect } from "react";
import axios from "axios";

export const UsePopularTv = () => {
  const [Tv, setTv] = useState([]);
  const [TotalPage, setTotalPage] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filterGenres, setFilterGenres] = useState([]);

  useEffect(() => {
    const getTv = async () => {
      try {
        const result = await axios(
          `${process.env.REACT_APP_BASE_URL}/tv/popular?page=${page}&api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const pagination = result.data.results;
        const totalPage = result.data;
        setTotalPage(totalPage);
        const filteredResults = pagination?.filter((val) =>
          filterGenres.length > 0
            ? filterGenres.every((genreId) => val.genre_ids.includes(genreId))
            : true
        );
        setTv(filteredResults);
        setisLoading(false);
      } catch {
        alert("Error fetching movie");
      }
    };

    getTv();
  }, [page, filterGenres]);

  return {
    data: Tv,
    TotalPage,
    isLoading,
    page,
    setPage,
    filterGenres,
    setFilterGenres,
  };
};

export const UsePopularMovie = () => {
  const [page, setPage] = useState(1);
  const [filterGenres, setFilterGenres] = useState([]);
  const [movie, setMovie] = useState([]);
    const [isLoading, setisLoading] = useState(true) 
  useEffect(() => {
    const getMovie = async () => {
      try {
          const result = await axios(`${process.env.REACT_APP_BASE_URL}/movie/popular?page=${page}&api_key=${process.env.REACT_APP_TMDB_KEY}`);
          const pagination = result.data.results
          const filteredResults = pagination?.filter((val) =>
              filterGenres.length > 0 ? filterGenres.every((genreId) => val.genre_ids.includes(genreId)) : true
              
          );
          
          setMovie(filteredResults);
          setisLoading(false)
  
      } catch {
          alert('Error fetching movie');
      }
  };
  getMovie()
  }, [page, filterGenres])
 
  return {
    movie, 
    isLoading,
    setPage,
    setFilterGenres,
    page,
    filterGenres,
    
  }
}

