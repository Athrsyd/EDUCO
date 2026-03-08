import React from 'react'
import Navbar from '../../Components/Navbar'
import Background from '/bg-new.jpg'
import Footer from '../../Components/Footer'
import Pohon from '/pohon.svg'
import gambarTawar from '/aboutUs_pict.svg';
import SliderProgram from '../../Components/SliderProgram';
import FAQ from '../../Components/FAQ';
import hiasan from '/asapIjo.png'
import awan from '/awan.png'
import Diagram from '../../Components/Diagram'

const LandingPage = () => {

    const dataProgram = [
        {
            id: 1,
            title: 'Program 1',
            description: 'Ruang Kelas Pembelajaran Lingkungan yang Terintegrasi dengan Sekolah '
        },
        {
            id: 2,
            title: 'Program 2',
            description: 'Pembelajaran Lingkungan berbasis misi / quest'
        },
        {
            id: 3,
            title: 'Program 3',
            description: 'Game Edukatif bertema pembelajaran Lingkungan'
        }
    ]
    const dataFAQ = [
        {
            id: 1,
            Q: 'Apa itu Educo?',
            A: 'Educo adalah sebuah platform pembelajaran lingkungan yang dirancang untuk membantu siswa memahami pentingnya menjaga lingkungan melalui berbagai program edukatif dan interaktif.'
        },
        {
            id: 2,
            Q: 'Siapa yang dapat menggunakan Educo?',
            A: 'Educo dapat digunakan oleh siswa, guru, dan sekolah yang ingin meningkatkan pemahaman tentang isu lingkungan.'
        },
        {
            id: 3,
            Q: 'Apakah Educo Berbayar?',
            A: 'EDUCO dibuat dengan niat murni untuk memberikan akses pendidikan lingkungan yang berkualitas kepada semua orang, tanpa memungut biaya. Kami percaya bahwa pengetahuan tentang lingkungan harus dapat diakses oleh semua orang, tanpa terkecuali.'
        },
        {
            id: 4,
            Q: 'Apakah Educo Berbayar?',
            A: 'EDUCO dibuat dengan niat murni untuk memberikan akses pendidikan lingkungan yang berkualitas kepada semua orang, tanpa memungut biaya. Kami percaya bahwa pengetahuan tentang lingkungan harus dapat diakses oleh semua orang, tanpa terkecuali.'
        },
    ]
    return (
        <div className='overflow-x-hidden'>
            <Navbar />
            {/* Home Start */}
            <section id="home" className="relative overflow-hidden rounded-b-4xl">
                {/* Background image */}
                <img src={Background} alt="Background" className='absolute inset-0 w-full h-full object-cover' />
                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-black/35"></div>

                {/* Konten */}
                <div className="relative z-10 flex flex-col text-white">

                    <div className="px-15 mt-35 text-center">
                        <h1 className='text-8xl font-bold text-center'>Welcome to
                            <span className='text-primary'> {''}Educo</span></h1>
                        <h2 className='mt-5 text-4xl font-semibold text-center' >"Generasi Penerus, Hidupkan Lingkungan"
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

                    <div className="buttons flex flex-row justify-center items-center mt-10 pb-20">
                        <button className="bg-primary hover:bg-blue-700 text-white font-bold py-2 px-5 rounded-full">
                            Mulai bergabung dengan kami
                        </button>
                        <button className="ml-4 bg-secondary hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
                            Pelajari lebih lanjut tentang kami
                        </button>
                    </div>
                </div>
            </section>
            {/* Home End */}


            {/* About Start */}
            <section id='about' className='relative flex bg-last w-full rounded-b-4xl z-40'>
                <div className="container flex flex-row py-10 mt-10 px-30 ">
                    <div className="kiri w-1/2">

                        <div className="ml-10 bg-linear-to-b from-primary to-secondary w-60 py-2 rounded-full">

                            <h1 className='text-3xl font-bold text-center text-last
                        '
                            >Tentang Kami</h1>
                        </div>
                        <div>

                            <img src={Pohon} alt="pohon" className="w-265 relative " />
                        </div>
                    </div>
                    <div className="kanan w-1/2 ">
                        <div className="w-full mx-auto">
                            <p className=' text-md text-justify '>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br /><br />
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br /><br />
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis!</p>

                            <div className="h-0.75 bg-accent w-full mx-auto mt-5 rounded-full"></div>
                        </div>
                        <div className="bentos w-full mx-auto flex flex-row justify-center gap-20 mt-10">
                            <div className="bentos1 w-4/10 text-center">
                                <h2 className='text-lg font-bold text-secondary'>Telah di percaya oleh</h2>
                                <div className='w-full bg-accent/80 p-5 text-center rounded-3xl mt-5'>
                                    <h1 className="text-primary text-4xl font-bold ">230+</h1>
                                    <p className='text-last font-semibold text-xl mt-3'>Sekolah</p>
                                </div>
                            </div>
                            <div className="bentos2 w-4/10 text-center ">
                                <h2 className='text-lg font-bold text-secondary'>Di gunakan oleh</h2>
                                <div className='w-full bg-accent/80 p-5 text-center rounded-3xl mt-5'>
                                    <h1 className="text-primary text-4xl font-bold ">1000+</h1>
                                    <p className='text-last font-semibold text-xl mt-3'>Siswa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="h-0.75 bg-secondary/60 w-200 mx-auto mt-10 rounded-full"></div> */}
                </div>

            </section>

            {/* About 2 start */}
            <section className='relative  z-30 -mt-10 bg-secondary w-full rounded-b-4xl '>
                <div className="container px-30 py-20 ">
                    <div className="programs mx-auto gap-10 flex flex-row w-full justify-center items-center">
                        {dataProgram.map((program, index) => (
                            <>
                                <div className="program w-1/4 text-last" key={index}>
                                    <h1 className='text-3xl font-bold '>{String(index + 1).padStart(2, '0')}</h1>
                                    <p className='text-lg font-bold text-justify mt-2'>{program.description}</p>
                                </div>
                                {index !== dataProgram.length - 1 && (
                                    <div className="h-40 bg-last w-0.75 mx-auto mt-10 rounded-full"></div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="tawar mt-10 flex flex-row justify-center items-center">
                        <div className="kiri flex flex-col gap-10 w-1/2">

                            <div className="ml-10 bg-last w-100 py-2 rounded-full">
                                <h1 className='text-xl font-bold text-center text-primary'>Apa yang kami tawarkan?</h1>
                            </div>
                            <img src={gambarTawar} className="w-120" alt="" />
                        </div>
                        <div className="kanan w-1/2 flex flex-col gap-10">
                            <p className=' text-lg text-justify text-last font-semibold'>
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br /><br />
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis! <br /><br />
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                                Magni soluta illo excepturi quo voluptatum at iure, expedita
                                accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                                Perspiciatis!</p>
                            <button className='bg-accent px-5 py-2 w-2/5 text-xl text-last font-semibold rounded-full'>
                                Mulai Sekarang</button>
                        </div>
                    </div>
                </div>
            </section>
            {/* About 2 end */}


            {/* Program Start*/}
            <section id='program' className='relative -mt-10 pt-10 z-20 px-30 bg-last '>
                <div className="hiasan absolute -z-999 left-220 -top-30 w-full">
                    <img src={hiasan} alt="asep" className='w-1/2 ' />
                </div>
                <div className="container w-full  py-20 flex flex-row justify-between items-center gap-20">
                    <div className="kiri w-1/2 flex flex-col gap-10">
                        {/* Jangan lupa ini ganti font */}
                        <h1 className='text-7xl font-anton text-start text-primary'>Program Kami</h1>
                        <p className='text-lg text-justify text-primary font-semibold mt-5'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Magni soluta illo excepturi quo voluptatum at iure, expedita
                            accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                            Perspiciatis!
                        </p>
                        <button className='bg-accent px-5 py-2 w-1/2 text-xl text-last font-semibold rounded-full'>
                            Daftar Sekarang
                        </button>
                    </div>
                    <div className="kanan w-1/2">
                        <SliderProgram />
                    </div>
                </div>
                <div className="container absolute z-999 left-0 -bottom-20 w-full flex flex-row  justify-start items-end">
                    {Array(10).fill().map((_, index) => (
                        <img src={awan} alt="" className='w-3/10 -ml-20' key={index} />
                    ))}
                </div>
                    <br />
                    <br />
                    <br />
            </section>
            {/* Program End*/}


            {/* FAQ start */}
            <section className='relative z-20 bg-last rounded-b-4xl'>
                <div className="hiasan absolute -z-999 right-50 -top-30 w-full">
                    <img src={hiasan} alt="asep" className='w-1/2 ' />
                </div>
                <div className="container w-full px-30 py-20 flex flex-row justify-between items-center gap-20">
                    <div className="kiri w-1/2 flex flex-col justify-start items-center gap-10">
                        {dataFAQ.map((faq) => (
                            <FAQ
                                key={faq.id}
                                nomor={faq.id}
                                Q={faq.Q}
                                A={faq.A}
                            />
                        ))}
                    </div>
                    <div className="kanan w-1/2">
                        <h1 className='text-7xl leading-tight font-anton text-end text-primary'>Kenapa Memilih EDUCO ?</h1>
                        <p className='text-lg text-justify text-primary font-semibold mt-5'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Magni soluta illo excepturi quo voluptatum at iure, expedita
                            accusantium perspiciatis doloribus, aut tenetur, illum assumenda.
                            Perspiciatis!
                        </p>
                    </div>
                </div>
            </section>
            {/* FAQ end */}

            {/* Statistik Start */}
            <section className='relative bg-secondary z-10 -mt-10 w-full rounded-b-4xl '>
                <div className="container w-full px-30 py-20 flex flex-col justify-between items-center gap-20">
                    <div className="header mx-auto text-center">
                        <h1 className='text-6xl leading-tight font-anton text-center text-last'>
                            Statistik Kasus <span>Pencemaran Alam Tahunan</span>
                            </h1>
                    </div>
                </div>
            </section>
            {/* Statistik ENd */}
            
            <br />
            <br />
            {/* About End */}
            <Footer />
        </div>
    )
}

export default LandingPage