import axios from "axios";

function UseDeleteSession() {
  const getSessionAccount = localStorage.getItem("account");
  const deletedSession = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/authentication/session?api_key=${process.env.REACT_APP_TMDB_KEY}`,
        {
          data: {
            session_id: getSessionAccount,
          },
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return {
    deletedSession,
  };
}

export default UseDeleteSession;
