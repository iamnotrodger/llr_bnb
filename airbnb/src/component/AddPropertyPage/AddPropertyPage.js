import React, { Component } from 'react';
import PropertyInput from '../PropertyInput/PropertyInput';
import './AddPropertyPage.css';

export class AddProperty extends Component {
    render() {
        return (
            <div className = 'add-prop-page'>
                <PropertyInput className = 'add-prop-input'/>
            </div>
        )
    }
}

export default AddProperty
