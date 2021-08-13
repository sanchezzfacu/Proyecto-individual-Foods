import React from 'react'

export default function Card({name, diet, image}) {
    return (
        <div>
            <h3>{name}</h3>
            <h5>{diet}</h5>
            <img src={image} alt="img not found" width="300px" height="200px"></img>
        </div>
    )
}
