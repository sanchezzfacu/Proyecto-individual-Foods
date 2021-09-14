import React from 'react'
import '../styles/Card.css'

export default function Card({name, diet, image}) {
    return (
        <div>
            <div className="img__card">
                <img src={image} alt="img not found" width="300px" height="200px"></img>
            </div>
            <h3>{name.toUpperCase()}</h3>   
            <h5>{diet}</h5>
        </div>
    )
}
