import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipes, filterRecipeByType, orderByName, orderByScore } from '../actions'
import Card  from './Card'
import SearchBar  from './SearchBar';
import Paginado from './Paginado';


export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexOfFirtsRecipe,indexOfLastRecipe)

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
    
    const paginado = (recipeNumber) => {
        setCurrentPage(recipeNumber)
    }

    function handleSort(e) {
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleScore(e) {
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterRecipe(e) {
        dispatch(filterRecipeByType(e.target.value))
    }
    
    function handleClick() {
        dispatch(getRecipes())
    }
    return(
        <div>
            <Link to="/create">Add Recipe</Link>
            <select onChange={ e => handleFilterRecipe(e)}>
                <option value="all">All</option>
                <option value="vegan">Vegan</option>
                <option value="dairy free">Dairy free</option>
                <option value="gluten free">Gluten free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
                <option value="paleolithic">Paleolithic</option>
                <option value="primal">Primal</option>
                <option value="pescatarian">Pescatarian</option>
                <option value="fodmap friendly">Fodmap friendly</option>
                <option value="whole 30">Whole 30</option>
            </select>
            <select onChange={e => handleSort(e)}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
            </select>
            <select onChange={e => handleScore(e)}>
                <option value="highest">Highest score</option>
                <option value="lowest">Lowest score</option>
            </select>
            <SearchBar/>
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado={paginado}
            />
            <button onClick={e => {handleClick(e)}}>Load recipes</button>
                <div>
                    {
                        currentRecipes?.map(el => {
                            return(
                                <Link to={ '/home/' + el.id  }>
                                    <Card name={el.name} image={el.img} diet={el.diet ? el.diet + " " : el.diets.map(el => el.name.toString() + " ")}/>
                                </Link>
                            )
                        })
                    }
                </div>
        </div>            
    )
}