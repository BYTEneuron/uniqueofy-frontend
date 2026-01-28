import { useState } from 'react'
import { acServices } from '../data/services'
import ServiceCard from './ServiceCard'
import './categoryModal.css'

export default function ACServicesModal({ isOpen, onClose }) {
  const [quantities, setQuantities] = useState({})

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>AC Services</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="services-grid-modal">
            {acServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                showQuantity
                quantity={quantities[service.id] || 1}
                onQuantityChange={(qty) =>
                  setQuantities(prev => ({ ...prev, [service.id]: qty }))
                }
                onAddClick={(service, qty) => {
                  setQuantities(prev => ({ ...prev, [service.id]: 1 }))
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
