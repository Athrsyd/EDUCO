import React from 'react'
import Navbar from '../../Components/Navbar'
import Background from '/bg-new.jpg'
import Footer from '../../Components/Footer'
import Pohon from '/pohon.svg'

const LandingPage = () => {
    return (
        <>
            {/* Home Start */}
            <section id="home">

                <div className='overflow-hidden flex flex-col  text-white'>
                    <Navbar />
                    <img src={Background} alt="Background" className='absolute top-0 z-50 rounded-b-4xl' />
                    <div className="absolute h-162 w-full bg-black/35 z-60 rounded-b-4xl"></div>

                    <div className="z-100  w-full">

                    <div className=" px-15 mt-35 text-center">
                        <h1 className='text-8xl font-bold text-center'>Welcome to
                            <span className='text-primary'> {''}Educo</span></h1>
                        <h2 className='mt-5 text-4xl font-semibold text-center' >“Generasi Penerus, Hidupkan Lingkungan”
                        </h2>
                        <div className="mt-15 w-3/4 mx-auto">
                            <p className=' text-lg text-justify '>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis!</p>
                        </div>
                        <div className="h-0.75 bg-last/60 w-200 mx-auto mt-10 rounded-full"></div>
                    </div>

                    <div className="buttons flex flex-row justify-center items-center mt-10">
                        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
                            Mulai bergabung dengan kami
                        </button>
                        <button className="ml-4 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                            Pelajari lebih lanjut tentang kami
                        </button>
                    </div>

                    </div>
                </div>
            </section>
            {/* Home End */}


            {/* About Start */}
            <section className='bg-last  h-screen'>
                <div className="container mt-20 flex flex-row py-20 px-15 ">
                    <div className="kiri">

                        <h1 className='text-5xl font-bold text-center text-secondary'>Tentang Kami</h1>
                        <div>

                        <img src={Pohon} alt="pohon" className="w-300 relative -bottom-4" />
                        </div>
                    </div>
                    <div className="kanan">
                        <div className="w-3/4 mx-auto">
                            <p className=' text-lg text-justify '>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br/><br/>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br/><br/>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis!</p>
                        </div>
                        
                    </div>
                    {/* <div className="h-0.75 bg-secondary/60 w-200 mx-auto mt-10 rounded-full"></div> */}
                </div>

            </section>
            {/* About End */}
            <Footer/>
        </>
    )
}

export default LandingPage