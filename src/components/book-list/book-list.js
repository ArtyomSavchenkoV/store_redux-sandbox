import React from 'react';

import BookListItem from '../book-list-item';

import './book-list.css';

const BookList = ({books, onAddBookToCart }) => {
    const listItems = books.map((book) => {
        return (
            <li key={book.id}>
                <BookListItem
                    book={book}
                    onAddBookToCart={() => onAddBookToCart(book.id)}
                />
            </li>
        )
    });

    return (
        <ul className="book-list">
            {listItems}
        </ul>
    )
};

export default BookList;

