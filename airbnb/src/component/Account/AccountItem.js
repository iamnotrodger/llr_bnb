import React from 'react';
import './AccountItem.css';

const AccountItem = ({ account }) => {
        let { uid, firstname, lastname, address, email, phonenum, country, created} = account;

        return (
                <div className='account' style={{textAlign:'left'}}>
                        <div>
                                <h2> {`${firstname} ${lastname}`} </h2>
                                <p style={{fontWeight:'bold'}}> Email </p>
                                <p className='account-text'> {`- ${email}`} </p>
                                <p style={{fontWeight:'bold'}}> Address </p>
                                <p className='account-text'> {`- ${address}`} </p>
                                <p style={{fontWeight:'bold'}}> Phone </p>
                                <p className='account-text'> {`- ${phonenum}`} </p>
                                <p style={{fontWeight:'bold'}}> Country </p>
                                <p className='account-text'> {`- ${country}`} </p>
                                <p style={{fontWeight:'bold'}}> User ID </p>
                                <p className='account-text'> {`- ${uid}`} </p>
                                <p style={{fontWeight:'bold'}}> Created on </p>
                                <p className='account-text'> {`- ${created}`} </p>
                        </div>
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                </div>
        );
};

export default AccountItem;
