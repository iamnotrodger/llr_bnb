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
                        setLoading(false);
                        throw Error(err)
                }
        };

        const onPayClicked = async () => {
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
                                                method: cardType,
                                                card_num: cardNum
                                        })
                                });
                        setPayment(true)
                        setLoading(false)
                        if (!response.ok) {
                                throw Error('Unable to approve');
                        };
                } catch(err) {
                        setLoading(false);
                        throw Error(err)
                }
        };

        return (
                <div className='agreement-tag'>
                        <div>
                                <h3>{title}</h3>
                                {(signing === 'approved') ? 
                                        <p className='agreement-sign' style={{color:'green', float:'right'}}>Status: {signing}</p>
                                : (signing === 'pending') ?
                                        <p className='agreement-sign' style={{color:'rgb(255, 174, 66)', float:'right'}}>Status: {'Waiting'}</p>
                                :
                                        <p className='agreement-sign' style={{color:'brown', float:'right'}}>Status: {'Rejected'}</p>
                                }
                                {isHost ?
                                        (<div>
                                                <h4>- Guest name:</h4>
                                                <p className='agreement-text'>{agreement.guest_name}</p>
                                        </div>)
                                        :
                                        (<div>
                                                <h4>- Host name:</h4>
                                                <p className='agreement-text'>{agreement.host_name}</p>
                                        </div>)
                                }
                                <h4>- Agreement start on:</h4>
                                <p className='agreement-text'>{start_date.split("T")[0]}</p>
                                <h4>- Agreement end on:</h4>
                                <p className='agreement-text'>{end_date.split("T")[0]}</p>
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
                                        <h4>- Signing date:</h4>
                                        <p className='agreement-text'>{signing_date.split("T")[0]}</p>
                                        <h4>- Payment status:</h4>
                                        {(!isHost && status === 'completed') ?
                                                (<div>
                                                        <p className='agreement-text'>{'Payment Received'}</p>
                                                        <p style={{textAlign:'center', color:'green', fontWeight:'bold'}}> All done ! </p>
                                                </div>) : <p className='agreement-text' style={{color:'brown', fontWeight:'bold', paddingBottom:'5px'}}>{'Unpaid'}</p>
                                        }
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
                                                </div>) 
                                                : null
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