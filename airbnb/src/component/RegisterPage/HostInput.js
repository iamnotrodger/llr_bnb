import React, { Component } from 'react'
import GuestInput from './GuestInput.js'
import PropInput from './PropertyInput.js'
import './HostInput.css'

export class HostInput extends Component {
    render() {
        return (
            <div>
                <GuestInput/>
                <PropInput/>
            </div>
        )
    }
}

export default HostInput
