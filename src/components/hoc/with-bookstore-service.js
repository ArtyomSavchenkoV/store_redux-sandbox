import React from 'react';
import { BookstoreServiceConsumer } from "../bookstore-service-context";

const withBookstoreService = (mapBookstoreService) => (Component) => {
    return (props) => {
        return (
            <BookstoreServiceConsumer>
                {
                    (bookstoreService) => {
                        const getData = mapBookstoreService(bookstoreService);
                        return (
                            <Component {...props} {...getData}/>

                        )
                    }
                }
            </BookstoreServiceConsumer>
        );
    }
};

export default withBookstoreService;