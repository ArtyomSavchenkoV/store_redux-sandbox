const booksRequested = () => {
    return {
        type: 'FETCH_BOOKS_REQUEST'
    }
};

const booksLoaded = (newBooks = []) => {
    return {
        type: 'FETCH_BOOKS_SUCCESS',
        payload: newBooks
    }
};

const booksError = (error) => {
    return{
        type: 'FETCH_BOOKS_FAILURE',
        payload: error
    }
};

const fetchBooks = (dispatch, bookstoreService) => () => {
    dispatch(booksRequested());
    bookstoreService.getBooks()
        .then((books) => dispatch(booksLoaded(books)))
        .catch((err) => dispatch(booksError(err)))
};

const addBookToCart = (bookId) => {
    return {
        type: 'ADD_BOOK_TO_CART',
        payload: bookId
    }
};

export {
    fetchBooks,
    addBookToCart
};