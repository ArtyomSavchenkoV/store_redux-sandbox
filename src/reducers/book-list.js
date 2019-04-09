/**
 * a part of reducer, responsible for part of store - bookList.
 * 
 * @param state
 * @param action
 * 
 * @return {object} new bookList
 */

const updateBookList = (state, action) => {
	//Create new bookList
    if (state === undefined) {
        return {
            books: [],
            loading: true,
            error: null,
        }
    }

    switch (action.type) {
        case 'FETCH_BOOKS_SUCCESS': return {
            books: action.payload,
            loading: false,
            error: null
        };
        case 'FETCH_BOOKS_REQUEST': return {
            books: [],
            loading: true,
            error: null
        };
        case 'FETCH_BOOKS_FAILURE': return {
            books: [],
            loading: false,
            error: action.payload
        };
        default:
            return state.bookList;
    }
};

export default updateBookList;
