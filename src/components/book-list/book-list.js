import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from "../../utils";

import { fetchBooks } from "../../actions";

import BookListItem from '../book-list-item';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component{

    componentDidMount() {
        const { fetchBooks } = this.props;
        fetchBooks();
    }

    render () {
        const { books, loading, error } = this.props;

        if (loading) return <Spinner />;

        if (error) return <ErrorIndicator error={error}/>;

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
        error
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { bookstoreService } = ownProps;
    return {
        fetchBooks: fetchBooks(dispatch, bookstoreService),
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps)
)(BookList);

