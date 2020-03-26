import React, { useState } from 'react';

const ProfileSide = ({ user }) => {
	const [edit, setEdit] = useState(true);
	const [InputStyle, setInputStyle] = useState('profileInput');
	const [User, setUser] = useState(user);

	const onEditClick = () => {
		setEdit(!edit);
		setInputStyle('');
	};

	const onChange = e => {
		const { name, value } = e.target;
		setUser({ ...User, [name]: value });
	};

	//TODO: talk to API to update the user information
	//This function doesn't belong here, should be in the APP class
	//TODO: if one of the propery is empty, cancel
	const updateProfile = () => {
		console.log('Submit Changes');
		console.log(User);
	};

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
						style={{ width: '100%' }}
						className={InputStyle}
						readOnly={edit}
						type='text'
						name='firstName'
						value={User.firstName}
						onChange={onChange}
					/>
					<input
						style={{ width: '100%' }}
						className={InputStyle}
						readOnly={edit}
						type='text'
						name='lastName'
						value={User.lastName}
						onChange={onChange}
					/>
					<input
						style={{ width: '100%' }}
						className={InputStyle}
						readOnly={edit}
						type='text'
						name='email'
						value={User.email}
						onChange={onChange}
					/>

					<input
						style={{ width: '100%' }}
						className={InputStyle}
						readOnly={edit}
						type='text'
						name='phone'
						value={User.phone}
						onChange={onChange}
					/>
				</div>

				<div>
					<button
						type='submit'
						name='edit'
						className='editButton'
						onClick={onEditClick}
					>
						edit profile
					</button>

					{!edit ? (
						<button
							type='submit'
							name='submit'
							className='submitChange'
							onClick={updateProfile}
						>
							Submit
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default ProfileSide;
