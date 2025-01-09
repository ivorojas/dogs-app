import React from 'react'
import './Card.css'
import { Link } from 'react-router-dom'
export default function Card({image, name, temperament = "Ningun temperamento en especial", weight_min, weight_max , id}) {
  return (
    <div className='card'>
      <div className='imagenes-perros'>
        <Link to={'/' + id} > 
          <img src={image} alt='imagen perro' height="170px" />
        </Link> 
      </div>
        <h3>{name.toUpperCase()}</h3>
        <div className='temp-peso'>
        <p>{/*"TEMPERAMENTOS: " +*/temperament}</p>
        <p>{"PESO: " + weight_min + " - " + weight_max + " kg"}</p>
      </div>
    
    </div>
  )
}
