import React, { useState, useEffect } from 'react';

export function ExpenseTracker() {
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const categories = [
        { value: 'food', label: 'Food & Dining', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'transport', label: 'Transportation', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'shopping', label: 'Shopping', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'bills', label: 'Bills & Utilities', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'entertainment', label: 'Entertainment', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'health', label: 'Healthcare', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200' }
    ];

    const addExpense = () => {
        if (!description || !amount || parseFloat(amount) <= 0) {
            alert('Please enter valid expense details');
            return;
        }

        const newExpense = {
            id: Date.now(),
            description,
            amount: parseFloat(amount),
            category,
            date
        };

        setExpenses([newExpense, ...expenses]);
        setDescription('');
        setAmount('');
        setCategory('food');
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const getCategoryColor = (cat) => {
        return categories.find(c => c.value === cat)?.color || 'bg-gray-100 dark:bg-gray-700';
    };

    const getCategoryLabel = (cat) => {
        return categories.find(c => c.value === cat)?.label || cat;
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Expense Tracker</h1>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-2 bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Expense</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                placeholder="What did you spend on?"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amount (₹)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                    placeholder="0.00"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Date</label>
                                <input
                                    type="date"
                                    value={date}
                                    onChange={(e) => setDate(e.target.value)}
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={addExpense}
                            className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>

                <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Summary</h2>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total Expenses</p>
                        <p className="text-3xl font-bold text-black dark:text-white">₹{totalExpenses.toLocaleString()}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</p>
                    </div>
                </div>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Expenses</h2>
                {expenses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expenses recorded yet. Add your first expense above!</p>
                ) : (
                    <div className="space-y-2">
                        {expenses.map(expense => (
                            <div key={expense.id} className="flex items-center justify-between p-3 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(expense.category)}`}>
                                            {getCategoryLabel(expense.category)}
                                        </span>
                                        <span className="font-medium text-gray-900 dark:text-white">{expense.description}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{new Date(expense.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-lg font-semibold text-gray-900 dark:text-white">₹{expense.amount.toLocaleString()}</span>
                                    <button
                                        onClick={() => deleteExpense(expense.id)}
                                        className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
                                        title="Delete"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
