import React from 'react';
import PropertyItem from '../PropertyItem/PropertyItem';
import './PropertyList.css';

const PropertyList = ({ properties, type, setProperty }) => {
	return (
		<div className='list'>
			<h2>{type}</h2>
			<div className='propertyContainer'>
				{properties.map((property, i) => {
					return (
						<PropertyItem
							key={i}
							property={property}
							setProperty={
								setProperty
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
