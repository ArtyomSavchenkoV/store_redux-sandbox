import React from 'react';
import { BookstoreServiceConsumer } from "../bookstore-service-context";

const withBookstoreService = () => (Component) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        return (
                            <Component {...props} bookstoreService={bookstoreService}/>
                        )
                    }
                }
            </BookstoreServiceConsumer>
        );
    }
};

export default withBookstoreService;