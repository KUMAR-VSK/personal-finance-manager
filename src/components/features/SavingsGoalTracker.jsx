import React, { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';

export function SavingsGoalTracker() {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem('savingsGoals');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('savingsGoals', JSON.stringify(goals));
    }, [goals]);
    const [goalName, setGoalName] = useState('');
    const [targetAmount, setTargetAmount] = useState('');
    const [currentSavings, setCurrentSavings] = useState('');
    const [targetDate, setTargetDate] = useState('');

    const addGoal = () => {
        if (!goalName || !targetAmount || !targetDate) {
            alert('Please fill all fields');
            return;
        }

        const target = parseFloat(targetAmount);
        const current = parseFloat(currentSavings) || 0;
        const today = new Date();
        const target_date = new Date(targetDate);
        const monthsRemaining = (target_date.getFullYear() - today.getFullYear()) * 12 + (target_date.getMonth() - today.getMonth());
        const monthlySavingsNeeded = monthsRemaining > 0 ? (target - current) / monthsRemaining : 0;

        const newGoal = {
            id: Date.now(),
            name: goalName,
            targetAmount: target,
            currentSavings: current,
            targetDate: targetDate,
            progress: (current / target) * 100,
            monthsRemaining: monthsRemaining,
            monthlySavingsNeeded: monthlySavingsNeeded
        };

        setGoals([...goals, newGoal]);
        setGoalName('');
        setTargetAmount('');
        setCurrentSavings('');
        setTargetDate('');
    };

    const deleteGoal = (id) => {
        setGoals(goals.filter(goal => goal.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Savings Goal Tracker</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Set financial goals and track your progress. Calculate monthly savings needed to reach your targets.
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Add New Goal</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Goal Name</label>
                        <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="e.g., Car, House, Vacation" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Target Amount (₹)</label>
                        <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="Target amount" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Current Savings (₹)</label>
                        <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" placeholder="Amount saved so far" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Target Date</label>
                        <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white" />
                    </div>
                </div>
                <button onClick={addGoal} className="mt-4 w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg">
                    Add Goal
                </button>
            </div>

            {goals.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Goals ({goals.length})</h2>
                    {goals.map(goal => (
                        <div key={goal.id} className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800 animate-fadeIn">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-black dark:text-white">{goal.name}</h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => deleteGoal(goal.id)} className="text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors" title="Delete Goal">
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Target Amount</p>
                                    <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">₹{goal.targetAmount.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Current Savings</p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{goal.currentSavings.toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Remaining</p>
                                    <p className="text-lg font-semibold text-black dark:text-white">₹{(goal.targetAmount - goal.currentSavings).toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="mb-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 dark:text-gray-300">Progress</span>
                                    <span className="font-semibold text-black dark:text-white">{goal.progress.toFixed(1)}%</span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                                    <div className="bg-black dark:bg-white h-3 rounded-full transition-all duration-1000" style={{ width: `${Math.min(goal.progress, 100)}%` }}></div>
                                </div>
                            </div>
                            {goal.monthsRemaining > 0 && (
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded transition-colors">
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Save ₹{goal.monthlySavingsNeeded.toFixed(0).toLocaleString()}/month for {goal.monthsRemaining} months to reach your goal
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
