import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import UserContext from './UserContext';
import NavBar from './component/NavBar/NavBar';
import PropertyPage from './component/PropertyPage/PropertyPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import About from './component/About/About';
import PropertyLibrary from './component/Property/PropertyList/PropertyLibrary';
import LoginPage from './component/LoginPage/LoginPage';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import RegisterPage from './component/RegisterPage/RegisterPage';
import AddPropertyPage from './component/AddPropertyPage/AddPropertyPage';
import LoadSpinner from './component/LoadingScreen/LoadSpinner';

const App = () => {
        const [user, setUser] = useState(() => {
                const localData = localStorage.getItem('user');
                return localData ? JSON.parse(localData) : null;
        });
        const value = useMemo(() => ({ user, setUser }), [user, setUser]);
        const [Hotel, setHotel] = useState([]);
        const [House, setHouse] = useState([]);
        const [Apartment, setApartment] = useState([]);
        const [filterType, setFilterType] = useState({
                Hotel: '',
                House: '',
                Apartment: ''
        });
        const [loading, setLoading] = useState(false);

        //React Life Cycle Method: will run before render and is used to load data from the backend
        useEffect(() => {
                const fetchData = async () => {
                        setLoading(true);
                        try {
                                const responseOne = await fetch(
                                        'http://localhost:3000/api/property/property-list/Hotel/4'
                                );

                                if (responseOne.ok) {
                                        const hotels = await responseOne.json();
                                        setHotel(hotels);
                                }

                                const responseTwo = await fetch(
                                        'http://localhost:3000/api/property/property-list/House/4'
                                );

                                if (responseTwo.ok) {
                                        const houses = await responseTwo.json();
                                        setHouse(houses);
                                }

                                const responseThree = await fetch(
                                        'http://localhost:3000/api/property/property-list/Apartment/4'
                                );

                                if (responseThree.ok) {
                                        const apartments = await responseThree.json();
                                        setApartment(apartments);
                                }
                                setLoading(false);
                        } catch (err) {
                                console.log(err);
                                setLoading(false);
                        }
                };
                fetchData();
        }, []);

        useEffect(() => {
                localStorage.setItem('user', JSON.stringify(user));
        }, [user]);

        const loadUser = (data) => {
                setUser(data);
        };

        const handleFilterChange = (type, value) => {
                setFilterType({ ...filterType, [type]: value });
                filterProperty(type, value);
        };

        const loadAllHotels = async () => {
                const hotels = await loadAllProperty('Hotel', Hotel);
                setHotel(hotels);
        };

        const loadAllHouses = async () => {
                const houses = await loadAllProperty('House', House);
                setHouse(houses);
        };

        const loadAllApartments = async () => {
                const apartments = await loadAllProperty(
                        'Apartment',
                        Apartment
                );
                setApartment(apartments);
        };

        const loadAllProperty = async (category, oldProperties) => {
                setLoading(true);
                try {
                        const response = await fetch(
                                `http://localhost:3000/api/property/property-list/${category}`
                        );
                        if (response.ok) {
                                const properties = await response.json();
                                setLoading(false);
                                return properties;
                        }
                } catch (err) {
                        console.log(err);
                }
                setLoading(false);
                return oldProperties;
        };

        const filterProperty = (type, value) => {
                console.log(type, ': ', value);
        };

        return (
                <Router>
                        <LoadSpinner loading={loading} />
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
                                                                        <PropertyLibrary
                                                                                hotel={
                                                                                        Hotel
                                                                                }
                                                                                house={
                                                                                        House
                                                                                }
                                                                                apartment={
                                                                                        Apartment
                                                                                }
                                                                                loadAllHotels={
                                                                                        loadAllHotels
                                                                                }
                                                                                loadAllHouses={
                                                                                        loadAllHouses
                                                                                }
                                                                                loadAllApartments={
                                                                                        loadAllApartments
                                                                                }
                                                                                onFilter={
                                                                                        handleFilterChange
                                                                                }
                                                                        />
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
