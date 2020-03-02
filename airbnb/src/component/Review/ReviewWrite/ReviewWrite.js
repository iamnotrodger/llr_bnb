import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './ReviewWrite.css';

class ReviewWrite extends Component {
	constructor() {
		super();
		this.state = {
			communication: 5,
			cleanliness: 5,
			value: 5,
			comment: ''
		};
	}

	onStarClick = (nextValue, prevValue, name) => {
		this.setState({ [name]: nextValue });
	};

	renderStarRating(rating, name) {
		const nameCapitalized =
			name.charAt(0).toUpperCase() + name.slice(1);
		return (
			<div className='ratingComponent'>
				<p>{nameCapitalized}</p>
				<StarRatingComponent
					name={name}
					starCount={5}
					starColor={'#00A699'}
					value={rating}
					onStarClick={this.onStarClick.bind(
						this
					)}
				/>
				<p>{rating}</p>
			</div>
		);
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleKeyPress = e => {
		if (e.keyCode === 8) {
			this.setState({
				comment: this.state.comment.substring(
					0,
					this.state.comment.length - 1
				)
			});
		}
	};

	onSubmitReview = () => {
		console.log('submit review');
	};

	render() {
		const {
			communication,
			cleanliness,
			value,
			comment
		} = this.state;
		return (
			<div>
				<h2>Write Review</h2>
				<div>
					<div className='ratingContainer'>
						{this.renderStarRating(
							communication,
							'communication'
						)}
						{this.renderStarRating(
							cleanliness,
							'cleanliness'
						)}
						{this.renderStarRating(
							value,
							'value'
						)}
					</div>

					<div className='commentContainer'>
						<textarea
							className='commentComponent'
							name='comment'
							value={comment}
							placeholder='Write Comment...'
							maxLength={140}
							onChange={this.onChange}
						/>
					</div>
					<div className='reviewSubmitContainer'>
						<button
							className='reviewSubmitbtn'
							onClick={
								this
									.onSubmitReview
							}
							type='submit'
						>
							Submit
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ReviewWrite;
