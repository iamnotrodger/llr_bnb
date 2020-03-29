import React, { useState, useEffect } from 'react';
import LoadSpinner from '../../LoadingScreen/LoadSpinner';
import PropertyList from './PropertyList';

const PropertyLibrary = () => {
        const [Hotel, setHotel] = useState([]);
        const [House, setHouse] = useState([]);
        const [Apartment, setApartment] = useState([]);
        const [filterType, setFilterType] = useState({
                Hotel: '',
                House: '',
                Apartment: ''
        });
        const [loading, setLoading] = useState(false);
        //React Life Cycle Method: will run before render and is used to load data from the backend
        useEffect(() => {
                const fetchData = async () => {
                        setLoading(true);
                        try {
                                const responseOne = await fetch(
                                        'http://localhost:3000/api/property/property-list/Hotel/4'
                                );

                                if (responseOne.ok) {
                                        const hotels = await responseOne.json();
                                        setHotel(hotels);
                                }

                                const responseTwo = await fetch(
                                        'http://localhost:3000/api/property/property-list/House/4'
                                );

                                if (responseTwo.ok) {
                                        const houses = await responseTwo.json();
                                        setHouse(houses);
                                }

                                const responseThree = await fetch(
                                        'http://localhost:3000/api/property/property-list/Apartment/4'
                                );

                                if (responseThree.ok) {
                                        const apartments = await responseThree.json();
                                        setApartment(apartments);
                                }
                                setLoading(false);
                        } catch (err) {
                                console.log(err);
                                setLoading(false);
                        }
                };
                fetchData();
        }, []);
        const handleFilterChange = (type, value) => {
                setFilterType({ ...filterType, [type]: value });
                filterProperty(type, value);
        };

        const loadAllHotels = async () => {
                const hotels = await loadAllProperty('Hotel', Hotel);
                setHotel(hotels);
        };

        const loadAllHouses = async () => {
                const houses = await loadAllProperty('House', House);
                setHouse(houses);
        };

        const loadAllApartments = async () => {
                const apartments = await loadAllProperty(
                        'Apartment',
                        Apartment
                );
                setApartment(apartments);
        };

        const loadAllProperty = async (category, oldProperties) => {
                setLoading(true);
                if (oldProperties.length > 4) {
                        setLoading(false);
                        return oldProperties.slice(0, 4);
                }
                try {
                        const response = await fetch(
                                `http://localhost:3000/api/property/property-list/${category}`
                        );
                        if (response.ok) {
                                const properties = await response.json();
                                setLoading(false);
                                return properties;
                        }
                } catch (err) {
                        console.log(err);
                }
                setLoading(false);
                return oldProperties;
        };

        const filterProperty = (type, value) => {
                console.log(type, ': ', value);
        };

        return (
                <div>
                        <LoadSpinner loading={loading} />
                        <PropertyList
                                properties={Hotel}
                                type={'Hotel'}
                                loadAllProperty={loadAllHotels}
                                onFilter={handleFilterChange}
                        />
                        <PropertyList
                                properties={House}
                                type={'House'}
                                loadAllProperty={loadAllHouses}
                                onFilter={handleFilterChange}
                        />
                        <PropertyList
                                properties={Apartment}
                                type={'Apartment'}
                                loadAllProperty={loadAllApartments}
                                onFilter={handleFilterChange}
                        />
                </div>
        );
};

export default PropertyLibrary;
