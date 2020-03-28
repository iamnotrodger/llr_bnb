import React from 'react';
import PropertyList from './PropertyList';

const PropertyLibrary = ({
        hotel,
        house,
        apartment,
        loadAllHotels,
        loadAllHouses,
        loadAllApartments,
        onFilter
}) => {
        return (
                <div>
                        <PropertyList
                                properties={hotel}
                                type={'Hotel'}
                                loadAllProperty={loadAllHotels}
                                onFilter={onFilter}
                        />
                        <PropertyList
                                properties={house}
                                type={'House'}
                                loadAllProperty={loadAllHouses}
                                onFilter={onFilter}
                        />
                        <PropertyList
                                properties={apartment}
                                type={'Apartment'}
                                loadAllProperty={loadAllApartments}
                                onFilter={onFilter}
                        />
                </div>
        );
};

export default PropertyLibrary;
