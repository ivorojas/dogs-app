import React from 'react'
import './Paginado.css'
export default function Paginado({dogsPerPage, allDogs, paginate}) {
  const pageNumbers = []

  for (let i = 0 ; i < Math.ceil(allDogs/dogsPerPage) ; i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <nav>
      <ul id='paginado'>
        {
          pageNumbers && pageNumbers.map(number => (
            <li key={number} className="li-ul">
              <button onClick={() => paginate(number)} className="button-li" >{number}</button>
             {/*  <a onClick={() => paginate(number)}>{number}</a> */}
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
