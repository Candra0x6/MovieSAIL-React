import React from 'react'
import Skeleton from 'react-loading-skeleton'

export default function SkeletonLoadingPeople() {
  return (
    <div className='flex flex-col items-center mt-20 z-20 gap-y-8'>
        <Skeleton circle width={300} height={300} className='' />
        <Skeleton height={20} width={300} />
        <Skeleton height={20} width={400} />
        <Skeleton height={400} width={800} className='self-start mt-10' />
    </div>
    
  )
}
