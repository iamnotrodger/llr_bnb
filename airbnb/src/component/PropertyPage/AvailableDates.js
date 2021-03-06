import React, { Component } from 'react';
import 'react-dates/initialize';
import moment from 'moment';
import { DateRangePicker, DayPickerRangeController } from 'react-dates';

class AvailableDates extends Component {
        constructor() {
                super();
                this.state = {
                        startDate: null,
                        endDate: null,
                        focusedInput: 'startDate'
                };
        }
        isBlocked = (day) => {
                return this.props.unavailableDates.some((unavailableDay) =>
                        moment(unavailableDay).isSame(day, 'day')
                );
        };

        render() {
                const { unavailableDates } = this.props;
                return (
                        <div>
                                <div className='avaialble-tile'>
                                        <h3>Available Dates</h3>
                                </div>
                                <div className='calendar'>
                                        <DayPickerRangeController
                                                numberOfMonths={2}
                                                isDayBlocked={this.isBlocked}
                                                readOnly={true}
                                                isOutsideRange={(day) =>
                                                        moment().diff(day) >= 0
                                                }
                                        />
                                </div>
                        </div>
                );
        }
}

export default AvailableDates;
