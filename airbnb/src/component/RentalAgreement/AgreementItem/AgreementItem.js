import React, { useState } from 'react';

const AgreementItem = ({ isHost, agreement, setLoading }) => {
        const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title } = agreement;
        const [approved, setApproved] = useState(
                status === 'approved' ? true : false
        );

        const onApprovalClicked = async ({approval}) => {
                try {
                        if (!setLoading) {
                                setLoading(true);
                        }
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
                                                signing: approval
                                        })
                                }
                        );
                        approval === 'approved' ? setApproved(true) : setApproved(false);
                        if (!setLoading) {
                                setLoading(false);
                        }
                        if (!response.ok) {
                                throw Error('Unable to approve');
                        }
                } catch(err) {
                        console.log(err);
                        throw Error(err)
                }
        }

        return (
                <div className='agreement'>
                        <h3>{title}</h3>
                        {isHost ?
                                (<p className='guest-name'>Guest name: {agreement.guest_name}</p>)
                                :
                                (<p className='host-name'>Host name: {agreement.host_name}</p>)
                        }
                        <p className='start-date'>Start date: {start_date}</p>
                        <p className='end-date'>End date: {end_date}</p>
                        {!approved ? (
                                <div>
                                        <button
                                                className = 'submitButton approve-btn'
                                                onClick={onApprovalClicked('approved')}>
                                                Approve
                                        </button> 

                                        <button
                                                className = 'submitButton disapprove-btn'
                                                onClick={onApprovalClicked('disapproved')}>
                                                Disapprove
                                        </button> 
                                </div>
                        ) : null}
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                </div>
        );
};

export default AgreementItem;