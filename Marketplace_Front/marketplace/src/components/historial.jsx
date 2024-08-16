import React, { useState, useEffect } from 'react';

const getUserIdFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload._id;
        } catch (error) {
            console.error('Error decoding token:', error);
        }
    }
    return null;
};

const PaymentMethodTable = () => {
    const [paymentMethods, setPaymentMethods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const userId = getUserIdFromToken();
            if (!userId) return;

            try {
                const token = localStorage.getItem('authToken');
                const response = await fetch('http://localhost:4000/apipaymethod/paymentMethods', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ _id: userId }), // Enviar el userId como _id
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPaymentMethods(data.paymentMethods);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="container px-4 mx-auto">
            <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Métodos de Pago</h2>
                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
                    {paymentMethods.length} methods
                </span>
            </div>

            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Card Number</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                                    {paymentMethods.map((method) => (
                                        <tr key={method._id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{method.cardNumber}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{method.expiry}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{method.ownerName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{method.address}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PaymentMethodTable;

