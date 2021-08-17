import React from 'react' 
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeName } from '../actions'

export default function SearchBar() {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(getRecipeName(name))
    }

    return (
        <div>
            <input 
                type= 'text'
                placeholder='Search..'
                onChange={handleInputChange}  
            />
            <button
                type= 'submit' 
                onClick={handleSubmit}
            >SEARCH</button>
        </div>
    )
}


