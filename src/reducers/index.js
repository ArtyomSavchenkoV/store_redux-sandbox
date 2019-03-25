const initialState = {
    books: [],
    loading: true,
    error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'BOOKS_LOADED': return {
            ...state,
            books: action.payload,
            loading: false,
            error: null
        };
        case 'SHOW_LOADING': return {
            ...state,
            loading: true,
            error: null
        };
        case 'BOOKS_ERROR': return {
            ...state,
            books: [],
            loading: false,
            error: action.payload
        };
        default: return state;
    }
};

export default reducer;