import React, { Component } from 'react'
import './RegisterPage.css'

export class RegisterPage extends Component {
    render() {
        return (
            <div className = 'register-page'>
                <div className='login-background'>
                    <img
                        className='login-img'
                        alt='background'
                        src='https://pacificahousing.ca/wp-content/uploads/2016/11/1213-small-4965.jpg'
                    />
                </div>
                <div className = 'login-box register-box'>
                    <p className = 'login-title'>
                        Register
                    </p>
                    <div>
                        <input className = 'login-input register-fn-input'
                        name='firstName'
                        type='name'
                        placeholder='First Name'/>
                        <input className = 'login-input register-fn-input'
                        name='lastName'
                        type='name'
                        placeholder='Last Name'/>
                        <input className = 'login-input register-fn-input'
                        type='email'
                        placeholder='Email Address'/>
                    </div>
                    <div>
                        <button
                            type='submit'
                            className='submitButton'
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterPage
