import { useState, useEffect } from 'react'
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
import Testimoni from '../../Components/Testimoni'
import Counter from '../../Components/Counter'
import { Link } from 'react-router-dom'
import ParalaxBurung from '../../Components/ParalaxBurung'
import EducoAI from './EducoAI'

const LandingPage = () => {
    const [role, setRole] = useState(null)
    const [showAI, setShowAI] = useState(false)
    const ctaPath = role ? `/${role}/dashboard` : '/register'

    useEffect(() => {
        const getUserRole = () => localStorage.getItem('userRole')
        const peran = getUserRole()
        const isValidRole = peran === 'guru' || peran === 'siswa'
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setRole(isValidRole ? peran : null)
    }, [])

    const dataProgram = [
        {
            id: 1,
            title: 'Kelas Interaktif',
            description: 'Ruang kelas digital yang terintegrasi dengan kegiatan sekolah untuk belajar isu lingkungan secara kontekstual.'
        },
        {
            id: 2,
            title: 'Misi Aksi',
            description: 'Pembelajaran berbasis misi dan tantangan nyata agar siswa terbiasa berpikir kritis dan bertindak solutif.'
        },
        {
            id: 3,
            title: 'Game Edukatif',
            description: 'Permainan edukatif bertema lingkungan untuk memperkuat pemahaman melalui pengalaman yang menyenangkan.'
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
            Q: 'Apa manfaat utama EDUCO bagi sekolah?',
            A: 'EDUCO membantu sekolah menyusun pembelajaran lingkungan yang lebih terarah, terukur, dan menarik. Guru dapat memantau capaian siswa, sementara siswa belajar melalui aktivitas yang relevan dengan kehidupan sehari-hari.'
        },
    ]
    return (
        <div className='overflow-x-hidden'>
            <Navbar onOpenAI={() => setShowAI(true)} />
            <section id="home" className=" h-screen relative overflow-hidden rounded-b-3xl md:rounded-b-4xl">

                <img src={Background} alt="Background" className='absolute h-screen inset-0 w-full object-cover' />
                <div className="absolute inset-0 h-screen bg-black/35"></div>

                {/* Konten */}
                <div className="relative z-10 justify-center items-center h-full flex flex-col text-white">

                    <div className="px-4 md:px-15 mt-25  text-center">
                        <h1 className='text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-center'>Welcome to
                            <span className='bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
                                {' '}EDUCO
                            </span>
                        </h1>
                        <h2 className='mt-3 md:mt-5 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center' >"Generasi Penerus, Hidupkan Lingkungan"
                        </h2>
                        <div className="mt-8 md:mt-15 w-3/4 mx-auto">
                            <p className='text-sm md:text-lg text-justify'>
                                EDUCO merupakan sebuah layanan website pembelajaran terkait pelestarian lingkungan yang berfungsi sebagai sarana pembelajaran. Kami menghadirkan banyak cara unik untuk menyelesaikan masalah terkait lingkungan. Bersama EDUCO, kami mendukung generasi penerus untuk berkembang serta berperan dalam menciptakan lingkungan yang lebih baik.</p>
                        </div>
                        <div className="h-0.75 bg-last/60 w-48 sm:w-64 md:w-200 mx-auto mt-6 md:mt-10 rounded-full"></div>
                    </div>

                    <div className="buttons flex flex-row justify-center items-center mt-6 md:mt-10 pb-10 md:pb-20 px-4">
                        <Link to="/register">
                            <button className="rounded-full bg-primary px-4 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-secondary hover:shadow-xl md:px-5 md:py-2 md:text-base">
                                Mulai
                            </button>
                        </Link >
                        <a href="#about">

                            <button className="ml-2 rounded-full bg-secondary px-3 py-2 text-sm font-bold text-white shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary hover:shadow-xl md:ml-4 md:px-4 md:py-2 md:text-base">
                                Pelajari
                            </button>
                        </a>
                    </div>
                </div>
            </section>
            {/* Home End */}


            {/* About Start */}
            <section id='about' className='relative flex bg-last w-full rounded-b-3xl md:rounded-b-4xl z-40'>
                <div className="container flex flex-col lg:flex-row py-8 md:py-10 mt-8 md:mt-10 px-4 md:px-30">
                    <div className="kiri container w-full lg:w-1/2 mb-8 lg:mb-0">
                        <div className="ml-20 md:ml-30 lg:ml-12 bg-linear-to-b from-primary to-secondary mx-auto px-5 md:w-80 w-50 py-2 rounded-full">
                            <h1 className='text-xl md:text-3xl font-bold text-center text-last'>Tentang Kami</h1>
                        </div>
                        <div className="mt-4 md:mt-6">
                            <img src={Pohon} alt="pohon" className="w-full max-w-xs md:max-w-sm lg:max-w-md mx-auto" />
                        </div>
                    </div>
                    <div className="kanan w-full lg:w-1/2">
                        <div className="w-full">
                            <p className='text-sm md:text-base text-justify font-semibold text-secondary leading-relaxed'>
                                EDUCO hadir sebagai solusi atas meningkatnya persoalan lingkungan, sekaligus menjadi sarana untuk meningkatkan efektivitas dan kualitas pendidikan lingkungan di sekolah. <br /><br />
                                Melalui berbagai program dan fitur yang inovatif, kami berupaya untuk mendukung guru dan siswa dalam mengakses materi pembelajaran secara mudah, fleksibel, dan efektif. <br /><br />
                                Kami percaya bahwa teknologi dapat menjadi jembatan untuk menciptakan pengalaman belajar yang lebih baik bagi generasi masa depan.</p>

                            <div className="h-0.75 bg-accent w-full mx-auto mt-5 rounded-full"></div>
                        </div>
                        <div className="bentos w-full flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-6 md:mt-8">
                            <div className="bentos1 w-full sm:w-1/2 text-center">
                                <h2 className='text-sm md:text-base font-bold text-secondary'>Telah di percaya oleh</h2>
                                <div className='w-full bg-accent/80 p-4 text-center rounded-3xl mt-3'>
                                    <h1 className="text-primary text-3xl md:text-4xl font-bold"><Counter target={230} suffix="+" /></h1>
                                    <p className='text-last font-semibold text-base md:text-lg mt-2'>Sekolah</p>
                                </div>
                            </div>
                            <div className="bentos2 w-full sm:w-1/2 text-center">
                                <h2 className='text-sm md:text-base font-bold text-secondary'>Di gunakan oleh</h2>
                                <div className='w-full bg-accent/80 p-4 text-center rounded-3xl mt-3'>
                                    <h1 className="text-primary text-3xl md:text-4xl font-bold"><Counter target={1000} suffix="+" /></h1>
                                    <p className='text-last font-semibold text-base md:text-lg mt-2'>Siswa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About 2 start */}
            <section className='relative z-30 -mt-8 md:-mt-10 bg-secondary w-full rounded-b-3xl md:rounded-b-4xl'>
                <div className="container px-4 md:px-30 py-10 md:py-20">
                    <div className="programs mx-auto gap-6 md:gap-10 flex flex-col sm:flex-row w-full justify-center items-center">
                        {dataProgram.map((program, index) => (
                            <>
                                <div key={index} className="program w-full sm:w-1/2 lg:w-1/4 text-last text-center sm:text-left px-2 md:px-0">
                                    <h1 className='text-2xl md:text-3xl font-bold'>{String(index + 1).padStart(2, '0')}</h1>
                                    <p className='text-sm md:text-base lg:text-lg font-bold text-justify mt-2 leading-relaxed'>{program.description}</p>
                                </div>
                                {index !== dataProgram.length - 1 && (
                                    <div className="h-16 sm:h-32 lg:h-40 bg-last w-0.75 mx-auto my-4 md:my-10 rounded-full"></div>
                                )}
                            </>
                        ))}
                    </div>
                    <div className="tawar mt-8 md:mt-10 flex flex-col lg:flex-row justify-center items-center">
                        <div className="kiri flex flex-col gap-4 md:gap-6 lg:gap-10 w-full lg:w-1/2 px-2 md:px-0">
                            <div className="ml-2 md:ml-10 bg-last w-auto md:w-100 py-2 rounded-full">
                                <h1 className='text-base md:text-lg lg:text-xl font-bold text-center text-primary'>Apa yang kami tawarkan?</h1>
                            </div>
                            <img src={gambarTawar} className="w-40 md:w-56 lg:w-md lg:mx-0 mx-auto" alt="" />
                        </div>
                        <div className="kanan w-full lg:w-1/2 flex flex-col gap-4 md:gap-6 lg:gap-10 mt-6 lg:mt-0 px-2 md:px-0">
                            <p className='text-sm md:text-base lg:text-lg text-justify text-last font-semibold leading-relaxed'>
                                Program ini dirancang untuk membantu siswa memahami pentingnya menjaga lingkungan melalui pembelajaran yang interaktif dan menyenangkan. <br /><br />
                                Dengan berbagai aktivitas seperti misi lingkungan, praktik langsung, dan permainan edukatif, siswa dapat belajar sekaligus berkontribusi dalam menjaga alam sekitar. <br /><br />
                                Kami percaya bahwa pendidikan lingkungan sejak dini dapat membentuk generasi yang lebih peduli dan bertanggung jawab terhadap bumi</p>
                            <Link to='/login'>
                                <button className='mx-auto w-full lg:w-2/5 rounded-full bg-accent px-4 md:px-5 py-2.5 md:py-3 text-sm md:text-base lg:text-lg font-semibold text-last shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-xl'>
                                    Mulai Sekarang
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* About 2 end */}


            {/* Program Start*/}
            <section id='program' className='relative -mt-8 md:-mt-10 pt-8 md:pt-10 z-20 px-4 md:px-30 bg-last overflow-visible pb-32 md:pb-40'>
                <div className="hiasan absolute -z-999 left-0 md:left-220 -top-20 md:-top-30 w-full">
                    <img src={hiasan} alt="asep" className='w-1/2 max-w-xs md:max-w-full' />
                </div>
                <ParalaxBurung className=" hidden lg:block absolute inset-0 z-60 -mb-95" />
                <div className="container relative z-20 w-full py-10 md:py-20 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20">
                    <div className="kiri w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
                        {/* Jangan lupa ini ganti font */}
                        <h1 className='text-4xl sm:text-5xl md:text-7xl font-anton text-center md:text-start bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>Program Kami</h1>
                        <p className='text-base md:text-lg text-justify text-primary font-semibold mt-3 md:mt-5'>
                            Kami menyediakan permainan edukatif berbasiskan lingkungan yang membuat siswa bisa secara langsung belajar dan mempraktikkan bagaimana cara melestarikan lingkungan.
                        </p>
                        <Link to='/login' className='hidden md:block'>
                            <button className='w-full rounded-full bg-accent px-5 py-3 text-lg font-semibold
                            text-last shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5
                            hover:bg-primary hover:text-white hover:shadow-xl lg:w-1/2 md:text-xl'>
                                Daftar Sekarang
                            </button>
                        </Link>
                    </div>
                    <div className="kanan w-full md:w-1/2">
                        <SliderProgram />
                    </div>
                    <Link to='/login' className='block md:hidden'>
                        <button className=' w-full rounded-full bg-accent px-5 py-3 text-lg font-semibold
                            text-last shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5
                            hover:bg-primary hover:text-white hover:shadow-xl lg:w-1/2 md:text-xl'>
                            Daftar Sekarang
                        </button>
                    </Link>
                </div>
                <div className="container absolute z-40 left-0 bottom-0 w-full flex flex-row justify-start items-end overflow-hidden px-4">
                    {Array(10).fill().map((_, index) => (
                        <img
                            src={awan}
                            alt=""
                            className='shrink-0 w-20 sm:w-28 md:w-36 lg:w-44 -ml-6 sm:-ml-8 md:-ml-10 lg:-ml-12 object-contain'
                            key={index}
                        />
                    ))}
                </div>
                <br />
                <br />
                <br />
            </section>
            {/* Program End*/}


            {/* FAQ start */}
            <section className='relative z-10  bg-last rounded-b-3xl md:rounded-b-4xl'>
                <div className="hiasan absolute -z-999 right-0 md:right-225 -top-20 md:-top-30 w-full">
                    <img src={hiasan} alt="asep" className='w-1/2 max-w-xs md:max-w-full ml-auto' />
                </div>
                <div className="container w-full px-10 lg:px-30 py-10 md:py-20 flex flex-col-reverse lg:flex-row justify-between items-center gap-10 md:gap-20">
                    <div className="kiri w-full lg:w-1/2 flex flex-col justify-center items-center gap-6 lg:gap-10">
                        {dataFAQ.map((faq) => (
                            <FAQ
                                key={faq.id}
                                nomor={faq.id}
                                Q={faq.Q}
                                A={faq.A}
                            />
                        ))}
                    </div>
                    <div className="kanan w-full lg:w-1/2">
                        <h1 className='text-4xl sm:text-5xl lg:text-7xl leading-tight font-anton text-center md:text-end bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent '>Kenapa Memilih EDUCO ?</h1>
                        <p className='text-base md:text-lg text-justify text-primary font-semibold mt-3 md:mt-5'>
                            EDUCO lahir sebagai repons perkembangan zaman. Solusi edukatif di era globalisasi untuk generasi kedepan yang memiliki dampak berkelanjutan.
                        </p>
                    </div>
                </div>
            </section>
            {/* FAQ end */}

            {/* Statistik Start */}
            <section className='relative pt-10 -mt-8 md:-mt-10 bg-secondary w-full rounded-b-3xl md:rounded-b-4xl '>
                <div className="container w-full lg:px-30 py-10 md:py-20 flex flex-col justify-between items-center gap-10">
                    <div className="header mx-auto text-center">
                        <h1 className='text-3xl sm:text-4xl md:text-6xl leading-tight font-anton text-center text-last'>
                            Statistik Kasus <span>Pencemaran Alam Tahunan</span>
                        </h1> <br />

                        <p className='text-base md:text-lg text-justify px-12 text-last font-semibold'>
                            Data tahunan menunjukkan bahwa persoalan pencemaran udara, air, dan sampah rumah tangga
                            masih menjadi tantangan utama. Melalui statistik ini, siswa dapat memahami pola perubahan
                            dari tahun ke tahun, mengenali faktor penyebab, serta menyusun langkah pencegahan yang
                            lebih tepat sasaran bersama sekolah dan masyarakat.
                        </p>
                    </div>
                    <div className="diagram w-full px-10 mx-auto">
                        <div className="bg-last rounded-4xl md:p-10">
                            <Diagram />
                        </div>
                    </div>
                </div>
            </section>
            {/* Statistik ENd */}

            {/* Testimoni Start  */}
            <section id='testimoni' className='relative bg-last w-full rounded-b-3xl md:rounded-b-4xl '>
                <div className="container flex flex-col justify-center items-center gap-10 py-10 md:py-20 px-4 md:px-40">
                    <div className=" bg-linear-to-b from-primary to-secondary  py-2 px-5 rounded-4xl">
                        <h1 className='text-xl md:text-2xl font-bold text-center text-last
                        '
                        >Apa Kata Mereka?</h1>
                    </div>
                    <div className="testimoni ">
                        <Testimoni />
                    </div>

                    <div className="w-full flex justify-center flex-col py-4 gap-15 text-center items-center bg-primary rounded-4xl">
                        <h1 className='text-3xl font-bold text-last'
                        >{role ? `Kamu telah masuk sebagai ${role}. Lanjutkan pembelajaranmu sekarang.` : <p className='text-2xl'>Ribuan pelajar dan guru sudah memulai bersama EDUCO.<br />Sekarang giliranmu membawa perubahan untuk lingkungan.</p>}</h1>
                        <Link to={ctaPath}>
                            <button className='rounded-3xl bg-last px-12 py-6 text-3xl font-bold text-primary shadow-md transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:bg-accent hover:text-last hover:shadow-2xl'>
                                {role ? 'Masuk ke Dashboard' : 'Daftar Sekarang!'}
                            </button>
                        </Link>
                    </div>
                    <br /><br />
                </div>
            </section>
            {/* Testimoni End */}
            {/* About End */}
            <Footer />
            
            {/* EducoAI Modal dengan Animation */}
            {showAI && (
              <div className="animate-in fade-in zoom-in-95 duration-300">
                <EducoAI onClose={() => setShowAI(false)} />
              </div>
            )}
        </div>
    )
}

export default LandingPage
