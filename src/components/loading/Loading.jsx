import React from 'react'

export default function Loading() {
  return (
<div className={`justify-center items-center h-[110vh] z-50 w-full bg-[#0b1225] space-x-2 inset-0 fixed flex `}>
  <div className='' aria-label="Loading..." role="status">
    <svg width="50" height="50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="animate-spin w-16 h-16 stroke-white">
      <path d="M12 3v3m6.366-.366-2.12 2.12M21 12h-3m.366 6.366-2.12-2.12M12 21v-3m-6.366.366 2.12-2.12M3 12h3m-.366-6.366 2.12 2.12">
      </path>
    </svg>
  </div>
  <span className=" font-medium text-white text-1xl">Loading...</span>
</div>  )
}
