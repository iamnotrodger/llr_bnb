import React from 'react';
import AgreementList from './AgreementList';

const AgreementLibrary = ({hid, hostRentalList, guestRentalList, setLoading}) => {
        const isHost = (hid === null ? false : true)
        return (
                <div>
                            {isHost ?
                                    (<div>
                                        <h3>Received agreements</h3>
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
                                    <h3>Sent Agreements</h3>
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