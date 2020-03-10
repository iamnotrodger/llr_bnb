import React, { Component } from 'react'
import GuestInput from './GuestInput.js'
import Select from 'react-select';
import './HostInput.css'

const guestOptions = [
    { value: '1', label: '1 guest' },
    { value: '2', label: '2 guests' },
    { value: '3', label: '3 guests' },
    { value: '4', label: '4 guests' },
    { value: '5', label: '5 guests' }
];

const propTypeOptions = [
    { value: 'Hotel', label: 'Hotel' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' }
];

export class HostInput extends Component {
    render() {
        return (
            <div>
                <GuestInput/>
                <div style={{marginBottom: 10 + 'px'}}></div>
                <Select
                    className='select num-of-guest'
                    defaultValue={guestOptions[0]}
                    options={guestOptions}
                />
                <Select
                    className='select type-of-prop'
                    defaultValue={propTypeOptions[0]}
                    options={propTypeOptions}
                />
            </div>
        )
    }
}

export default HostInput
