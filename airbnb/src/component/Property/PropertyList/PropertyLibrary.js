import React from 'react';
import PropertyList from './PropertyList';

const PropertyLibrary = ({
	hotel,
	house,
	apartment,
	setProperty,
	loadAllProperty
}) => {
	return (
		<div>
			<PropertyList
				properties={hotel}
				type={'Hotel'}
				setProperty={setProperty}
				loadAllProperty={loadAllProperty}
			/>
			<PropertyList
				properties={house}
				type={'House'}
				setProperty={setProperty}
				loadAllProperty={loadAllProperty}
			/>
			<PropertyList
				properties={apartment}
				type={'Apartment'}
				setProperty={setProperty}
				loadAllProperty={loadAllProperty}
			/>
		</div>
	);
};

export default PropertyLibrary;
