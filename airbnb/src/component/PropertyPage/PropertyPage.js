import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import UserContext from '../../UserContext';
import ReviewHeader from '../Review/ReviewList/ReviewHeader';
import ReviewList from '../Review/ReviewList/ReviewList';
import ReviewWrite from '../Review/ReviewWrite/ReviewWrite';
import Booking from '../Booking/Booking';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import LoadSpinner from '../LoadingScreen/LoadSpinner';
import './PropertyPage.css';

const PropertyPage = (props) => {
        const { prid } = useParams();
        const { user } = useContext(UserContext);
        const gid = user ? user.gid : null;
        const [property, setProperty] = useState({
                title: '',
                location: '',
                bedNum: 0,
                washroomNum: 0,
                hostName: ''
        });

        const [price, setPrice] = useState({
                price: 0,
                guestNum: 0
        });

        const [unavailableDates, setUnavailableDates] = useState([]);

        const [review, setReview] = useState({
                reviews: []
        });

        const [averages, setAverages] = useState({
                rating: 0,
                communication: 0,
                cleanliness: 0,
                value: 0
        });

        const [loading, setLoading] = useState(true);
        const [loadingAction, setLoadingAction] = useState(false);

        useEffect(() => {
                const abordController = new AbortController();
                const signal = abordController.signal;
                const fetchData = async () => {
                        try {
                                const PRID = props.match.params.prid;
                                const response = await fetch(
                                        `http://localhost:3000/api/property/${PRID}`,
                                        { signal: signal }
                                );
                                if (response.ok) {
                                        const {
                                                title,
                                                location,
                                                bed_num,
                                                washroom_num,
                                                guest_num,
                                                price,
                                                reviews,
                                                avgs,
                                                unavailableDates,
                                                host_name
                                        } = await response.json();
                                        setProperty({
                                                title: title,
                                                location: location,
                                                bedNum: bed_num,
                                                washroomNum: washroom_num,
                                                hostName: host_name
                                        });
                                        setPrice({
                                                price: price,
                                                guestNum: guest_num
                                        });
                                        if (unavailableDates) {
                                                setUnavailableDates(
                                                        unavailableDates
                                                );
                                        }
                                        setReview({ reviews: reviews });
                                        if (avgs) {
                                                setAverages({
                                                        rating: avgs.rating,
                                                        communication:
                                                                avgs.communication,
                                                        cleanliness:
                                                                avgs.cleanliness,
                                                        value: avgs.value
                                                });
                                        }
                                        setLoading(false);
                                        return;
                                }
                                throw Error('Unable to get property');
                        } catch (err) {
                                console.log(err);
                        }
                };

                fetchData();
                return function cleanup() {
                        abordController.abort();
                };
        }, []);

        return (
                <LoadingScreen loading={loading}>
                        <LoadSpinner loading={loadingAction} />
                        <div className='propertyPage'>
                                <div className='propertyContent'>
                                        <div className='propertyHeader'>
                                                <h2> {property.title} </h2>
                                                <p> {property.location} </p>
                                                <p className='name'>
                                                        {property.hostName}
                                                </p>
                                        </div>
                                        <div className='roomContainer'>
                                                <p>{`${price.guestNum} guest`}</p>
                                                <p>{`${property.bedNum} bedroom`}</p>
                                                <p>{`${property.washroomNum} bathroom`}</p>
                                        </div>

                                        <div className='rcl'>
                                                <div className='lineMargin'>
                                                        <div className='lml'></div>
                                                </div>
                                        </div>

                                        {/* <div className='lineMargin'>
					<div className='lml'></div>
				</div> */}
                                        <div>
                                                <ReviewHeader
                                                        rating={averages.rating}
                                                        communication={
                                                                averages.communication
                                                        }
                                                        cleanliness={
                                                                averages.cleanliness
                                                        }
                                                        value={averages.value}
                                                        length={
                                                                review.reviews
                                                                        .length
                                                        }
                                                />
                                                <ReviewList
                                                        reviews={review.reviews}
                                                />
                                        </div>
                                        <div>
                                                <ReviewWrite
                                                        prid={prid}
                                                        gid={gid}
                                                        setLoading={
                                                                setLoadingAction
                                                        }
                                                />
                                        </div>
                                </div>

                                <div className='bookingDiv'>
                                        <div>
                                                <div
                                                        style={{
                                                                marginTop:
                                                                        '32px',
                                                                marginBottom:
                                                                        '24px'
                                                        }}>
                                                        <div className='innerBooking'>
                                                                <Booking
                                                                        price={
                                                                                price.price
                                                                        }
                                                                        prid={
                                                                                prid
                                                                        }
                                                                        gid={
                                                                                gid
                                                                        }
                                                                        rating={
                                                                                averages.rating
                                                                        }
                                                                        length={
                                                                                review
                                                                                        .reviews
                                                                                        .length
                                                                        }
                                                                        numRev={
                                                                                review
                                                                                        .reviews
                                                                                        .length
                                                                        }
                                                                        unavailableDates={
                                                                                unavailableDates
                                                                        }
                                                                        setLoading={
                                                                                setLoadingAction
                                                                        }
                                                                />
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                        </div>
                </LoadingScreen>
        );
};

export default PropertyPage;
