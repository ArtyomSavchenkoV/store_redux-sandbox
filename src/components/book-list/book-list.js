import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from "../../utils";

import { booksLoaded, showLoading } from "../../actions";

import BookListItem from '../book-list-item';
//import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component{

    componentDidMount() {
        const { bookstoreService, booksLoaded, showLoading } = this.props;
        showLoading();
        bookstoreService.getBooks().then((data) => {
            booksLoaded( data );
        })
            .catch()
    }

    render () {
        const { books, loading } = this.props;

        if (loading) return <Spinner />;

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

const mapStoreToProps = ({books, loading}) => {
    return {
        books,
        loading
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        booksLoaded: (params) => dispatch(booksLoaded(params)),
        showLoading: () => dispatch(showLoading())
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps)
)(BookList);

