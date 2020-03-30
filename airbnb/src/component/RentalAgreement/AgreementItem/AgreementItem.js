import React, { useState } from 'react';

const AgreementItem = ({ isHost, agreement }) => {
        const [agreementInfo, setAgreementInfo] = useState({
                rtid: null, 
                gid: null, 
                hid: null, 
                prid: null, 
                signing: '', 
                start_date: '', 
                end_date: '', 
                signing_date: '', 
                status: '', 
                title: '', 
                guest_name: ''});
        if(isHost){
                const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title, guest_name } = agreement;
                setAgreementInfo(agreement)
        }else{
                const { rtid, gid, hid, prid, signing, start_date, end_date, signing_date, status, title, host_name } = agreement;
                setAgreementInfo(agreement)
        }
        const [approved, setApproved] = useState(
                agreementInfo.status === 'approved' ? true : false
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

        const onDisapproveClicked = async () => {
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
                        <h3>{agreementInfo.title}</h3>
                        {isHost ?
                                (<p className='guest-name'>Guest name: {agreementInfo.guest_name}</p>)
                                :
                                (<p className='host-name'>Host name: {agreementInfo.host_name}</p>)
                        }
                        <p className='start-date'>Start date: {agreementInfo.start_date}</p>
                        <p className='end-date'>End date: {agreementInfo.end_date}</p>
                        {!approved ? (
                                <div>
                                        <button
                                                className = 'submitButton approve-btn'
                                                onClick={onApproveClicked}>
                                                Approve
                                        </button> 

                                        <button
                                                className = 'submitButton disapprove-btn'
                                                onClick={onDisapproveClicked}>
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