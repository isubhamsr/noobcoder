import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivetRoutes from './auth/helper/PrivetRoutes'
import Cart from './core/Cart'
import Home from './core/Home'
import Signin from './user/Signin'
import Signup from './user/Signup'
import UserDashboard from './user/UserDashboard'

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    <Home />
                </Route>
                <Route path="/signup" exact>
                    <Signup />
                </Route>
                <Route path="/signin" exact>
                    <Signin />
                </Route>
                <PrivetRoutes path="/user/dashboard" 
                    exact component={UserDashboard}
                />
                <PrivetRoutes path="/cart" 
                    exact component={Cart}
                />
            </Switch>
        </BrowserRouter>
    )
}
