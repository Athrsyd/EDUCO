import React from 'react'
import Logo from '/logo_Educo.svg'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
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
        <nav className={`${isScrolled? 'p-0': 'p-3'} fixed top-0 left-0 z-9999 w-full transition-all duration-300 ease-in-out`}>
            <div className={`container mx-auto ${isScrolled? 'rounded-none': 'rounded-2xl'} flex transition-all duration-300 ease-in-out flex-row justify-between items-center py-3 px-4 md:px-8
                            bg-last/30 backdrop-blur-md`}>
                <div className="logo z-10000">
                    <a href="">
                        <img width='120' src={Logo} alt="Logo" className='w-24 md:w-32' />
                    </a>
                </div>
                
                {/* Hamburger Menu Button - Mobile */}
                <button 
                    className='md:hidden z-10000 text-secondary p-2'
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Desktop Menu */}
                <div className='hidden md:flex flex-row justify-between items-center gap-8 lg:gap-10'>
                    <div className="Nav-Links">
                        <ul className='flex text-secondary font-semibold flex-row justify-between items-center gap-6 lg:gap-10'>
                            <a href="#home" onClick={closeMenu}><li className='hover:text-primary transition-colors'>Home</li></a>
                            <a href="#about" onClick={closeMenu}><li className='hover:text-primary transition-colors'>Tentang Kami</li></a>
                            <a href="#program" onClick={closeMenu}><li className='hover:text-primary transition-colors'>Program</li></a>
                            <a href="#testimoni" onClick={closeMenu}><li className='hover:text-primary transition-colors'>Testimoni</li></a>
                        </ul>
                    </div>
                    <div className="buttons flex flex-row justify-between items-center gap-3 lg:gap-5">
                        <Link to="/login">
                            <button className='px-4 py-2 lg:px-5 lg:py-2 bg-primary font-semibold text-white rounded-full text-sm lg:text-base hover:bg-secondary transition-colors'>Login</button>
                        </Link>
                        <Link to="/register">
                            <button className='px-4 py-2 lg:px-5 lg:py-2 bg-primary font-semibold text-white rounded-full text-sm lg:text-base hover:bg-secondary transition-colors'>Register</button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black/50 z-9998 md:hidden transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={closeMenu}></div>

            {/* Mobile Menu Slide-in */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-last z-9999 md:hidden transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} shadow-2xl`}>
                <div className="flex flex-col h-full pt-20 pb-8 px-6">
                    <div className="logo mb-8 text-center">
                        <img width='120' src={Logo} alt="Logo" className='mx-auto' />
                    </div>
                    <div className="Nav-Links flex-1">
                        <ul className='flex flex-col gap-6 text-secondary font-semibold'>
                            <a href="#home" onClick={closeMenu}><li className='hover:text-primary transition-colors py-2 border-b border-secondary/20'>Home</li></a>
                            <a href="#about" onClick={closeMenu}><li className='hover:text-primary transition-colors py-2 border-b border-secondary/20'>Tentang Kami</li></a>
                            <a href="#program" onClick={closeMenu}><li className='hover:text-primary transition-colors py-2 border-b border-secondary/20'>Program</li></a>
                            <a href="#testimoni" onClick={closeMenu}><li className='hover:text-primary transition-colors py-2 border-b border-secondary/20'>Testimoni</li></a>
                        </ul>
                    </div>
                    <div className="buttons flex flex-col gap-4 mt-8">
                        <Link to="/login" onClick={closeMenu}>
                            <button className='w-full px-5 py-3 bg-primary font-semibold text-white rounded-full hover:bg-secondary transition-colors'>Login</button>
                        </Link>
                        <Link to="/register" onClick={closeMenu}>
                            <button className='w-full px-5 py-3 bg-primary font-semibold text-white rounded-full hover:bg-secondary transition-colors'>Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar