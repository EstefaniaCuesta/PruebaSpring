import React from 'react'
import './../resources/Styles/404.css'
import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div>
       <body className="bg-purple">
        
            <div className="stars">
                <div className="custom-navbar">
                    
                    
                </div>
                <div className="central-body">
                    <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px"></img>
                    <Link to = "/"  className="btn-go-home" target="_blank">GO BACK HOME</Link>
                </div>
                <div className="objects">
                    <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px"></img>
                    <div className="earth-moon">
                        <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px"></img>
                        <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px"></img>
                    </div>
                    <div className="box_astronaut">
                        <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px"></img>
                    </div>
                </div>
                <div class="glowing_stars">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>

                </div>

            </div>

        </body>
    </div>
  )
}
