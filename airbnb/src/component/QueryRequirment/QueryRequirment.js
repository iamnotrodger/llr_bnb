import React, { useState } from 'react';
import LoadSpinner from '../LoadingScreen/LoadSpinner';
import './QueryRequirment.css';

const QueryRequirment = () => {
        const [query, setQuery] = useState(null);
        const [loading, setLoading] = useState(false);

        const getRequest = async (string) => {
                setLoading(true);
                try {
                        const response = await fetch(
                                `http://localhost:3000${string}`
                        );
                        if (response.ok) {
                                const list = await response.json();
                                setQuery(list);
                        }
                } catch (err) {
                        console.log(err);
                }
                setLoading(false);
        };

        const handleGuestList = async () => {
                await getRequest('/api/project/all-guest-list');
        };
        const handleCheapestRental = async () => {
                await getRequest(
                        '/api/project/completed-cheapest-rental-agreement'
                );
        };
        const handleRentedProperty = async () => {
                await getRequest('/api/project/all-rented-property');
        };

        const handleNotRentedProperty = async () => {
                await getRequest('/api/project/all-not-rented-property');
        };

        const handleRentedOn10th = async () => {
                await getRequest('/api/project/rented-on-10th');
        };

        const handleEmployeeSalary = async () => {
                await getRequest('/api/project/15k-employee');
        };

        const dataDisplay = () => {
                if (query) {
                        if (query instanceof Array) {
                                return query.map((data, i) => {
                                        return (
                                                <div
                                                        key={i}
                                                        className='qeury-data'>
                                                        {JSON.stringify(data)}
                                                </div>
                                        );
                                });
                        } else {
                                return (
                                        <div className='qeury-data'>
                                                {JSON.stringify(query)}
                                        </div>
                                );
                        }
                }
                return null;
        };

        return (
                <div className='main query-requirment'>
                        <LoadSpinner loading={loading} />
                        <div>
                                <h2>Query Requirments</h2>
                                <p>
                                        This page is dedicated to all the query
                                        requirments that didn't fit with our
                                        Applicaiton.
                                </p>
                        </div>
                        <div className='query-buttons'>
                                <div>
                                        <p onClick={handleGuestList}>
                                                Get Guest List View
                                        </p>
                                </div>
                                <div>
                                        <p onClick={handleCheapestRental}>
                                                Get the cheapest Rental
                                                Agreements
                                        </p>
                                </div>
                                <div>
                                        <p onClick={handleRentedProperty}>
                                                Get all the property that's
                                                rented
                                        </p>
                                </div>
                                <div>
                                        <p onClick={handleNotRentedProperty}>
                                                Get all the property that's NOT
                                                rented
                                        </p>
                                </div>
                                <div>
                                        <p onClick={handleRentedOn10th}>
                                                Get all the property rented on
                                                the 10th month
                                        </p>
                                </div>
                                <div>
                                        <p onClick={handleEmployeeSalary}>
                                                Get all the employees with over
                                                15k salary
                                        </p>
                                </div>
                        </div>
                        <div className='query-contnet'>{dataDisplay()}</div>
                </div>
        );
};

export default QueryRequirment;
