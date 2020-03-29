import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext';
import PropertyInput from '../PropertyInput/PropertyInput';
import LoadSpinner from '../LoadingScreen/LoadSpinner';
import './AddPropertyPage.css';

const propertyInitial = {
        property_type: '',
        title: '',
        address: '',
        country: ''
};

const priceInitial = {
        guest_num: 0,
        price: 0
};

const roomInitial = {
        bed: 0,
        washroom: 0
};

const AddPropertyPage = () => {
        const { user, setUser } = useContext(UserContext);
        const uid = user ? user.uid : null;
        const gid = user ? user.gid : null;
        const hid = user ? user.hid : null;
        const [propertyInput, setPropertyInput] = useState(propertyInitial);
        const [price, setPrice] = useState(priceInitial);
        const [rooms, setRooms] = useState(roomInitial);
        const [succ, setSucc] = useState(false);
        const [error, setError] = useState(false);
        const [hostRegistered, setHostRegistered] = useState(false);
        const [loading, setLoading] = useState(false);

        const handleLoadUser = (newUser) => {
                setUser(newUser);
        };

        const propertySubmit = async () => {
                setSucc(false);
                setError(false);
                setLoading(true);
                try {
                        if (!propertyValidate(propertyInput, price)) {
                                throw Error('Validation Error');
                        }
                        let roomsOne = createRooms(rooms.bed, rooms.washroom);
                        if (hid) {
                                const response = await fetch(
                                        'http://localhost:3000/api/property/add-property',
                                        {
                                                method: 'post',
                                                headers: {
                                                        'Content-Type':
                                                                'application/json'
                                                },
                                                body: JSON.stringify({
                                                        property: {
                                                                ...propertyInput,
                                                                hid: hid
                                                        },
                                                        rooms: roomsOne,
                                                        pricing: price
                                                })
                                        }
                                );
                                if (response.ok) {
                                        setSucc(true);
                                        setError(false);
                                        setLoading(false);
                                        return;
                                }
                                throw Error('Unable to add property.');
                        } else if (uid) {
                                const hidNew = await registerHost(
                                        propertyInput,
                                        roomsOne,
                                        price,
                                        uid
                                );
                                const newUser = {
                                        uid: uid,
                                        gid: gid,
                                        hid: hidNew.hid
                                };
                                setError(false);
                                setHostRegistered(true);
                                setLoading(false);
                                handleLoadUser(newUser);
                                return;
                        }
                        throw Error('Unable to submit property.');
                } catch (err) {
                        console.log(err);
                        setLoading(false);
                        setSucc(false);
                        setHostRegistered(false);
                        setError(true);
                }
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

        const ErrorMessage = error ? (
                <div className='error-message'>Unable to add property.</div>
        ) : null;
        const SuccMessage = succ ? (
                <div className='succ-message'>
                        Property Addition Successful.
                </div>
        ) : null;
        const RegisterHostMessage = hostRegistered ? (
                <div className='succ-message'>
                        You have been registered as a host.
                </div>
        ) : null;

        return (
                <div>
                        <LoadSpinner loading={loading} />
                        <div className='add-prop-page'>
                                <PropertyInput
                                        className='add-prop-input'
                                        onPropertyChange={onPropertyChange}
                                        onPriceChange={onPriceChange}
                                        onRoomsChange={onRoomsChange}
                                />
                                <div>
                                        <button
                                                className='submitButton'
                                                onClick={propertySubmit}>
                                                Submit
                                        </button>
                                        {ErrorMessage}
                                        {SuccMessage}
                                        {RegisterHostMessage}
                                </div>
                        </div>
                </div>
        );
};

const createRooms = (numBedrooms, numWashroom) => {
        let rooms = [];
        for (let i = 0; i < numBedrooms; i++) {
                let tempRoom = {
                        room_type: 'bedroom',
                        bed_num: 1
                };
                rooms.push(tempRoom);
        }

        for (let i = 0; i < numWashroom; i++) {
                let tempRoom = {
                        room_type: 'washroom',
                        bed_num: 1
                };
                rooms.push(tempRoom);
        }
        return rooms;
};

const registerHost = async (property, rooms, price, userID) => {
        const response = await fetch(
                'http://localhost:3000/api/host-register',
                {
                        method: 'post',
                        headers: {
                                'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                                uid: userID,
                                property: property,
                                rooms: rooms,
                                pricing: price
                        })
                }
        );
        if (response.ok) {
                const hid = await response.json();
                return hid;
        }
        throw new Error('Network response was not ok.');
};

const propertyValidate = (property, price) => {
        const { property_type, title, address, country } = property;
        const { guest_num } = price;

        if (property_type.length === 0) {
                return false;
        }

        if (title.length === 0) {
                return false;
        }

        if (address.length === 0) {
                return false;
        }

        if (country.length === 0) {
                return false;
        }

        if (guest_num === 0) {
                return false;
        }

        return true;
};

export default AddPropertyPage;
export { createRooms, registerHost, propertyValidate };
