import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErorNetworkPop from "../components/erorNetwork/ErorNetworkPop";

export const UseTvbyID = () => {

  const { id } = useParams();
  const [getTv, setTv] = useState([]);
  const [TvCredits, setTvCredits] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [episode, setEpisode] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getSeasons = getTv?.seasons?.length;
  const seasons = getSeasons > 1 ? getSeasons - 1 : getSeasons;
  const {ErorMsg} = ErorNetworkPop()

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data;
        setTv(result);
        setIsLoading(false);
      } catch (eror) {
        ErorMsg()
      }
    };

    const fetchCreditsTv = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/aggregate_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data;
        setTvCredits(result);
      } catch (eror) {
      }
    };

    const fetchRecommendationsTv = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data.results;
        setRecommend(result);
      } catch (eror) {
      }
    };

    const scrollTop = () => {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    };
    fetchTv();
    fetchCreditsTv();
    fetchRecommendationsTv();
    scrollTop();
  }, [id, ErorMsg]);

  useEffect(() => {
    const fetchEpisodeTv = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/season/${seasons}?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data;
        setEpisode(result);
      } catch (eror) {
      }
    };
    fetchEpisodeTv();
  }, [seasons, id]);

  return {
    TvCredits,
    recommend,
    episode,
    isLoading,
    getTv,
    id,
  };
};

export  const UseSeasonEpisodesTv = () => {
  const {ErorMsg} = ErorNetworkPop()
  const { seasons_number } = useParams();
  const { id } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [detailEpisode, setDetailEpisode] = useState(null);
  const [dataDetailEpisode, setDataDetailEpisode] = useState([]);
  const [detailEpisodesImage, setDetailEpisodesImage] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  useEffect(() => {
    const fetchEpisodesFromSeasons = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/season/${seasons_number}?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data;
        setEpisodes(result);
        setisLoading(false);
      } catch (eror) {
        ErorMsg()
      }
    };
    fetchEpisodesFromSeasons();
  }, [id, seasons_number, ErorMsg]);

  useEffect(() => {
    const fetchEpisodesDetail = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/season/${seasons_number}/episode/${detailEpisode}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data;
        console.log(result);
        setDataDetailEpisode(result);
      } catch (eror) {
      }
    };

    const fetchEpisodesImage = async () => {
      try {
        const Tv = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/tv/${id}/season/${seasons_number}/episode/${detailEpisode}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Tv.data.stills;
        console.log(result);
        setDetailEpisodesImage(result);
      } catch (eror) {
      }
    };
    fetchEpisodesDetail();
    fetchEpisodesImage();
  }, [detailEpisode, id, seasons_number]);
  return {
    episodes,
    detailEpisode,
    setDetailEpisode,
    dataDetailEpisode,
    detailEpisodesImage,
    isLoading,
  };
};

export const UseMoviebyID = () => {
  const {ErorMsg} = ErorNetworkPop()
  const { id } = useParams(); // Use the useParams hook to get the 'id' parameter from the URL
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState({
    direct: [],
    casts: [],
  });
  const [Video, setVideo] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    const getMovie = async () => {
      try {
        const Movie = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/movie/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const result = Movie.data;
        setMovie(result);
        setIsLoading(false);
      } catch (eror) {
        ErorMsg()
      }
    };
    const getMovieCredits = async () => {
      try {
         const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_KEY}`
      );
      const castData = response.data;

      // Filter cast and crew
      const directorsData = castData.crew.filter(
        (person) => person.department === "Directing"
      );
      const castMembers = castData.cast;

      // Update state
      setCast({ direct: directorsData, casts: castMembers });
      } catch (eror) {
        
      }
     
    };

    const getVideo = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        const foundTrailer = result.data.results.find(
          (trailer) =>
            trailer.name.toLowerCase() === "Official Trailer".toLowerCase()
        );
        if (foundTrailer) {
          const findTrailer = foundTrailer.key;
          setTrailer(findTrailer);
        } else {
          console.log("there is'nt trailer");
        }
        setVideo(result.data.results);
        setVideos(result.data.results);
      }catch(e) {
        
      }
      
    };
    const getRecomendation = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${id}/recommendations?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setRecommend(result.data.results);
      } catch (e) {
        
      }
      
    };

    const getReview = async () => {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
        );
        setReview(result.data.results);
      } catch (e) {

      }
      
    };
    const scrollTop = () => {
      window.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    };

    getMovie();
    getVideo();
    getRecomendation();
    getMovieCredits();
    getReview();
    scrollTop();
  }, [id, ErorMsg]);
  return {
    Video,
    trailer,
    recommend,
    review,
    Loading: isLoading,
    movie,
    cast,
    videos,
    setVideos,
  };
};

export const UsePeoplebyID = () => {

  const { id } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [PeopleData, setPeopleData] = useState([]);
  const [PeopleMovieData, setPeopleMovieData] = useState([]);
  useEffect(() => {
    const fetchPeopleData = async () => {
      try {
        const getPeople = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/person/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const resultPeopleData = getPeople.data;
        setPeopleData(resultPeopleData);
        setisLoading(false);
      } catch (eror) {
     }

      
    };
    const fetchPeopleMovie = async () => {
      try {
        const resultGetData = await axios.get(
          `${
            process.env.REACT_APP_BASE_URL
          }${`/person/${id}/movie_credits?api_key=${process.env.REACT_APP_TMDB_KEY}`}`
        );
        const resultPeopleMovie = resultGetData.data;
        setPeopleMovieData(resultPeopleMovie);
      } catch (eror) {
     }
    };
    fetchPeopleData();
    fetchPeopleMovie();
  }, [id]);
  return {
  isLoading,
  PeopleData,
  PeopleMovieData
  };
};
