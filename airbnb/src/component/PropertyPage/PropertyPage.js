import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ReviewHeader from '../Review/ReviewList/ReviewHeader';
import ReviewList from '../Review/ReviewList/ReviewList';
import ReviewWrite from '../Review/ReviewWrite/ReviewWrite';
import Booking from '../Booking/Booking';
import './PropertyPage.css';

const PropertyPage = () => {
	const { prid } = useParams();
	const { gid } = JSON.parse(localStorage.getItem('user'));
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

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(
					`http://localhost:3000/api/property/${prid}`
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
						prid: prid,
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
					setUnavailableDates(unavailableDates);
					setReview({
						reviews: reviews
					});
					setAverages({
						rating:
							avgs.rating !==
							undefined
								? avgs.rating
								: 0,
						communication:
							avgs.communication !==
							undefined
								? avgs.communication
								: 0,
						cleanliness:
							avgs.cleanliness !==
							undefined
								? avgs.cleanliness
								: 0,
						value: avgs.value
					});
					console.log(
						'Loaded Property Information'
					);
					return;
				}
				throw Error('Unable to get property');
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [prid]);

	return (
		<div className='propertyPage'>
			<div className='propertyContent'>
				<div className='propertyHeader'>
					<h2> {property.title} </h2>
					<p> {property.location} </p>
					<p>{property.hostName}</p>
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
				<div>
					<p>Description</p>
				</div>

				<div className='lineMargin'>
					<div className='lml'></div>
				</div>
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
						length={review.reviews.length}
					/>
					<ReviewList reviews={review.reviews} />
				</div>
				<div>
					<ReviewWrite />
				</div>
			</div>

			<div className='bookingDiv'>
				<div>
					<div
						style={{
							marginTop: '32px',
							marginBottom: '24px'
						}}
					>
						<div className='innerBooking'>
							<Booking
								price={
									property.price
								}
								prid={
									property.prid
								}
								gid={gid}
								numRev={
									review
										.reviews
										.length
								}
								unavailableDates={
									unavailableDates
								}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PropertyPage;
