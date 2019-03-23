const initialState = {
    books: [],
    loading: true
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'BOOKS_LOADED': return {
            ...state,
            books: action.payload,
            loading: false
        };
        case 'SHOW_LOADING': return {
            ...state,
            loading: true
        };
        default: return state;
    }
};

export default reducer;