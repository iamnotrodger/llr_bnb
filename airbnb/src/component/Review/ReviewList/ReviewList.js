import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import ReviewItem from '../ReviewItem/ReviewItem';
import './ReviewList.css';

const ReviewList = ({ reviews }) => {
	return (
		<div className='reviewList'>
			<div className='reviewHeader'>
				<h2>Reviews</h2>
				<div className='rhc'>
					<div className='rhi'>
						<StarRatingComponent
							editing={false}
							starCount={1}
							starColor={'#00A699'}
							value={1}
						/>
						<h3>3.25</h3>
					</div>
					<div className='rhi'>
						<h3>{reviews.length}</h3>
						<span>reviews</span>
					</div>
				</div>

				<div className='lineMargin'>
					<div className='lml'></div>
				</div>
			</div>
			<div className='reviewContainer'>
				{reviews.map((review, i) => {
					return (
						<ReviewItem
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
