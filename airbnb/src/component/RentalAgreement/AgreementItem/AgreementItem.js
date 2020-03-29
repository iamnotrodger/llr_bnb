import React, { useState } from 'react';

const AgreementItem = ({ isHost, agreement }) => {
        const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title, guest_name } = agreement;
        
        // const { approved, rtid } = rental;
        const [approved, setApproved] = useState(
                status === 'approved' ? true : false
        );

        const onApproveClicked = async () => {
                try {
                        // const response = await fetch();
                        // (!response.ok) {
                        //         setApproved(true);
                        // }
                } catch(err) {
                        console.log(err);
                        throw Error(err)
                }
        }

        return (
                <div className='agreement'>
                        <h3>{title}</h3>
                        <p className='start-date'>{start_date}</p>
                        <p className='end-date'>{end_date}</p>
                        {!approved ? (
                                <div>
                                        <button
                                                className = 'submitButton approve-btn'
                                                onClick={onApproveClicked}>
                                                Approve
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