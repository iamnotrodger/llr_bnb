import React from "react";
import AgreementItem from "./AgreementItem.js";

const AgreementMap = ({ agreements }) => {
        return (
                <div className='propertyContainer'>
                        {agreements.map((agreement, i) => {
                                return (
                                        <AgreementItem
                                                key={agreement.prid}
                                                agreement={agreement}
                                        />
                                );
                        })}
                </div>
        );
};

export default AgreementMap;
