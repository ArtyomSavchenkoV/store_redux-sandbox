const updateCart = (cartItems, cartItemIndex, cartItem) => {
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

const updateCartItem = (cartItem = {}, book, quantity) => {
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

const updateOrder = ({shoppingCart, bookList}, bookId, quantity) => {
    const { books } = bookList;
    const { cartItems } = shoppingCart;
    const book = books.find(({ id }) => id === bookId);
    const cartItemIndex = cartItems.findIndex(({ id }) => id === bookId);

    if (!book) {
        console.log(`requested book is undefined: id = ${bookId}`);
        return {...shoppingCart};
    }

    const newCartItem = updateCartItem(cartItems[cartItemIndex], book, quantity);
    const newCart = updateCart(cartItems, cartItemIndex, newCartItem);
    return {
        ...shoppingCart,
        cartItems: newCart,
        orderTotal: mathOrderTotal(newCart)
    }
};

const updateShoppingCart = (state, action) => {
    if (state === undefined) {
        return {
            cartItems: [],
            orderTotal: 0,
        };
    }

    switch (action.type){
        case 'ADD_BOOK_TO_CART': {
            return updateOrder(
                state,
                action.payload,
                1
            );
        }
        case 'REMOVE_BOOKS_ROW_FROM_CART': {
            const item = state.shoppingCart.cartItems.find(({id}) => id === action.payload);
            return updateOrder(
                state,
                action.payload,
                -item.count
            );
        }
        case 'REMOVE_ONE_BOOK_FROM_CART': {
            return updateOrder(
                state,
                action.payload,
                -1
            );
        }
        default:
            return state.shoppingCart;
    }
};

export default updateShoppingCart;