import React, { useState } from 'react';

export function PPFCalculator() {
    const [yearlyDeposit, setYearlyDeposit] = useState('');
    const [tenure, setTenure] = useState('15');
    const [result, setResult] = useState(null);

    const calculatePPF = () => {
        const P = parseFloat(yearlyDeposit);
        const t = parseFloat(tenure);
        const r = 0.071; // Current PPF rate 7.1%

        if (isNaN(P) || P <= 0 || P > 150000) {
            alert('Please enter valid yearly deposit (max ₹1.5 lakh)');
            return;
        }

        if (t < 15) {
            alert('Minimum PPF tenure is 15 years');
            return;
        }

        // PPF calculation with annual compounding
        let maturityAmount = 0;
        for (let year = 1; year <= t; year++) {
            maturityAmount = (maturityAmount + P) * (1 + r);
        }

        const totalInvested = P * t;
        const totalInterest = maturityAmount - totalInvested;

        setResult({
            invested: totalInvested.toFixed(0),
            interest: totalInterest.toFixed(0),
            maturity: maturityAmount.toFixed(0)
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">PPF Calculator</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Public Provident Fund is a long-term savings scheme backed by the Government of India with tax benefits under Section 80C.
                    Current interest rate: 7.1% per annum (compounded annually).
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Yearly Deposit (₹)</label>
                        <input
                            type="number"
                            value={yearlyDeposit}
                            onChange={(e) => setYearlyDeposit(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter yearly deposit amount"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum: ₹500, Maximum: ₹1,50,000 per year</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Tenure (Years)</label>
                        <select
                            value={tenure}
                            onChange={(e) => setTenure(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                        >
                            <option value="15">15 years</option>
                            <option value="20">20 years</option>
                            <option value="25">25 years</option>
                            <option value="30">30 years</option>
                        </select>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Minimum tenure is 15 years</p>
                    </div>

                    <button
                        onClick={calculatePPF}
                        className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                    >
                        Calculate Maturity
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">PPF Maturity Details</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Total Investment</span>
                                <span className="text-lg font-semibold text-gray-900 dark:text-gray-200">₹{parseFloat(result.invested).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Interest Earned</span>
                                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{parseFloat(result.interest).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-2">
                                <span className="text-gray-800 dark:text-gray-200 font-medium">Maturity Value</span>
                                <span className="text-2xl font-bold text-black dark:text-white">₹{parseFloat(result.maturity).toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 transition-colors">
                        <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Tax Benefits:</p>
                        <ul className="text-xs text-gray-700 dark:text-gray-400 mt-2 space-y-1">
                            <li>• Deposits qualify for deduction under Section 80C</li>
                            <li>• Interest earned is tax-free</li>
                            <li>• Maturity amount is completely tax-free</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
