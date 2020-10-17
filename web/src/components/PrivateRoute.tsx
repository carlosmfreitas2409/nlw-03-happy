import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/auth';

const PrivateRoute = ({ component: Component, ...props }) => {
    const { signed } = useAuth();
    
    return (
        <Route
            {...props}
            render={ () => signed
                ? <Component {...props} />
                : <Redirect to='/login' /> 
            }
        />
    )
}

export default PrivateRoute;