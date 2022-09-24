import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authHeader from '../utils/AuthHeader';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={(props) => (
            !authHeader() ?
                <Redirect
                    to="/"
                />
            : 	
                <Component {...props} />
        )} />
    );
};

export default PrivateRoute;