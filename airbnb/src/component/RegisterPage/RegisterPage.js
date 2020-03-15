import React, { useState } from 'react';
import TabsControl from '../ReactTab/ReactTab.js';
import GuestInput from './GuestInput/GuestInput';
import PropertyInput from '../PropertyInput/PropertyInput';
import './RegisterPage.css';

const RegisterPage = () => {
	const [inputValue, setInputValue] = useState({
		firstName: '',
		lastName: '',
		email: ''
	});
	const [isHostRegister, setIsHostRegister] = useState(false);
	const [propertyInput, setPropertyInput] = useState({
		propertyType: '',
		guest: 0,
		bed: 0,
		washroom: 0
	});

	const onChange = event => {
		const { name, value } = event.target;
		console.log(name, ':', value);
		setInputValue({ ...inputValue, [name]: value });
	};

	const onSelectChange = (name, value) => {
		console.log(name, ':', value);
		if (!isHostRegister) {
			setIsHostRegister(true);
		}
		setPropertyInput({ ...propertyInput, [name]: value });
	};

	const handleButtonSubmit = () => {
		if (isHostRegister) {
			console.log(propertyInput);
		}
		console.log(inputValue);
	};

	return (
		<div className='register-page'>
			<div className='login-background'>
				<img
					className='login-img'
					alt='background'
					src='https://pacificahousing.ca/wp-content/uploads/2016/11/1213-small-4965.jpg'
				/>
			</div>
			<div className='login-box register-box'>
				<p className='login-title'>Register</p>
				<div className='tabs-container'>
					<TabsControl>
						<div name='Guest'>
							<GuestInput
								onChange={
									onChange
								}
							/>
						</div>
						<div name='Add Property'>
							<PropertyInput
								onChange={
									onSelectChange
								}
							/>
						</div>
					</TabsControl>
				</div>
				<div>
					<button
						className='submitButton'
						onClick={handleButtonSubmit}
					>
						Register
					</button>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
