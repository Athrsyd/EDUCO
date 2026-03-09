import React from 'react'
import testimoni from '../assets/Data/testimoni'
import testimoni2 from '../assets/Data/testimoni2'

const TestimoniCard = ({ item }) => (
  <div className='flex flex-row min-w-100 max-w-110 border-2 border-primary rounded-2xl p-5'>
    <div className="flex-1">
      <div className="flex flex-row gap-5 items-center">
        <img className='w-12 h-12 rounded-full object-cover' src={item.gambar} alt={`Foto ${item.nama}`} />
        <div>
          <h1 className='font-bold text-2xl text-primary'>{item.nama}</h1>
          <p className='text-sm text-black/80'>{item.pekerjaan}</p>
        </div>
      </div>
      <div className="text-primary  font-semibold text-sm text-justify mt-5 mr-10">
        <p>{item.testimoni}</p>
      </div>
    </div>
    <div className="flex flex-col justify-around items-center gap-2">
      {Array.from({ length: item.bintang }, (_, i) => (
        <span key={i} className="text-xl">⭐</span>
      ))}
    </div>
  </div>
)

const Testimoni = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 bottom-0 left-0 w-18.75 z-10 pointer-events-none bg-linear-to-r from-last to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-18.75 z-10 pointer-events-none bg-linear-to-l from-last to-transparent"></div>

      <div className="flex flex-col gap-5">
        <div className="overflow-hidden pb-2 group">
          <div className="flex gap-5 w-max animate-[scroll-left_120s_linear_infinite] group-hover:[animation-play-state:paused]">
            {testimoni.map((item) => (
              <TestimoniCard key={item.id} item={item} />
            ))}
            {testimoni.map((item) => (
              <TestimoniCard key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
        <div className="overflow-hidden pb-2 group">
          <div className="flex gap-5 w-max animate-[scroll-right_120s_linear_infinite] group-hover:[animation-play-state:paused]">
            {testimoni2.map((item) => (
              <TestimoniCard key={`dup-${item.id}`} item={item} />
            ))}
            {testimoni2.map((item) => (
              <TestimoniCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimoni