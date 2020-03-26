import React from 'react';
import StarRatingComponent from 'react-star-rating-component';

const ReviewHeader = ({
	rating,
	communication,
	cleanliness,
	value,
	length
}) => {
	return (
		<div className='reviewHeader'>
			<h2>Reviews</h2>
			<div className='rhc'>
				<div className='rhi'>
					<StarRatingComponent
						name='displayStar'
						editing={false}
						starCount={1}
						starColor={'#00A699'}
						value={1}
					/>
					<h3>{rating}</h3>
				</div>
				<div className='rhi'>{`${length} reviews`}</div>
			</div>

			<div className='lineMargin'>
				<div className='lml'></div>
			</div>
		</div>
	);
};

export default ReviewHeader;
