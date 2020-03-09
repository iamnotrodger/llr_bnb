import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../2132GLogo_500x500.png';
import ProfileIcon from './ProfileIcon';
import './NavBar.css';

const NavBar = ({ isHost, isSignedIn }) => {
	const links = [
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
		{ role: 'Guest', label: 'About', link: '/about' },
		{
			role: 'Guest',
			label: 'Log in',
			link: '/login'
		}
	];

	const filteredList = isHost
		? links.filter(link => {
				return (
					link.role === 'Host' ||
					link.label === 'About' ||
					(!isSignedIn && link.link === '/login')
				);
		  })
		: links.filter(link => {
				return (
					link.role === 'Guest' ||
					link.label === 'About' ||
					(!isSignedIn && link.link === '/login')
				);
		  });

	const linkMarkup = filteredList.map((link, i) => {
		return (
			<li key={i}>
				<Link to={link.link}>
					<div className='nav-padding'>
						{link.label}
					</div>
				</Link>
			</li>
		);
	});

	return (
		<header id='navbar'>
			<nav>
				<div className='logo nav-items'>
					<Link to='/'>
						<img
							src={logo}
							alt='AirBnB'
							style={{
								height: '55px'
							}}
						/>
					</Link>
				</div>

				<div className='padding'></div>

				<div className='nav-links nav-items'>
					<ul className='nav-menu'>
						{linkMarkup}
						<ProfileIcon
							isSignedIn={isSignedIn}
						/>
					</ul>
				</div>
			</nav>
		</header>
	);
};

export default NavBar;
