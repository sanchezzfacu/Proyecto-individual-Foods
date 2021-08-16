import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Paginado.css'

export default function Paginado({recipesPerPage, allRecipes, paginado}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(allRecipes/recipesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <>
                {
                pageNumbers?.map( number => 
                        <Link onClick={() => paginado(number)}>
                        <div className="paginado">
                            <div className="numbers">
                                {number}
                            </div>
                        </div>
                        </Link>
                )
                }
        </>        
    )
}