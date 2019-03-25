import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from "../../utils";

import { booksLoaded, showLoading, booksError } from "../../actions";

import BookListItem from '../book-list-item';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component{

    componentDidMount() {
        const { bookstoreService, booksLoaded, showLoading, booksError } = this.props;
        showLoading();
        bookstoreService.getBooks().then(booksLoaded)
            .catch((error) => booksError(error));
    }

    render () {
        const { books, loading, loadError } = this.props;

        if (loading) return <Spinner />;

        if (loadError) return <ErrorIndicator label={loadError}/>;

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

const mapStoreToProps = ({books, loading, error}) => {
    return {
        books,
        loading,
        loadError: error
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        booksLoaded: (params) => dispatch(booksLoaded(params)),
        showLoading: () => dispatch(showLoading()),
        booksError: (error) => dispatch(booksError(error))
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps)
)(BookList);

