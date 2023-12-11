import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export const PostAddFavoriteMovie = () => {
    const sessionID = localStorage.getItem('account')

    const AddFavorite = async(id) => {
        try {
          const postAddFavorite = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/account/20575052/favorite?session_id=${sessionID}&api_key=${process.env.REACT_APP_TMDB_KEY}`,
            {
              media_type: "movie",
              media_id: id,
              favorite: true
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
            const wrapAdd = postAddFavorite.data.success
            if (wrapAdd === true) {
                toast.success("Favorite Succes Added", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            } else {
                toast.error("Fail Added Favorite", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    });
            }
        } catch (e) {
          console.log(e)
        }
      }
  return {
    AddFavorite,
  }
}


export const GetFavoriteMovie = () => {
    const [favoriteMovie, setFavoriteMovie] = useState([])
    const sessionID = localStorage.getItem('account')

    useEffect(() => {
        const getFavoriteMovie = async() => {
            try {
              const getResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/20575052/favorite/movies?session_id=${sessionID}&api_key=${process.env.REACT_APP_TMDB_KEY}`)
                const wrapResponse = getResponse.data.results
                setFavoriteMovie(wrapResponse)
            } catch (e) {
              console.log(e)
            }
          }
        getFavoriteMovie()
    },[sessionID])
    
  return {
    favoriteMovie
  }
}


export const PostAddFavoriteTv = () => {
    const sessionID = localStorage.getItem('account')

        const addFavoriteTv = async(id) => {
            try {
              const postAddFavorite = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/account/20575052/favorite?session_id=${sessionID}&api_key=${process.env.REACT_APP_TMDB_KEY}`,
                {
                  media_type: "tv",
                  media_id: id,
                  favorite: true
                },
                {
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
                const wrapAdd = postAddFavorite.data.success
                if (wrapAdd === true) {
                    toast.success("Favorite Succes Added", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                } else {
                    toast.error("Fail Added Favorite", {
                        position: "bottom-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                        });
                }
            } catch (e) {
              console.log(e)
            }
          }
  return {
    addFavoriteTv
  }
}


export const GetFavoriteTv = () => {
    const [favoriteTv, setFavoriteTv] = useState([])
    const sessionID = localStorage.getItem('account')
    console.log(sessionID)
    useEffect(() => {
        const getFavoriteTv = async() => {
            try {
              const getResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/20575052/favorite/tv?session_id=${sessionID}&api_key=${process.env.REACT_APP_TMDB_KEY}`)
                const wrapResponse = getResponse.data.results
                setFavoriteTv(wrapResponse)
            } catch (e) {
              console.log(e)
            }
          }
        getFavoriteTv()
    },[sessionID])
  return {
    favoriteTv
  }
}


