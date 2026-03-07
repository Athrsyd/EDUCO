// import { useState } from 'react'
import './App.css'
import bromo from './assets/PEMANDANGAN.jpg'
import logo from './assets/eduko-removebg-preview.png'


function App() {

  return (
    <>
     <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="Logo eduko" className='Lambang'/>
        </div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Tentang Kami</li>
          <li>Program</li>
          <li>Testimoni</li>
          <li className='Login'>Login</li>
          <li className='Sign'>Sign in</li>
        </ul>
      </nav>
      
     <div className="hero">
  <div className="hero-content">
    <h1>
      Welcome to <span>EDUCO</span>
    </h1>

    <h2>“Generasi Penerus, Hidupkan Lingkungan”</h2>

    <p>
      asasas asasasasa asasas asasasa asasas asasas 
      asasas asasas asasas asasas asasas asasas asasasasa asasas asasasa asasas asasas 
      asasas asasas asasas asasas asasas
    </p>

    <div className="hero-buttons">
      <button className="btn-primary">Pelajari</button>
      <button className="btn-secondary">Program</button>
    </div>
  </div>
</div>
        
      <img src={bromo} alt="Gunung Bromo" className='gambar' />
      
    </>
  )
}

export default App