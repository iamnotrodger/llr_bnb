import React, { Component } from "react";
import "react-dates/initialize";
import moment from "moment";
import { DateRangePicker } from "react-dates";
import StarRatingComponent from "react-star-rating-component";
import "react-dates/lib/css/_datepicker.css";
import "./Booking.css";

class Booking extends Component {
        constructor() {
                super();
                this.state = {
                        startDate: null,
                        endDate: null,
                        numDays: 0,
                        total: 0,
                        succ: false,
                        error: false
                };
        }

        //Sets the unavailable dates in the calendar.
        isBlocked = (day) => {
                return this.props.unavailableDates.some((unavailableDay) =>
                        moment(unavailableDay).isSame(day, "day")
                );
        };

        // Returns true if the range of dates contains unavailable dates.
        checkForBlockedDates = (start, end, dates) => {
                const dateFormat = "YYYY-MM-DD";
                const diff = moment(end).diff(start, "days") + 1;
                for (let i = 0; i < diff; i++) {
                        const checkDate = moment(start)
                                .add(i, "d")
                                .format(dateFormat);
                        if (dates.find((day) => day === checkDate)) {
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
                                        this.props.unavailableDates
                                )
                        ) {
                                return;
                        }
                        numDays =
                                moment(endDate.toDate()).diff(
                                        startDate.toDate(),
                                        "days"
                                ) + 1;
                }

                this.setState({
                        startDate,
                        endDate,
                        numDays,
                        total: numDays * this.props.price
                });
        };

        onSubmitReserve = async () => {
                const { gid, prid } = this.props;
                const { startDate, endDate } = this.state;
                try {
                        if (startDate === null || endDate === null) {
                                throw Error(
                                        "One or both of the dates are null"
                                );
                        }

                        const response = await fetch(
                                "http://localhost:3000/api/rental/add-rental-agreement",
                                {
                                        method: "post",
                                        headers: {
                                                "Content-Type":
                                                        "application/json"
                                        },
                                        body: JSON.stringify({
                                                gid: gid,
                                                prid: prid,
                                                start_date: startDate.toDate(),
                                                end_date: endDate.toDate()
                                        })
                                }
                        );

                        if (response.ok) {
                                this.setState({ succ: true });
                                return;
                        }
                        throw Error("Booking was not reserved.");
                } catch (err) {
                        console.log(err);
                        this.setState({ error: true });
                }
        };

        render() {
                const { rating, price, numRev, succ, error } = this.props;
                const { total } = this.state;
                const ErrorMessage = error ? (
                        <div className='error-message'>
                                Something went wrong.
                        </div>
                ) : null;
                const SuccMessage = succ ? (
                        <div className='succ-message'>
                                Property Addition Successful.
                        </div>
                ) : null;
                return (
                        <div className='bookingContainer'>
                                <div className='bookingHeader'>
                                        <div>
                                                <h3>{`$${price}`}</h3>
                                                <span>per night</span>
                                        </div>
                                        <div>
                                                <StarRatingComponent
                                                        name='displayStar'
                                                        editing={false}
                                                        starCount={1}
                                                        starColor={"#00A699"}
                                                        value={1}
                                                />
                                                <span>{rating}</span>
                                                <span>{`${numRev} reviews`}</span>
                                        </div>

                                        <div className='lineMargin'>
                                                <div className='lml'></div>
                                        </div>
                                </div>
                                {ErrorMessage}
                                {SuccMessage}
                                <div className='bookingDate'>
                                        <div>
                                                <label>Dates</label>
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
                                                onFocusChange={(focusedInput) =>
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
                                                onClick={this.onSubmitReserve}>
                                                Reserve
                                        </button>
                                </div>
                        </div>
                );
        }
}

export default Booking;
