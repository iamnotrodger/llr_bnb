import React, { Component } from 'react'
import GuestInput from './GuestInput.js'
import Select from 'react-select';

const guestOptions = [
    { value: '1', label: '1 guests' },
    { value: '2', label: '2 guests' }
];

export class HostInput extends Component {
    render() {
        return (
            <div>
                <GuestInput/>
                <Select
                    className="select-guestnum"
                    classNamePrefix="select"
                    defaultValue={guestOptions[0]}
                    name="guestnum"
                    options={guestOptions}
                />
            </div>
        )
    }
}

export default HostInput
