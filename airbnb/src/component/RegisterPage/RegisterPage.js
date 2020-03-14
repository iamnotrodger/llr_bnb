import React, { Component } from 'react'
import TabsControl from './ReactTab.js'
import GuestInput from './GuestInput.js'
import HostInput from './HostInput.js'
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
                    <div className='tabs-container'>
                        <TabsControl>
                            <div name = 'Guest'>
                                <GuestInput/>
                            </div>
                            <div name = 'Host'>
                                <HostInput/>
                            </div>
                        </TabsControl>
                    </div>
                    <div>
                        <button
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