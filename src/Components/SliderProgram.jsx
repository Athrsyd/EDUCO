import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderProgram = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <div className="w-full container mx-auto px-2">
      <Slider {...settings}>
        <div className="px-2 ">
          <div className="bg-[#F5C518] rounded-2xl min-h-100   p-4 md:p-5 flex flex-col items-center gap-6 md:gap-10">
            <h1 className="font-bold text-lg md:text-2xl text-white text-center">Ruang Kelas Pembelajaran Lingkungan</h1>
            <div className="w-full max-w-xs lg:w-80 md:60 mx-auto">
              <img src="/Program_Vector_1.svg" alt="Program Vector 1" className="w-full h-auto" />
            </div>
          </div>
        </div>
        <div className="px-2">
          <div className="bg-[#F5C518] rounded-2xl min-h-100  p-4 md:p-5 flex flex-col items-center gap-6 md:gap-10">
            <h1 className="font-bold text-lg md:text-2xl text-white text-center">Game Edukatif Bertema Lingkungan</h1>
            <div className="w-full max-w-xs lg:w-60 md:40 mx-auto">
              <img src="/Program_vector_2.svg" alt="Program Vector 2" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default SliderProgram