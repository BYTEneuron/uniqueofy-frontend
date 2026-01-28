import { useState } from 'react'
import { waterTankServices } from '../data/services'
import ServiceCard from './ServiceCard'
import './categoryModal.css'

export default function WaterTankServicesModal({ isOpen, onClose }) {
  const [quantities, setQuantities] = useState({})

  if (!isOpen) return null


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Water Tank Cleaning</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="services-grid-modal">
            {waterTankServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showQuantity={!service.isCustom}
                quantity={quantities[service.id] || 1}
                onQuantityChange={(qty) =>
                  setQuantities(prev => ({ ...prev, [service.id]: qty }))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
