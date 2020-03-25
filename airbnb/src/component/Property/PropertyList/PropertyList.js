import React from 'react';
import PropertyMap from './PropertyMap';
import './PropertyList.css';

const PropertyList = ({ properties, type, loadAllProperty }) => {
	return (
		<div className='list'>
			<h2>{type}</h2>
			<PropertyMap
				type={type}
				properties={properties}
				loadAllProperty={loadAllProperty}
			/>
			<span onClick={e => loadAllProperty(type)}>
				Show All >
			</span>
		</div>
	);
};

export default PropertyList;
