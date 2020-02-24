import React from 'react';
import PropertyItem from '../PropertyItem/PropertyItem';
import './PropertyList.css';

const PropertyList = ({ properties, type, handlePropertyClick }) => {
	return (
		<div className='list'>
			<h2>{type}</h2>
			<div className='container'>
				{properties.map((property, i) => {
					return (
						<PropertyItem
							key={i}
							property={property}
							handlePropertyClick={
								handlePropertyClick
							}
						/>
					);
				})}
			</div>
			<span>Show All ></span>
		</div>
	);
};

export default PropertyList;
