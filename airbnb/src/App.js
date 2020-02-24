import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import PropertyList from './component/Property/PropertyList/PropertyList';
import About from './component/About/About';

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
		{ label: 'Become a host', link: '/' },
		{ label: 'About', link: '/about' }
	],

	property: {}
};

//TODO: Create Footer
//TODO: didmounth call server for images of hotels, houses, and apartments

class App extends Component {
	constructor() {
		super();
		this.state = initialState;
	}

	handlePropertyClick = property => {
		// debugger;
		this.setState({ property: property });
		console.log(property);
	};

	render() {
		const { properties, links } = this.state;
		return (
			<Router>
				<div>
					<NavBar links={links} />
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
										handlePropertyClick={
											this
												.handlePropertyClick
										}
									/>
									<PropertyList
										properties={
											properties
										}
										type={
											'House'
										}
										handlePropertyClick={
											this
												.handlePropertyClick
										}
									/>
									<PropertyList
										properties={
											properties
										}
										type={
											'Apartment'
										}
										handlePropertyClick={
											this
												.handlePropertyClick
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
				</div>
			</Router>
		);
	}
}

export default App;
