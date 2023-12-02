import { useEffect, useState } from "react";
import axios from "axios";

const UsePopularPeople = () => {
  const [TopPeopleData, setTopPeopleData] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchPopularPeopleData = async () => {
      try {
        const getPopularPeople = await axios(
          `${process.env.REACT_APP_BASE_URL}/person/popular?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const resultGetPopularPeople = getPopularPeople.data.results;
        setTopPeopleData(resultGetPopularPeople);
        setisLoading(false);
      } catch (error) {
        console.log("message", error);
      }
    };
    fetchPopularPeopleData();
  }, []);
  return {
    TopPeopleData,
    isLoading,
  };
};
export default UsePopularPeople;
