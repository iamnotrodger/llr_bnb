import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../../UserContext";
import PropertyInput from '../PropertyInput/PropertyInput';
import './AddPropertyPage.css';

const propertyInitial = {
	property_type: '',
	title: '',
	address: '',
	country: ''
};

const priceInitial = {
	guest_num: 0,
	price: 0,
	rule: ''
};

const roomInitial = {
	bed: 0,
	washroom: 0
};

const AddPropertyPage = () => {
	const { user, setUser } = useContext(UserContext);
	const uid = user ? user.uid : null;
	const gid = user ? user.gid : null;
	const hid = user ? user.hid : null;
	const [propertyInput, setPropertyInput] = useState(propertyInitial);
	const [price, setPrice] = useState(priceInitial);
	const [rooms, setRooms] = useState(roomInitial);
	const [succ, setSucc] = useState(false);
	const [error, setError] = useState(false);
	const [hostRegistered, setHostRegistered] = useState(false);

	useEffect(() => {
		setPropertyInput(propertyInitial);
		setPrice(priceInitial);
		setRooms(roomInitial);
		setError(false);
	}, [succ, hid, uid]);

	const propertySubmit = async () => {
		console.log(user);
		try {
			if (!propertyValidate(propertyInput, price)) {
				throw Error('Validation Error');
			}
			let roomsOne = createRooms(rooms.bed, rooms.washroom);
			if (hid) {
				delete price.rule;
				const response = await fetch(
					'http://localhost:3000/api/property/add-property',
					{
						method: 'post',
						headers: {
							'Content-Type':
								'application/json'
						},
						body: JSON.stringify({
							property: {
								...propertyInput,
								hid: hid
							},
							rooms: roomsOne,
							pricing: price
						})
					}
				);
				if (response.ok) {
					setSucc(true);
					return;
				}
				console.log(response.json());
				throw Error();
			} else if (uid) {
				const hidNew = await registerHost(
					propertyInput,
					roomsOne,
					price,
					uid
				);
				const newUser = {
					uid: uid,
					gid: gid,
					hid: hidNew
				};
				setUser(newUser);
				setSucc(true);
				setHostRegistered(true);
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

	const ErrorMessage = error ? (
		<div className='error-message'>Something went wrong.</div>
	) : null;
	const SuccMessage = succ ? (
		<div className='succ-message'>
			Property Addition Successful.
		</div>
	) : null;
	const RegisterHostMessage = hostRegistered ? (
		<div className='register-message'>
			You have been registered as a host.
		</div>
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
	console.log(rooms);
	return rooms;
};

const registerHost = async (property, rooms, price, userID) => {
	delete price.rule;
	const response = await fetch(
		'http://localhost:3000/api/host-register',
		{
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				uid: userID,
				property: property,
				rooms: rooms,
				pricing: price
			})
		}
	);
	if (response.ok) {
		console.log(response.json());
		const hid = await response.json();
		return hid;
	}
	throw new Error('Network response was not ok.');
};

const propertyValidate = (property, price) => {
	const { property_type, title, address, country } = property;
	const { guest_num, rule } = price;

	if (property_type.length === 0) {
		return false;
	}

	if (title.length === 0) {
		return false;
	}

	if (address.length === 0) {
		return false;
	}

	if (country.length === 0) {
		return false;
	}

	if (guest_num === 0) {
		return false;
	}

	return true;
};

export default AddPropertyPage;
export { createRooms, registerHost, propertyValidate };
