import React from "react";
import PropertyItem from "../PropertyItem/PropertyItem";

const PropertyMap = ({ properties }) => {
        return (
                <div className='propertyContainer'>
                        {properties.map((property, i) => {
                                return (
                                        <PropertyItem
                                                key={property.prid}
                                                property={property}
                                        />
                                );
                        })}
                </div>
        );
};

export default PropertyMap;
