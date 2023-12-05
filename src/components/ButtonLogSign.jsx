import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonLogSign() {
    return (
        <Link to={`/sign-in`} >
        <div className='md:flex'>
            <button className='md:px-7 md:w-auto w-full py-2 font-medium bg-rose-500 text-slate-300 duration-300 hover:bg-rose-700 hover:shadow-xl rounded-full'>Login or Register</button>
        </div>
        </Link>
    )
}
