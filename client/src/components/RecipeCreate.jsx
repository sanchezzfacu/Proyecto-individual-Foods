import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { postRecipe, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

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

    function handleChange(e) {
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
        setErrors(validate({
            ...input,
            [e.target.name]:e.target.value
        }));
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
            <Link to='/home'><button>Back</button></Link>
            <h1>Create recipe!</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label>Name: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        required
                        className={errors.name && 'danger'}
                        onChange={handleChange}
                    />
                    <label>    
                        {errors.name && (
                            <p>{errors.name}</p>
                        )} 
                    </label>    
                </div>
                <div>
                    <label>Resume: </label>
                    <input 
                        type="text"
                        value={input.resumen}
                        name="resumen"
                        required
                        onChange={handleChange}
                    />
                            {errors.resumen && (
                            <p>{errors.resumen}</p>
                        )}  
                </div>
                <div>
                    <label>Score 1 to 100: </label>
                    <input 
                        type="number"
                        value={input.puntuacion}
                        name="puntuacion"
                        onChange={handleChange}
                    />
                            {errors.puntuacion && (
                            <p>{errors.puntuacion}</p>
                        )}  
                </div>
                <div>
                    <label>Healthy score 1 to 100: </label>
                    <input  
                        type="number"
                        value={input.healthy_level}
                        name="healthy_level"
                        onChange={handleChange}
                    />
                            {errors.healthy_level && (
                            <p>{errors.healthy_level}</p>
                        )}  
                </div>
                <div>
                    <label>Step by step: </label>
                    <input
                        type="text"
                        value={input.step_by_step}
                        name="step_by_step"
                        onChange={handleChange}
                    />
                            {errors.step_by_step && (
                            <p>{errors.step_by_step}</p>
                        )}  
                </div>
                <div>
                    <label>Image: </label>
                    <input 
                        type="text"
                        value={input.img}
                        name="img"
                        className={errors.img && 'danger'}
                        onChange={handleChange}
                    />
                            {errors.img && (
                            <p>{errors.img}</p>
                        )}  
                </div>
                <br/>
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                <p>{input.diet.map(el => el.toString() + " ,")}</p>     
                <button type="submit">CREATE RECIPE</button>
            </form>
        </div>
    )
}