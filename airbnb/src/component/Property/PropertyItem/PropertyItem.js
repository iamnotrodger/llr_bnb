import React from 'react';
import { useHistory } from 'react-router-dom';
import './PropertyItem.css';
import StarRatingComponent from 'react-star-rating-component';

const PropertyItem = ({ property, setProperty }) => {
	//TODO: add onClick function that would take you to the selected property page
	//TODO: add image

	const history = useHistory();

	const handleClick = property => {
		setProperty(property);
		history.push('/property');
	};

	return (
		<div className='property'>
			{/* <img
				alt='robots'
				src={`https://robohash.org/${id}?100x100`}
			/> */}
			<div onClick={() => handleClick(property)}>
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
