import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import TabsControl from '../ReactTab/ReactTab.js';
import GuestInput from './GuestInput/GuestInput';
import EmployeeInput from './EmployeeInput/EmployeeInput';
import PropertyInput from '../PropertyInput/PropertyInput';
import {
        createRooms,
        registerHost,
        propertyValidate
} from '../AddPropertyPage/AddPropertyPage';
import './RegisterPage.css';
import LoadSpinner from '../LoadingScreen/LoadSpinner';

const RegisterPage = () => {
        const [inputValue, setInputValue] = useState({
                firstName: '',
                lastName: '',
                email: '',
                address: '',
                phoneNum: '',
                password: '',
                confirmPassword: '',
                country: ''
        });
        const [propertyInput, setPropertyInput] = useState({
                property_type: '',
                title: '',
                address: '',
                country: ''
        });
        const [price, setPrice] = useState({
                guest_num: 0,
                price: 0
        });
        const [rooms, setRooms] = useState({
                bed: 0,
                washroom: 0
        });
        const [employeeInput, setEmployeeInput] = useState({
                position: '',
                salary: 0
        });

        const [loading, setLoading] = useState(false);
        const [register, setRegister] = useState('User');
        const [error, setError] = useState(false);

        const history = useHistory();

        const onChange = (event) => {
                const { name, value } = event.target;
                setInputValue({ ...inputValue, [name]: value });
        };

        const onSelectChange = (name, value) => {
                setInputValue({ ...inputValue, [name]: value });
        };

        const onPropertyChange = (name, value) => {
                setPropertyInput({ ...propertyInput, [name]: value });
        };

        const onRoomsChange = (name, value) => {
                setRooms({ ...rooms, [name]: value });
        };

        const onPriceChange = (name, value) => {
                setPrice({ ...price, [name]: value });
        };
        const onEmployeeChange = (name, value) => {
                setEmployeeInput({ ...employeeInput, [name]: value });
        };

        const handleButtonSubmit = async () => {
                setLoading(true);
                try {
                        if (!guestValidation(inputValue)) {
                                throw Error('Input validation error.');
                        }
                        if (register === 'Host') {
                                if (!propertyValidate(propertyInput, price)) {
                                        throw Error('Validation error');
                                }

                                const user = await registerUser(inputValue);
                                const roomsOne = createRooms(
                                        rooms.bed,
                                        rooms.washroom
                                );
                                await registerHost(
                                        propertyInput,
                                        roomsOne,
                                        price,
                                        user.uid
                                );
                                setLoading(false);
                                history.push('/login');
                                return;
                        } else if (register === 'Employee') {
                                await registerEmployee({
                                        ...inputValue,
                                        ...employeeInput
                                });
                                setLoading(false);
                                history.push('/login');
                                return;
                        } else if (register === 'User') {
                                await registerUser(inputValue);
                                setLoading(false);
                                history.push('/login');
                                return;
                        }
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
                        <div className='register-page'>
                                <div className='login-background'>
                                        <img
                                                className='login-img'
                                                alt='background'
                                                src='https://pacificahousing.ca/wp-content/uploads/2016/11/1213-small-4965.jpg'
                                        />
                                </div>
                                <div className='login-box register-box'>
                                        <p className='login-title'>Register</p>
                                        <div className='tabs-container'>
                                                <TabsControl
                                                        setTab={setRegister}>
                                                        <div name='User'>
                                                                <GuestInput
                                                                        onChange={
                                                                                onChange
                                                                        }
                                                                        input={
                                                                                inputValue
                                                                        }
                                                                        onSelectChange={
                                                                                onSelectChange
                                                                        }
                                                                />
                                                        </div>
                                                        <div name='Host'>
                                                                <GuestInput
                                                                        onChange={
                                                                                onChange
                                                                        }
                                                                        input={
                                                                                inputValue
                                                                        }
                                                                        onSelectChange={
                                                                                onSelectChange
                                                                        }
                                                                />
                                                                <PropertyInput
                                                                        onPropertyChange={
                                                                                onPropertyChange
                                                                        }
                                                                        onPriceChange={
                                                                                onPriceChange
                                                                        }
                                                                        onRoomsChange={
                                                                                onRoomsChange
                                                                        }
                                                                />
                                                        </div>
                                                        <div name='Employee'>
                                                                <GuestInput
                                                                        onChange={
                                                                                onChange
                                                                        }
                                                                        input={
                                                                                inputValue
                                                                        }
                                                                        onSelectChange={
                                                                                onSelectChange
                                                                        }
                                                                />
                                                                <EmployeeInput
                                                                        input={
                                                                                employeeInput
                                                                        }
                                                                        onChange={
                                                                                onEmployeeChange
                                                                        }
                                                                />
                                                        </div>
                                                </TabsControl>
                                        </div>
                                        {ErrorMessage}
                                        <div>
                                                <button
                                                        className='submitButton'
                                                        onClick={
                                                                handleButtonSubmit
                                                        }>
                                                        Register
                                                </button>
                                        </div>
                                </div>
                        </div>
                </div>
        );
};

const guestValidation = (input) => {
        const {
                firstName,
                lastName,
                email,
                address,
                phoneNum,
                password,
                confirmPassword
        } = input;

        if (firstName.length === 0) {
                return false;
        }

        if (lastName.length === 0) {
                return false;
        }

        if (email.length === 0) {
                return false;
        }

        if (address.length === 0) {
                return false;
        }

        if (phoneNum.length === 0 || phoneNum.length > 15) {
                return false;
        }

        if (!/^\d+$/.test(phoneNum)) {
                return false;
        }

        if (password.length === 0 || password.length < 8) {
                return false;
        }

        if (password !== confirmPassword) {
                return false;
        }

        return true;
};

const registerUser = async (input) => {
        const newInput = { ...input };
        delete newInput.confirmPassword;
        const response = await fetch(
                'http://localhost:3000/api/guest-register',
                {
                        method: 'post',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newInput)
                }
        );
        if (response.ok) {
                const user = await response.json();
                return user;
        }
        throw new Error('Network response was not ok.');
};

const registerEmployee = async (input) => {
        const newInput = { ...input };
        delete newInput.confirmPassword;
        const response = await fetch(
                'http://localhost:3000/api/employee-register',
                {
                        method: 'post',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newInput)
                }
        );
        if (response.ok) {
                const user = await response.json();
                return user;
        }
        throw new Error('Network response was not ok.');
};

export default RegisterPage;
