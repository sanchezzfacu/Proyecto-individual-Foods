import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { postRecipe, getTypes, getRecipes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)

    const [input, setInput] = useState({
        name: "",
        resumen: "",
        puntuacion: "",
        healthy_level: "",
        img: "",
        step_by_step:"",
        diet: []
    })

    useEffect(() => {
        dispatch(getTypes())
    }, [])

    return (
        <div>
            <Link to='/home'><button>Volver</button></Link>
            <h1>Create recipe!</h1>
            <form>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                    />
                </div>
                <div>
                    <label>Step by step:</label>
                    <input
                        type="text"
                        value={input.resumen}
                        name="step_by_step"
                    />
                </div>
                <div>
                    <label>Puntuacion:</label>
                    <input 
                        type="number"
                        value={input.puntacion}
                        name="puntuacion"
                    />
                </div>
                <div>
                    <label>Healthy level:</label>
                    <input 
                        type="text"
                        value={input.healthy_level}
                        name="healthy_level"
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input 
                        type="text"
                        value={input.img}
                        name="img"
                    />
                </div>
                <div>
                    <label>Resume:</label>
                    <input 
                        type="text"
                        value={input.resumen}
                        name="resumen"
                    />
                </div>
                <div>
                    <label>Diet type:</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    <label><input 
                        type="checkbox"
                        value="vegan"
                        name="vegan"
                    />vegan</label>
                    
                </div>
            </form>
        </div>
    )
}