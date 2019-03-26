import React from 'react';

import { connect } from 'react-redux';

import {
    addBookToCart,
    removeBookRowFromCart,
    removeOneBookFromCart } from "../../actions";

import './shopping-cart-table.css';

const ShoppingCartTable = ({ items = [], total, onIncrease, onDecrease, onDelete }) => {

    const renderRow = (element, idx) => {
        const { id, title, count, total} = element;
        return (
            <tr key={id}>
                <td>{idx+1}</td>
                <td>{title}</td>
                <td>{count}</td>
                <td>₽{total}</td>
                <td>
                    <button
                        className={'btn btn-outline-danger btn-sm'}
                        onClick={() => onDelete(id)}
                    >
                        <i className={'fa fa-trash-o'} />
                    </button>
                    <button
                        className={'btn btn-outline-success btn-sm'}
                        onClick={() => onIncrease(id)}
                    >
                        <i className={'fa fa-plus-circle'} />
                    </button>
                    <button
                        className={'btn btn-outline-warning btn-sm'}
                        onClick={() => onDecrease(id)}
                    >
                        <i className={'fa fa-minus-circle'} />
                    </button>
                </td>
            </tr>
        )
    };

    return (
        <div className={'shopping-cart-table'}>
            <h2>Your order</h2>
            <table className={'table'}>
                <thead>
                <tr>
                    <th>№</th>
                    <th>Item</th>
                    <th>Count</th>
                    <th>Price</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {
                    items.map(renderRow)
                }
                </tbody>
            </table>
            <div className={'total'}>
                Total: ₽{total}
            </div>
        </div>
    )
};

const mapStateToProps = ({cartItems, orderTotal}) => {
    return {
        items: cartItems,
        total: orderTotal
    };
};

const mapDispatchToProps = {
    onIncrease: addBookToCart,
    onDecrease: removeOneBookFromCart,
    onDelete: removeBookRowFromCart
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartTable);