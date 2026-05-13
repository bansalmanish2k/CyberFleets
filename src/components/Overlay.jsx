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
      
      {/* Global Header (Fixed to screen) */}
      <header style={{ position: 'fixed', top: 0, left: 0, width: '100vw', padding: '40px 60px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100 }} className="pointer-events-auto">
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '0.2em' }}>CYBER<span style={{ color: carColor, transition: 'color 0.5s' }}>FLEET</span></h2>
        </div>
        <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', fontWeight: 600, letterSpacing: '0.1em' }}>
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

      {/* Global Configurator (Fixed to right side) */}
      <div 
        className="pointer-events-auto glass-panel" 
        style={{ 
          position: 'fixed', 
          right: '60px', 
          top: '50%', 
          transform: 'translateY(-50%)',
          padding: '30px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          minWidth: '250px',
          zIndex: 100 
        }}
      >
        <h3 style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>PAINT CONFIGURATOR</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {COLORS.map((color) => (
            <div 
              key={color.hex}
              onClick={() => setCarColor(color.hex)}
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '15px', 
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: carColor === color.hex ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'background-color 0.3s'
              }}
            >
              <div style={{ 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                backgroundColor: color.hex,
                border: carColor === color.hex ? '2px solid white' : '2px solid transparent',
                boxShadow: `0 0 10px ${color.hex}88`
              }} />
              <span style={{ 
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

      {/* PAGE 1: HERO (0vh - 100vh) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 60px' }} className="pointer-events-auto">
        <motion.div 
          key={activeModel + 'hero'} 
          initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
          style={{ maxWidth: '500px', marginTop: '10vh' }}
        >
          <h1 style={{ fontSize: '80px', lineHeight: 1, marginBottom: '20px', fontWeight: 700 }}>
            {data.heroTitle}
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', fontSize: '16px' }}>
            {data.heroDesc}
          </p>
          <div style={{ fontSize: '12px', letterSpacing: '0.2em', opacity: 0.5 }}>SCROLL FOR SPECS ↓</div>
        </motion.div>
      </section>

      {/* PAGE 2: PERFORMANCE (100vh - 200vh) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', padding: '0 60px' }} className="pointer-events-auto">
        <div style={{ maxWidth: '400px' }}>
          <h2 style={{ fontSize: '48px', lineHeight: 1, marginBottom: '20px', fontWeight: 700, color: carColor, transition: 'color 0.5s' }}>
            {data.perfTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', fontSize: '16px' }}>
            {data.perfDesc}
          </p>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', borderRadius: '12px' }}>
            <SpecItem icon={<Gauge size={20} />} value={data.accel} label="0-60 MPH" color={carColor} />
            <SpecItem icon={<Wind size={20} />} value={data.speed} label="TOP SPEED" color={carColor} />
          </div>
        </div>
      </section>

      {/* PAGE 3: DESIGN (200vh - 300vh) */}
      <section style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 60px' }} className="pointer-events-auto">
        <div style={{ maxWidth: '400px', textAlign: 'center', marginLeft: '-20vw' }}>
          <h2 style={{ fontSize: '48px', lineHeight: 1, marginBottom: '20px', fontWeight: 700, color: carColor, transition: 'color 0.5s' }}>
            {data.designTitle}
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '40px', fontSize: '16px' }}>
            {data.designDesc}
          </p>
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
