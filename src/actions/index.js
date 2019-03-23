
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

export {
    booksLoaded,
    showLoading
};