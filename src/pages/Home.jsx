import services from '../data/services'
import { Link } from 'react-router-dom'
import './home.css'

export default function Home() {
  return (
    <div className="home-page">
      <h1>Book Trusted Home Services with Uniqueofy</h1>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.id} className="service-card">
            <img src={service.image} alt={service.name} className="service-image" />

            <div className="service-body">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-meta">₹{service.price.toLocaleString()}
 · {service.duration}</p>
              <Link to={`/service/${service.id}`} className="btn book-now">Book Now</Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
