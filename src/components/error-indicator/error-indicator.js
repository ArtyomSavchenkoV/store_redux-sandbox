import React from 'react';

import './error-indicator.css';

import bender from './bender.png';

const ErrorIndicator = (label) => {
    console.log(label);
    return (
        <div className="error-indicator">
            <h3>Uuups! Im sorry. </h3>
            <span>Something went terribly wrong!</span>
            <img src={bender} alt={'Error.'} />
            <span>Already I am going to fix it.</span>

        </div>
    )
};

export default ErrorIndicator;