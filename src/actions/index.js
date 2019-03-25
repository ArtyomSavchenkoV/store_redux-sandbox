
const booksLoaded = (newBooks = []) => {
    return {
        type: 'BOOKS_LOADED',
        payload: newBooks
    }
};

const showLoading = () => {
    return {
        type: 'SHOW_LOADING'
    }
};

const booksError = (error) => {
    return{
        type: 'BOOKS_ERROR',
        payload: error
    }
};

export {
    booksLoaded,
    showLoading,
    booksError
};