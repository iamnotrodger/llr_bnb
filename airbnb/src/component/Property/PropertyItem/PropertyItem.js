import React from 'react';
import { Link } from 'react-router-dom';
import './PropertyItem.css';
import StarRatingComponent from 'react-star-rating-component';

const PropertyItem = ({ property }) => {
        let { prid, country, title, price, rating, review_num } = property;
        if (rating === null) {
                rating = 0;
        }
        if (review_num === null) {
                review_num = 0;
        }

        return (
                <div className='property'>
                        <Link to={`/property/${prid}`}>
                                <div>
                                        <h3> {country} </h3>
                                        <h2> {title} </h2>
                                        <p> {`$${price} CAD/night`}</p>

                                        <div
                                                className='reviewRating'
                                                style={{ fontSize: '15px' }}>
                                                <StarRatingComponent
                                                        name='rating'
                                                        editing={false}
                                                        starCount={5}
                                                        starColor={'#00A699'}
                                                        value={rating}
                                                />
                                                <div className='rating no-margin'>
                                                        <p>
                                                                {`(${review_num})`}
                                                        </p>
                                                </div>
                                        </div>
                                </div>
                        </Link>
                </div>
        );
};

export default PropertyItem;
