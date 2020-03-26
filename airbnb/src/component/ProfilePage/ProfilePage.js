import React, { useState, useEffect } from 'react';
import { Route, Link, useParams } from 'react-router-dom';
import ProfileSide from './ProfileSide';
import PropertyMap from '../Property/PropertyList/PropertyMap';
import ReviewList from '../Review/ReviewList/ReviewList';
import './ProfilePage.css';

const dummyProperties = [
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

const dummyReviews = [
	{
		id: 1,
		username: 'Dummy 1',
		rating: 4.5,
		date: 'Febuary 2020',
		comment:
			'Officia laborum ad consectetur deserunt consectetur veniam velit consequat exercitation sint adipisicing ipsum in consequat. Minim ea id elit ad veniam reprehenderit. Minim occaecat eiusmod mollit enim excepteur veniam voluptate. Nulla anim excepteur eiusmod ipsum est consectetur laborum.'
	},
	{
		id: 2,
		username: 'Dummy 2',
		rating: 2,
		date: 'March 2020',
		comment:
			'Est reprehenderit eu tempor et excepteur dolor. Eu aliqua culpa dolore in sint reprehenderit laborum nisi amet ullamco. Minim ipsum aliqua consequat ea occaecat. Quis magna reprehenderit mollit exercitation occaecat amet esse elit consectetur esse magna. Et proident est labore cupidatat velit ea Lorem esse commodo cupidatat. Ipsum Lorem culpa ea fugiat anim ea. Ad nisi cillum sit excepteur reprehenderit sint.'
	},
	{
		id: 3,
		username: 'Dummy 1',
		rating: 4.5,
		date: 'Febuary 2020',
		comment:
			'Officia laborum ad consectetur deserunt consectetur veniam velit consequat exercitation sint adipisicing ipsum in consequat. Minim ea id elit ad veniam reprehenderit. Minim occaecat eiusmod mollit enim excepteur veniam voluptate. Nulla anim excepteur eiusmod ipsum est consectetur laborum.'
	},
	{
		id: 4,
		username: 'Dummy 1',
		rating: 4.5,
		date: 'Febuary 2020',
		comment:
			'Officia laborum ad consectetur deserunt consectetur veniam velit consequat exercitation sint adipisicing ipsum in consequat. Minim ea id elit ad veniam reprehenderit. Minim occaecat eiusmod mollit enim excepteur veniam voluptate. Nulla anim excepteur eiusmod ipsum est consectetur laborum.'
	}
];

const linkList = [
	{
		role: 'Guest',
		label: 'Reviews',
		link: '/profile/reviews'
	},
	{
		role: 'Guest',
		label: 'History',
		link: '/profile/past-booking'
	},
	{
		role: 'Host',
		label: 'Rental Agreement',
		link: '/profile/rental-agreement'
	},
	{
		role: 'Host',
		label: 'Property',
		link: '/profile/owned-property'
	}
];

const ProfilePage = ({ user, isHost }) => {
	//TODO: get reveiws, past reservation, rental agreement, owned properties
	//These are Hooks for using states in a function.
	const [reviews, setReviews] = useState([]);
	const [reservation, setReservation] = useState([]);
	const [rentalAgreements, setRentalAgreements] = useState([]);
	const [ownedProperties, setOwnedProperties] = useState([]);
	const { id } = useParams();

	//Lifecycle Method (Hook) much like componentWillMount
	useEffect(() => {
		console.log(id);
	}, [id]);

	//Will filter out Depending on the type of user
	const filteredList = !isHost
		? linkList.filter(link => {
				return link.role !== 'Host';
		  })
		: linkList;

	const provileNav = filteredList.map((link, i) => {
		return (
			<li key={i}>
				<Link to={link.link}>
					<div className='profileLink'>
						{link.label}
					</div>
				</Link>
			</li>
		);
	});

	return (
		<div className='profileContainer'>
			<div className='profileSide'>
				<ProfileSide user={user} />
			</div>
			<div className='profileContent'>
				<div className='profileHeader'>
					<div className='headerContent'>
						<h2>{`Hi, I'm ${user.firstName}`}</h2>
						<p>{`Joined in ${user.joined}`}</p>
					</div>
					<div className='profileNav'>
						<div className='profileLinkList'>
							<ul>{provileNav}</ul>
						</div>
						<div className='lml'></div>
					</div>
				</div>
				<div className='profileMain'>
					<Route
						path='/profile/reviews'
						component={props => (
							<ReviewList
								{...props}
								reviews={
									dummyReviews
								}
							/>
						)}
					/>

					<Route
						path='/profile/past-booking'
						component={props => (
							<PropertyMap
								{...props}
								properties={
									dummyProperties
								}
							/>
						)}
					/>

					<Route path='/profile/rental-agreements' />

					<Route
						path='/profile/owned-property'
						component={props => (
							<PropertyMap
								{...props}
								properties={
									dummyProperties
								}
							/>
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
