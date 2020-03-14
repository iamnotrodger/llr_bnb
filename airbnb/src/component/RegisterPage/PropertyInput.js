import React, { Component } from 'react'
import Select from 'react-select';
import './PropertyInput.css'

const amountOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' }
];

const propTypeOptions = [
    { value: 'Hotel', label: 'Hotel' },
    { value: 'House', label: 'House' },
    { value: 'Apartment', label: 'Apartment' }
];

export class PropertyInput extends Component {
    render() {
        return (
            <div>
                <div className='opt-prop'>
                    <p className='subtitle-prop'>Property type:</p>
                    <Select
                        className='select'
                        placeholder='Select...'
                        options={propTypeOptions}
                    />
                </div>
                <div className='opt-prop'>
                    <p className='subtitle-prop'>Guest(s):</p>
                    <Select
                        className='select'
                        placeholder='Select...'
                        options={amountOptions}
                    />
                </div>
                <div className='opt-prop'>
                    <p className='subtitle-prop'>Bed(s):</p>
                    <Select
                        className='select'
                        placeholder='Select...'
                        options={amountOptions}
                    />
                </div>
                <div className='opt-prop'>
                    <p className='subtitle-prop'>Washroom(s):</p>
                    <Select
                        className='select'
                        placeholder='Select...'
                        options={amountOptions}
                    />
                </div>
            </div>
        )
    }
}

export default PropertyInput
