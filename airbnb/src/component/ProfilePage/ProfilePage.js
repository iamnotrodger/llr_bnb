import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileSide from './ProfileSide';
import './ProfilePage.css';

const user = {
	firstName: 'Rodger',
	lastName: 'Retanal',
	email: 'rodger@email.com',
	phone: '420-666-6969',
	joined: '2020'
};

const ProfilePage = () => {
	const [profileList, setProffileList] = useState([
		{
			label: 'Reviews',
			link: '/profile/reviews'
		},
		{
			label: 'History',
			link: '/profile/past-booking'
		}
	]);

	const provileNav = profileList.map((link, i) => {
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
					<div className='guestContent'>
						Guest Content
					</div>
					<div className='hostContent'>
						Host Content (if applicable)
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfilePage;
