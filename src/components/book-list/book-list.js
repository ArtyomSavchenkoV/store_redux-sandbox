import React, { Component } from 'react';
import { connect } from 'react-redux';

import BookListItem from '../book-list-item';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component{

    render () {
        console.log(this.props);
        const { books } = this.props;
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
    }
}

const mapStoreToProps = (store) => {
    return {
        books: store.books
    }
};

export default connect(mapStoreToProps)(BookList);