// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GiveReviewPage from './pages/giveReview/giveReviewPage';
import Notfound404Page from './pages/404page/notfound404Page';
import AllMoviePage from './pages/allmovie/allMoviePage';
import PageMovieId from './pages/movie/[id]/pageMovieId';
import SearchPage from './pages/search/movie/SearchPage';
import TvSeriesPage from './pages/tv/[id]/TvSeriesPage';
import SeasonsPage from './pages/tv/[id]/seasons/[seasons_number]/SeasonsPage';
import AllTvSeriesPage from './pages/tv/alltvseries/AllTvSeriesPage';
import PeoplePage from './pages/people/[id_people]/PeoplePage';
import { SkeletonTheme } from 'react-loading-skeleton';
import SignIn from './pages/Auth/login/Sign In';
import SignUp from './pages/Auth/register/Sign Up';
import UserProfile from './pages/User/Profile/UserProfile';
import UserSetting from './pages/User/Setting/UserSetting';
import LandingPages from './pages/LandingPage/LandingPages';
import HeaderPages from './pages/LandingPage/header/Header';
import Footer from './pages/LandingPage/footer/Footer'
function App() {
  return (
    <>
    <Router>
      <HeaderPages />
      <SkeletonTheme baseColor='#131140' highlightColor='#3B3963'>
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/movie/:id" element={<PageMovieId />} />
        <Route path="/search/movie" element={<SearchPage />} />
        <Route path="/movie/all-movie" element={<AllMoviePage />} />
        <Route path="/tv/:id" element={<TvSeriesPage />} />
        <Route path="/tv/:id/season/:seasons_number" element={<SeasonsPage />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/give-review" element={<GiveReviewPage />} />
        <Route path="*" element={<Notfound404Page />} />
        <Route path="/tv/all-tv-series" element={<AllTvSeriesPage />} />
        <Route path="/person/:id" element={<PeoplePage />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/setting" element={<UserSetting />} />

      </Routes>
      </SkeletonTheme>
      <Footer />
    </Router>
    </>
    
  );
}

export default App;
