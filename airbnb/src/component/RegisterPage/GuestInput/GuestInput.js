import React from 'react';
import './GuestInput.css';

const GuestInput = ({ onChange }) => {
	return (
		<div>
			<div>
				<input
					className='login-input register-fn'
					name='firstName'
					type='name'
					placeholder='First Name'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-ln'
					name='lastName'
					type='name'
					placeholder='Last Name'
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
					className='login-input register-ln'
					name='address'
					type='name'
					placeholder='Address'
					onChange={onChange}
				/>
			</div>
			<div>
				<input
					className='login-input register-ln'
					name='phoneNum'
					type='name'
					placeholder='Phone Number'
					onChange={onChange}
				/>
			</div>
			<div style={{ marginBottom: 10 + 'px' }}></div>
		</div>
	);
};

export default GuestInput;
