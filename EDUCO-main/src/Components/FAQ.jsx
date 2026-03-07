import { useState } from 'react'
import dataIcon from '../assets/Data/icon';


const FAQ = ({nomor=1, Q= "lorem ipsum dolor amet sit amet wawaw wowow wiwiw wuwuwu wewewe wowowo ?", A= "lorem ipsum dolor amet sit amet wawaw wowow wiwiw wuwuwu wewewe wowowo ?"}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className='flex items-start gap-5 py-10 px-10'>
      <h1 className='font-bold text-4xl text-[#2D6A0F] mt-2'>0{nomor}</h1>
      <div className="flex flex-col max-w-125">
        <div onClick={toggleOpen} className='flex flex-row justify-between items-center gap-4 bg-[#48A111] py-3 px-6 rounded-full cursor-pointer z-10'>
          <h2 className='text-base font-bold text-white'>{Q}</h2>
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}>
            {dataIcon({ size: 36, color: "white" }).chervronRight}
          </div>
        </div>
        <div className={`overflow-hidden max-w-115 transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className='bg-[#F5C518] rounded-b-2xl px-6 pt-8 pb-6 -mt-5 ml-10 text-justify'>
            <p className='text-[#2D6A0F] font-medium leading-relaxed'>
              {A}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ