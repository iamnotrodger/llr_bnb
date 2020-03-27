import React from "react";
import PropertyList from "./PropertyList";

const PropertyLibrary = ({
        hotel,
        house,
        apartment,
        loadAllHotels,
        loadAllHouses,
        loadAllApartments
}) => {
        return (
                <div>
                        <PropertyList
                                properties={hotel}
                                type={"Hotel"}
                                loadAllProperty={loadAllHotels}
                        />
                        <PropertyList
                                properties={house}
                                type={"House"}
                                loadAllProperty={loadAllHouses}
                        />
                        <PropertyList
                                properties={apartment}
                                type={"Apartment"}
                                loadAllProperty={loadAllApartments}
                        />
                </div>
        );
};

export default PropertyLibrary;
