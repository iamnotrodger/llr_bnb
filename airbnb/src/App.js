import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import PropertyPage from './component/PropertyPage/PropertyPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import About from './component/About/About';
import PropertyLibrary from './component/Property/PropertyList/PropertyLibrary';
import LoginPage from './component/LoginPage/LoginPage';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import RegisterPage from './component/RegisterPage/RegisterPage';

const initialState = {
	user: JSON.parse(localStorage.getItem('user')),
	isSignedIn: false,
	isHost: false,
	Apartment: [],
	Hotel: [],
	House: [],
	//This state is just for testing purposes.
	property: JSON.parse(localStorage.getItem('property'))
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
		this.loadAllProperty = this.loadAllProperty.bind(this);
	}

	//React Life Cycle Method: will run before render and is used to load data from the backend
	async componentDidMount() {
		try {
			const responseOne = await fetch(
				'http://localhost:3000/api/property/property-list/Hotel/4'
			);
			const hotels = await responseOne.json();

			const responseTwo = await fetch(
				'http://localhost:3000/api/property/property-list/House/4'
			);
			const houses = await responseTwo.json();

			const responseThree = await fetch(
				'http://localhost:3000/api/property/property-list/Apartment/4'
			);
			const apartments = await responseThree.json();

			this.setState({
				Hotel: hotels,
				House: houses,
				Apartment: apartments
			});
		} catch (err) {
			console.log(err);
		}
	}

	loadUser = data => {
		this.setState({
			user: {
				uid: data.uid,
				gid: data.gid,
				hid: data.id
			},
			isSignedIn: true
		});

		if (data.hid) {
			this.setState({
				isHost: true
			});
		}

		console.log(this.state);
	};

	async loadAllProperty(category) {
		try {
			const response = await fetch(
				`http://localhost:3000/api/property/property-list/${category}`
			);
			const properties = await response.json();
			this.setState({
				[category]: properties
			});
		} catch (err) {
			console.log(err);
		}
	}

	//This function is just for testing purposes.
	setProperty = property => {
		this.setState({ property: property });
		localStorage.setItem('property', JSON.stringify(property));
	};

	render() {
		const {
			isSignedIn,
			isHost,
			user,
			Apartment,
			Hotel,
			House,
			property
		} = this.state;

		return (
			<Router>
				<NavBar
					isSignedIn={isSignedIn}
					isHost={isHost}
				/>
				<Switch>
					<Route
						path='/login'
						component={props => (
							<LoginPage
								loadUser={
									this
										.loadUser
								}
							/>
						)}
					/>
					<Route
						path='/register'
						component={RegisterPage}
					/>
					<Route
						exact
						path='/'
						render={props => (
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
										setProperty={
											this
												.setProperty
										}
										loadAllProperty={
											this
												.loadAllProperty
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
					<PrivateRoute
						path='/property/:id'
						isSignedIn={isSignedIn}
						component={props => (
							<PropertyPage
								{...props}
								property={
									property
								}
							/>
						)}
					/>

					<PrivateRoute
						path='/profile/:userID'
						isSignedIn={isSignedIn}
						component={props => (
							<ProfilePage
								{...props}
								user={user}
								setProperty={
									this
										.setProperty
								}
								isHost={isHost}
							/>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
