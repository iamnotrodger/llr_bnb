import React, { useState } from 'react';
import Select from 'react-select';
import './AgreementItem.css'

const AgreementItem = ({ isHost, agreement,setLoading }) => {
        const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title } = agreement;
        const [signed, setSigned] = useState(
                (signing !== 'pending') ? true : false
        );
        const [paid, setPayment] = useState(
                (status === 'completed') ? true : false
        );
        const [error,setError] = useState('');
        const [cardNum,setCardNum] = useState('');
        const [cardType,setCardType] = useState('');

        const handleCardNumChange = (event) => {
                setCardNum(event.target.value)
        };

        const handleSelectCardTypeChange = () => {
                return (newValue) => {
                        setCardType(newValue.value)
                }
        };

        const paymentOptions = [
                { value: 'debit card', label: 'Debit Card' },
                { value: 'credit card', label: 'Credit Card' }
        ];

        const onApproveClicked = async (approval) => {
                try {
                        setLoading(true);
                        const response = await fetch(
                                `http://localhost:3000/api/rental/rental-agreement/host/${hid}`,
                                {
                                        method: 'post',
                                        headers: {
                                                'Content-Type':
                                                        'application/json'
                                        },
                                        body: JSON.stringify({
                                                rtid: rtid,
                                                signing: approval,
                                        })
                                });
                        setSigned(true)
                        setLoading(false)
                        if (!response.ok) {
                                throw Error('Unable to approve');
                        };
                } catch(err) {
                        setError(err)
                        setLoading(false);
                        throw Error(err)
                }
        };

        const onPayClicked = async (method, card_num) => {
                try {
                        setLoading(true);
                        const response = await fetch(
                                `http://localhost:3000/api/rental/rental-agreement/host/${hid}`,
                                {
                                        method: 'post',
                                        headers: {
                                                'Content-Type':
                                                        'application/json'
                                        },
                                        body: JSON.stringify({
                                                // pid: pid,
                                                rtid: rtid,
                                                method: method,
                                                card_num: card_num
                                        })
                                });
                        setPayment(true)
                        setLoading(false)
                        if (!response.ok) {
                                throw Error('Unable to approve');
                        };
                } catch(err) {
                        setError(err)
                        setLoading(false);
                        throw Error(err)
                }
        };

        return (
                <div className='agreement-tag'>
                        <div>
                                <h3 style={{marginBottom:'5px'}}>{title}</h3>
                                {(signing === 'approved') ? 
                                        <p className='agreement-sign' style={{color:'green', float:'right'}}>Status: {signing}</p>
                                : (signing === 'pending') ?
                                        <p className='agreement-sign' style={{color:'rgb(255, 174, 66)', float:'right'}}>Status: {'Waiting'}</p>
                                :
                                        <p className='agreement-sign' style={{color:'brown', float:'right'}}>Status: {'Rejected'}</p>
                                }
                                {isHost ?
                                        (<div>
                                                <h4>Guest name:</h4>
                                                <p>{agreement.guest_name}</p>
                                        </div>)
                                        :
                                        (<div>
                                                <h4>Host name:</h4>
                                                <p >{agreement.host_name}</p>
                                        </div>)
                                }
                                <h4>Start date:</h4>
                                <p>{start_date.split("T")[0]}</p>
                                <h4>End date:</h4>
                                <p>{end_date.split("T")[0]}</p>
                        </div>
                        {(isHost && !signed) ? (
                                <div>
                                        <button
                                                className = 'submitButton approve-btn'
                                                onClick={() => onApproveClicked('approved')}> 
                                                Approve
                                        </button> 

                                        <button
                                                className = 'submitButton disapprove-btn'
                                                onClick={() => onApproveClicked('disapproved')}> 
                                                Disapprove
                                        </button> 
                                </div>
                        ) : null}
                        {(!isHost && signing === 'approved') ? 
                                (<div>
                                        <h4>Signing date:</h4>
                                        <p>{signing_date.split("T")[0]}</p>
                                        {(!isHost && status === 'pending') ?
                                                (<div>
                                                        <input
                                                                className='login-input payment-card-num'
                                                                name='card-num'
                                                                type='number'
                                                                placeholder='Card Number'
                                                                onChange={(e) => handleCardNumChange(e)}
                                                        />
                                                        <Select
                                                                className='select select-payment-type'
                                                                placeholder='Payment Type'
                                                                options={paymentOptions}
                                                                onChange={handleSelectCardTypeChange()}
                                                        />
                                                        <button
                                                                className = 'submitButton payment-btn'
                                                                onClick={() => onPayClicked()}> 
                                                                Pay Now!
                                                        </button>
                                                        <div style={{ marginBottom: 50 + 'px' }}></div>
                                                </div>) : null
                                        }
                                        
                                </div>) : null
                        }
                        {(!isHost && signing === 'disapproved') ?
                                (<p className='agreement-sign' style={{color:'brown', textAlign:'center'}}>
                                                Host rejected your request on {signing_date.split("T")[0]}
                                </p>) : null
                        }
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                </div>
        );
};

export default AgreementItem;