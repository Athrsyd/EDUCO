import { useState } from 'react'
import dataIcon from '../assets/Data/icon';


const FAQ = (
  { nomor = 1,
    Q = "lorem ipsum dolor amet sit amet wawaw wowow wiwiw wuwuwu wewewe wowowo ?",
    A = "lorem ipsum dolor amet sit amet wawaw wowow wiwiw wuwuwu wewewe wowowo ?"
  }) => {
  const [isOpen, setIsOpen] = useState('');

  const toggleOpen = (nama) => {
    setIsOpen(nama);
    if (isOpen === nama) {
      setIsOpen('');
    }
  }
  return (
    <div className='flex items-start gap-3 md:gap-5 cursor-pointer z-999 w-full'>
      <h1 className='font-bold text-2xl md:text-4xl text-[#2D6A0F] mt-2 flex-shrink-0'>0{nomor}</h1>
      <div className="flex flex-col max-w-full md:max-w-125">
        <div onClick={() => toggleOpen(`faq-${nomor}`)} className='flex flex-row justify-between items-center gap-2 md:gap-4 bg-primary py-2 md:py-3 px-4 md:px-6 rounded-full cursor-pointer z-10'>
          <h2 className='text-sm md:text-base font-bold text-last'>{Q}</h2>
          <div className={`transition-transform duration-300 flex-shrink-0 ${isOpen === `faq-${nomor}` ? 'rotate-90' : ''}`}>
            {dataIcon({ size: 28, color: "white" }).chervronRight}
          </div>
        </div>
        <div className={`overflow-hidden max-w-full md:max-w-115 transition-all duration-300 ${isOpen === `faq-${nomor}` ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className='bg-accent rounded-b-2xl px-4 md:px-6 pt-4 md:pt-8 pb-4 md:pb-6 -mt-3 md:-mt-5 mx-4 md:mx-8 text-justify'>
            <p className='text-secondary font-medium leading-relaxed text-sm md:text-base'>
              {A}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ