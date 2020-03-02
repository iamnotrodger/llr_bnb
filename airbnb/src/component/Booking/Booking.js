import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';
import StarRatingComponent from 'react-star-rating-component';
import 'react-dates/lib/css/_datepicker.css';
import './Booking.css';

// https://www.youtube.com/watch?v=OOHf5kl1ne0

class Booking extends Component {
	constructor() {
		super();
		this.state = {
			startDate: null,
			endDate: null,
			numDays: 0,
			total: 0,
			unavailableDays: [
				'2020-03-07',
				'2020-03-08',
				'2020-03-09',
				'2020-03-11',
				'2020-03-12'
			]
		};
	}

	//Sets the unavailable dates in the calendar.
	isBlocked = day => {
		return this.state.unavailableDays.some(unavailableDay =>
			moment(unavailableDay).isSame(day, 'day')
		);
	};

	// Returns true if the range of dates contains unavailable dates.
	checkForBlockedDates = (start, end, dates) => {
		const dateFormat = 'YYYY-MM-DD';
		const diff = moment(end).diff(start, 'days') + 1;
		for (let i = 0; i < diff; i++) {
			const checkDate = moment(start)
				.add(i, 'd')
				.format(dateFormat);
			if (dates.find(day => day === checkDate)) {
				return true;
			}
			// if (dates[checkDate] && dates[checkDate].blocked) {
			// 	return true;
			//       }
		}
		return false;
	};

	setDateAndDays = (startDate, endDate) => {
		let numDays = 0;
		if (startDate != null && endDate != null) {
			if (
				this.checkForBlockedDates(
					startDate.toDate(),
					endDate.toDate(),
					this.state.unavailableDays
				)
			) {
				return;
			}
			numDays =
				moment(endDate.toDate()).diff(
					startDate.toDate(),
					'days'
				) + 1;
		}

		this.setState({
			startDate,
			endDate,
			numDays,
			total: numDays * this.props.price
		});
	};

	onSubmitReserve = () => {
		console.log('Reserve');
	};

	render() {
		const { price } = this.props;
		const { total } = this.state;
		return (
			<div className='bookingContainer'>
				<div className='bookingHeader'>
					<div>
						<h3>{`$${price}`}</h3>
						<span>per night</span>
					</div>
					<div>
						<StarRatingComponent
							editing={false}
							starCount={1}
							starColor={'#00A699'}
							value={1}
						/>
						<span>3.25</span>
						<span>(2 reviews)</span>
					</div>

					<div className='lineMargin'>
						<div className='lml'></div>
					</div>
				</div>
				<div className='bookingDate'>
					<div>
						<lable>Dates</lable>
					</div>
					<DateRangePicker
						startDate={this.state.startDate} // momentPropTypes.momentObj or null,
						startDateId='your_unique_start_date_id' // PropTypes.string.isRequired,
						endDate={this.state.endDate} // momentPropTypes.momentObj or null,
						endDateId='your_unique_end_date_id' // PropTypes.string.isRequired,
						onDatesChange={({
							startDate,
							endDate,
							dates
						}) =>
							this.setDateAndDays(
								startDate,
								endDate,
								dates
							)
						} // PropTypes.func.isRequired,
						focusedInput={
							this.state.focusedInput
						} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
						onFocusChange={focusedInput =>
							this.setState({
								focusedInput
							})
						} // PropTypes.func.isRequired,
						numberOfMonths={1}
						isDayBlocked={this.isBlocked}
						minimumNights={0}
						showClearDates={true}
					/>

					<div className='lineMargin'>
						<div className='lml'></div>
					</div>
				</div>

				<div className='bookingPrice'>
					<span>{`$${price} x ${this.state.numDays} nights`}</span>
					<span>{`$${total}`}</span>
					<div className='lineMargin'>
						<div className='lml'></div>
					</div>
				</div>

				<div>
					<button
						type='submit'
						className='submitButton'
						onClick={this.onSubmitReserve}
					>
						Reserve
					</button>
				</div>
			</div>
		);
	}
}

export default Booking;
