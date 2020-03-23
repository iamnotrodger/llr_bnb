import React from 'react';
import './GuestInput.css';

const GuestInput = ({ onChange }) => {
	return (
		<div>
			<div>
				<p className='register-title'>Personal Information:</p>
			</div>
			<div>
				<input
					className='login-input register-fn'
					name='firstName'
					type='firstName'
					placeholder='First Name'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-ln'
					name='lastName'
					type='lastName'
					placeholder='Last Name'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-addr'
					name='guest-address'
					type='address'
					placeholder='Address'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-email'
					name='email'
					type='email'
					placeholder='Email Address'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-phone'
					name='phone'
					type='tel'
					placeholder='Phone number'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-pwd'
					name='password'
					type='password'
					placeholder='Password'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-pwd'
					name='confirm-password'
					type='password'
					placeholder='Confirm Password'
					onChange={onChange}
				/>
			</div>
			<div style={{ marginBottom: 10 + 'px' }}></div>
		</div>
	);
};

export default GuestInput;
