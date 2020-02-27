import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './ReviewItem.css';

const ReviewItem = ({ id, username, rating, date, comment }) => {
	return (
		<div className='review'>
			<h3>{username}</h3>
			<div
				style={{ fontSize: '15px' }}
				className='reviewRating'
			>
				<StarRatingComponent
					name={id}
					editing={false}
					starCount={5}
					starColor={'#00A699'}
					value={rating}
				/>
				<span>{`(${rating})`}</span>
			</div>
			<p>{date}</p>
			<p className='comment'>{comment}</p>

			<div className='lineMargin'>
				<div className='lml'></div>
			</div>
		</div>
	);
};

export default ReviewItem;
