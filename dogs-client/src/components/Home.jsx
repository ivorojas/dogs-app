import React from 'react';
import NavBar from './NavBar';
import LandingDog from '../img/landing-dog.png';
import Footer from './Footer';
import './Home.css';
import { useState, useEffect  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getDogs, getTemperaments, filterDogsByTemperaments, filterBreeds, orderByName, orderByWeight } from '../actions'
import Card from './Card'
import Paginado from './Paginado'

export default function Home () {
    const dispatch = useDispatch();
    const allDogs = useSelector(state=> state.dogs)
    const allTemperaments = useSelector(state=> state.temperaments)
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
		dispatch(getDogs())
		dispatch(getTemperaments())
	}, [dispatch])

    const [currentPage, setCurrentPage] = useState(1)
	const [dogsPerPage, setDogsPerPage] = useState(8)
	const indexLastDog = currentPage * dogsPerPage
	const indexFirstDog = indexLastDog - dogsPerPage
	const currentDogs = allDogs.slice(indexFirstDog, indexLastDog)
    //const currentDogs = allDogs
    const [loading, setLoading] = useState(true)
    const changeLoading = () => {
      setTimeout(() => {
        setLoading(false)
      }, 300)
    }

    let aux = 0;
    const handleReset = () => {
        try {
          dispatch(getDogs());  // Llamamos a getDogs dentro de un try-catch para manejar errores
        } catch (error) {
          console.error("Error en el handleReset:", error);
        }
      };
    const paginate = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

    const handleFilterTemperaments = (e) => {
		dispatch(filterDogsByTemperaments(e.target.value))
	}

	const handleFilterBreeds = (e) => {
		dispatch(filterBreeds(e.target.value))
	}

	
	const handleFilterByName = (e) => {
		dispatch(orderByName(e.target.value)) 
	}

	const handleFilterByWeight = (e) => {

		dispatch(orderByWeight(e.target.value))
	}
    
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
        <div className='home' >

            <header>
                <NavBar setCurrentPage={setCurrentPage} />
            </header>

            <main>

            <div className='landing'>
            <h1>Descubre la raza perfecta <br/>  para ti y tu estilo de vida.</h1> 
               {/*<h1>Los perros no son toda<br></br> tu vida, pero hacen tu<br></br> vida completa.</h1>*/} 
				<div className='dog-landing'>
					<img src={LandingDog} alt='Perro' width='70%'/>
				</div>
            </div>
            <h3 id='explora-razas'>Explora las Razas</h3>
            <div className='hr'>
                <hr/>
            </div>	

            <div id='filtro-button-container'>
                <div className='buttons-reset-filter' >
                <button id='reset-button' onClick={handleReset}>Reset</button>
                <button id='filtro-button' onClick={()=>setIsActive(!isActive)} >Filtros {">"}</button>
                </div>

                <div className='list-dropdown'>
                {
                    isActive && (   <div className='inner-list-dropdown' >
                                        <select onChange={e => {handleFilterBreeds(e)}}>
                                            <option value="todos-los-perros">Todos los perros</option>
                                            <option value="api">Api</option>
                                            <option value="db">Db</option>
                                        </select>
                                        {/*---select----*/}
                                        <select onChange={(e) => { handleFilterTemperaments(e)}}>
                                        <option value="todos-los-temperamentos">Todos los temperamentos</option>
                                        
                                            {
                                                allTemperaments?.map(t => {
                                                    return (
                                                        <option value={t} key={aux++}  >{t}</option>
                                                    )
                                                })
                                            
                                            }
                                        </select>
                                        
                                        {/*---select----*/}
                                        <select onChange={e => handleFilterByWeight(e)}>
                                            <option value="mayor-peso">Mayor peso</option>
                                            <option value="menor-peso">Menor peso</option>
                                        </select>
                                        {/*---select----*/}
                                        <select onChange={e => {handleFilterByName(e)}}>
                                            <option value="a-z">A - Z</option>
                                            <option value="z-a">Z - A</option>
                                        </select>
                                    </div>  )
                }
                </div>
            </div>
            <div className='dogs-container'>
                <div className='dogs-cards'>
                {
					currentDogs?.map(dog => {
						return (
							<div className='card-container'  key={aux++}>
							{/* 	<Link to={'/home/ ' + dog.id} > */}
									<Card  
									name={dog.name} image={dog.image} 
									temperament={dog.temperament} weight_min={dog.weight_min} id={dog.id}
									weight_max={dog.weight_max} />
							{/* 	</Link> */}
							</div>
						)
					})
				}
                </div>

				<div id='container-paginado'> 
					<Paginado dogsPerPage={dogsPerPage}  allDogs={allDogs.length} paginate={paginate} />
				</div>
		
				</div>

            </main>
    <Footer />
        </div>
    )
}