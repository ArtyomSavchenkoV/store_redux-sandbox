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

const deleteOrderItem = (id) => {
    return {
        type: 'ORDERS_DELETE_ITEM',
        payload: id
    }
};

const addOrderItem = (id) => {
    return {
        type: 'ORDERS_ADD_ITEM',
        payload: id
    }
};

export {
    fetchBooks,

    deleteOrderItem,
    addOrderItem
};