import React, { useState } from 'react';
import PropertyInput from '../PropertyInput/PropertyInput';
import './AddPropertyPage.css';

const AddPropertyPage = ({ hid }) => {
	const [propertyInput, setPropertyInput] = useState({
		property_type: '',
		title: '',
		address: '',
		country: '',
		hid: hid
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

	const propertySubmit = async () => {};

	return (
		<div className='add-prop-page'>
			<PropertyInput className='add-prop-input' />
			<div>
				<button className='submitButton'>Submit</button>
			</div>
		</div>
	);
};

const createRooms = (numWashroom, numBedrooms) => {};

export default AddPropertyPage;
