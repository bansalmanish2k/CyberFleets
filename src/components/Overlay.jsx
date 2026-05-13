import React from 'react';
import { motion } from 'framer-motion';
import { Gauge, Wind } from 'lucide-react';

const COLORS = [
  { name: 'Phantom Black', hex: '#111111' },
  { name: 'Crimson Red', hex: '#cc0000' },
  { name: 'Glacier White', hex: '#f0f0f0' },
  { name: 'Neon Cyan', hex: '#00ffff' },
  { name: 'Toxic Green', hex: '#39ff14' },
];

const MODEL_DATA = {
  gt: {
    heroTitle: "THE CYBER GT.",
    heroDesc: "Experience the pinnacle of electric luxury. Uncompromising performance.",
    perfTitle: "AERODYNAMIC SUPREMACY.",
    perfDesc: "Engineered to slice through the air with a drag coefficient of just 0.19.",
    accel: "1.5s",
    speed: "280+",
    designTitle: "NEON SIGNATURE.",
    designDesc: "A bold, sweeping rear light bar ensures you're noticed long after you've passed."
  },
  suv: {
    heroTitle: "THE CYBER SUV.",
    heroDesc: "Need more space without sacrificing speed? Tactical dominance for the streets.",
    perfTitle: "UNSTOPPABLE TORQUE.",
    perfDesc: "Quad-motor vectoring delivers infinite traction on any surface, Earth or Mars.",
    accel: "2.9s",
    speed: "180+",
    designTitle: "RUGGED UTILITY.",
    designDesc: "High clearance, reinforced chassis, and a massive light bar to illuminate the unknown."
  },
  hypercar: {
    heroTitle: "THE HYPERCAR.",
    heroDesc: "Pure, unadulterated speed. Track-only downforce meets street-legal madness.",
    perfTitle: "DEFY PHYSICS.",
    perfDesc: "Produces 2,000 lbs of downforce at top speed. It doesn't drive; it sticks to the ground.",
    accel: "1.1s",
    speed: "310+",
    designTitle: "DOWNFORCE SUPREME.",
    designDesc: "An active rear wing and ground-effect tunnels manipulate the air to your will."
  }
};

export default function Overlay({ carColor, setCarColor, activeModel, setActiveModel }) {
  const data = MODEL_DATA[activeModel];

  return (
    <div style={{ width: '100vw' }}>
      
      {/* Global Header */}
      <header className="header-nav pointer-events-auto">
        <div>
          <h2 className="header-logo">CYBER<span style={{ color: carColor, transition: 'color 0.5s' }}>FLEET</span></h2>
        </div>
        <nav className="nav-links">
          <span 
            onClick={() => setActiveModel('gt')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'gt' ? carColor : 'inherit' }} 
            className="hover-accent"
          >
            GT
          </span>
          <span 
            onClick={() => setActiveModel('suv')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'suv' ? carColor : 'inherit' }} 
            className="hover-accent"
          >
            SUV
          </span>
          <span 
            onClick={() => setActiveModel('hypercar')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'hypercar' ? carColor : 'inherit' }} 
            className="hover-accent"
          >
            HYPERCAR
          </span>
        </nav>
      </header>

      {/* Global Configurator */}
      <div className="configurator-panel glass-panel pointer-events-auto">
        <h3 className="configurator-title">PAINT CONFIGURATOR</h3>
        <div className="color-list">
          {COLORS.map((color) => (
            <div 
              key={color.hex}
              onClick={() => setCarColor(color.hex)}
              className="color-swatch-wrapper"
              style={{ backgroundColor: carColor === color.hex ? 'rgba(255,255,255,0.1)' : 'transparent' }}
            >
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: color.hex,
                border: carColor === color.hex ? '2px solid white' : '2px solid transparent',
                boxShadow: `0 0 10px ${color.hex}88`,
                flexShrink: 0
              }} />
              <span className="color-swatch-name" style={{ 
                fontSize: '14px', 
                fontWeight: carColor === color.hex ? 700 : 400,
                color: carColor === color.hex ? 'white' : 'var(--text-secondary)'
              }}>
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* PAGE 1: HERO */}
      <section className="scroll-section pointer-events-auto">
        <motion.div 
          key={activeModel + 'hero'} 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          className="hero-content"
        >
          <h1 className="hero-title">{data.heroTitle}</h1>
          <p className="section-desc">{data.heroDesc}</p>
          <div style={{ fontSize: '12px', letterSpacing: '0.2em', opacity: 0.5 }}>SCROLL FOR SPECS ↓</div>
        </motion.div>
      </section>

      {/* PAGE 2: PERFORMANCE */}
      <section className="scroll-section pointer-events-auto">
        <div className="section-content">
          <h2 className="section-title" style={{ color: carColor }}>{data.perfTitle}</h2>
          <p className="section-desc">{data.perfDesc}</p>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', borderRadius: '12px' }}>
            <SpecItem icon={<Gauge size={20} />} value={data.accel} label="0-60 MPH" color={carColor} />
            <SpecItem icon={<Wind size={20} />} value={data.speed} label="TOP SPEED" color={carColor} />
          </div>
        </div>
      </section>

      {/* PAGE 3: DESIGN */}
      <section className="scroll-section design-section pointer-events-auto">
        <div className="design-content">
          <h2 className="section-title" style={{ color: carColor }}>{data.designTitle}</h2>
          <p className="section-desc">{data.designDesc}</p>
        </div>
      </section>

    </div>
  );
}

function SpecItem({ icon, value, label, color }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
      <div style={{ color: color, transition: 'color 0.5s' }}>{icon}</div>
      <div style={{ fontSize: '24px', fontWeight: 700, fontFamily: 'Outfit' }}>{value}</div>
      <div style={{ fontSize: '10px', color: 'var(--text-secondary)', letterSpacing: '0.1em', fontWeight: 600 }}>{label}</div>
    </div>
  );
}
