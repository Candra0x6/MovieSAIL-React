import axios from "axios";

export const UseMovieCredits = () => {
  const getMovieCreditsCast = async ({ movie_id, media_type }) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/${media_type}/${movie_id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );

      const nameCast = result.data.cast.map((actor) => actor.name);
      const nameCastDirect = result.data.crew
        .filter((direct) => direct.department === "Directing")
        .map((data) => data.original_name);

      return { cast: nameCast, directed: nameCastDirect };
    } catch (error) {
      console.log(error);
      return { cast: [], directed: [] };
    }
  };

  return {
    getMovieCreditsCast,
  };
};
