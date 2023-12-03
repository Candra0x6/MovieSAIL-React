import React, { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, } from 'react-router-dom';

function Search() {
    const [click, setClick] = useState(false)
    const navigasi = useNavigate()
    const reload = () => {
        setTimeout(() => {
          window.location.reload();
        }, 300);
      }
    const handleFilter = async (event) => {
        if (event.key === 'Enter') {
            const q = event.target.value
            if(q.length>3 ){
            navigasi(`/search/movie?search=${q}`)
            reload()
        }
        }
        
    };

    const handleClickSearch = () => {
        setClick(!click)
    }

    return (
        <>
        <div className="flex lg:ml-0 ml-7">
            <div onClick={handleClickSearch} className={`p-2 z-10 duration-500 rounded-full ${click ? 'bg-transparent sm:translate-x-0 translate-x-[8.5rem]' : ' bg-gray-300 bg-opacity-10'}`}>
                <SearchIcon sx={{ fontSize: 25 }} className="text-white cursor-pointer " />
            </div>
            <div className={`duration-500 ${click ? '' : 'invisible'} bg-transparent -ml-11 `}>
                <input
                onKeyDown={handleFilter
                }
                 type='text' 
                 placeholder={`${click ? 'Cari FIlm Kamu' : ''}`} 
                 className={`duration-500 font-thin py-2 bg-gray-300 bg-opacity-10 text-white rounded-full ${click ? 'md:px-16 sm:px-20 px-2' : 'w-11 '}`} />
            </div>
        </div>
        </>
    )
}

export default Search
