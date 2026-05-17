import React from 'react';
import { motion } from 'framer-motion';
import { useScroll } from '@react-three/drei';
import { Gauge, Wind } from 'lucide-react';



const MODEL_DATA = {
  gt: {
    heroTitle: "THE ROLLS ROYCE GHOST.",
    heroDesc: "Experience the beast of luxury. Uncompromising performance.",
    perfTitle: "AERODYNAMIC SUPREMACY.",
    perfDesc: "Engineered to slice through the air with a drag coefficient of just 0.19.",
    accel: "1.5s",
    speed: "280+",
    designTitle: "RR SIGNATURE.",
    designDesc: "A bold, sweeping rear light bar ensures you're noticed long after you've passed.",
    features: [
      { title: "Aero Wheels", desc: "Precision-engineered alloys that minimize drag and maximize cooling for unyielding performance." },
      { title: "Laser Headlights", desc: "Intelligent laser matrix illumination that slices through darkness up to 600 meters ahead." },
      { title: "Carbon Splitter", desc: "Aero-grade carbon fiber front splitter for immense downforce and aggressive road presence." },
      { title: "Active Suspension", desc: "Predictive air suspension that reads the road ahead, providing a magic carpet ride at any speed." }
    ]
  },
  suv: {
    heroTitle: "THE LAMBORGHINI.",
    heroDesc: "The soul of a super sports car and the functionality of an SUV.",
    perfTitle: "UNSTOPPABLE TORQUE.",
    perfDesc: "Quad-motor vectoring delivers infinite traction on any surface, Earth or Mars.",
    accel: "2.9s",
    speed: "180+",
    designTitle: "RUGGED UTILITY.",
    designDesc: "High clearance, reinforced chassis, and a massive light bar to illuminate the unknown.",
    features: [
      { title: "All-Terrain Drive", desc: "Advanced quad-motor vectoring adapting to any surface in milliseconds." },
      { title: "Armored Panels", desc: "Military-grade exoskeleton providing unparalleled protection against impacts." },
      { title: "Utility Roof Rack", desc: "Aerodynamically integrated roof storage system for tactical equipment." },
      { title: "LED Light Bar", desc: "High-intensity off-road illumination system for absolute visibility in remote terrain." }
    ]
  },
  hypercar: {
    heroTitle: "THE BMW I8.",
    heroDesc: "Pure motorsport DNA. Track-focused aerodynamics meets supreme driving dynamics.",
    perfTitle: "DEFY PHYSICS.",
    perfDesc: "Produces 2,000 lbs of downforce at top speed. It doesn't drive; it sticks to the ground.",
    accel: "1.1s",
    speed: "310+",
    designTitle: "DOWNFORCE SUPREME.",
    designDesc: "An active rear wing and ground-effect tunnels manipulate the air to your will.",
    features: [
      { title: "DRS System", desc: "F1-inspired Drag Reduction System for maximum straight-line velocity." },
      { title: "Ceramic Brakes", desc: "Carbon-ceramic braking system providing massive stopping power without fade." },
      { title: "Monocoque Chassis", desc: "Ultra-lightweight carbon fiber tub for maximum torsional rigidity." },
      { title: "Matrix Headlights", desc: "Aerodynamically recessed intelligent lighting for zero drag penalty." }
    ]
  },
  bmw11: {
    heroTitle: "THE BMW 11 CONCEPT.",
    heroDesc: "A visionary glimpse into the ultimate electric driving machine.",
    perfTitle: "SILENT VELOCITY.",
    perfDesc: "Next-generation solid-state batteries powering dual high-efficiency motors.",
    accel: "1.9s",
    speed: "220+",
    designTitle: "SCULPTED BY WIND.",
    designDesc: "Radical geometry designed to slice through the air with zero resistance.",
    features: [
      { title: "Butterfly Doors", desc: "Iconic kinematic doors that open outwards and upwards for a dramatic entrance." },
      { title: "Aerodynamics", desc: "Active air channels that shape the airflow around the vehicle dynamically." },
      { title: "Chassis", desc: "Ultra-lightweight composite architecture for maximum range and agility." },
      { title: "Laser Lights", desc: "Intelligent communicative lighting that projects intent onto the road surface." }
    ]
  }
};

export default function Overlay({ themeColor, activeModel, setActiveModel }) {
  const data = MODEL_DATA[activeModel];
  const scroll = useScroll();

  const scrollToFeature = (index) => {
    // 3 main sections (Hero, Perf, Design) = pages 0, 1, 2. Feature 1 starts at page 3.
    if (scroll && scroll.el) {
      scroll.el.scrollTo({ top: (index + 3) * window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ width: '100vw' }}>

      {/* Global Header */}
      <header className="header-nav pointer-events-auto">
        <div>
          <h2 className="header-logo">CYBER<span style={{ color: themeColor, transition: 'color 0.5s' }}>FLEET</span></h2>
        </div>
        <nav className="nav-links">
          <span
            onClick={() => setActiveModel('gt')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'gt' ? themeColor : 'inherit' }}
            className="hover-accent"
          >
            ROLLS-ROYCE
          </span>
          <span
            onClick={() => setActiveModel('suv')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'suv' ? themeColor : 'inherit' }}
            className="hover-accent"
          >
            LAMBORGHINI
          </span>
          <span
            onClick={() => setActiveModel('hypercar')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'hypercar' ? themeColor : 'inherit' }}
            className="hover-accent"
          >
            BMW
          </span>
          <span
            onClick={() => setActiveModel('bmw11')}
            style={{ cursor: 'pointer', transition: 'color 0.3s', color: activeModel === 'bmw11' ? themeColor : 'inherit' }}
            className="hover-accent"
          >
            BMW 11
          </span>
        </nav>
      </header>

      {/* Global Configurator - Replaced with Features */}
      <div className="configurator-panel glass-panel pointer-events-auto" style={{ minWidth: '200px' }}>
        <h3 className="configurator-title" style={{ marginBottom: '15px' }}>KEY FEATURES</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
          {data.features.map((feature, idx) => (
            <li
              key={feature.title}
              onClick={() => scrollToFeature(idx)}
              className="hover-accent"
              style={{
                padding: '8px 0',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'color 0.3s'
              }}
            >
              <span style={{ color: themeColor, marginRight: '10px' }}>▹</span>
              {feature.title}
            </li>
          ))}
        </ul>
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
          <h2 className="section-title" style={{ color: themeColor }}>{data.perfTitle}</h2>
          <p className="section-desc">{data.perfDesc}</p>
          <div className="glass-panel" style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', borderRadius: '12px' }}>
            <SpecItem icon={<Gauge size={20} />} value={data.accel} label="0-60 MPH" color={themeColor} />
            <SpecItem icon={<Wind size={20} />} value={data.speed} label="TOP SPEED" color={themeColor} />
          </div>
        </div>
      </section>

      {/* PAGE 3: DESIGN */}
      <section className="scroll-section design-section pointer-events-auto">
        <div className="design-content">
          <h2 className="section-title" style={{ color: themeColor }}>{data.designTitle}</h2>
          <p className="section-desc">{data.designDesc}</p>
        </div>
      </section>

      {/* PAGE 4-7: FEATURES */}
      {data.features.map((feature, index) => (
        <section key={`feature-${index}`} className="scroll-section pointer-events-auto">
          <div className="section-content" style={{ marginTop: '20vh' }}>
            <h2 className="section-title" style={{ fontSize: '3rem', color: themeColor }}>{feature.title}</h2>
            <p className="section-desc">{feature.desc}</p>
          </div>
        </section>
      ))}

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
