import React from 'react';
import Select from 'react-select';
import './EmployeeInput.css';

const locationOptions = [
        { value: 'manager', label: 'Manager' },
        { value: 'employee', label: 'Employee' }
];

const EmployeeInput = ({ onChange }) => {
        const handleSelectChange = (name) => {
                return (newValue) => {
                        onChange(name, newValue.value);
                };
        };

        const handleChange = (event) => {
                const { name, value } = event.target;
                onChange(name, value);
        };
        return (
                <div>
                        <div>
                                <p className='register-title'>
                                        Employee Information
                                </p>
                        </div>
                        <div style={{ marginBottom: 10 + 'px' }}></div>
                        <div className='opt-prop'>
                                <p className='subtitle-prop'>Position:</p>
                                <Select
                                        name='position'
                                        className='select'
                                        placeholder='Select...'
                                        options={locationOptions}
                                        onChange={handleSelectChange(
                                                'position'
                                        )}
                                />
                        </div>
                        <div>
                                <p
                                        className='subtitle-prop'
                                        style={{ marginTop: 12 + 'px' }}>
                                        Salary:
                                </p>
                                <input
                                        className='login-input register-salary'
                                        name='salary'
                                        type='number'
                                        placeholder='C$'
                                        onChange={handleChange}
                                />
                        </div>
                        <div style={{ marginBottom: 115 + 'px' }}></div>
                </div>
        );
};

export default EmployeeInput;
