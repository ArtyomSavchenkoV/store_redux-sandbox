import React from 'react';

import BookListItem from '../book-list-item';

import './book-list.css';

const BookList = ({books}) => {
    const listItems = books.map((book) => {
        return (
            <li key={book.id}>
                <BookListItem book={book} />
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

