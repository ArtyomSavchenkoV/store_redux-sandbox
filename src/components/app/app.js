import React, {Component} from 'react';
import BookstoreService from '../../services/stub-bookstore-service';
import { BookstoreServiceProvider } from '../bookstore-service-context';

import './app.css';

export default class extends Component {
    constructor(){
        super();

        this.state = {
            bookstoreService: new BookstoreService()
        }
    }

    render(){
        return (
            <BookstoreServiceProvider value={this.state.bookstoreService}>
                <h1>App!!!</h1>
            </BookstoreServiceProvider>
        )
    }
}