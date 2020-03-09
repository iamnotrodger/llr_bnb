import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import PropertyPage from './component/PropertyPage/PropertyPage';
import ProfilePage from './component/ProfilePage/ProfilePage';
import About from './component/About/About';
import PropertyList from './component/Property/PropertyList/PropertyList';
import LoginPage from './component/LoginPage/LoginPage';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
import RegisterPage from './component/RegisterPage/RegisterPage';

const dummyProps = [
	{
		id: 1,
		location: 'Canada',
		title: 'Hotel',
		type: 'Hotel',
		price: 100,
		rating: 3.4
	},

	{
		id: 2,
		location: 'Canada',
		title: 'House',
		type: 'House',
		price: 102,
		rating: 4.0
	},

	{
		id: 3,
		location: 'Canada',
		title: 'Apartment',
		type: 'Apartment',
		price: 101,
		rating: 4.0
	},

	{
		id: 4,
		location: 'Canada',
		title: 'Apartment',
		type: 'Apartment',
		price: 101,
		rating: 4.0
	}
];

const dummyUser = {
	id: 420,
	hostId: 69,
	firstName: 'Rodger',
	lastName: 'Retanal',
	email: 'rodger@email.com',
	phone: '420-666-6969',
	joined: '2020'
};

const initialState = {
	user: JSON.parse(localStorage.getItem('user')),
	isSignedIn: false,
	isHost: false,
	apartmentProps: [],
	hotelProps: [],
	houseProps: [],
	//This state is just for testing purposes.
	property: JSON.parse(localStorage.getItem('property'))
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	//React Life Cycle Method: will run before render and is used to load data from the backend
	componentDidMount() {
		this.setState({
			user: dummyUser,
			apartmentProps: dummyProps,
			houseProps: dummyProps,
			hotelProps: dummyProps
		});
		localStorage.setItem('user', JSON.stringify(dummyUser));
		localStorage.setItem('userID', JSON.stringify(dummyUser.id));
	}

	loadUser = data => {
		this.setState({
			user: {
				isSignedIn: true,
				id: data.id,
				hostID: data.hostID,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				joined: data.joined
			}
		});

		if (data.user.hostID !== null) {
			this.setState({
				isHost: true
			});
		}
	};

	//This function is just for testing pusposes.
	setProperty = property => {
		this.setState({ property: property });
		localStorage.setItem('property', JSON.stringify(property));
	};

	render() {
		const {
			isSignedIn,
			isHost,
			user,
			apartmentProps,
			hotelProps,
			houseProps,
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
						component={LoginPage}
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
									<PropertyList
										properties={
											hotelProps
										}
										type={
											'Hotel'
										}
										setProperty={
											this
												.setProperty
										}
									/>
									<PropertyList
										properties={
											houseProps
										}
										type={
											'House'
										}
										setProperty={
											this
												.setProperty
										}
									/>
									<PropertyList
										properties={
											apartmentProps
										}
										type={
											'Apartment'
										}
										setProperty={
											this
												.setProperty
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
