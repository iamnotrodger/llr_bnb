import React from 'react';
import './PropertyItem.css';
import StarRatingComponent from 'react-star-rating-component';

const PropertyItem = ({ property, handlePropertyClick }) => {
	//TODO: add onClick function that would take you to the selected property page
	//TODO: add image
	return (
		<div className='property'>
			{/* <img
				alt='robots'
				src={`https://robohash.org/${id}?100x100`}
			/> */}
			<div onClick={() => handlePropertyClick(property)}>
				<h3> {property.location} </h3>
				<h2> {property.title} </h2>
				<p> {`$${property.price} CAD/night`}</p>

				<div style={{ fontSize: '15px' }}>
					<StarRatingComponent
						name={property.id}
						editing={false}
						starCount={5}
						starColor={'#00A699'}
						value={property.rating}
					/>
				</div>
			</div>
		</div>
	);
};

export default PropertyItem;
