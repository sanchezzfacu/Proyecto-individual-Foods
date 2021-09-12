import React from 'react' 
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getRecipeName } from '../actions'
import '../styles/Searchbar.css'

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
        <div className="container">
            <div>
            <input 
                type= 'text'
                placeholder='Search recipe...'
                onChange={handleInputChange}  
            />
            </div>
            <div className="button__">
            <button
                type= 'button' 
                onClick={handleSubmit}
            >Search</button>
            </div>
        </div>
    )
}


