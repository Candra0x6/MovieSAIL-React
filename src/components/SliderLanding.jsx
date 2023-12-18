import React, { useState } from "react";
import Slider from "react-slick";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import SliderModal from "../components/SliderModal";
import { Autoplay } from "swiper/modules";
import SliderLoading from "./loading/SliderLoading";
import { UseMovieCredits } from "../ApiCall/UseMovieCredits";
import { UseMovieWeek } from "../ApiCall/UseMovieApi";
import { UseMovieGendre } from "../ApiCall/UseGendre";

export default function SliderLanding() {
  const { getMovieCreditsCast } = UseMovieCredits();
  const { genre } = UseMovieGendre();
  const { movie, isLoading } = UseMovieWeek();

  const NextArrow = ({ onClick }) => {
    return (
      <div onClick={onClick} className="absolute right-0 z-20">
        <ArrowCircleRightIcon
          sx={{ fontSize: 60 }}
          className="text-white cursor-pointer "
        />
      </div>
    );
  };

  const PrevArrow = ({ onClick }) => {
    return (
      <div onClick={onClick} className="absolute z-20">
        <ArrowCircleLeftIcon
          sx={{ fontSize: 60 }}
          className="text-white cursor-pointer "
        />
      </div>
    );
  };

  const handleModal = () => {
    setShowEmptyPage(true);
  };

  const [showEmptyPage, setShowEmptyPage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState({});

  const handleImageClick = async (
    image,
    title,
    date,
    overview,
    vote_average,
    genre_ids,
    movie_id,
    popularity,
    voting_count,
    media_type,
    name,
    release_date
  ) => {
    setSelectedImage(image);
    setShowEmptyPage(true);

    try {
      const { cast, directed } = await getMovieCreditsCast({
        movie_id,
        media_type,
      });

      if (genre && genre.length > 0) {
        const movieGenres = genre_ids.map((genreId) => {
          const foundGenre = genre.find((gen) => gen.id === genreId);
          return foundGenre ? foundGenre.name : "";
        });

        setSelectedMovieDetails({
          title: title,
          date: date,
          overview: overview,
          voting: vote_average,
          genre: movieGenres,
          cast: cast,
          directed: directed,
          id: movie_id,
          popularity: popularity,
          voting_count: voting_count,
          media_type: media_type,
          name: name,
          release_date,
        });
      } else {
        setSelectedMovieDetails({
          title: title,
          date: date,
          overview: overview,
          voting: vote_average,
          genre: "Genre not available",
          cast: cast,
          directed: "this shit n'have direct",
          media_type: "null",
        });
      }
    } catch (error) {
      console.error("Error fetching movie credits: ", error);
      setSelectedMovieDetails({
        title: title,
        date: date,
        overview: overview,
        voting: vote_average,
        genre: "Genre not available",
        cast: [],
        media_type: "null",
      });
    }
  };
  const handleClose = () => {
    setShowEmptyPage(false);
  };

  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 5,
    centerMode: true,
    centerPadding: 0,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (nilai, next) => setSelectedImageIndex(next),
    responsive: [
      {
        breakpoint: 1020, // Lebar layar ketika jumlah slide berubah
        settings: {
          slidesToShow: 3,
        },
      },
    ],
    modules: [Autoplay],
  };

  return (
    <div className={` lg:h-[900px] overflow-hidden h-[700px]`}>
      <div className=" w-full h-full absolute z-0 overflow-hidden">
        <div className="absolute bg-[#812DE2] layer bg-opacity-40 blur-[70px] lg:w-[50vh] lg:h-[20vh] w-[40vh] h-[10vh] z-0 rounded-full -left-20 top-10"></div>
        <div className="absolute right-0 bg-[#423EE0] bg-opacity-40 blur-[100px] -rotate-[20deg] z-0 md:w-[100vh] md:h-[40vh] w-[40vh] h-[20vh] rounded-full top-36"></div>
        <div className="absolute right-[20%] bg-[#3EE0D6] bg-opacity-30 blur-[100px] -rotate-[20deg] z-0 md:w-[50vh] md:h-[30vh] w-[40vh] h-[20vh] rounded-full top-0"></div>
      </div>

      <div className="z-20 pt-60">
        <h1 className="-mt-10 mb-20 text-center font-medium text-2xl text-white">
          Your Weekend Buddy for this Week
        </h1>
        <Slider {...settings} className="flex flex-col justify-center">
          {movie.slice(0, 20).map((val, indx) => (
            <div
              key={indx}
              onClick={() => {
                handleImageClick(
                  `${process.env.REACT_APP_IMG_URL}${val.poster_path}`,
                  val.title,
                  val.release_date,
                  val.overview,
                  val.vote_average,
                  val.genre_ids,
                  val.id,
                  val.popularity,
                  val.vote_count,
                  val.media_type,
                  val.name,
                  val.first_air_date
                );

                handleModal();
              }}
              className={`duration-500 transition-transform ${
                indx === selectedImageIndex
                  ? "scale-105 opacity-100"
                  : "scale-90 opacity-90 blur-[2px]"
              }`}
            >
              <img
                alt="movie / tv poster"
                src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                className="aspect-[4/6] w-full rounded-md cursor-pointer"
              />
            </div>
          ))}
        </Slider>
        {isLoading && <SliderLoading />}
        <SliderModal
          showEmptyPage={showEmptyPage}
          selectedImage={selectedImage}
          handleClose={handleClose}
          selectedMovieDetails={selectedMovieDetails}
        />
      </div>
    </div>
  );
}
