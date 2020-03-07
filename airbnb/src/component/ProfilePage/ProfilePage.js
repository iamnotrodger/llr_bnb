import React from 'react';
import ProfileSide from './ProfileSide';
import './ProfilePage.css';

const ProfilePage = () => {
	// const [onProfile, setOnProfile] = useState({
	// 	onProfile: true
	// });
	const dummyUser = {
		firstName: 'Rodger',
		lastName: 'Retanal',
		email: 'rodger@email.com',
		phone: '420-666-6969',
		joined: '2020'
	};

	return (
		<div className='profileContainer'>
			<div className='profileSide'>
				<ProfileSide user={dummyUser} />
			</div>
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
