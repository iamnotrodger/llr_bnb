import React, { useState, useEffect } from 'react';
import PropertyInput from '../PropertyInput/PropertyInput';
import './AddPropertyPage.css';

const AddPropertyPage = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	const [propertyInput, setPropertyInput] = useState({
		property_type: '',
		title: '',
		address: '',
		country: '',
		hid: user.hid
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
	const [succ, setSucc] = useState(false);
	const [error, setError] = useState(false);
	const [registerHost, setRegisterHost] = useState(false);

	useEffect(() => {
		setPropertyInput({
			property_type: '',
			title: '',
			address: '',
			country: '',
			hid: null
		});
		setPrice({
			guest: 0,
			price: 0,
			rule: ''
		});
		setRooms({
			bed: 0,
			washroom: 0
		});
		setError(false);
	}, [succ]);

	const propertySubmit = async () => {
		let roomsOne = createRooms(rooms.bed, rooms.washroom);
		try {
			if (propertyInput.hid) {
				console.log('!');
				await fetch(
					'http://localhost:3000/api/property/add-property',
					{
						method: 'post',
						headers: {
							'Content-Type':
								'application/json'
						},
						body: JSON.stringify({
							property: propertyInput,
							rooms: roomsOne,
							pricing: price
						})
					}
				);
				setSucc(true);
			} else if (user.uid) {
				console.log('!!');
				const response = await fetch(
					'http://localhost:3000/api/host-register',
					{
						method: 'post',
						headers: {
							'Content-Type':
								'application/json'
						},
						body: JSON.stringify({
							uid: localStorage.getItem(
								'user'
							).uid,
							property: propertyInput,
							rooms: rooms,
							pricing: price
						})
					}
				);
				const user = await response.json();
				localStorage.setItem(
					'user',
					JSON.stringify(user)
				);
				setSucc(true);
				setRegisterHost(true);
			} else {
				console.log('Error');
				setError(true);
			}
		} catch (err) {
			console.log(err);
			setError(true);
		}
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

	const ErrorMessage = error ? <div>Something went wrong.</div> : null;
	const SuccMessage = succ ? (
		<div>Property Addition Successful.</div>
	) : null;
	const RegisterHostMessage = registerHost ? (
		<div>You have been registered as a host.</div>
	) : null;

	return (
		<div className='add-prop-page'>
			<PropertyInput
				className='add-prop-input'
				onPropertyChange={onPropertyChange}
				onPriceChange={onPriceChange}
				onRoomsChange={onRoomsChange}
			/>
			<div>
				<button
					className='submitButton'
					onClick={propertySubmit}
				>
					Submit
				</button>
				{ErrorMessage}
				{SuccMessage}
				{RegisterHostMessage}
			</div>
		</div>
	);
};

const createRooms = (numBedrooms, numWashroom) => {
	let rooms = [];
	for (let i = 0; i < numBedrooms; i++) {
		let tempRoom = {
			room_type: 'bedroom',
			bed_num: 1
		};
		rooms.push(tempRoom);
	}

	for (let i = 0; i < numWashroom; i++) {
		let tempRoom = {
			room_type: 'washroom',
			bed_num: 1
		};
		rooms.push(tempRoom);
	}

	return rooms;
};

export default AddPropertyPage;
