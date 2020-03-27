import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoadSpinner from '../LoadingScreen/LoadSpinner';
import './LoginPage.css';

const LoginPage = ({ loadUser }) => {
        const [inputValue, setInputValue] = useState({
                email: '',
                password: ''
        });
        const [error, setError] = useState(false);
        const [loading, setLoading] = useState(false);
        const history = useHistory();

        const onChange = (event) => {
                const { name, value } = event.target;
                setInputValue({ ...inputValue, [name]: value });
        };

        const handleButtonSubmit = async (event) => {
                event.preventDefault();
                setLoading(true);
                try {
                        if (
                                inputValue.email.length === 0 ||
                                inputValue.password.length === 0
                        ) {
                                throw Error('Invalid Inputs');
                        }
                        const response = await fetch(
                                'http://localhost:3000/api/login',
                                {
                                        method: 'post',
                                        headers: {
                                                'Content-Type':
                                                        'application/json'
                                        },
                                        body: JSON.stringify({
                                                email: inputValue.email,
                                                password: inputValue.password
                                        })
                                }
                        );
                        if (response.ok) {
                                const data = await response.json();
                                if (data.uid) {
                                        loadUser(data);
                                        setLoading(false);
                                        history.push('/');
                                        return;
                                }
                        }
                        throw Error('Unable to login');
                } catch (err) {
                        console.log(err);
                        setLoading(false);
                        setError(true);
                }
        };

        const ErrorMessage = error ? (
                <div className='error-message'>Something went wrong.</div>
        ) : null;
        return (
                <div>
                        <LoadSpinner loading={loading} />
                        <div className='login-page'>
                                <div className='login-box'>
                                        <p className='login-title'>
                                                Welcome to LLB
                                        </p>
                                        {ErrorMessage}
                                        <form onSubmit={handleButtonSubmit}>
                                                <div>
                                                        <input
                                                                className='login-input'
                                                                name='email'
                                                                type='email'
                                                                value={
                                                                        inputValue.email
                                                                }
                                                                placeholder='Email'
                                                                onChange={
                                                                        onChange
                                                                }
                                                                required
                                                        />
                                                </div>
                                                <div>
                                                        <input
                                                                className='login-input'
                                                                name='password'
                                                                type='password'
                                                                value={
                                                                        inputValue.password
                                                                }
                                                                placeholder='Password'
                                                                onChange={
                                                                        onChange
                                                                }
                                                                required
                                                        />
                                                </div>
                                                <div style={{ float: 'right' }}>
                                                        <Link to='/register'>
                                                                <p className='login-register-hint'>
                                                                        Don't
                                                                        have an
                                                                        account?
                                                                </p>
                                                        </Link>
                                                </div>

                                                <div>
                                                        <button
                                                                type='submit'
                                                                className='submitButton'
                                                                onClick={
                                                                        handleButtonSubmit
                                                                }>
                                                                Login
                                                        </button>
                                                </div>
                                        </form>
                                </div>
                                <div className='login-background'>
                                        <img
                                                className='login-img'
                                                alt='background'
                                                src='https://images.squarespace-cdn.com/content/v1/5ae09b9cee17598796bf0561/1550011924213-C1XWZQK9HYNNPUKCV2HW/ke17ZwdGBToddI8pDm48kFrPwftsEnVJnMrFLVbMqtJ7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0gycmlYrUNOm5FlGNDjMZJivtP_8QmpAdw116-3ob1oTjc7unw2RKrjuCiMWmcwGEQ/image-asset.jpeg?format=2500w'
                                        />
                                </div>
                        </div>
                </div>
        );
};

export default LoginPage;
