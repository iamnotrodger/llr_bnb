import React from 'react';
import PropertyItem from '../PropertyItem/PropertyItem';

const PropertyMap = ({ properties, setProperty }) => {
	return (
		<div className='propertyContainer'>
			{properties.map((property, i) => {
				return (
					<PropertyItem
						key={i}
						property={property}
						setProperty={setProperty}
					/>
				);
			})}
		</div>
	);
};

export default PropertyMap;
