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

const initialState = {
	isSignedIn: false,
	properties: [
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
	],

	links: [
		{ label: 'Become a host', link: '/hostregister' },
		{ label: 'About', link: '/about' },
		{ label: 'Register', link: '/register' }
	],

	menuList: [
		{
			label: 'Profile',
			link: '/profile'
		},
		{
			label: 'Log Out',
			link: '/logout'
		}
	],

	property: JSON.parse(localStorage.getItem('property'))
};

//TODO: Create Footer
//TODO: didmounth call server for images of hotels, houses, and apartments

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	setProperty = property => {
		this.setState({ property: property });
		localStorage.setItem('property', JSON.stringify(property));
	};

	render() {
		const {
			isSignedIn,
			properties,
			links,
			menuList,
			property
		} = this.state;
		return (
			<Router>
				<NavBar
					links={links}
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
											properties
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
											properties
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
											properties
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
							/>
						)}
					/>
				</Switch>
			</Router>
		);
	}
}

export default App;
