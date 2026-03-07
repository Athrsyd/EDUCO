import React from 'react'
import dataIcon from '../assets/Data/icon'
// import testimoni from '../assets/testimoni'

const Testimoni = () => {
  return (
    <>
    <div className="transisi-kanan"></div>
    <div className="transisi-kiri"></div>
    <div className='container border-2 border-primary rounded-3xl p-5 '>
        <div className="Data">
            <div className="Data-user">
                <div className="foto"></div>
                <div className="User"></div>
            </div>
            <div className="Data-testi"></div>
        </div>
        <div className="Bintang">
          {dataIcon.bintang}
        </div>
    </div>
    </>
  )
}

export default Testimoni