import React from 'react'
import logoEduco from '/logo_Educo.svg'
import dataIcon from '../assets/Data/icon'

const icons = dataIcon({ size: 20, color: 'currentColor' })

const Footer = () => {
    return (
        <footer>
            {/* Main Footer */}
            <div className="bg-accent px-10">
                <div className="container mx-auto py-10 px-5">
                    <div className="flex flex-col md:flex-row gap-10 justify-between">

                        {/* Left - Logo, tagline, socials, download */}
                        <div className="flex flex-col gap-4 max-w-xs">
                            <img src={logoEduco} alt="Logo EDUCO" className="w-44" />
                            <p className="text-lg font-semibold italic text-secondary">
                                "Lorem ipsum lorem ipsum"
                            </p>
                            
                            <div className = "h-0.5 bg-last/40 w-55 rounded-full"></div>
                            {/* Social Icons */}
                            <div className="flex gap-3">
                                {['instagram', 'tiktok', 'twitter', 'youtube', 'facebook'].map((name) => (
                                    <a
                                        key={name}
                                        href="#"
                                        className="w-9 h-9 rounded-full border-2 border-secondary text-secondary flex items-center justify-center hover:bg-secondary hover:text-white transition"
                                    >
                                        {icons[name]}
                                    </a>
                                ))}
                            </div>

                            {/* Download */}
                            <p className="text-last font-semibold mt-2">Dapatkan Aplikasi</p>
                            <div className="flex gap-3">
                                <a href="#">
                                    <img src="/download_playStore.svg" alt="Google Play" className="h-12" />
                                </a>
                                <a href="#">
                                    <img src="/download_appStore.svg" alt="App Store" className="h-12" />
                                </a>
                            </div>
                        </div>

                        {/* Middle - Perusahaan */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-secondary">Perusahaan</h3>
                            {['Home', 'Tentang Kami', 'Program', 'Testimoni'].map((item) => (
                                <a key={item} href="#" className="text-last hover:text-primary transition">
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Right-middle - Sosial Media */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-secondary">Sosial Media</h3>
                            {['Instagram', 'Twitter ( X )', 'TikTok', 'Youtube', 'Facebook'].map((item) => (
                                <a key={item} href="#" className="text-last hover:text-primary transition">
                                    {item}
                                </a>
                            ))}
                        </div>

                        {/* Right - Fitur */}
                        <div className="flex flex-col gap-3">
                            <h3 className="text-xl font-bold text-secondary">Fitur</h3>
                            <a href="#" className="text-last hover:text-primary transition">
                                Ruang kelas pembelajaran<br />lingkungan
                            </a>
                            <a href="#" className="text-last hover:text-primary transition">
                                Game Edukasi
                            </a>
                        </div>

                    </div>
                </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="bg-[#151424] py-4 text-center">
                <p className="text-white text-md font-bold">Copyright © 2026 Lorem Ipsum Team</p>
            </div>
        </footer>
    )
}

export default Footer