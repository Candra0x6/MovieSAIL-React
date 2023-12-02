import  { useState } from "react";
import axios from "axios";
export const UseTvSeries = () => {
  const [sortTv, setSortTv] = useState(``);
  const [tvSeries, setTvSeries] = useState([]);
  const getTvSeries = async () => {
    try {
      const Tv = await axios.get(
        `${
          process.env.REACT_APP_BASE_URL
        }${`/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}${sortTv}`}`
      );
      const result = Tv.data.results;
       setTvSeries(result)
    } catch (error) {
      console.log('eror fetching TV')
    }
  };

  return {
  getTvSeries,
  sortTv,
  setSortTv,
  tvSeries,
  setTvSeries
};
};
