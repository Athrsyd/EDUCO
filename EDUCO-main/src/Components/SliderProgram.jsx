import React from 'react'
import Gambar1 from '../../public/Program_Vector_1.svg';
import Gambar2 from '../../public/Program_Vector_2.svg';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderProgram = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    
    return (
      <div className="max-w-md mx-auto px-4">
      <Slider {...settings}>
    <div className="px-2">
      <div className="bg-[#F5C518] rounded-2xl min-h-100 p-5 flex flex-col items-center gap-10">
        <h1 className="font-bold text-2xl text-white text-center">Ruang Kelas Pembelajaran Lingkungan</h1>
        <div className="w-80 mx-auto">
            <img src={Gambar1} alt="Program Vector 1" />
        </div>
      </div>
    </div>
    <div className="px-2">
      <div className="bg-[#F5C518] rounded-2xl min-h-100 p-5 flex flex-col items-center gap-10">
        <h1 className="font-bold text-2xl text-white text-center">Game Edukatif Bertema Lingkungan</h1>
        <div className="w-60 mx-auto">
            <img src={Gambar2} alt="Program Vector 2" />
        </div>
      </div>
    </div>
      </Slider>
      </div>
  )
}

export default SliderProgram