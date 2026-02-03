// ============================================
// UTILITY: LocalStorage Helper
// Add this at the top of App.jsx after imports
// ============================================

// Custom hook for localStorage with React state
function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

// Export to CSV utility
function exportToCSV(data, filename) {
    if (!data || data.length === 0) {
        alert('No data to export');
        return;
    }

    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => {
            const value = row[header];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Export calculator result to PDF (using print)
function exportToPDF() {
    window.print();
}

// ============================================
// ENHANCED EXPENSE TRACKER with localStorage & Export
// Replace existing ExpenseTracker function
// ============================================

function ExpenseTracker() {
    const [expenses, setExpenses] = useLocalStorage('expenses', []);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('food');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

    const categories = [
        { value: 'food', label: 'Food & Dining', color: 'bg-red-100 text-red-800' },
        { value: 'transport', label: 'Transportation', color: 'bg-blue-100 text-blue-800' },
        { value: 'shopping', label: 'Shopping', color: 'bg-purple-100 text-purple-800' },
        { value: 'bills', label: 'Bills & Utilities', color: 'bg-yellow-100 text-yellow-800' },
        { value: 'entertainment', label: 'Entertainment', color: 'bg-pink-100 text-pink-800' },
        { value: 'healthcare', label: 'Healthcare', color: 'bg-green-100 text-green-800' },
        { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
    ];

    const addExpense = () => {
        if (!description || !amount) {
            alert('Please fill all fields');
            return;
        }

        const newExpense = {
            id: Date.now(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            date: date,
            categoryLabel: categories.find(c => c.value === category)?.label || category
        };

        setExpenses([newExpense, ...expenses]);
        setDescription('');
        setAmount('');
        setCategory('food');
        setDate(new Date().toISOString().split('T')[0]);
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const clearAllExpenses = () => {
        if (window.confirm('Are you sure you want to delete all expenses?')) {
            setExpenses([]);
        }
    };

    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

    const getCategoryTotal = (cat) => {
        return expenses
            .filter(exp => exp.category === cat)
            .reduce((sum, exp) => sum + exp.amount, 0);
    };

    const handleExportCSV = () => {
        const exportData = expenses.map(exp => ({
            Date: exp.date,
            Description: exp.description,
            Category: exp.categoryLabel,
            Amount: exp.amount
        }));
        exportToCSV(exportData, `expenses_${new Date().toISOString().split('T')[0]}.csv`);
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Expense Tracker</h1>
                <div className="flex gap-2">
                    {expenses.length > 0 && (
                        <>
                            <button onClick={handleExportCSV}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                                <span>📥</span> Export CSV
                            </button>
                            <button onClick={exportToPDF}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2">
                                <span>📄</span> Print/PDF
                            </button>
                            <button onClick={clearAllExpenses}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Clear All
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-6">
                <p className="text-sm text-purple-700">
                    Track your daily expenses across categories. Data is automatically saved in your browser.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="md:col-span-1 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <input
                                type="text"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="What did you buy?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-2 border rounded"
                                placeholder="0"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Category</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                {categories.map(cat => (
                                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Date</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full p-2 border rounded"
                            />
                        </div>

                        <button
                            onClick={addExpense}
                            className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700"
                        >
                            Add Expense
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2">
                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Summary</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-4 bg-purple-50 rounded">
                                <p className="text-sm text-gray-600">Total Spent</p>
                                <p className="text-2xl font-bold text-purple-600">₹{totalExpenses.toLocaleString()}</p>
                            </div>
                            <div className="text-center p-4 bg-blue-50 rounded">
                                <p className="text-sm text-gray-600">Transactions</p>
                                <p className="text-2xl font-bold text-blue-600">{expenses.length}</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded">
                                <p className="text-sm text-gray-600">This Month</p>
                                <p className="text-2xl font-bold text-green-600">
                                    ₹{expenses.filter(e => e.date.startsWith(new Date().toISOString().slice(0, 7))).reduce((s, e) => s + e.amount, 0).toLocaleString()}
                                </p>
                            </div>
                            <div className="text-center p-4 bg-orange-50 rounded">
                                <p className="text-sm text-gray-600">Avg/Day</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    ₹{expenses.length > 0 ? Math.round(totalExpenses / expenses.length).toLocaleString() : 0}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-xl font-semibold mb-4">Category Breakdown</h2>
                        <div className="space-y-3">
                            {categories.map(cat => {
                                const total = getCategoryTotal(cat.value);
                                const percentage = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0;

                                if (total === 0) return null;

                                return (
                                    <div key={cat.value}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-medium">{cat.label}</span>
                                            <span className="text-sm font-semibold">₹{total.toLocaleString()} ({percentage.toFixed(1)}%)</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${percentage}%` }}></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
                        {expenses.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">No expenses yet. Add your first expense above!</p>
                        ) : (
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {expenses.map(exp => {
                                    const cat = categories.find(c => c.value === exp.category);
                                    return (
                                        <div key={exp.id} className="flex justify-between items-center p-3 border-b hover:bg-gray-50">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-xs px-2 py-1 rounded ${cat?.color || 'bg-gray-100 text-gray-800'}`}>
                                                        {cat?.label || exp.category}
                                                    </span>
                                                    <span className="font-medium">{exp.description}</span>
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">{new Date(exp.date).toLocaleDateString('en-IN')}</p>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="font-semibold text-lg">₹{exp.amount.toLocaleString()}</span>
                                                <button
                                                    onClick={() => deleteExpense(exp.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Save this file as: ENHANCED_TRACKERS_WITH_STORAGE.jsx
// Then replace existing functions in App.jsx
