import React, { useState, useEffect } from 'react'
import { Link,useHistory } from 'react-router-dom'
import { postRecipe, getTypes } from '../actions'
import { useDispatch, useSelector } from 'react-redux'

function validate(input) {
    let errors = {};
    if (input.name.length < 0) {
      errors.name = 'A recipe name is required';
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
            <Link to='/home'><button>Volver</button></Link>
            <h1>Create recipe!</h1>
            <form onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label>Nombre: </label>
                    <input
                        type="text"
                        value={input.name}
                        name="name"
                        onChange={handleChange}
                    />
                        {errors.name && (
                            <p>{errors.name}</p>
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
                </div>
                <div>
                    <label>Puntuacion: </label>
                    <input 
                        type="number"
                        value={input.puntacion}
                        name="puntuacion"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Healthy level: </label>
                    <input 
                        type="text"
                        value={input.healthy_level}
                        name="healthy_level"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input 
                        type="text"
                        value={input.img}
                        name="img"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Resume: </label>
                    <input 
                        type="text"
                        value={input.resumen}
                        name="resumen"
                        onChange={handleChange}
                    />
                </div>
                <select onChange={(e) => handleSelect(e)}>
                    {types.map((type) => (
                        <option value={type.name}>{type.name}</option>
                    ))}
                </select>
                <ul><li>{input.diet.map(el => el.toString() + " ,")}</li></ul>        
                <button type="submit">CREATE RECIPE</button>

            </form>
        </div>
    )
}