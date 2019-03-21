import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';
import { HomePage, CartPage } from '../pages';

import './app.css';

const App = () => {
    return (
        <div className="app">
            <Switch>
                <Route path='/' exact render={()=><HomePage />} />
                <Route path='/cart' exact render={()=><CartPage />} />
                <Route render={()=><Redirect to="/" />} />
            </Switch>
        </div>
    )
};

export default App;