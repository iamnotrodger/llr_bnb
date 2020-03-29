import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserContext from './UserContext';
import NavBar from './component/NavBar/NavBar';
import About from './component/About/About';
import LoginPage from './component/LoginPage/LoginPage';
import RegisterPage from './component/RegisterPage/RegisterPage';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import PropertyPage from './component/PropertyPage/PropertyPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import AddPropertyPage from './component/AddPropertyPage/AddPropertyPage';
import PropertyLibrary from './component/Property/PropertyList/PropertyLibrary';
import QueryRequirment from './component/QueryRequirment/QueryRequirment';

const App = () => {
        const [user, setUser] = useState(() => {
                const localData = localStorage.getItem('user');
                return localData ? JSON.parse(localData) : null;
        });
        const value = useMemo(() => ({ user, setUser }), [user, setUser]);

        useEffect(() => {
                localStorage.setItem('user', JSON.stringify(user));
        }, [user]);

        const loadUser = (data) => {
                setUser(data);
        };

        return (
                <Router>
                        <UserContext.Provider value={value}>
                                <NavBar />
                                <Switch>
                                        <Route
                                                path='/login'
                                                component={() => (
                                                        <LoginPage
                                                                loadUser={
                                                                        loadUser
                                                                }
                                                        />
                                                )}
                                        />
                                        <Route
                                                exact
                                                path='/'
                                                render={() => (
                                                        <React.Fragment>
                                                                <div className='main'>
                                                                        <PropertyLibrary />
                                                                </div>
                                                        </React.Fragment>
                                                )}
                                        />

                                        <Route
                                                path='/about'
                                                component={About}
                                        />

                                        <Route
                                                path='/register'
                                                component={RegisterPage}
                                        />

                                        <PrivateRoute
                                                path='/query-requirment'
                                                component={QueryRequirment}
                                        />

                                        <PrivateRoute
                                                path='/add-property'
                                                component={AddPropertyPage}
                                        />

                                        <PrivateRoute
                                                path='/property/:prid'
                                                component={(props) => (
                                                        <PropertyPage
                                                                {...props}
                                                        />
                                                )}
                                        />

                                        <PrivateRoute
                                                path='/profile/:uid'
                                                component={ProfilePage}
                                        />
                                </Switch>
                        </UserContext.Provider>
                </Router>
        );
};

export default App;
