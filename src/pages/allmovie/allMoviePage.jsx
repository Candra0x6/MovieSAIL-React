import React from 'react';
import { Link } from 'react-router-dom';
import WestIcon from '@mui/icons-material/West';
import EastIcon from '@mui/icons-material/East';
import Loading from '../../components/loading/Loading'
import { UseMovieGendre } from '../../ApiCall/UseGendre';
import { UsePopularMovie } from '../../ApiCall/UsePopular';
export default function AllMoviePage() {    
    const {movie, isLoading, setPage, setFilterGenres, page, filterGenres} = UsePopularMovie()
    const {genre} = UseMovieGendre()
       

    const scrollTop = () => {
        window.scrollTo({
            behavior: 'smooth',
            top: 0,
        });
    };

    const handlePrev = () => {
        if (page < 1) {
            return;
        } else {
            setPage((prevState) => prevState - 1);
        }
        scrollTop();
    };

    const handleNext = () => {
        if (page >= movie.total_pages) {
            return;
        } else {
            setPage((prevState) => prevState + 1);
        }
        scrollTop();
    };
    console.log(filterGenres)

    const handleFilterGenres = (id) => {
        if (filterGenres.includes(id)) {
            setFilterGenres((prevIds) => prevIds.filter((prevId) => prevId !== id));
        } else {
            setFilterGenres((prevIds) => [...prevIds, id]);
        }
    };


    return (
        <div className='flex flex-col items-center pb-40 sticky overflow-hidden bg-[#13123A]'>
            <div className='container'>
            <div className="absolute top-0 left-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[30vh]  rounded-full "></div>
            <div className="absolute top-10 left-[15%] bg-[#423EE0] bg-opacity-50 blur-[100px] z-0 w-[50vh] h-[30vh]  rounded-full "></div>
            <div className="absolute top-0 right-0 bg-[#3EE0D6] bg-opacity-40 blur-[100px] z-0 w-[30vh] h-[30vh]  rounded-full "></div>
            <div className="absolute top-20 right-[15%] bg-[#423EE0] bg-opacity-50 blur-[100px] z-0 w-[50vh] h-[20vh]  rounded-full "></div>
            <div className="absolute top-[20%] left-0 bg-[#423EE0] bg-opacity-50 blur-[100px] z-0 w-[30vh] h-[20vh]  rounded-full "></div>
            <div className="absolute top-[40%] -right-20 bg-[#812DE2] bg-opacity-40 blur-[100px] z-0 w-[40vh] h-[50vh]  rounded-full "></div>
                {/* Your genre filter buttons */}
                <div className='flex flex-col text-white font-medium z-10 justify-center mb-10 mt-20'>
                    <h1 className='z-10 text-2xl mt-20 text-center '>Ultimate Destination for Movie Insights</h1>
                    <h1 className=' z-10 mb-7 text-lg mt-10  text-center '>Choose Your Favorite Genre</h1>
                    <div className='grid md:grid-cols-4 grid-cols-3 grid-flow-row md:w-[70%] mx-auto place-items-center gap-5'>
                        {genre.map((genre) => (
                            <div
                                key={genre.id}
                                onClick={() => handleFilterGenres(genre.id)}
                                className={`py-1 cursor-pointer z-10 w-[80%] font-mono text-center text-xs  rounded-full ${filterGenres.includes(genre.id) ? 'bg-[#DC2064] text-white' : 'bg-slate-600 text-slate-300'
                                    }`}
                            >
                                <h1>{genre.name}</h1>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='flex flex-wrap md:gap-[37px] justify-center gap-x-5'>
                    {
                        isLoading && 
                        <Loading />
                    }
                    {movie?.map((val, key) => (
                        <>
                            <div className='mt-10 z-10 w-56'>
                                <Link to={`/movie/${val.id}`}>
                                    <div className='rounded-md w-[14rem] h-[20rem] shadow-lg overflow-hidden'>
                                        <img
                                            alt=' Poster'
                                            src={`${process.env.REACT_APP_IMG_URL}${val.poster_path}`}
                                            key={key}
                                            className='hover:scale-110 transition-all duration-500 w-full cursor-pointer h-full rounded-md'
                                        />
                                    </div>
                                </Link>
                                <div className='flex items-end justify-end mt-2 -mr-2'>
                                    <div className=' absolute py-[2px] text-center items-center px-2 rounded-full bg-yellow-400'>
                                        <span className='font-medium text-[12px]'>{val.vote_average}/ 10</span>
                                    </div>
                                </div>
                                <div className='mt-2'>
                                    <h6 className='text-teal-600 font-mono text-[11px]'>{val.release_date}</h6>
                                    <h1 className='text-white text-lg font-medium -mt-1'>{val.title}</h1>
                                </div>
                            </div>
                        </>
                    ))}
                </div>

                {/* Pagination */}
                <div className='flex justify-between pt-2 border-t-[1px] mt-36 border-slate-700 mb-20'>
                    <div onClick={handlePrev} className='text-white cursor-pointer flex gap-2 items-center'>
                        <WestIcon />
                        <h1 className='text-sm'>Previous</h1>
                    </div>
                    <div className='flex text-white font-medium'>
                        {movie && (
                            <h1 className='text-[#DC2064] font-bold text-lg'>
                                Page {page} 
                            </h1>
                        )}
                    </div>
                    <div onClick={handleNext} className='z-20 text-white cursor-pointer flex gap-2 items-center'>
                        <h1 className='text-sm'>Next</h1> <EastIcon />
                    </div>
                </div>
            </div>
        </div>
    );
}
