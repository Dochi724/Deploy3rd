import React from "react";
import {Route, useHistory} from "react-router-dom";
import isLogin from "./isLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /login page
        <Route
            {...rest}
            render={(props) => (isLogin() ? <Component {...props} /> : history.push('/login'))}
        />
    );
};

export default PrivateRoute;