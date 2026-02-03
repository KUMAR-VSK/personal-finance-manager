import React, { useState, useEffect } from 'react';

export function BudgetPlanner() {
    const [income, setIncome] = useState(() => {
        return localStorage.getItem('budgetIncome') || '';
    });
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('budgetExpenses');
        return saved ? JSON.parse(saved) : {
            housing: '',
            food: '',
            transportation: '',
            utilities: '',
            entertainment: '',
            savings: '',
            other: ''
        };
    });
    const [result, setResult] = useState(null);

    useEffect(() => {
        localStorage.setItem('budgetIncome', income);
    }, [income]);

    useEffect(() => {
        localStorage.setItem('budgetExpenses', JSON.stringify(expenses));
    }, [expenses]);

    const calculateBudget = () => {
        const monthlyIncome = parseFloat(income);

        if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
            alert('Please enter a valid monthly income');
            return;
        }

        const totalExpenses = Object.values(expenses).reduce((sum, exp) => {
            const val = parseFloat(exp) || 0;
            return sum + val;
        }, 0);

        const balance = monthlyIncome - totalExpenses;
        const savingsPercentage = (balance / monthlyIncome) * 100;

        setResult({
            income: monthlyIncome,
            totalExpenses: totalExpenses,
            balance: balance,
            savingsPercentage: savingsPercentage.toFixed(1)
        });
    };

    const handleExpenseChange = (category, value) => {
        setExpenses({ ...expenses, [category]: value });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Monthly Budget Planner</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Plan your monthly budget using the 50/30/20 rule: 50% needs, 30% wants, 20% savings.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Income</h2>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Monthly Income (₹)</label>
                        <input
                            type="number"
                            value={income}
                            onChange={(e) => setIncome(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter your monthly income"
                        />
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Expenses</h2>
                    <div className="space-y-3">
                        {[
                            { key: 'housing', label: 'Housing (Rent/EMI)' },
                            { key: 'food', label: 'Food & Groceries' },
                            { key: 'transportation', label: 'Transportation' },
                            { key: 'utilities', label: 'Utilities & Bills' },
                            { key: 'entertainment', label: 'Entertainment' },
                            { key: 'savings', label: 'Savings/Investments' },
                            { key: 'other', label: 'Other' }
                        ].map(({ key, label }) => (
                            <div key={key}>
                                <label className="block text-xs font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>
                                <input
                                    type="number"
                                    value={expenses[key]}
                                    onChange={(e) => handleExpenseChange(key, e.target.value)}
                                    className="w-full p-2 border rounded text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    placeholder="0"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={calculateBudget}
                        className="w-full mt-4 bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                    >
                        Calculate Budget
                    </button>
                </div>
            </div>

            {result && (
                <div className="mt-6 bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800 animate-fadeIn">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Budget Summary</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded transition-colors">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Monthly Income</p>
                            <p className="text-2xl font-bold text-black dark:text-white">₹{result.income.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded transition-colors">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Expenses</p>
                            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200">₹{result.totalExpenses.toLocaleString()}</p>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded transition-colors">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Balance</p>
                            <p className={`text-2xl font-bold ${result.balance >= 0 ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400'}`}>
                                ₹{result.balance.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">({result.savingsPercentage}% of income)</p>
                        </div>
                    </div>
                    {result.balance < 0 && (
                        <div className="mt-4 bg-gray-50 dark:bg-gray-700 border-l-4 border-black dark:border-white p-4 transition-colors">
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                                ⚠️ Warning: Your expenses exceed your income. Consider reducing discretionary spending.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
