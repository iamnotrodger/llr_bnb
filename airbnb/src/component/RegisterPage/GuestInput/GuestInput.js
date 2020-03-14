import React, { useState } from 'react';
import './GuestInput.css';

const GuestInput = () => {
	const [inputValue, setInputValue] = useState({
		firstName: '',
		lastName: '',
		email: ''
	});

	const onChange = event => {
		const { name, value } = event.target;
		setInputValue({ ...inputValue, [name]: value });
	};

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
			<div style={{ marginBottom: 10 + 'px' }}></div>
		</div>
	);
};

export default GuestInput;
