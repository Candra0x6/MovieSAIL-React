import React, { useCallback, useEffect, useState } from 'react'

export default function FIlterDiscoverTv({ setSortTv, getTv, }) {
    const [filterListItem, setFilterListItem] = useState([
        {
            id: 1,
            name: 'Random',
            type: 'random',
            active: true,
        },
        {
            id: 2,
            name: 'Popular',
            type: 'popular',
            active: false,
        },
        {
            id: 3,
            name: 'Upcoming',
            type: 'upcoming',
            active: false,
        },
    ]);
    const [filterChanged, setFilterChanged] = useState(false);


    const filterMenuDiscover = useCallback((type) => {
        if (type === 'popular') {
            setSortTv(`&sort_by=vote_average.desc`)
        } else if (type === 'upcoming') {
            setSortTv(`&sort_by=primary_release_date.desc`)
        } else {
            setSortTv(``)
        }
    },[setSortTv])

    useEffect(() => {
      const filtering = filterListItem.find((item) => item.active);
      filterMenuDiscover(filtering.type);
  
      setFilterChanged(true);
    }, [filterListItem, filterMenuDiscover]);
  
    useEffect(() => {
      if (filterChanged) {
        const timerId = setTimeout(() => {
          getTv();
          setFilterChanged(false); // Reset filterChanged after executing getTv()
        }, 300); 
  
        return () => clearTimeout(timerId)
      }
    }, [filterChanged, filterListItem, getTv]);

    const handleFilterClick = (id) => {
        setFilterListItem((prevFilterList) =>
            prevFilterList.map((item) => ({
                ...item,
                active: item.id === id ? true : false,
            }))
        );
    };


    return (
        <div>
            <ul className='text-white items-center text-md font-meidum flex gap-5'>
                {filterListItem.map((val) => (
                    <li
                        key={val.id}
                        className={`cursor-pointer pb-2 ${val.active ? 'border-b-2 border-red-700 text-red-500' : ''
                            }`}
                        onClick={() => handleFilterClick(val.id)}
                    >
                        {val.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
