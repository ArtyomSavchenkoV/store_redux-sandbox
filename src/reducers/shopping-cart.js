/**
 * a part of reducer, responsible for part of store - shoppingCart.
 * 
 * Action splits on three parts: 
 * add one book, remove one book, and remove all books from row.
 * All this actions performs in `updateOrder` function via giving
 * quantity parameter, which can be: 
 * `1` for add one book
 * `-1` for remove one book 
 * `-item.count` for remove all books
 * 
 * The function `updateOrder` prepares data and starts functions:
 * `updateCartItem`
 * `updateCartArray`
 * After this returns ready object `shoppingCart`
 * 
 * The function `updateCartItem` updates, or creates and returns ready object `cartItem` anyway.
 * `object.count` changes according to the `quantity` parameter.
 * 
 * The function `updateCartArray` gets new `cartItem` from function `updateCartItem`
 * and if `cartItem.count` is 0, then this `cartItem` removes from `cartItems`
 * if `cartItems` not contains `cartItem` object of additional book, then `cartItem` inserts into `cartItems`.
 * else update `cartItem` in `cartItems`.
 * 
 * @param state
 * @param action
 * 
 * @return {object} new shoppingCart
 * shoppingCart structure:
 {
 	cartItems: [
 		{
			id,
			title,
			count,
			total
		},
		{
			id,
			title,
			count,
			total
		}
	],
	orderTotal
}
 */


/**
 * create an updated shopping cart array, called `cartItems`. 
 * This function is intended for creating, updating or removing items.
 * 
 * @param {array of objects} previous objects cartItems.
 * @param {int} index of cart item. If index less than zero then add new cart item record.
 * @param {object} ready cart item. If `.count < 1` then delete record.
 * 
 * @return {array of objects} new cartItems
 */
const updateCartArray = (cartItems, cartItemIndex, cartItem) => {
	//delete cart item record, because its count of books became 0
    if (cartItem.count < 1) {
        return [
            ...cartItems.slice(0, cartItemIndex),
            ...cartItems.slice(cartItemIndex+1)
        ]
    }
    
    //insert new book
    if (cartItemIndex < 0) {
        return [
			...cartItems,
			cartItem
		];
    }
    
    //update cart item
	return [
            ...cartItems.slice(0, cartItemIndex),
            cartItem,
            ...cartItems.slice(cartItemIndex+1)
        ];    
};

/**
 * update cart item or create a cart item.
 * 
 * @param {object, undefined} previous cart item.
 * @param {object} book from bookList
 * @param {int} quantity of additional books, 
 * 		negative value decreaces count
 * 
 * @return {object} new cart item
 */
const updateCartItem = (cartItem = {}, book, quantity) => {
	
	//if cartItem was empty, then fill fields for create new cart item
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

/**
 * calculate common order total
 * 
 * @param {arary of objects} shopping cart.
 * 
 * @return {number} amount of object.total
 */
const mathOrderTotal = (newCart) => {
    return newCart.reduce((result, {total}) => {
        return result + total
    }, 0);
};

/**
 * prepare data for update order
 * 
 * @param {object} state
 * @param {int} book ID
 * @param {int} quantity of additional books, 
 * 		possitive value increases count
 * 		negative value decreaces count
 * 
 * @return {object} shoppingCart
 */
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

/**
 * a part of reducer, responsible for part of store - shoppingCart.
 * 
 * @param {object} state
 * @param {object} action
 * 
 * @return {object} shoppingCart
 */
const updateShoppingCart = (state, action) => {
	//Create shoppingCart
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
