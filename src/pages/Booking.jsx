import { useParams } from 'react-router-dom'

export default function Booking() {
  const { id } = useParams()
  return (
    <div>
      <h2>Booking</h2>
      <p>Booking service ID: {id}</p>
    </div>
  )
}
