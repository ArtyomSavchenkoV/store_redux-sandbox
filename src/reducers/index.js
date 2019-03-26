const initialState = {
    books: [],
    loading: true,
    error: null,
    cartItems: [],
    orderTotal: 0,
};

const updatedCart = (cartItems, cartItemIndex, cartItem) => {
    if (cartItem.count < 1) {
        return [
            ...cartItems.slice(0, cartItemIndex),
            ...cartItems.slice(cartItemIndex+1)
        ]
    }
    if (cartItemIndex > -1) {
        return [
            ...cartItems.slice(0, cartItemIndex),
            cartItem,
            ...cartItems.slice(cartItemIndex+1)
        ];
    }

    return [
        ...cartItems,
        cartItem
    ];
};

const updatedCartItem = (cartItem = {}, book, quantity) => {
    const {
        id = book.id,
        title = book.title,
        count = 0,
    } = cartItem;

    return {
        id,
        title,
        count: count + quantity,
        total: (count + quantity) * book.price
    }
};

const mathOrderTotal = (newCart) => {
    return newCart.reduce((result, {total}) => {
        return result + total
    }, 0);
};

const updateOrder = (state, bookId, quantity) => {
    const { books, cartItems } = state;
    const book = books.find(({ id }) => id === bookId);
    const cartItemIndex = cartItems.findIndex(({ id }) => id === bookId);

    if (!book) {
        console.log(`requested book is undefined: id = ${bookId}`);
        return {...state};
    }

    const newCartItem = updatedCartItem(cartItems[cartItemIndex], book, quantity);
    const newCart =updatedCart(cartItems, cartItemIndex, newCartItem);
    return {
        ...state,
        cartItems: newCart,
        orderTotal: mathOrderTotal(newCart)
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
            return updateOrder(state, action.payload, 1);
        }

        case 'REMOVE_BOOKS_ROW_FROM_CART': {
            const item = state.cartItems.find(({id}) => id === action.payload);
            return updateOrder(
                state,
                action.payload,
                -item.count
            );
        }

        case 'REMOVE_ONE_BOOK_FROM_CART': {
            return updateOrder(state, action.payload, -1);
        }

        default: return state;
    }
};

export default reducer;

/*

        case 'DELETE_BOOKS_ROW_FROM_CART': {
            const { cartItems } = state;
            const cartItemId = cartItems.findIndex(({ id }) => id === action.payload);

            if (cartItemId === -1) return {...state};

            const newCart = [
                ...cartItems.slice(0, cartItemId),
                ...cartItems.slice(cartItemId + 1)
            ];

            return {
                ...state,
                cartItems: newCart,
                orderTotal: mathOrderTotal(newCart)
            }
        }

        case 'DELETE_ONE_BOOK_FROM_CART': {
            const { cartItems, books } = state;
            const cartItemId = cartItems.findIndex(({ id }) => id === action.payload);
            const book = books.find(({ id }) => id === action.payload);

            if (cartItemId === -1) return {...state};

            const { count } = cartItems[cartItemId];

            if (count < 1) return {...state};

            const newCartItem = {
                ...cartItems[cartItemId],
                total: (count - 1) * book.price,
                count: count - 1
            };

            const newCart = updatedCart(cartItems, cartItemId, newCartItem);
            return {
                ...state,
                cartItems: newCart,
                orderTotal: mathOrderTotal(newCart)
            }
        }

 */