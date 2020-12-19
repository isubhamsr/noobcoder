import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import PrivetRoutes from './auth/helper/PrivetRoutes'
import Home from './core/Home'
import Signup from './user/Signup'

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
                {/* <PrivetRoutes path="/user/dashboard" 
                    exact component={}
                /> */}
            </Switch>
        </BrowserRouter>
    )
}
