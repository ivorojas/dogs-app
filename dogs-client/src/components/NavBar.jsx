import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch} from 'react-redux'
import { getDogByName } from '../actions'
import './NavBar.css'

export default function NavBar ({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [name, setName] = useState("")

    const handleInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value)
        //console.log(name)
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(getDogByName(name))
        setCurrentPage(1);
        setIsSearchVisible(false)
      }

    //if (isMobile === true) {console.log('is mobile es true')}
    useEffect(() => {
        const checkIsMobile = () => {
            //console.log('check is mobile se ejecutó')
            setIsMobile(window.innerWidth <= 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
    }, [])

    const toggleSearch = () => {
        if (isMobile) {
          setIsSearchVisible(!isSearchVisible);
        }
      };



    return (
        <div className='navBarContainer'>

            <NavLink to='/create' >
                <button className='button-navbar' >
                Añadir
                </button>
            </NavLink> 

            <div id='logo'>
                <NavLink to='/' >
                    <button id='button_logo' onClick="window.location.reload()">
                        DOGS
                    {/*<img src={logo}  alt='logo' height='80px'/>*/}
                    </button>
                </NavLink>
            </div>

            <div className='input-container'>
                <form action="#" onSubmit={handleSubmit}>
                    {
                        !isMobile && (
                          <>
                           <input type='text' placeholder='busca una raza' id='input-nav' onChange={(e) => handleInputChange(e)} />
                                               <button type='button' onClick={handleSubmit} id="button-lupa" >
                        <span className="material-symbols-rounded">
                        search
                        </span>
                    </button>
                          </>
                           
                        )
                    }
                    {
                        isMobile && (
                          <>
                        <button type='button' onClick={toggleSearch} id="button-lupa" >
                        <span className="material-symbols-rounded">
                        search
                        </span>
                    </button>
                          </>
                           
                        )
                    }

                </form> 
            </div>

            {isMobile && isSearchVisible && (
        <div className="search-mobile-container">
          <button onClick={toggleSearch} className="back-mobile-button">{"<"}Atras</button>
          <div >
          <form action="#" onSubmit={handleSubmit} className='form-mobile'>
            <input
              type="text"
              className="search-mobile-input"
              placeholder='busca una raza'
              onChange={(e) => handleInputChange(e)}
            />
                  <button type='button' onClick={handleSubmit} id="button-lupa" >
                        <span className="material-symbols-rounded">
                        search
                        </span>
                    </button>
          </form>
          </div>

        </div>
      )}

        </div>
    )
}