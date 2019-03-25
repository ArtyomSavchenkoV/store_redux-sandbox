const initialState = {
    books: [],
    loading: true,
    error: null,

    orders: [
        {
            id: 1,
            title: 'JavaScript. Шаблоны',
            count: 2,
            total: 90
        }
    ],
    total: 0,
};

const reducer = (state = initialState, action) => {
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

        case 'ORDERS_DELETE_ITEM':{
            const { orders } = state;
            const itemId = orders.findIndex(({ id }) => id === action.payload);

            return {
                ...state,
                orders: [ ...orders.slice(0, itemId), ...orders.slice(itemId+1)]
            };
        }


        case 'ORDERS_ADD_ITEM': {
            console.log('ORDERS_ADD_ITEM');
            const { orders, books, error } = state;
            const bookId = books.findIndex(({ id }) => id === action.payload);
            console.log(bookId);
            if(bookId===undefined || error) return {...state};

            const {id, title, price} = books[bookId];

            const itemId = orders.findIndex(({ id }) => id === action.payload);
            let newOrders = [];
            console.log(itemId);
            if (itemId !== undefined) {
                console.log('add count');
                newOrders = [
                    ...orders.slice(0, itemId),
                    {...orders[itemId], count: orders[itemId].count + 1, total: orders[itemId].total + price},
                    ...orders.slice(itemId+1)
                ]
            }
            else {

                newOrders = [
                    ...orders,
                    {id, title, total: price, count: 1}
                ]
            }
            return {
                ...state,
                orders: newOrders
            };
        }


        default: return state;
    }
};

export default reducer;