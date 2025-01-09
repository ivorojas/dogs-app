import React, { useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getTemperaments, postDog} from '../actions'
import "./DogCreate.css"

export default function DogCreate() {

  const dispatch = useDispatch()
  const allTemperaments = useSelector(state=> state.temperaments)

  const [input, setInput] = useState({
    name : "",
    height_min : "",
    height_max : "",
    weight_min: "",
    weight_max: "",
    life_span: "",
    image : "",
    temperament: [],
  })
// para la logica que se muestre lo que ingresas y que borras, porque con el otro input no me mostraba lo borrado
  const [temperamentos, setTemperamentos] = useState([])
  const [isActive, setIsActive] = useState(false)


  useEffect(() => {
    dispatch(getTemperaments())
  }, [dispatch])



  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name] : e.target.value
    
    })
  }

 


  const handleSelect = (e) => {
    setInput({
      ...input,
      temperament : [...input.temperament , e.target.value]
    
    })
    setTemperamentos([...temperamentos, e.target.value])
    //console.log(input)
  }

  const handleDeleteTemperament = (e) => {
    e.preventDefault()
    input.temperament.pop()
    //console.log(input)
    setTemperamentos([...temperamentos].slice(0, temperamentos.length - 1))
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if(input.name  === ""|| input.weight_min  === "" || input.weight_max  === ""|| input.image  === ""){
 
      alert("debes ingresar campos")
    } else {
      if(input.temperament.length === 0) {
        alert("debes ingresar temperamentos")
      } else {
        dispatch(postDog(input))
        setIsActive(true)
      }
   
      }

    }

  

  let aux = 0

  return (
    <div>
      <div className='header'> 
      <div >
      <Link to="/">
          <button id='atras-button' > {"<"}Atras</button>
        </Link>
      </div>
        <h2>Agrega una raza</h2>
      </div>
      <div className='hr-container'>
       <hr/>
      </div>
      <div className='content'>
 
        <form  onSubmit={(e) => handleSubmit(e)} id="form">
          <div className='input'>
            <label>Nombre:</label>
            <input type="text" value={input.name} name="name" onChange={(e) => handleInputChange(e)} />
          </div>
          <div className='input'>
            <label>Altura Min:</label>
            <input type="text" value={input.height_min} name="height_min"onChange={(e) => handleInputChange(e)}/>
          </div >
          <div className='input'>
          <label>Altura Max</label>
            <input type="text" value={input.height_max} name="height_max"onChange={(e) => handleInputChange(e)}/>
          </div >
          <div className='input'>
            <label>Peso Minimo:</label>
            <input type="text" value={input.weight_min} name="weight_min" onChange={(e) => handleInputChange(e)}/>
          </div >
          <div className='input'>
            <label>Peso Maximo:</label>
            <input type="text" value={input.weight_max} name="weight_max" onChange={(e) => handleInputChange(e)}/>
          </div>
          <div className='input'>
            <label>Life_span:</label>
            <input type="text" value={input.life_span} name="life_span"  onChange={(e) => handleInputChange(e)}/>
          </div>
          <div className='input'>
            <label>Image URL:</label>
            <input type="text" value={input.image} name="image" onChange={(e) => handleInputChange(e)}/>
          </div>
          <div className='temperamentos'>
          <select onChange={(e) => handleSelect(e)}>
					{
          
						allTemperaments?.map(t => {
							return (
								<option value={t} key={aux++} >{t}</option >
							)
						})
					}
				</select>
  
        <h3>Temperamentos:</h3>
          <div className='temps-container'>
          {
          temperamentos.join(", ")
     
        }
    
          </div>
          <button id='borrar-temperamento' onClick={(e) => {handleDeleteTemperament(e)}} >Borrar temperamento</button>
          <br/>
          <div id='footer'>
          {
          isActive && (
            <span id='exito' >Raza agregada con éxito!</span>
          )
        }
        {
          !isActive && (    
          <button type='submit' id='button-submit' >Agregar</button>)
        }
   
          </div>

          </div>
   
        </form>
      </div>
    </div>
  )
}
