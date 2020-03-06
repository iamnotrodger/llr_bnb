import React from 'react';
import { Link } from 'react-router-dom';
import OutsideAlerter from './OutsideAlerter';
import './NavBar.css';

const ProfileMenu = ({ toggleMenu }) => {
	return (
		<OutsideAlerter toggleMenu={toggleMenu}>
			<div className='profile-container'>
				<div className='_1yvjit1'>
					<div className='profile-menu'>
						<ul>
							<li>
								<div className='profile-item'>
									<Link to='/profile'>
										<div>
											Profile
										</div>
									</Link>
								</div>
							</li>

							<li>
								<div className='profile-item'>
									<Link to='/login'>
										<div>
											Login
										</div>
									</Link>
								</div>
							</li>

							<li>
								<div className='profile-item'>
									<Link to='/register'>
										<div>
											Register
										</div>
									</Link>
								</div>
							</li>

							<li>
								<div className='profile-item'>
									<div>
										Log
										out
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</OutsideAlerter>
	);
};

export default ProfileMenu;
