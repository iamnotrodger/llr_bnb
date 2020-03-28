import React, { useState } from 'react';

const ProfileSide = ({ user, onChange, edit, onSubmit, setEdit }) => {
        const [InputStyle, setInputStyle] = useState('profileInput');

        const onEditClick = () => {
                setEdit();
                if (edit) {
                        setInputStyle('');
                } else {
                        setInputStyle('profileInput');
                }
        };

        return (
                <div className='sideContainerx'>
                        <div className='profileImg'>
                                <div className='profile'>
                                        <img
                                                src='https://a0.muscache.com/defaults/user_pic-225x225.png?v=3'
                                                alt='Profile'
                                        />
                                </div>
                        </div>
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                        <div className='sideContent'>
                                <div>
                                        <input
                                                style={{ width: '100%' }}
                                                className={InputStyle}
                                                readOnly={edit}
                                                type='text'
                                                name='firstname'
                                                value={user.firstname}
                                                onChange={onChange}
                                        />
                                        <input
                                                style={{ width: '100%' }}
                                                className={InputStyle}
                                                readOnly={edit}
                                                type='text'
                                                name='lastname'
                                                value={user.lastname}
                                                onChange={onChange}
                                        />
                                        <input
                                                style={{ width: '100%' }}
                                                className={InputStyle}
                                                readOnly={edit}
                                                type='text'
                                                name='email'
                                                value={user.email}
                                                onChange={onChange}
                                        />

                                        <input
                                                style={{ width: '100%' }}
                                                className={InputStyle}
                                                readOnly={edit}
                                                type='text'
                                                name='address'
                                                value={user.address}
                                                onChange={onChange}
                                        />

                                        <input
                                                style={{ width: '100%' }}
                                                className={InputStyle}
                                                readOnly={edit}
                                                type='text'
                                                name='phonenum'
                                                value={user.phonenum}
                                                onChange={onChange}
                                        />
                                </div>

                                <div>
                                        <button
                                                type='submit'
                                                name='edit'
                                                className='editButton'
                                                onClick={onEditClick}>
                                                edit profile
                                        </button>

                                        {!edit ? (
                                                <button
                                                        type='submit'
                                                        name='submit'
                                                        className='submitChange'
                                                        onClick={onSubmit}>
                                                        Submit
                                                </button>
                                        ) : null}
                                </div>
                        </div>
                </div>
        );
};

export default ProfileSide;
