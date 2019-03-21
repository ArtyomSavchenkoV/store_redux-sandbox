import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <h3>Uuups! Im sorry. </h3>
            <div>Something went terribly wrong!</div>
        </div>
    )
};

export default ErrorIndicator;