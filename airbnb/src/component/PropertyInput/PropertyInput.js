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

// function CheckboxLabels() {
//     const [state, setState] = React.useState({
//       checkedA: true,
//       checkedB: true,
//       checkedF: true,
//       checkedG: true,
//     });
// }

export class PropertyInput extends Component {
	state = {
		listOpen1: false
	};

	toggle = index => {
		let collapse = 'listOpen' + index;
		this.setState(prevState => ({
			[collapse]: !prevState[collapse]
		}));
	};

	handleSelectChange = name => {
		return newValue => {
			this.props.onChange(name, newValue.value);
		};
	};

	render() {
		return (
			<div>
				<div>
					<h2>Register a Property</h2>
				</div>
				<div className='opt-prop'>
					<p className='subtitle-prop'>
						Property type:
					</p>
					<Select
						name='propertyType'
						className='select'
						placeholder='Select...'
						options={propTypeOptions}
						onChange={this.handleSelectChange(
							'propertyType'
						)}
					/>
				</div>
				<div className='opt-prop'>
					<p className='subtitle-prop'>Guests:</p>
					<Select
						name='guest'
						className='select'
						placeholder='Select...'
						options={amountOptions}
						onChange={this.handleSelectChange(
							'guest'
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
						onChange={this.handleSelectChange(
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
						onChange={this.handleSelectChange(
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
						onClick={() => this.toggle(1)}
					>
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
						render={collapseState => (
							<React.Fragment>
								<div className='list-content'>
									<FormGroup
										col
									>
										<FormControlLabel
											control={
												<Checkbox
													defaultChecked
													value='Essentials'
												/>
											}
											label='Essentials'
										/>
										<FormControlLabel
											control={
												<Checkbox
													defaultChecked
													value='TV'
												/>
											}
											label='TV'
										/>
										<FormControlLabel
											control={
												<Checkbox
													defaultChecked
													value='Wifi'
												/>
											}
											label='Wifi'
										/>
										<FormControlLabel
											control={
												<Checkbox
													defaultChecked
													value='Heat'
												/>
											}
											label='Heat'
										/>
									</FormGroup>
								</div>
							</React.Fragment>
						)}
					/>
				</div>
			</div>
		);
	}
}

export default PropertyInput;
