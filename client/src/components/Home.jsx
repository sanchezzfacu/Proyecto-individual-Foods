import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, filterRecipeByType, orderByName, orderByScore } from '../actions'
import Card  from './Card'
import SearchBar  from './SearchBar';
import Paginado from './Paginado';
import logo from '../logo.png'
import '../styles/Home.css'

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(8);
    const indexOfLastRecipe = currentPage * recipesPerPage;       //9  18   27
    const indexOfFirtsRecipe = indexOfLastRecipe - recipesPerPage;//0   9   18
    const currentRecipes = allRecipes.slice(indexOfFirtsRecipe,indexOfLastRecipe)

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])
    
    const paginado = (number) => {
        setCurrentPage(number)
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
    
    return(
        <div>
            <div className="header__color">
                <nav>
                    <div className="logo">
                        <a href="/home"> 
                            <img src={logo} alt="" height="53px"/>
                        </a>
                    </div>    
                        <div className="search">
                            <SearchBar/>
                        </div>
                        <div className="option">
                            <div className="diet__filter">
                                <select onChange={handleFilterRecipe}>
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
                            </div>

                            <div className="score__filter">
                                <select onChange={handleScore}>
                                    <option value="highest">Highest score</option>
                                    <option value="lowest">Lowest score</option>
                                </select>
                            </div>
                            <div className="ascendent__filter">
                                <select onChange={handleSort}>
                                    <option value="asc">A to Z</option>    
                                    <option value="desc">Z to A</option>
                                </select>
                            </div>
                        </div>
                        <div className="create__button">
                            <a href="/create"><button>Create recipe</button></a>
                        </div>
                </nav>
            </div>
                <div className="paginado">
                    <Paginado
                        recipesPerPage={recipesPerPage}
                        allRecipes={allRecipes.length}
                        paginado={paginado}
                    />
                </div>
                <div className="card">
                    {
                        currentRecipes?.map(el => {
                            return(
                                    <a href={ '/home/' + el.id  }>
                                        <div className="align-card">
                                            <Card image={el.img} name={el.name} diet={el.diet ? el.diet + " " : el.diets.map(el => el.name.toString() + " ")}/>
                                        </div>
                                    </a>
                            )
                        })
                    }
                </div>
        </div>
    )
}