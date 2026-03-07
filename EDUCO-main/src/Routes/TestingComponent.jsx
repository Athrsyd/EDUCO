import React from 'react'
import FAQ from '../Components/FAQ'
import SliderProgram from '../Components/SliderProgram'
import Diagram from "../Components/Diagram"
import Testimoni from '../Components/Testimoni'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

const TestingComponent = () => {
  return (
    <>

      <Navbar/>
      <br /><br />
      <br /><br />

      <div className='text-center'>Testing Component
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

      {/* Testimoni Components */}
      <h1>Testimoni - Landing Page</h1>
      <Testimoni />


      <h1 className ='mb-10'>Footer - Landing Page</h1>
      <Footer />
    </>
  )
}

export default TestingComponent