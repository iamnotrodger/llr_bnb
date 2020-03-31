import React from 'react';
import AgreementList from './AgreementList';

const AgreementLibrary = ({hid, hostRentalList, guestRentalList, setLoading}) => {
        const isHost = (hid === null ? false : true)
        return (
                <div>
                            {isHost ?
                                    (<div>
                                        <h2>---------- Agreements Received ----------</h2>
                                        <div className='lineMargin'>
                                                <div className='lml'></div>
                                        </div>
                                        <AgreementList 
                                                isHost={true} 
                                                agreements={hostRentalList}
                                                setLoading = {setLoading}
                                        />
                                    </div>) : null
                            }
                            <div>
                                    <h2>---------- Agreements Sent ----------</h2>
                                    <div className='lineMargin'>
                                            <div className='lml'></div>
                                    </div>
                                    <AgreementList
                                            isHost={false} 
                                            agreements={guestRentalList}
                                            setLoading = {setLoading}
                                    />
                            </div>
                </div>
        )
}

export default AgreementLibrary;