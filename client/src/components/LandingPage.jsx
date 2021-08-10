import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/LandingPage.css'

export default function LandingPage() {
    return (
        <div className="background">
            <div className="text">
                <h1>WELCOME TO MY PAGE</h1>
            </div>    
                    <Link to='/home'>
                        <div className= "button">
                            ENTER
                        </div>
                    </Link>
        </div>
    )
}