import React, { Component } from 'react'

export class GuestInput extends Component {
    render() {
        return (
            <div>
                <input className = 'login-input register-fn'
                    name='firstName'
                    type='name'
                    placeholder='First Name'/>
                <input className = 'login-input register-ln'
                    name='lastName'
                    type='name'
                    placeholder='Last Name'/>
                <input className = 'login-input register-email'
                    type='email'
                    placeholder='Email Address'/>
            </div>
        )
    }
}

export default GuestInput
