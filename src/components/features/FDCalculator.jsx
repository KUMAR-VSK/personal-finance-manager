import React, { useState } from 'react';

export function FDCalculator() {
    const [deposit, setDeposit] = useState('');
    const [rate, setRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [result, setResult] = useState(null);

    const calculateFD = () => {
        const P = parseFloat(deposit);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(tenure);

        if (isNaN(P) || P <= 0 || isNaN(r) || r < 0 || isNaN(t) || t <= 0) {
            alert('Please enter valid values');
            return;
        }

        // FD maturity with quarterly compounding
        const n = 4; // Quarterly compounding
        const maturityAmount = P * Math.pow((1 + r / n), n * t);
        const interest = maturityAmount - P;

        setResult({
            principal: P.toFixed(0),
            interest: interest.toFixed(0),
            maturity: maturityAmount.toFixed(0)
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Fixed Deposit Calculator</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Fixed Deposits are one of the safest investment options in India with guaranteed returns. Calculate your FD maturity amount here.
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Deposit Amount (₹)</label>
                        <input
                            type="number"
                            value={deposit}
                            onChange={(e) => setDeposit(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter deposit amount"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter interest rate"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current FD rates: 6-7.5% (varies by bank)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tenure (Years)</label>
                        <input
                            type="number"
                            step="0.5"
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="FD duration in years"
                        />
                    </div>

                    <button
                        onClick={calculateFD}
                        className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                    >
                        Calculate Maturity
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800 animate-fadeIn">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Maturity Details</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Principal Amount</span>
                            <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">₹{parseFloat(result.principal).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Interest Earned</span>
                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{parseFloat(result.interest).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">Maturity Amount</span>
                            <span className="text-2xl font-bold text-black dark:text-white">₹{parseFloat(result.maturity).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
