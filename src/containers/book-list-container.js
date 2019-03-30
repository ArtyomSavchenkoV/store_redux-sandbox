import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

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

    return bindActionCreators({
        fetchBooks: fetchBooks(bookstoreService),
        onAddBookToCart: addBookToCart
    }, dispatch);
};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps),
)(BookListContainer);
