import React from 'react';
import TabsControl from '../React-Tab/ReactTab';
import GuestInput from './GuestInput/GuestInput';
import PropertyInput from '../PropertyInput/PropertyInput';
import './RegisterPage.css';

const RegisterPage = () => {
	const handleButtonSubmit = () => {
		console.log('hit that');
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
							<GuestInput />
						</div>
						<div name='Host'>
							<PropertyInput />
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
