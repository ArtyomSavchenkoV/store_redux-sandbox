import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withBookstoreService } from '../hoc';
import { compose } from "../../utils";

import { booksLoaded } from "../../actions";

import BookListItem from '../book-list-item';
//import ErrorIndicator from '../error-indicator';
//import Spinner from '../spinner';

import './book-list.css';

class BookList extends Component{
    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    componentDidMount() {
        const { bookstoreService } = this.props;
        const data = bookstoreService.getBooks();
        //console.log(actions);
        this.props.booksLoaded( data );

    }

    render () {

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

const mapStoreToProps = ({books}) => {
    return {
        books
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        booksLoaded: (params) => dispatch(booksLoaded(params))
    };
};

export default compose(
    withBookstoreService(),
    connect(mapStoreToProps, mapDispatchToProps)
)(BookList);

