import React, {Component} from 'react';
import BookstoreService from '../../services/stub-bookstore-service';

import './app.css';

export default class extends Component {
    constructor(){
        super();

        this.state = {
            bookstoreService: new BookstoreService()
        }
    }

    render(){
        return (<h1>App!!!</h1>)
    }
}