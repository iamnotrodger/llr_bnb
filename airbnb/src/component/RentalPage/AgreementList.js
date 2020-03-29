import React from 'react';
import AgreementItem from './AgreementItem';

const AgreementList = ({ hid, agreements }) => {
    return (
        <div className='agreementList'>
                <div className='agreementContainer'>
                        {agreements.map((agreement, i) => {
                                return <AgreementItem key={i} id={i} hid={hid} agreement={agreement} />;
                        })}
                </div>
        </div>
    );
};

export default AgreementList;