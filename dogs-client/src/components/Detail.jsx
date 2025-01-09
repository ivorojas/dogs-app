import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getDetail } from '../actions'
import { useState, useEffect } from 'react'
import "./Detail.css"

export default function Detail(props) {
  const dispatch = useDispatch()
  const { id } = useParams();
  const [loading, setLoading] = useState(true)
  const changeLoading = () => {
    setTimeout(() => {
      setLoading(false)
    }, 300)
  }

  const detail = useSelector(state=> state.detail)

  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  if (loading) {
    changeLoading()
    return (
      <div className='loading-container'>
  <div className='loading'>
  <svg viewBox="25 25 50 50">
  <circle r="20" cy="50" cx="50"></circle>
</svg>
  </div>
   
  </div>
    )
  }

  return (
    <div id='detail-container'>

    <Link to="/" >
    <button id='button-detail-atras'>{"<"} Atras</button>
  </Link>
    <div className='detail-card-container'>
  

      <h3>{detail.name}</h3>
      <img src={detail.image} alt='imagen perro' height="230px"  id='imagen-detail'/>
      <div className='clasificaciones' >
        <h3>Temperamentos:</h3>
        <p>{detail.temperament?detail.temperament: "Ningun Temperamento en especial"}</p>
      </div>
      <div>
        <h3>Peso:</h3>
      <p>{ detail.weight_min + " - " + detail.weight_max + " kg"}</p>
      </div>
      <div>
        <h3>Altura</h3>
        <p>{detail.height_min + " - " + detail.height_max + " cm"}</p>
      </div>
  <div>
    <h3>Esperanza de vida:</h3>
  <p>{detail.life_span}</p>
   
  </div>
    
      </div>
    </div>
  )
}
