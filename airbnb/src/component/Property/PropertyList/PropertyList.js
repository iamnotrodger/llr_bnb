import React from 'react';
// import Select from 'react-select';
import PropertyMap from './PropertyMap';
import './PropertyList.css';

// const filterOption = [
//         { value: 'Sort-by-Price', label: 'Sort-by-Price' },
//         { value: 'Sort-by-Rating', label: 'Sort-by-Rating' },
//         { value: 'Unrented', label: 'Unrented' }
// ];

const PropertyList = ({
        properties,
        type,
        loadAllProperty
        // onFilter
}) => {
        // const handleSelectChange = (value) => {
        //         onFilter(type, value.value);
        // };

        return (
                <div className='list'>
                        <div className='list-header'>
                                <h2>{type}</h2>
                                {/* <Select
                                        name='filter'
                                        className='property-filter'
                                        placeholder='Filter'
                                        options={filterOption}
                                        onChange={handleSelectChange}
                                /> */}
                        </div>
                        <PropertyMap properties={properties} />
                        <p className='list-button' onClick={loadAllProperty}>
                                {properties.length > 4
                                        ? 'Hide <'
                                        : 'Show All >'}
                        </p>
                </div>
        );
};

export default PropertyList;
