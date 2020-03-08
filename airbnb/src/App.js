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

const initialState = {
	user: {
		id: null,
		hostID: null,
		firstName: '',
		lastName: '',
		email: '',
		joined: ''
	},
	isSignedIn: true,
	isHost: false,
	apartmentProps: [],
	hotelProps: [],
	houseProps: [],
	links: [
		{
			role: 'Guest',
			label: 'Become a host',
			link: '/host-register'
		},
		{
			role: 'Host',
			label: 'Add Property',
			link: '/add-property'
		},
		{ role: 'Guest', label: 'About', link: '/about' }
	],

	menuList: [
		{
			role: 'Guest',
			label: 'Profile',
			link: '/profile'
		},
		{
			role: 'Guest',
			label: 'Log Out',
			link: '/logout'
		}
	],

	property: JSON.parse(localStorage.getItem('property'))
};

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	componentDidMount() {
		this.setState({
			apartmentProps: dummyProps,
			houseProps: dummyProps,
			hotelProps: dummyProps
		});
	}

	loadUser = data => {
		this.setState({
			user: {
				id: data.id,
				hostID: data.hostID,
				firstName: data.firstName,
				lastName: data.lastName,
				email: data.email,
				joined: data.joined
			}
		});
	};

	setProperty = property => {
		this.setState({ property: property });
		localStorage.setItem('property', JSON.stringify(property));
	};

	render() {
		const {
			isSignedIn,
			isHost,
			apartmentProps,
			hotelProps,
			houseProps,
			links,
			menuList,
			property
		} = this.state;

		const filteredList = isHost
			? links.filter(link => {
					return (
						link.role === 'Host' ||
						link.label === 'About'
					);
			  })
			: links.filter(link => {
					return (
						link.role === 'Guest' ||
						link.label === 'About'
					);
			  });

		return (
			<Router>
				<NavBar
					links={filteredList}
					menuList={menuList}
					isSignedIn={isSignedIn}
				/>
				<Switch>
					<Route
						path='/login'
						component={LoginPage}
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
						path='/property'
						isSignedIn={isSignedIn}
						component={props => (
							<PropertyPage
								{...props}
								propertyID={
									property.id
								}
								property={
									property
								}
							/>
						)}
					/>

					<PrivateRoute
						path='/profile'
						isSignedIn={isSignedIn}
						component={props => (
							<ProfilePage
								{...props}
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
