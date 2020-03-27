import React, { useState } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import './ReviewWrite.css';

const ReviewWrite = ({ prid, gid }) => {
        const [communication, setCommunication] = useState(5);
        const [cleanliness, setCleanliness] = useState(5);
        const [value, setValue] = useState(5);
        const [comment, setComment] = useState('');

        const onChange = (e) => {
                setComment(e.target.value);
        };

        const onSubmitReview = async () => {
                if (comment.length > 0) {
                        try {
                                const response = await fetch(
                                        'http://localhost:3000/api/review/add-review',
                                        {
                                                method: 'post',
                                                headers: {
                                                        'Content-Type':
                                                                'application/json'
                                                },
                                                body: JSON.stringify({
                                                        communication: communication,
                                                        cleanliness: cleanliness,
                                                        value: value,
                                                        comment: comment,
                                                        prid: prid,
                                                        gid: gid
                                                })
                                        }
                                );

                                if (response.ok) {
                                        return;
                                }

                                throw Error('Unable to add review');
                        } catch (err) {
                                console.log(err);
                        }
                }
        };

        const onStarClick = (nextValue, prevValue, name) => {
                if (name === 'communication') {
                        setCommunication(nextValue);
                } else if (name === 'cleanliness') {
                        setCleanliness(nextValue);
                } else if (name === 'value') {
                        setValue(nextValue);
                }
        };

        const renderStarRating = (rating, name) => {
                const nameCapitalized =
                        name.charAt(0).toUpperCase() + name.slice(1);
                return (
                        <div className='ratingComponent'>
                                <div>
                                        <p>{nameCapitalized}</p>
                                </div>
                                <div>
                                        <StarRatingComponent
                                                name={name}
                                                starCount={5}
                                                starColor={'#00A699'}
                                                value={rating}
                                                onStarClick={onStarClick}
                                        />
                                </div>
                                <div>
                                        <p>{rating}</p>
                                </div>
                        </div>
                );
        };

        return (
                <div>
                        <h2>Write Review</h2>
                        <div>
                                <div className='ratingContainer'>
                                        {renderStarRating(
                                                communication,
                                                'communication'
                                        )}

                                        {renderStarRating(
                                                cleanliness,
                                                'cleanliness'
                                        )}
                                        {renderStarRating(value, 'value')}
                                </div>

                                <div className='commentContainer'>
                                        <textarea
                                                className='writeComment'
                                                name='comment'
                                                value={comment}
                                                placeholder='Write Comment...'
                                                maxLength={140}
                                                onChange={onChange}
                                        />
                                </div>
                                <div className='reviewSubmitContainer'>
                                        <button
                                                className='submitButton'
                                                onClick={onSubmitReview}
                                                type='submit'>
                                                Submit
                                        </button>
                                </div>
                        </div>
                </div>
        );
};

export default ReviewWrite;
