import React, { useState } from 'react';

const AgreementItem = ({ isHost, agreement,setLoading }) => {
        const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title } = agreement;
        const [approved, setApproved] = useState(
                status === 'approved' ? true : false
        );

        const onApproveClicked = async (approval) => {
                try {
                        // setLoading(true);
                        // const response = await fetch(
                        //         `http://localhost:3000/api/rental/rental-agreement/host/${hid}`,
                        //         {
                        //                 method: 'post',
                        //                 headers: {
                        //                         'Content-Type':
                        //                                 'application/json'
                        //                 },
                        //                 body: JSON.stringify({
                        //                         rtid: rtid,
                        //                         signing: 'approve'
                        //                 })
                        //         });
                        // (approval === 'approved') ? setApproved(true) : setApproved(false);
                        // setLoading(false);
                        // if (!response.ok) {
                        //         throw Error('Unable to approve');
                        // };
                } catch(err) {
                        setLoading(false);
                        console.log(err);
                        throw Error(err)
                }
        };

        return (
                <div className='agreement'>
                        <div>
                                <h3>{title}</h3>
                                {isHost ?
                                        (<p className='guest-name'><h4>Guest name:</h4> {agreement.guest_name}</p>)
                                        :
                                        (<p className='host-name'><h4>Host name:</h4> {agreement.host_name}</p>)
                                }
                                <p className='start-date'><h4>Start date:</h4> {start_date}</p>
                                <p className='end-date'><h4>End date:</h4> {end_date}</p>
                        </div>
                        {!approved ? (
                                <div>
                                        <button
                                                className = 'submitButton approve-btn'
                                                onClick={onApproveClicked({approval:'approved'})}>
                                                Approve
                                        </button> 

                                        <button
                                                className = 'submitButton disapprove-btn'
                                                onClick={onApproveClicked({approval:'disapproved'})}>
                                                Disapprove
                                        </button> 
                                </div>
                        ) : <p className='sign-date'>Signing date: {signing_date}</p>}
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                </div>
        );
};

export default AgreementItem;