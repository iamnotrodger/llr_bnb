import React from 'react';
import { Link } from 'react-router-dom';
import OutsideAlerter from './OutsideAlerter';
import './NavBar.css';

const ProfileMenu = ({ toggleMenu }) => {
	const userID = localStorage.getItem('userID');

	const menuList = [
		{
			role: 'Guest',
			label: 'Profile',
			link: `/profile/${userID}`
		},
		{
			role: 'Guest',
			label: 'Log Out',
			link: '/logout'
		}
	];

	const menuMarkup = menuList.map((link, i) => {
		return (
			<li key={i}>
				<div className='profile-item'>
					<Link to={link.link}>
						<div>{link.label}</div>
					</Link>
				</div>
			</li>
		);
	});
	return (
		<OutsideAlerter toggleMenu={toggleMenu}>
			<div className='profile-container'>
				<div className='_1yvjit1'>
					<div className='profile-menu'>
						<ul>{menuMarkup}</ul>
					</div>
				</div>
			</div>
		</OutsideAlerter>
	);
};

export default ProfileMenu;
