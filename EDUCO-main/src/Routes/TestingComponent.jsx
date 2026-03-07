import React from 'react'
import FAQ from '../Components/FAQ'
import SliderProgram from '../Components/SliderProgram'

const TestingComponent = () => {
  return (
    <>
      <div className='text-center'>Testing Componeng
      </div>

      {/* FAQ Components*/}
      <h1>FAQ - Landing Page</h1>
      <FAQ />

      {/* Slider Components*/}
      <div className="">

        <h1>Slider - Landing Page</h1>
        <SliderProgram />
      </div>


      {/* Statistik Components */}
      
      <h1>Statistik</h1>
    </>
  )
}

export default TestingComponent