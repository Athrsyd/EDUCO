import React from 'react'

const Progress = ({ value, max }) => {
  // Example values - replace with actual dynamic values
  const percentage = (value / max) * 100;

  return (
    <div className="container w-1/4 mx-auto flex flex-row items-center justify-center mt-10">
      <div className='bg-neutral-300 transition-all duration-300 ease-in-out h-4 w-full rounded-full'>
        <div className='bg-primary h-4 transition-all duration-300 ease-in-out rounded-full' style={{ width: `${percentage}%` }} />
      </div>
        <h1 className='text-md  text-secondary font-semibold ml-4'>{percentage.toFixed(0)}%</h1>
    </div>
  )
}

export default Progress