import React, { useState, useEffect } from 'react';

export default function Cabs() {
    const [formData, setFormData] = useState({});
    const [cabs, setCabs] = useState([]);

    useEffect(() => {
        fetchCabs();
    }, []);

    const fetchCabs = async () => {
        try {
            const res = await fetch('/api/cab/get');
            const data = await res.json();
            setCabs(data);
        } catch (error) {
            console.log("fetchCabs" + error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/cab/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            console.log(data);
            fetchCabs();
        } catch (error) {
            console.log("handleSubmit" + error);
        }
    };

    const handleDelete = async (cabId) => {
        try {
            const res = await fetch(`/api/cab/delete?id=${cabId}`, {
                method: 'GET',
            });
            const data = await res.json();
            console.log(data);
            fetchCabs();
        } catch (error) {
            console.log("handleDelete" + error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <form onSubmit={handleSubmit} className="mb-6">
                <input
                    type="text"
                    placeholder="Cab Number"
                    id="cab_number"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Car Type"
                    id="type"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type="number"
                    placeholder="Charge per Minute"
                    id="price_per_minute"
                    onChange={handleChange}
                    className="block w-full px-4 py-2 mb-2 border rounded-md focus:outline-none focus:border-blue-500"
                />
                <button type="submit" className="block w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                    Submit
                </button>
            </form>

            <div>
                <h2 className="text-lg font-semibold mb-3">All Cabs</h2>
                <ul>
                    {cabs.map((cab) => (
                        <li key={cab.id} className="flex justify-between items-center px-4 py-2 mb-2 bg-gray-100 rounded-md">
                            <div>
                                <p className="text-sm font-medium">Cab Number: {cab.cab_number}</p>
                                <p className="text-sm font-medium">Car Type: {cab.type}</p>
                                <p className="text-sm font-medium">Charge per Minute: {cab.price_per_minute}</p>
                            </div>
                            <button onClick={() => handleDelete(cab._id)} className="px-3 py-1 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
