import React, { Component } from 'react';
import Select from 'react-select';
import Collapse from '@kunukn/react-collapse';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import cx from 'classnames';
import './PropertyInput.css';

const amountOptions = [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' }
];

const propTypeOptions = [
        { value: 'Hotel', label: 'Hotel' },
        { value: 'House', label: 'House' },
        { value: 'Apartment', label: 'Apartment' }
];

const countryOption = [
        { value: 'Canada', label: 'Canada' },
        { value: 'United States', label: 'United States' },
        { value: 'China', label: 'China' },
        { value: 'Philippines', label: 'Philippines' }
];

export class PropertyInput extends Component {
        state = {
                listOpen1: false
        };

        toggle = (index) => {
                let collapse = 'listOpen' + index;
                this.setState((prevState) => ({
                        [collapse]: !prevState[collapse]
                }));
        };

        handlePropertyChange = (event) => {
                const { name, value } = event.target;
                this.props.onPropertyChange(name, value);
        };

        handleSelectPropertyChange = (name) => {
                return (newValue) => {
                        this.props.onPropertyChange(name, newValue.value);
                };
        };

        handlePriceChange = (event) => {
                const { name, value } = event.target;
                this.props.onPriceChange(name, value);
        };

        handleSelectPriceChange = (name) => {
                return (newValue) => {
                        this.props.onPriceChange(name, newValue.value);
                };
        };

        handleRoomsChange = (event) => {
                const { name, value } = event.target;
                this.props.onRoomsChange(name, value);
        };

        handleSelectRoomsChange = (name) => {
                return (newValue) => {
                        this.props.onRoomsChange(name, newValue.value);
                };
        };

        render() {
                return (
                        <div>
                                <div className='opt-prop'>
                                        <div>
                                                <p className='register-title'>
                                                        Property Information
                                                </p>
                                        </div>
                                        <div>
                                                <input
                                                        className='login-input register-addr'
                                                        name='title'
                                                        type='name'
                                                        placeholder='Property Name'
                                                        onChange={(e) =>
                                                                this.handlePropertyChange(
                                                                        e
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div>
                                                <input
                                                        className='login-input register-addr'
                                                        name='address'
                                                        type='address'
                                                        placeholder='Property Address'
                                                        onChange={(e) =>
                                                                this.handlePropertyChange(
                                                                        e
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div>
                                                <input
                                                        className='login-input register-pricing'
                                                        name='price'
                                                        type='number'
                                                        placeholder='Price (C$)'
                                                        onChange={(e) =>
                                                                this.handlePriceChange(
                                                                        e
                                                                )
                                                        }
                                                />
                                        </div>
                                        <p className='subtitle-prop'>
                                                Property type:
                                        </p>
                                        <Select
                                                name='propertyType'
                                                className='select'
                                                placeholder='Select...'
                                                options={propTypeOptions}
                                                onChange={this.handleSelectPropertyChange(
                                                        'property_type'
                                                )}
                                        />
                                </div>
                                <div className='opt-prop'>
                                        <p className='subtitle-prop'>
                                                Country:
                                        </p>
                                        <Select
                                                name='bed'
                                                className='select'
                                                placeholder='Select...'
                                                options={countryOption}
                                                onChange={this.handleSelectPropertyChange(
                                                        'country'
                                                )}
                                        />
                                </div>
                                <div className='opt-prop'>
                                        <p className='subtitle-prop'>Guests:</p>
                                        <Select
                                                name='guest_num'
                                                className='select'
                                                placeholder='Select...'
                                                options={amountOptions}
                                                onChange={this.handleSelectPriceChange(
                                                        'guest_num'
                                                )}
                                        />
                                </div>
                                <div className='opt-prop'>
                                        <p className='subtitle-prop'>Beds:</p>
                                        <Select
                                                name='bed'
                                                className='select'
                                                placeholder='Select...'
                                                options={amountOptions}
                                                onChange={this.handleSelectRoomsChange(
                                                        'bed'
                                                )}
                                        />
                                </div>
                                <div className='opt-prop'>
                                        <p className='subtitle-prop'>
                                                Washrooms:
                                        </p>
                                        <Select
                                                name='washroom'
                                                className='select'
                                                placeholder='Select...'
                                                options={amountOptions}
                                                onChange={this.handleSelectRoomsChange(
                                                        'washroom'
                                                )}
                                        />
                                </div>
                                <div className='list-amenity'>
                                        <button
                                                className={cx('list-btn', {
                                                        'list-btn-active': this
                                                                .state.listOpen1
                                                })}
                                                onClick={() => this.toggle(1)}>
                                                choose your amenities
                                        </button>
                                        <Collapse
                                                isOpen={this.state.listOpen1}
                                                className={
                                                        'list-collapse list-collapse-gradient ' +
                                                        (this.state.listOpen1
                                                                ? 'list-collapse-active'
                                                                : '')
                                                }
                                                transition='height 800ms cubic-bezier(0.4, 0, 0.2, 1)'
                                                aria-hidden={
                                                        this.state.listOpen1
                                                                ? 'false'
                                                                : 'true'
                                                }
                                                elementType='checkbox'
                                                render={(collapseState) => (
                                                        <React.Fragment>
                                                                <input
                                                                        type='checkbox'
                                                                        id='Essentials'
                                                                        name='Essentials'
                                                                        value='essentials'
                                                                />
                                                                <label htmlFor='Essentials'>
                                                                        {' '}
                                                                        Essentials
                                                                </label>
                                                                <input
                                                                        type='checkbox'
                                                                        id='TV'
                                                                        name='TV'
                                                                        value='tv'
                                                                />
                                                                <label htmlFor='TV'>
                                                                        {' '}
                                                                        TV
                                                                </label>
                                                                <input
                                                                        type='checkbox'
                                                                        id='Wi-fi'
                                                                        name='Wi-fi'
                                                                        value='wifi'
                                                                />
                                                                <label htmlFor='Wi-fi'>
                                                                        {' '}
                                                                        Wi-Fi
                                                                </label>
                                                        </React.Fragment>
                                                )}
                                        />
                                </div>
                                <div style={{ marginBottom: 10 + 'px' }}></div>
                        </div>
                );
        }
}

export default PropertyInput;
