import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getDetail } from '../actions';
import { useParams } from 'react-router-dom';
import '../styles/Details.css'


export default function Details(){
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch(getDetail(id))
    }, [dispatch, id] )

    const myRecipe = useSelector((state) => state.allDetails)

    return (
        <>
            <div className="button__home">
                <a href="/home"><button>Home</button></a>
            </div>
            {
            myRecipe.length > 0 ?
                <div className="container__details">
                    <div className="hijo">
                        <div className="detail__title">
                            <div className="title__">
                                <h1>{myRecipe[0].name.toUpperCase()}</h1>
                            </div>
                        </div>
                        <div className="first__line">
                            <div className="img__details">
                                <img src={myRecipe[0].img} alt= "" width="300px" weight="500px"/>
                            </div>
                            <div className="section">
                                <div className="diet__type">
                                    <h3><h3>DIETS TYPE </h3>{myRecipe[0].diet ? myRecipe[0].diet.map(el => el?.toString() + ", ") : myRecipe[0].diets.map(el => el.name.toString() + ", ")}</h3><br/>
                                </div>
                                <div className="healthy__score">
                                    <h3>HEALTHY SCORE: {myRecipe[0].healthy_level}</h3>
                                </div>
                                <h3>PUNTUATION:  {myRecipe[0].puntuacion}</h3>          
                            </div>                  
                        </div>
                        <div className="steps">
                            <h5><h3>STEP BY STEP </h3>{myRecipe[0].step_by_step}</h5>
                        </div>
                    </div>    
                </div>
                : 
                <div className="loading">
                    <p>Loading...</p>
                </div>  

            }
        </>
    )
}