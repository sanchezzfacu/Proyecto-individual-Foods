import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
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
    } else if(input.healthy_level < 0) {
        errors.healthy_level = 'Error, score can not be negative'
    }

    if(input.puntuacion > 100) {
        errors.puntuacion = 'Error, the maximum score is 100'
    } else if(input.puntuacion < 0) {
        errors.puntuacion = 'Error, score can not be negative'
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
        <div>
            <div className="button__">
                <a href="/home"><button>Back</button></a>
            </div>    
            <h1>CREATE RECIPE</h1>
            <div className="div__form">
                <form onSubmit={handleSubmit}>
                    <div className="input__div">
                        <label>Name: </label>
                        <input
                            type="text"
                            value={input.name}
                            name="name"
                            required
                            className={errors.name && 'danger'}
                            onChange={handleInputChange}
                        />
                                {errors.name && (
                            <div className="error__color">
                                <p>{errors.name}</p>
                            </div>    

                                )} 
                    </div>        
                    <div className="input__div">
                        <label>Resume: </label>
                        <input 
                            type="text"
                            value={input.resumen}
                            name="resumen"
                            required
                            onChange={handleInputChange}
                        />
                            <div className="error__color">
                                {errors.resumen && (
                                    <p>{errors.resumen}</p>
                                )}
                            </div> 
                    </div>
                    <div className="input__div">         
                        <label>Score 1 to 100: </label>
                        <input 
                            type="number"
                            value={input.puntuacion}
                            name="puntuacion"
                            onChange={handleInputChange}
                        />
                            <div className="error__color">
                                {errors.puntuacion && (
                                    <p>{errors.puntuacion}</p>
                                )} 
                            </div> 
                    </div>
                    <div className="input__div">        
                        <label>Healthy score 1 to 100: </label>
                        <input  
                            type="number"
                            value={input.healthy_level}
                            name="healthy_level"
                            onChange={handleInputChange}
                        />
                            <div className="error__color">
                                {errors.healthy_level && (
                                    <p>{errors.healthy_level}</p>
                                )}  
                            </div>
                    </div>
                    <div className="input__div">        
                        <label>Step by step: </label>
                        <input
                            type="text"
                            value={input.step_by_step}
                            name="step_by_step"
                            onChange={handleInputChange}
                        />
                            <div className="error__color">
                                {errors.step_by_step && (
                                    <p>{errors.step_by_step}</p>
                                )} 
                            </div>
                    </div>
                    <div className="input__div">         
                        <label>Image url: </label>
                        <input 
                            type="text"
                            value={input.img}
                            name="img"
                            onChange={handleInputChange}
                        />  
                            <div className="error__color">
                                {errors.img && (
                                    <p>{errors.img}</p>
                                )}
                            </div>
                    </div>          
                    <br/>
                    <select onChange={handleSelect}>
                        {types.map((type) => (
                            <option value={type.name}>{type.name.toUpperCase()}</option>
                        ))}
                    </select>
                        <div className="select__color">    
                            <p>{input.diet.map(el => el.toString().toUpperCase() + " ")}</p>
                        </div>     
                    <button type="submit">CREATE RECIPE</button>
                </form>
            </div>
        </div>
    )
}