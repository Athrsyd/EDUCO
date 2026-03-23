import React from 'react'
import { Parallax } from 'react-parallax'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const ParalaxBurung = ({ className = '' }) => {
  return (
    <div className={`relative w-full overflow-visible pointer-events-none ${className}`}>
      <Parallax
        strength={260}
        className="h-full min-h-90 overflow-visible"
        style={{ overflow: 'visible' }}
        renderLayer={(percentage = 0) => {
          const p = clamp(percentage, 0, 1)
          const left = -60 + p * 200
          const top = 24 + Math.sin(p * Math.PI) * 180
          const scale = 0.92 + p * 0.16

          return (
            <img
              src="/Burung_paralax.svg"
              className="absolute w-60 h-60 select-none z-80"
              style={{
                left: `${left}%`,
                top: `${top}px`,
                transform: `translateX(-50%) scale(${scale})`,
                willChange: 'transform, left, top',
                zIndex: 80,
              }}
              alt="Burung Paralax"
            />
          )
        }}
      >
        <div className="h-full min-h-90" />
      </Parallax>
    </div>
  )
}

export default ParalaxBurung