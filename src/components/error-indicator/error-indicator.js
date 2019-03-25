import React from 'react';

import './error-indicator.css';

import bender from './bender.png';

const ErrorIndicator = ({ error }) => {
    console.log(error);
    return (
        <div className="error-indicator">
            <h3>Uuups! Im sorry. </h3>
            <h5>Something went terribly wrong!</h5>
            <img src={bender} alt={'Error.'} />
            <h5>I am already going to fix it.. next time.</h5>
            <div>For get more details: see my shiny metal a.. log!</div>

        </div>
    )
};

export default ErrorIndicator;