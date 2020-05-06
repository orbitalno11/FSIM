import React, { Component, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'
import LoadingGif from '../assets/gif/Loading.gif'
const LoadingComponent = () => (
    <div className="loading">
        
        {/* //     <div className="alertDialog">
        //     <Spinner animation="border" role="status">
        //         <span className="sr-only">Loading...</span>
        //     </Spinner>

        // </div>  */}
    
         <img className="GifLoad" src={LoadingGif} alt="loading..." /> */
     </div>
)

export default LoadingComponent