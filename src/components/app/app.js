import React from 'react';

import { Switch, Route, Redirect, Link } from 'react-router-dom';

import ShopHeader from '../shop-header';
import { HomePage, CartPage } from '../pages';

import './app.css';

const App = () => {
    return (
        <div className="app">
            <main role="main" className="container">
                <ShopHeader numItems={5} total={230}/>
                <Switch>
                    <Route path='/' exact render={()=><HomePage />} />
                    <Route path='/cart' exact render={()=><CartPage />} />
                    <Route render={()=><Redirect to="/" />} />
                </Switch>
                <Link to="/">Homepage</Link><br />
                <Link to="/cart">Cart Page</Link>
            </main>
        </div>
    )
};

export default App;