import React, { useState } from 'react';

export function TDSCalculator() {
    const [amount, setAmount] = useState('');
    const [tdsRate, setTdsRate] = useState('10');
    const [incomeType, setIncomeType] = useState('salary');
    const [result, setResult] = useState(null);

    const calculateTDS = () => {
        const amt = parseFloat(amount);
        const rate = parseFloat(tdsRate);

        if (isNaN(amt) || amt <= 0) {
            alert('Please enter valid amount');
            return;
        }

        const tdsAmount = (amt * rate) / 100;
        const netAmount = amt - tdsAmount;

        setResult({
            grossAmount: amt.toFixed(0),
            tdsAmount: tdsAmount.toFixed(0),
            netAmount: netAmount.toFixed(0),
            tdsRate: rate
        });
    };

    const incomeTypes = [
        { value: 'salary', label: 'Salary', rate: '10' },
        { value: 'professional', label: 'Professional Fees', rate: '10' },
        { value: 'commission', label: 'Commission', rate: '5' },
        { value: 'rent', label: 'Rent', rate: '10' },
        { value: 'contractor', label: 'Contractor', rate: '2' },
        { value: 'interest', label: 'Interest (Bank)', rate: '10' },
        { value: 'dividend', label: 'Dividend', rate: '10' },
        { value: 'lottery', label: 'Lottery/Gambling', rate: '30' }
    ];

    return (
        <div className="max-w-2xl mx-auto animate-slide-up">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">TDS Calculator</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 rounded-r-lg transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Calculate Tax Deducted at Source (TDS) on various income types as per IT Act.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6 border border-gray-100 dark:border-gray-700 transition-colors">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Income Type</label>
                        <select value={incomeType}
                            onChange={(e) => {
                                setIncomeType(e.target.value);
                                const selected = incomeTypes.find(t => t.value === e.target.value);
                                setTdsRate(selected.rate);
                            }}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white">
                            {incomeTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label} ({type.rate}%)</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Gross Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="Enter gross amount" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">TDS Rate (%)</label>
                        <input type="number" step="0.1" value={tdsRate} onChange={(e) => setTdsRate(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                    </div>

                    <button onClick={calculateTDS}
                        className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg font-bold">
                        Calculate TDS
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 animate-fade-in transition-colors">
                    <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">TDS Calculation</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">Gross Amount</span>
                            <span className="text-lg font-semibold text-black dark:text-white">₹{parseFloat(result.grossAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b border-gray-100 dark:border-gray-700">
                            <span className="text-gray-600 dark:text-gray-400">TDS @ {result.tdsRate}%</span>
                            <span className="text-lg font-semibold text-black dark:text-white">₹{parseFloat(result.tdsAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-black dark:text-white font-medium">Net Amount Receivable</span>
                            <span className="text-2xl font-bold text-black dark:text-white">₹{parseFloat(result.netAmount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
