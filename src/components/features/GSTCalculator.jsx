import React, { useState } from 'react';

export function GSTCalculator() {
    const [amount, setAmount] = useState('');
    const [gstRate, setGstRate] = useState('18');
    const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive
    const [result, setResult] = useState(null);

    const calculateGST = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(gstRate) / 100;

        if (isNaN(amt) || amt <= 0) {
            alert('Please enter a valid amount');
            return;
        }

        let gstAmount, cgst, sgst, totalAmount, originalAmount;

        if (calculationType === 'exclusive') {
            // Amount is excluding GST
            gstAmount = amt * rate;
            totalAmount = amt + gstAmount;
            originalAmount = amt;
        } else {
            // Amount includes GST
            gstAmount = amt - (amt / (1 + rate));
            totalAmount = amt;
            originalAmount = amt - gstAmount;
        }

        cgst = gstAmount / 2;
        sgst = gstAmount / 2;

        setResult({
            originalAmount: originalAmount.toFixed(2),
            gstAmount: gstAmount.toFixed(2),
            cgst: cgst.toFixed(2),
            sgst: sgst.toFixed(2),
            totalAmount: totalAmount.toFixed(2)
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">GST Calculator</h1>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount (₹)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter amount"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">GST Rate (%)</label>
                        <select
                            value={gstRate}
                            onChange={(e) => setGstRate(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        >
                            <option value="5">5%</option>
                            <option value="12">12%</option>
                            <option value="18">18%</option>
                            <option value="28">28%</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Calculation Type</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center text-gray-700 dark:text-gray-300">
                                <input
                                    type="radio"
                                    value="exclusive"
                                    checked={calculationType === 'exclusive'}
                                    onChange={(e) => setCalculationType(e.target.value)}
                                    className="mr-2 text-black focus:ring-black"
                                />
                                GST Exclusive (Add GST)
                            </label>
                            <label className="flex items-center text-gray-700 dark:text-gray-300">
                                <input
                                    type="radio"
                                    value="inclusive"
                                    checked={calculationType === 'inclusive'}
                                    onChange={(e) => setCalculationType(e.target.value)}
                                    className="mr-2 text-black focus:ring-black"
                                />
                                GST Inclusive (Remove GST)
                            </label>
                        </div>
                    </div>

                    <button
                        onClick={calculateGST}
                        className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                    >
                        Calculate GST
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800 animate-fadeIn">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">GST Breakdown</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Net Amount</span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">₹{parseFloat(result.originalAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">CGST ({parseFloat(gstRate) / 2}%)</span>
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{parseFloat(result.cgst).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">SGST ({parseFloat(gstRate) / 2}%)</span>
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{parseFloat(result.sgst).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">Total Amount</span>
                            <span className="text-2xl font-bold text-black dark:text-white">₹{parseFloat(result.totalAmount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
