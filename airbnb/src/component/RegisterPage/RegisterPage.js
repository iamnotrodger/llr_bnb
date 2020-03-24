import React, { useState, useEffect } from 'react';
import TabsControl from '../ReactTab/ReactTab.js';
import GuestInput from './GuestInput/GuestInput';
import EmployeeInput from './EmployeeInput/EmployeeInput';
import PropertyInput from '../PropertyInput/PropertyInput';
import './RegisterPage.css';

const RegisterPage = () => {
	const [inputValue, setInputValue] = useState({
		firstName: '',
		lastName: '',
		email: '',
		address: '',
		phoneNum: ''
	});
	const [propertyInput, setPropertyInput] = useState({
		property_type: '',
		title: '',
		address: '',
		country: '',
		hid: localStorage.getItem('user').hid
	});
	const [price, setPrice] = useState({
		guest: 0,
		price: 0,
		rule: ''
	});
	const [rooms, setRooms] = useState({
		bed: 0,
		washroom: 0
	});
	const [registerHost, setRegisterHost] = useState(false);
	const [registerEmployee, setRegisterEmployee] = useState(false);

	useEffect(() => {
		if (!registerHost) {
			setRegisterHost(true);
		}
	}, [propertyInput, price, rooms, registerHost]);

	const onChange = event => {
		const { name, value } = event.target;
		console.log(name, ':', value);
		setInputValue({ ...inputValue, [name]: value });
	};

	const onPropertyChange = (name, value) => {
		setPropertyInput({ ...propertyInput, [name]: value });
	};

	const onRoomsChange = (name, value) => {
		setRooms({ ...rooms, [name]: value });
	};

	const onPriceChange = (name, value) => {
		setPrice({ ...price, [name]: value });
	};

	const handleButtonSubmit = async () => {
		if (registerHost) {
			try {
				await hostRegister(propertyInput, rooms, price);
			} catch (err) {
				console.log(err);
			}
		} else if (registerEmployee) {
			console.log('Employee Register');
		} else {
			console.log('Guest Register');
		}
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
						<div name='User Info'>
							<GuestInput
								onChange={
									onChange
								}
							/>
						</div>
						<div name='Add Property'>
							<PropertyInput
								onPropertyChange={
									onPropertyChange
								}
								onPriceChange={
									onPriceChange
								}
								onRoomsChange={
									onRoomsChange
								}
							/>
						</div>
						<div name='Employee'>
							<EmployeeInput />
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

const hostRegister = async (propertyInput, rooms, price) => {
	let roomsOne = () => {
		let rooms = [];
		for (let i = 0; i < rooms.bed; i++) {
			let tempRoom = {
				room_type: 'bedroom',
				bed_num: 1
			};
			rooms.push(tempRoom);
		}

		for (let i = 0; i < rooms.washroom; i++) {
			let tempRoom = {
				room_type: 'washroom',
				bed_num: 1
			};
			rooms.push(tempRoom);
		}

		return rooms;
	};
};

export default RegisterPage;
