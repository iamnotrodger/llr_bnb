import React, { Component } from 'react';
import 'react-dates/initialize';
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
			total: 0
		};
	}

	datediff = (first, second) => {
		return Math.round((second - first) / (1000 * 60 * 60 * 24));
	};

	setDateAndDays = (startDate, endDate) => {
		let numDays = 0;
		if (startDate != null && endDate != null) {
			numDays = this.datediff(
				startDate.toDate(),
				endDate.toDate()
			);
		}

		this.setState({
			startDate,
			endDate,
			numDays,
			total: numDays * this.props.price
		});
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
							endDate
						}) =>
							this.setDateAndDays(
								startDate,
								endDate
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
					>
						Reserve
					</button>
				</div>
			</div>
		);
	}
}

export default Booking;
