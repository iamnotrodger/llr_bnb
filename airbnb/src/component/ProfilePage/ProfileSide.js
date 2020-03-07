import React, { useState } from 'react';

const ProfileSide = ({ user }) => {
	const [edit, setEdit] = useState({
		edit: false
	});
	return (
		<div className='sideContainerx'>
			<div className='profileImg'>
				<div className='profile'>
					<img
						src='https://a0.muscache.com/defaults/user_pic-225x225.png?v=3'
						alt='Profile'
					/>
				</div>
			</div>
			<div className='lineMargin'>
				<div className='lml'></div>
			</div>
			<div className='sideContent'>
				<div>
					<input
						className='profileInput'
						readOnly={edit}
						type='text'
						name='lastName'
						value={user.lastName}
					/>
					<input
						className='profileInput'
						readOnly={edit}
						type='text'
						name='firstName'
						value={user.firstName}
					/>
					<input
						className='profileInput'
						readOnly={edit}
						type='text'
						name='email'
						value={user.email}
					/>
					<input
						className='profileInput'
						readOnly={edit}
						type='text'
						name='phone'
						value={user.phone}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProfileSide;
