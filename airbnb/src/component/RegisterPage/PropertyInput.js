import React, { Component } from 'react'
import Select from 'react-select';
import './PropertyInput.css'

const amountOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' }
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
                <div>
                    <p className='subtitle-prop'>Property type:</p>
                    <Select
                        className='select type-of-prop'
                        defaultValue={propTypeOptions[0]}
                        options={propTypeOptions}
                    />
                </div>
                <div className='options-prop'>
                    <div>
                        <p className='subtitle-prop'>Number of Guest(s):</p>
                        <Select
                            className='select'
                            defaultValue={amountOptions[0]}
                            options={amountOptions}
                        />
                    </div>
                    <div>
                        <p className='subtitle-prop'>Number of Bed(s):</p>
                        <Select
                            className='select'
                            defaultValue={amountOptions[0]}
                            options={amountOptions}
                        />
                    </div>
                    <div>
                        <p className='subtitle-prop'>Number of Washroom(s):</p>
                        <Select
                            className='select'
                            defaultValue={amountOptions[0]}
                            options={amountOptions}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default PropertyInput
