import React from 'react'
import logoEduco from '/logo_Educo.svg'
import dataIcon from '../assets/Data/icon'

const icons = dataIcon({ size: 20, color: 'currentColor' })

const Footer = () => {
    return (
        <footer className='z-10'>
            {/* Main Footer */}
            <div className="bg-accent px-4 md:px-10">
                <div className="container mx-auto py-8 md:py-10 px-4 md:px-5">
                    <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-between">

                        {/* Left - Logo, tagline, socials, download */}
                        <div className="flex flex-col gap-4 max-w-full md:max-w-xs">
                            <img src={logoEduco} alt="Logo EDUCO" className="w-36 md:w-44 mx-auto md:mx-0" />
                            <p className="text-base md:text-lg font-semibold italic text-secondary text-center md:text-left">
                                "Lorem ipsum lorem ipsum"
                            </p>

                            <div className = "h-0.5 bg-last/40 w-full md:w-55 rounded-full mx-auto md:mx-0"></div>
                            {/* Social Icons */}
                            <div className="flex gap-3 justify-center md:justify-start flex-wrap">
                                {['instagram', 'tiktok', 'twitter', 'youtube', 'facebook'].map((name) => (
                                    <a
                                        key={name}
                                        href="#"
                                        className="w-8 h-8 md:w-9 md:h-9 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition"
                                    >
                                        {icons[name]}
                                    </a>
                                ))}
                            </div>

                            {/* Download */}
                            <p className="text-last font-semibold mt-2 text-center md:text-left">Dapatkan Aplikasi</p>
                            <div className="flex gap-3 justify-center md:justify-start flex-row">
                                <a href="#">
                                    <img src="/download_playStore.svg" alt="Google Play" className="h-10 md:h-12" />
                                </a>
                                <a href="#">
                                    <img src="/download_appStore.svg" alt="App Store" className="h-10 md:h-12" />
                                </a>
                            </div>
                        </div>

                        {/* Middle - Perusahaan */}
                        <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-secondary">Perusahaan</h3>
                            {['Home', 'Tentang Kami', 'Program', 'Testimoni'].map((item) => (
                                <a key={item} href="#" className="text-last hover:text-primary transition text-sm md:text-base">
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Right-middle - Sosial Media */}
                        <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-secondary">Sosial Media</h3>
                            {['Instagram', 'Twitter ( X )', 'TikTok', 'Youtube', 'Facebook'].map((item) => (
                                <a key={item} href="#" className="text-last hover:text-primary transition text-sm md:text-base">
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Right - Fitur */}
                        <div className="flex flex-col gap-2 md:gap-3 text-center md:text-left">
                            <h3 className="text-lg md:text-xl font-bold text-secondary">Fitur</h3>
                            <a href="#" className="text-last hover:text-primary transition text-sm md:text-base">
                                Ruang kelas pembelajaran<br className="hidden md:inline" />lingkungan
                            </a>
                            <a href="#" className="text-last hover:text-primary transition text-sm md:text-base">
                                Game Edukasi
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-[#151424] py-3 md:py-4 text-center">
                <p className="text-white text-sm md:text-md font-bold">Copyright © 2026 Lorem Ipsum Team</p>
            </div>
        </footer>
    )
}

export default Footer