import React from 'react'
import { Link } from 'react-router-dom'
export default function Notfound404Page() {
  return (
    <>
    <div className="flex items-center justify-center h-full bg-[#0b1225] bg-fixed bg-cover bg-bottom ">
	<div className="container">
		<div className="row">
			<div className="col-sm-8 offset-sm-2 text-gray-50 text-center -mt-52">
				<div className="relative ">
				<h1 className="relative text-9xl tracking-tighter-less text-shadow font-sans font-bold">
					<span className=''>4</span><span>0</span><span>4</span></h1>
					<span className="absolute  top-0   -ml-12 font-semibold text-red-500">Oops!</span>
					</div>
				<h5 className="text-gray-300 font-semibold -mr-10 mt-3">Page not found</h5>
				<p className="text-gray-100 mt-2 mb-10">we are sorry, but the page you requested was not found</p>
                <Link to={`/`}>
					<button className="bg-pink-500 mt px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg"
> 					🚶‍♂️ Go to Home 
					</button>
                </Link>
			</div>
		</div>
	</div>
</div>
    </>
    )
}
