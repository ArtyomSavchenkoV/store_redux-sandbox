import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withBookstoreService } from '../components/hoc';
import { compose } from "../utils";

import { fetchBooks, addBookToCart } from "../actions";

import ErrorIndicator from '../components/error-indicator';
import Spinner from '../components/spinner';
import BookList from '../components/book-list';

class BookListContainer extends Component{
    componentDidMount() {
        this.props.fetchBooks();
    }

    render () {
        const { books, loading, error, onAddBookToCart } = this.props;

        if (loading) return <Spinner />;
        if (error) return <ErrorIndicator error={error}/>;
        return <BookList books={books} onAddBookToCart={onAddBookToCart}/>;
    }
}


const mapStoreToProps = ({bookList: {books, loading, error}}) => {
    return {
        books,
        loading,
        error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: fetchBooks(dispatch, bookstoreService),
        onAddBookToCart: (id) => dispatch(addBookToCart(id))
    };

};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps),
)(BookListContainer);