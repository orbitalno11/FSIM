import React from 'react'
import LoadingGif from '../assets/gif/Loading.gif'
const LoadingComponent = () => (
    <div className="loading">
         <img className="GifLoad" src={LoadingGif} alt="loading..." /> 
     </div>
)

export default LoadingComponent