import React, { useState } from 'react';

export function RetirementCalculator() {
    const [currentAge, setCurrentAge] = useState('30');
    const [retirementAge, setRetirementAge] = useState('60');
    const [monthlyExpense, setMonthlyExpense] = useState('');
    const [inflation, setInflation] = useState('6');
    const [returnRate, setReturnRate] = useState('12');
    const [result, setResult] = useState(null);

    const calculateRetirement = () => {
        const age = parseInt(currentAge);
        const retAge = parseInt(retirementAge);
        const expense = parseFloat(monthlyExpense);
        const inf = parseFloat(inflation) / 100;
        const ret = parseFloat(returnRate) / 100;

        if (isNaN(age) || isNaN(retAge) || isNaN(expense) || retAge <= age) {
            alert('Please enter valid details');
            return;
        }

        const yearsToRetirement = retAge - age;
        const yearsInRetirement = 85 - retAge;

        // Future value of monthly expenses at retirement
        const futureMonthlyExpense = expense * Math.pow(1 + inf, yearsToRetirement);
        const annualExpenseAtRetirement = futureMonthlyExpense * 12;

        // Calculate required corpus using PV of Annuity for retirement years
        // Inflation-adjusted return (Real Rate of Return)
        const realRate = (1 + ret) / (1 + inf) - 1;

        // Corpus needed to fund expenses for yearsInRetirement
        // PV = Payment * [ (1 - (1+r)^-n) / r ]
        // Payment is annualExpenseAtRetirement

        let corpusNeeded;
        if (realRate === 0) {
            corpusNeeded = annualExpenseAtRetirement * yearsInRetirement;
        } else {
            corpusNeeded = annualExpenseAtRetirement * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
        }

        // Monthly SIP needed
        const monthlyRate = ret / 12;
        const months = yearsToRetirement * 12;
        const monthlySIP = corpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

        setResult({
            corpusNeeded: corpusNeeded.toFixed(0),
            monthlySIP: monthlySIP.toFixed(0),
            futureExpense: futureMonthlyExpense.toFixed(0),
            yearsToRetirement: yearsToRetirement
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Retirement Calculator</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Plan your retirement by calculating the corpus you'll need and the monthly savings required.
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Current Age</label>
                            <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Retirement Age</label>
                            <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Current Monthly Expense (₹)</label>
                        <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="How much do you spend monthly?" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Expected Inflation (%)</label>
                            <input type="number" value={inflation} onChange={(e) => setInflation(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Exp. Return on Inv. (%)</label>
                            <input type="number" value={returnRate} onChange={(e) => setReturnRate(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                        </div>
                    </div>

                    <button onClick={calculateRetirement} className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg">
                        Calculate Plan
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Retirement Plan Summary</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Target Corpus Required</span>
                                <span className="text-2xl font-bold text-black dark:text-white">₹{parseFloat(result.corpusNeeded).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                                <span className="text-gray-600 dark:text-gray-400">Monthly SIP Needed</span>
                                <span className="text-xl font-bold text-green-600 dark:text-green-400">₹{parseFloat(result.monthlySIP).toLocaleString()}</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded text-sm text-gray-700 dark:text-gray-300">
                                In {result.yearsToRetirement} years, due to inflation, your monthly expense of ₹{parseInt(monthlyExpense).toLocaleString()} will become <strong>₹{parseFloat(result.futureExpense).toLocaleString()}</strong>.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
