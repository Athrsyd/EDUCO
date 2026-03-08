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
    <div className='flex items-start gap-5 cursor-pointer z-999'>
      <h1 className='font-bold text-4xl text-[#2D6A0F] mt-2'>0{nomor}</h1>
      <div className="flex flex-col max-w-125">
        <div onClick={() => toggleOpen(`faq-${nomor}`)} className='flex flex-row justify-between items-center gap-4 bg-primary py-3 px-6 rounded-full cursor-pointer z-10'>
          <h2 className='text-base font-bold text-last'>{Q}</h2>
          <div className={`transition-transform duration-300 ${isOpen === `faq-${nomor}` ? 'rotate-90' : ''}`}>
            {dataIcon({ size: 36, color: "white" }).chervronRight}
          </div>
        </div>
        <div className={`overflow-hidden max-w-115 transition-all duration-300 ${isOpen === `faq-${nomor}` ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className='bg-accent rounded-b-2xl px-6 pt-8 pb-6 -mt-5 mx-8  text-justify'>
            <p className='text-secondary font-medium leading-relaxed'>
              {A}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ