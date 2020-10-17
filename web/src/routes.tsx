import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Landing from './pages/Landing';
import OrphanagesMap from './pages/OrphanagesMap';
import Orphanage from './pages/Orphanage';
import CreateOrphanage from './pages/CreateOrphanage';
import Login from './pages/Auth/Login';
import ForgotPW from './pages/Auth/ForgotPW';

// Private Pages
import Dashboard from './pages/RestrictAccess/Dashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/app" component={OrphanagesMap} />

                <Route path="/orphanages/create" component={CreateOrphanage} />
                <Route path="/orphanages/:id" component={Orphanage} />

                <Route path="/login" component={Login} />
                <Route path="/forgotpassword" component={ForgotPW} />

                <PrivateRoute path="/dashboard" component={Dashboard} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;