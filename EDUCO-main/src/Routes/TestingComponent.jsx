import React from 'react'
import FAQ from '../Components/FAQ'
import SliderProgram from '../Components/SliderProgram'
import Diagram from "../Components/Diagram"

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
      
      <div className="bg- w-full h-100">

      <h1>Statistik - Landing Page</h1>
      <Diagram/>
      </div>
    </>
  )
}

export default TestingComponent