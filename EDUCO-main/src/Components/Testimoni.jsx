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
          <p className='text-sm'>{item.pekerjaan}</p>
        </div>
      </div>
      <div className="text-primary text-sm text-justify mt-5 mr-10">
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
    <div className="testimoni-wrapper">
      <div className="w-20 transisi-kiri"></div>
      <div className="w-20 transisi-kanan"></div>

      <div className="flex flex-col gap-5">
        <div className="overlay-scroll">
          <div className="scroll-track">
            {testimoni.map((item) => (
              <TestimoniCard key={item.id} item={item} />
            ))}
            {testimoni.map((item) => (
              <TestimoniCard key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
        <div className="overlay-scroll">
          <div className="scroll-track-reverse">
            {testimoni2.map((item) => (
              <TestimoniCard key={item.id} item={item} />
            ))}
            {testimoni2.map((item) => (
              <TestimoniCard key={`dup-${item.id}`} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimoni