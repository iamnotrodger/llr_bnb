import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css';

class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state.email);
        console.log(this.state.password);
    }

    render() {
        return (
            <div className = 'login-page'>
                <div className='login-content'>
                    <p className = 'login-welcome'>
                        Welcome to LLB
                    </p>
                    <div>
                        <input className = 'login-input'
                                name='email'
                                placeholder='Email'
                                onChange={this.onChange}
                            />
                    </div>
                    <div>
                        <input className = 'login-input'
                            name='password'
                            placeholder='Password'
                            onChange={this.onChange}
                        />
                    </div>
                    <div>
                        <Link to = '/register'>
                            <p className="login-register-hint">Don't have an account?</p>
                        </Link>
                    </div>
                    
                    <div>
                        <button
                            type='submit'
                            className='submitButton'
                        >
                            Login
                        </button>
                    </div>
                </div>
                <div className='login-background'>
                    <img
                        className='login-img'
                        alt='background'
                        src='https://images.squarespace-cdn.com/content/v1/5ae09b9cee17598796bf0561/1550011924213-C1XWZQK9HYNNPUKCV2HW/ke17ZwdGBToddI8pDm48kFrPwftsEnVJnMrFLVbMqtJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0gycmlYrUNOm5FlGNDjMZJivtP_8QmpAdw116-3ob1oTjc7unw2RKrjuCiMWmcwGEQ/image-asset.jpeg?format=2500w'
                    />
                </div>
            </div>
        );
    }
}

export default LoginPage;