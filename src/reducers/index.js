import updateBookList from './book-list';
import updateShoppingCart from './shopping-cart'

/**
 * Reducer splits state on book list and shopping cart.
 * And deligates actions them.
 * 
 * @param state
 * @param action
 * 
 * @return new state
 */

const reducer = (state, action) => {
    return {
        bookList: updateBookList(state, action),
        shoppingCart: updateShoppingCart(state, action)
    }
};

export default reducer;
