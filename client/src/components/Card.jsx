import React from 'react'

export default function Card({name, diet, image}) {
    return (
        <div>
            <img src={image} alt="img not found" width="300px" height="200px"></img>
            <h3>{name.toUpperCase()}</h3>   
            <h5>{diet}</h5>
        </div>
    )
}
