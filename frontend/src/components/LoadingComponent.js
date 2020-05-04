import React, { Component, Fragment } from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingComponent = () => (
    <div className="Dialog">
        <div className="alertDialog">
            <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
    </div>
)

export default LoadingComponent