import { Link } from 'react-router-dom'
import './header.css'

export default function Header() {
  return (
    <header className="site-header">
      <h1>
        <Link to="/">Uniqueofy</Link>
      </h1>
    </header>
  )
}
