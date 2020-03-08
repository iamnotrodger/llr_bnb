import React from 'react';
import PropertyMap from './PropertyMap';
import './PropertyList.css';

const PropertyList = ({ properties, type, setProperty }) => {
	return (
		<div className='list'>
			<h2>{type}</h2>
			<PropertyMap
				properties={properties}
				setProperty={setProperty}
			/>
			<span>Show All ></span>
		</div>
	);
};

export default PropertyList;
