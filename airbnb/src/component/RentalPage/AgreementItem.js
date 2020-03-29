import React, { useState } from 'react';
import './AgreementItem.css';

const AgreementItem = ({ hid, agreement }) => {
        if(!hid){

        }
        let { prid, start_date, end_date } = agreement;

        const { approved, rtid } = retnal;
        const [approved, setApproved] = useState(
                approved === 'approved' ? true : false
        );

        const something = async () => {
                try {
                        const response = await fetch();
                        (!response.ok) {
                                setApproved(true);
                        }
                } catch(err) {
                        console.log(err);
                }
        }

        return (
            <div className='agreement'>
                    <h4>{prid}</h4>
                    <p className='start-date'>{start_date}</p>
                    <p className='end-date'>{end_date}</p>
                    <div className='lineMargin'>
                            <div className='lml'></div>
                    </div>
                    {!approved ? (
                                <div>
                                        <button onClick={}/>
                                </div>
                        ) : null}
            </div>
        );
};

export default AgreementItem;