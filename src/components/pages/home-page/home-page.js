import React from 'react';

import BookList from '../../book-list';

import './home-page.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1>Home page!</h1>
            <BookList books={[]}/>
        </div>
    )
};

export default HomePage;