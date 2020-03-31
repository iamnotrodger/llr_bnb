import React from 'react';
import Select from 'react-select';
import './GuestInput.css';

const countryOption = [
        { value: 'Canada', label: 'Canada' },
        { value: 'United States', label: 'United States' },
        { value: 'China', label: 'China' },
        { value: 'Philippines', label: 'Philippines' }
];

const GuestInput = ({ onChange, input, onSelectChange }) => {
        const {
                firstName,
                lastName,
                email,
                address,
                phoneNum,
                password,
                confirmPassword,
                country
        } = input;

        const handleSelectChange = (name) => {
                return (newValue) => {
                        onSelectChange(name, newValue.value);
                };
        };

        return (
                <div>
                        <div>
                                <p className='register-title'>
                                        Personal Information
                                </p>
                        </div>
                        <div>
                                <input
                                        className='login-input register-fn'
                                        name='firstName'
                                        type='firstName'
                                        placeholder='First Name'
                                        onChange={onChange}
                                        value={firstName}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-ln'
                                        name='lastName'
                                        type='lastName'
                                        placeholder='Last Name'
                                        onChange={onChange}
                                        value={lastName}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-email'
                                        name='email'
                                        type='email'
                                        placeholder='Email Address'
                                        onChange={onChange}
                                        value={email}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-addr'
                                        name='address'
                                        type='address'
                                        placeholder='Address'
                                        onChange={onChange}
                                        value={address}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-phone'
                                        name='phoneNum'
                                        type='tel'
                                        placeholder='Phone number'
                                        onChange={onChange}
                                        value={phoneNum}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-pwd'
                                        name='password'
                                        type='password'
                                        placeholder='Password'
                                        onChange={onChange}
                                        value={password}
                                />
                        </div>
                        <div>
                                <input
                                        className='login-input register-pwd'
                                        name='confirmPassword'
                                        type='password'
                                        placeholder='Confirm Password'
                                        onChange={onChange}
                                        value={confirmPassword}
                                />
                        </div>
                        <div className='opt-prop'>
                                <p className='subtitle-prop'>Country:</p>
                                <Select
                                        name='bed'
                                        className='select'
                                        placeholder='Select...'
                                        options={countryOption}
                                        onChange={handleSelectChange('country')}
                                        value={{
                                                value: country,
                                                label: country
                                        }}
                                />
                        </div>
                        <div style={{ marginBottom: 10 + 'px' }}></div>
                </div>
        );
};

export default GuestInput;
