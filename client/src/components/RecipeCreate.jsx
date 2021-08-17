import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { postRecipe, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import '../styles/RecipeCreate.css'

function validate(input) {
    let errors = {};
    if (!input.name) {
        errors.name = 'A recipe name is required';
    } else if(input.name.length < 5) {
        errors.name = 'Recipe name too short'
    }
    
    if(!input.img){
        errors.img = 'A link image must be provided'  
    }
    
    if(input.resumen.length < 20) {
        errors.resumen = 'Recipe resume too short'
    }

    if(input.healthy_level > 100) {
        errors.healthy_level = 'Error, the maximum score is 100'
    }

    if(input.puntuacion > 100) {
        errors.puntuacion = 'Error, the maximum score is 100'
    }
    return errors;
};    

export default function RecipeCreate() {
    const dispatch = useDispatch()
    const types = useSelector((state) => state.types)
    const history = useHistory()
    const [errors,setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        resumen: "",
        puntuacion: "",
        healthy_level: "",
        img: "",
        step_by_step:"",
        diet: []
    })

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value,
        }));
    }

    function handleSelect(e) {
        setInput({
            ...input,
            diet: [...input.diet,e.target.value]
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(postRecipe(input))
        alert('Recipe created succesfully!')
        setInput({
            name: "",
            resumen: "",
            puntuacion: "",
            healthy_level: "",
            img: "",
            step_by_step:"",
            diet: []
        })
        history.push('/home')
    }

    useEffect(() => {
        dispatch(getTypes())
    }, [dispatch])

    return (
        <div className="background">
            <div className="volver">
                <Link to='/home'><h2>BACK</h2></Link>
            </div>
        <div className="cuadro">
        <div className="div-home">
            <h1>Create recipe!</h1>
            <div className="div-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name: </label>
                    <div className="input-div">
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        required
                        className={errors.name && 'danger'}
                        onChange={handleInputChange}
                    />
                    </div>
                        {errors.name && (
                        <div className="error">
                                <p>{errors.name}</p>
                        </div>     
                        )} 
                </div>
                <div>
                    <label>Resume: </label>
                    <div className="input-div">
                    <input 
                        type="text"
                        value={input.resumen}
                        name="resumen"
                        required
                        onChange={handleInputChange}
                    />
                    </div>
                        <div className="error">

                            {errors.resumen && (
                            <p>{errors.resumen}</p>
                        )}  
                        </div>
                </div>
                <div>
                    <label>Score 1 to 100: </label>
                    <div className="input-div">
                    <input 
                        type="number"
                        value={input.puntuacion}
                        name="puntuacion"
                        onChange={handleInputChange}
                    />
                    </div>
                    <div className="error">
                            {errors.puntuacion && (
                            <p>{errors.puntuacion}</p>
                        )}  
                   </div>     
                </div>
                <div>
                    <label>Healthy score 1 to 100: </label>
                    <div className="input-div">
                    <input  
                        type="number"
                        value={input.healthy_level}
                        name="healthy_level"
                        onChange={handleInputChange}
                    />
                    </div>
                        <div className="error">
                            {errors.healthy_level && (
                            <p>{errors.healthy_level}</p>
                        )}  
                        </div>
                </div>
                <div>
                    <label>Step by step: </label>
                    <div className="input-div">
                    <input
                        type="text"
                        value={input.step_by_step}
                        name="step_by_step"
                        onChange={handleInputChange}
                    />
                    </div>
                            {errors.step_by_step && (
                            <p>{errors.step_by_step}</p>
                        )}  
                </div>
                <div>
                    <label>Image: </label>
                    <div className="input-div">
                    <input 
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={handleInputChange}
                    />
                    </div>
                        <div className="error">
                            {errors.img && (
                            <p>{errors.img}</p>
                        )}  
                        </div>
                </div>
                <br/>
                <select onChange={handleSelect}>
                    {types.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                <div className="diets">
                <p>{input.diet.map(el => el.toString().toUpperCase() + ", ")}</p>     
                </div>
                <button type="submit">CREATE RECIPE</button>
            </form>
            </div>
        </div>
        </div>
        </div>
    )
}