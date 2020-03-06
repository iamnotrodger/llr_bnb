import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
	const [onProfile, setOnProfile] = useState({
		onProfile: true
	});
	return (
		<div className='profileContainer'>
			<div className='profileImg'>Profile Image</div>
			<div className='profileContent'>
				<h2>Profile Page</h2>
				<div className='profileHeader'>
					ProfileHeader
					<div>
						Toggle Between Guest & Host (if
						applicable)
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
