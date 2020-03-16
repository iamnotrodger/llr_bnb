import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ loadUser }) => {
	const [inputValue, setInputValue] = useState({
		email: '',
		password: ''
	});
	//TODO: make this error styling more responsive
	const [errorStyle, setErrorStyle] = useState({});
	const history = useHistory();

	const onChange = event => {
		const { name, value } = event.target;
		setInputValue({ ...inputValue, [name]: value });
	};

	const handleButtonSubmit = async event => {
		event.preventDefault();
		if (
			inputValue.email.length === 0 ||
			inputValue.password.length === 0
		) {
			setErrorStyle({
				...errorStyle,
				border: '1px solid red'
			});
			return;
		}
		try {
			const response = await fetch(
				'http://localhost:3000/api/login',
				{
					method: 'post',
					headers: {
						'Content-Type':
							'application/json'
					},
					body: JSON.stringify({
						email: inputValue.email,
						password: inputValue.password
					})
				}
			);
			const data = await response.json();
			if (data.uid) {
				loadUser(data);
				history.push('/');
			} else {
				setErrorStyle({
					...errorStyle,
					border: '1px solid red'
				});
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='login-page'>
			<div className='login-box'>
				<form onSubmit={handleButtonSubmit} noValidate>
					<p className='login-title'>
						Welcome to LLB
					</p>
					<div>
						<input
							style={errorStyle}
							className='login-input'
							name='email'
							type='email'
							value={inputValue.email}
							placeholder='Email'
							onChange={onChange}
							required
						/>
					</div>
					<div>
						<input
							style={errorStyle}
							className='login-input'
							name='password'
							type='password'
							value={
								inputValue.password
							}
							placeholder='Password'
							onChange={onChange}
							required
						/>
					</div>
					<div>
						<Link to='/register'>
							<p className='login-register-hint'>
								Don't have an
								account?
							</p>
						</Link>
					</div>

					<div>
						<button
							type='submit'
							className='submitButton'
							onClick={
								handleButtonSubmit
							}
						>
							Login
						</button>
					</div>
				</form>
			</div>
			<div className='login-background'>
				<img
					className='login-img'
					alt='background'
					src='https://images.squarespace-cdn.com/content/v1/5ae09b9cee17598796bf0561/1550011924213-C1XWZQK9HYNNPUKCV2HW/ke17ZwdGBToddI8pDm48kFrPwftsEnVJnMrFLVbMqtJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0gycmlYrUNOm5FlGNDjMZJivtP_8QmpAdw116-3ob1oTjc7unw2RKrjuCiMWmcwGEQ/image-asset.jpeg?format=2500w'
				/>
			</div>
		</div>
	);
};

export default LoginPage;
