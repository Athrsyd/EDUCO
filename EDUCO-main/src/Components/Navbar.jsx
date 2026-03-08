import React from 'react'
import Logo from '/logo_Educo.svg'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true)
        } else {
            setIsScrolled(false)
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])



    return (
        <nav className={`${isScrolled? 'p-0': 'p-5'} fixed top-0 left-0 z-9999 w-full h-50 transition-all duration-300 ease-in-out`}>
            <div className={`container ${isScrolled? 'rounded-none': 'rounded-3xl'} flex transition-all duration-300 ease-in-out flex-row justify-between item-center py-5 px-10 
                            bg-last/30 backdrop-blur-md`}>
                <div className="logo">
                    <a href="">
                        <img width='125' src={Logo} alt="Logo" />
                    </a>
                </div>
                <div className='nav-menu flex flex-row justify-between items-center gap-10'>
                    <div className="Nav-Links">
                        <ul className='flex text-secondary font-semibold flex-row justify-between items-center gap-10'>
                            <a href="#home"><li>Home</li></a>
                            <a href="#about"><li>Tentang Kami</li></a>
                            <a href="#program"><li>Program</li></a>
                            <a href="#testimoni"><li>Testimoni</li></a>
                        </ul>
                    </div>
                    <div className="buttons flex flex-row justify-between items-center gap-5">
                        <Link to="/login">
                            <button className='w-25 px-5 py-2 bg-primary font-semibold text-white rounded-full'>Login</button>
                        </Link>
                        <Link to="/register">
                            <button className='px-5 py-2 bg-primary font-semibold text-white rounded-full'>Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar