import { useState } from 'react'
import ACServicesModal from '../components/ACServicesModal'
import WaterTankServicesModal from '../components/WaterTankServicesModal'
import Cart from '../components/Cart'
import './home.css'

import acImage from '../assets/images/categories/ac.webp'
import tankImage from '../assets/images/categories/water-tank.webp'

export default function Home() {
  const [showACModal, setShowACModal] = useState(false)
  const [showWaterTankModal, setShowWaterTankModal] = useState(false)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">We have served 1000+ customers</h1>
          <p className="hero-subtitle">Uniqueofy is a trusted home service platform</p>
        </div>
      </section>

      {/* Service Category Cards */}
      <section className="categories-section">
        <h2 className="section-heading">Select a Service</h2>
        
        <div className="category-cards-grid">
          {/* AC Services Card */}
          <div 
            className="category-card"
            onClick={() => setShowACModal(true)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setShowACModal(true)}
          >
            <img src={acImage} alt="AC Services" className="category-icon" />
            <h3 className="category-name">AC Services</h3>
            <p className="category-desc">AC Servicing, Installation & Maintenance</p>
            <div className="category-arrow">→</div>
          </div>



          {/* Water Tank Cleaning Card */}
          <div 
            className="category-card"
            onClick={() => setShowWaterTankModal(true)}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && setShowWaterTankModal(true)}
          >
            <img src={tankImage} alt="Water Tank Cleaning" className="category-icon" />
            <h3 className="category-name">Water Tank Cleaning</h3>
            <p className="category-desc">Cleaning for different tank sizes</p>
            <div className="category-arrow">→</div>
          </div>
        </div>
      </section>

      {/* Cart Section */}
      <Cart />

      {/* Modals */}
      <ACServicesModal 
        isOpen={showACModal} 
        onClose={() => setShowACModal(false)} 
      />

      <WaterTankServicesModal 
        isOpen={showWaterTankModal} 
        onClose={() => setShowWaterTankModal(false)} 
      />
    </div>
  )
}
