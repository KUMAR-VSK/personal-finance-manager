import { useState } from 'react';

export function EmergencyFundCalculator() {
    const [monthlyExpense, setMonthlyExpense] = useState('');
    const [months, setMonths] = useState('6');
    const [existingSavings, setExistingSavings] = useState('');
    const [result, setResult] = useState(null);

    const calculateEmergencyFund = () => {
        const expense = parseFloat(monthlyExpense);
        const duration = parseInt(months);
        const savings = parseFloat(existingSavings) || 0;

        if (isNaN(expense) || expense <= 0) {
            alert('Please enter valid monthly expense');
            return;
        }

        const requiredFund = expense * duration;
        const gap = requiredFund - savings;
        const percentageComplete = savings > 0 ? (savings / requiredFund) * 100 : 0;

        setResult({
            requiredFund: requiredFund.toFixed(0),
            existingSavings: savings.toFixed(0),
            gap: gap.toFixed(0),
            percentageComplete: percentageComplete.toFixed(1),
            isComplete: gap <= 0
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Emergency Fund Calculator</h1>

            <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
                <p className="text-sm text-gray-700">
                    Financial experts recommend keeping 3-6 months of expenses as an emergency fund.
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Monthly Expense (₹)</label>
                        <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(e.target.value)}
                            className="w-full p-2 border rounded" placeholder="Enter monthly expenses" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Coverage Duration (Months)</label>
                        <select value={months} onChange={(e) => setMonths(e.target.value)} className="w-full p-2 border rounded">
                            <option value="3">3 months</option>
                            <option value="6">6 months (Recommended)</option>
                            <option value="9">9 months</option>
                            <option value="12">12 months</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Existing Emergency Savings (₹)</label>
                        <input type="number" value={existingSavings} onChange={(e) => setExistingSavings(e.target.value)}
                            className="w-full p-2 border rounded" placeholder="Current emergency fund" />
                    </div>

                    <button onClick={calculateEmergencyFund}
                        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
                        Calculate Emergency Fund
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-surface p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Emergency Fund Status</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Required Fund</span>
                            <span className="text-lg font-semibold">₹{parseFloat(result.requiredFund).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">Current Savings</span>
                            <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.existingSavings).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b">
                            <span className="text-gray-600">{result.isComplete ? 'Surplus' : 'Gap'}</span>
                            <span className={`text-lg font-semibold ${result.isComplete ? 'text-gray-700' : 'text-gray-900'}`}>
                                ₹{Math.abs(parseFloat(result.gap)).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600">Progress</span>
                                <span className="font-semibold">{result.percentageComplete}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-4">
                                <div className={`h-4 rounded-full ${result.isComplete ? 'bg-black' : 'bg-gray-600'}`}
                                    style={{ width: `${Math.min(result.percentageComplete, 100)}%` }}></div>
                            </div>
                        </div>
                        {result.isComplete ? (
                            <div className="bg-gray-50 border-l-4 border-black p-4 mt-4">
                                <p className="text-sm text-gray-700 font-medium">✓ Your emergency fund is complete!</p>
                            </div>
                        ) : (
                            <div className="bg-gray-50 border-l-4 border-black p-4 mt-4">
                                <p className="text-sm text-gray-700 font-medium">
                                    You need ₹{Math.abs(parseFloat(result.gap)).toLocaleString()} more to complete your emergency fund.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
