import React from 'react';
import AgreementList from './AgreementList';

const AgreementLibrary = ({hid, hostRentalList, guestRentalList, setLoading}) => {
        const isHost = (hid === null ? false : true)
        return (
                <div>
                        <div className='lineMargin'>
                                <div className='lml'></div>
                        </div>
                        {isHost ?
                                <div>
                                {hostRentalList.length === 0 ?
                                        (<div>
                                                <h2>Oops, you don't have any received agreement yet.</h2>
                                                <div className='lineMargin'>
                                                        <div className='lml'></div>
                                                </div>
                                        </div>)
                                        :
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
                                        </div>)}
                                </div> : null
                        }
                                <div>
                                        {guestRentalList.length === 0 ?
                                        (<div>
                                                <h2>Oops, you don't have any sent agreement yet.</h2>
                                                <div className='lineMargin'>
                                                        <div className='lml'></div>
                                                </div>
                                        </div>)
                                        :
                                        (<div>
                                                <h2>---------- Agreements Sent ----------</h2>
                                                <div className='lineMargin'>
                                                        <div className='lml'></div>
                                                </div>
                                                <AgreementList
                                                        isHost={false} 
                                                        agreements={guestRentalList}
                                                        setLoading = {setLoading}
                                                />
                                        </div>)}
                                </div>
                </div>
        )
}

export default AgreementLibrary;