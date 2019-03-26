const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [
        {
            id: 1,
            title: 'JavaScript. Шаблоны',
            count: 2,
            total: 90
        }
    ],
    orderTotal: 90,
};

const updatedCart = (cartItems, cartItemIndex, cartItem) => {
    if (cartItemIndex > -1) {
        return [
            ...cartItems.slice(0, cartItemIndex),
            cartItem,
            ...cartItems.slice(cartItemIndex+1)
        ];
    }
    else {
        return [
            ...cartItems,
            cartItem
        ];
    }
};

const updatedCartItem = (cartItem = {}, book) => {
    const {
        id = book.id,
        title = book.title,
        count = 0,
        total = 0
    } = cartItem;

    return {
        id,
        title,
        count: count + 1,
        total: total + book.price
    }
};

const reducer = (state = initialState, action) => {
    console.log(action.type);
    switch(action.type) {
        case 'FETCH_BOOKS_SUCCESS': return {
            ...state,
            books: action.payload,
            loading: false,
            error: null
        };
        case 'FETCH_BOOKS_REQUEST': return {
            ...state,
            books: [],
            loading: true,
            error: null
        };
        case 'FETCH_BOOKS_FAILURE': return {
            ...state,
            books: [],
            loading: false,
            error: action.payload
        };

        case 'ADD_BOOK_TO_CART': {
            const { books, cartItems, orderTotal } = state;
            const bookId = action.payload;
            const book = books.find(({ id }) => id === bookId);
            const cartItemIndex = cartItems.findIndex(({ id }) => id === bookId);

            if (!book) {
                console.log(`requested book is undefined: id = ${bookId}`);
                return {...state};
            }

            const newCartItem = updatedCartItem(cartItems[cartItemIndex], book);
            return {
                ...state,
                cartItems: updatedCart(cartItems, cartItemIndex, newCartItem),
                orderTotal: orderTotal + book.price
            }

        }
        default: return state;
    }
};

export default reducer;
