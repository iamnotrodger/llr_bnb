import React from 'react';
import './GuestInput.css';

const GuestInput = ({ onChange, input }) => {
	const {
		firstName,
		lastName,
		email,
		address,
		phone,
		password,
		confirmPassword
	} = input;
	return (
		<div>
			<div>
				<p className='register-title'>
					Personal Information
				</p>
			</div>
			<div>
				<input
					className='login-input register-fn'
					name='firstName'
					type='firstName'
					placeholder='First Name'
					onChange={onChange}
					value={firstName}
				/>
			</div>
			<div>
				<input
					className='login-input register-ln'
					name='lastName'
					type='lastName'
					placeholder='Last Name'
					onChange={onChange}
					value={lastName}
				/>
			</div>
			<div>
				<input
					className='login-input register-addr'
					name='address'
					type='address'
					placeholder='Address'
					onChange={onChange}
					value={address}
				/>
			</div>
			<div>
				<input
					className='login-input register-email'
					name='email'
					type='email'
					placeholder='Email Address'
					onChange={onChange}
					value={email}
				/>
			</div>
			<div>
				<input
					className='login-input register-phone'
					name='phoneNum'
					type='tel'
					placeholder='Phone number'
					onChange={onChange}
					value={phone}
				/>
			</div>
			<div>
				<input
					className='login-input register-pwd'
					name='password'
					type='password'
					placeholder='Password'
					onChange={onChange}
					value={password}
				/>
			</div>
			<div>
				<input
					className='login-input register-pwd'
					name='confirmPassword'
					type='password'
					placeholder='Confirm Password'
					onChange={onChange}
					value={confirmPassword}
				/>
			</div>
			<div style={{ marginBottom: 10 + 'px' }}></div>
		</div>
	);
};

export default GuestInput;
