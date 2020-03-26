import React from 'react';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
	return (
		<div className='reviewList'>
			<div className='reviewContainer'>
				{reviews.map((review, i) => {
					return (
						<ReviewItem
							key={i}
							id={i}
							username={
								review.username
							}
							rating={review.rating}
							date={review.date}
							comment={review.comment}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ReviewList;
