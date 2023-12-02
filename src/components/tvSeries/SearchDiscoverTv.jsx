import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
export default function SearchDiscoverTv({searchTv, setTvSeries}) {

const handleSearch = async (event) => {

    const q = event.target.value
    if (q.length > 2) {
        const getQuery = await searchTv(q)
        setTvSeries(getQuery)

    }
}

    return (
        <div className="flex">
            <div className={`p-2 z-10 bg-transparent`}>
                <SearchIcon sx={{ fontSize: 25 }} className="text-[#ffffff63] cursor-pointer " />
            </div>
            <div className={`-ml-11`}>
                <input
                    type='text'
                    onChange={handleSearch}
                    placeholder='Search something here....'
                    className={`font-thin py-2 md:px-10 px-20 sm:px-28 bg-gray-300 bg-opacity-10 text-white rounded-full`} />
            </div>
        </div>

    )
}
