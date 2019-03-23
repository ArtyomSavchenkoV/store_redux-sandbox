import React from 'react';

import BookList from '../../book-list';
import ShoppingCartTable from '../../shopping-cart-table';

import './home-page.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <BookList />
            <ShoppingCartTable />
        </div>
    )
};

export default HomePage;