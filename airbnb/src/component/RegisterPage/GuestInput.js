import React, { Component } from 'react'
import './GuestInput.css'

export class GuestInput extends Component {
    render() {
        return (
            <div>
                <div>
                    <input className = 'login-input register-fn'
                        name='firstName'
                        type='name'
                        placeholder='First Name'/>
                </div>
                <div>
                    <input className = 'login-input register-ln'
                        name='lastName'
                        type='name'
                        placeholder='Last Name'/>
                </div>
                <div>
                    <input className = 'login-input register-email'
                        type='email'
                        placeholder='Email Address'/>
                </div>
                <div style={{marginBottom: 10 + 'px'}}></div>
            </div>
        )
    }
}

export default GuestInput
