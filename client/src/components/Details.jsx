import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../actions';
import { Link, useParams } from 'react-router-dom';


export default function Details(){
    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id] )

    const myRecipe = useSelector((state) => state.allDetails)

    return (
        <>
        <div>
            {
                myRecipe.length > 0 ?
                <div>
                    <h1>{myRecipe[0].name}</h1>
                    <img src={myRecipe[0].img} alt= "" width="500px" weight="700px"/>
                    <h2>Diet's type: {myRecipe[0].diet.map(el => el?.toString() + " ") || myRecipe[0].diets.map(el => el.name.toString())}</h2>
                    <h2>Healthy score: {myRecipe[0].healthy_level}</h2>
                    <h2>Puntuation: {myRecipe[0].puntuacion}</h2>
                    <h2>Step by step: {myRecipe[0].step_by_step}</h2>
                </div> : <p>Loading...</p> 
            }

                <Link to="/home">
                    <button>
                        HOME
                    </button>
                </Link>
        </div>
        </>
    )

}