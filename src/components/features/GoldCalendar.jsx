import React, { useState } from 'react';

// Generate dummy gold rates for a year
const generateGoldRates = (year, currentPrice = 6500) => {
    const rates = {};
    const start = new Date(year, 0, 1);
    const end = new Date(year + 1, 0, 1);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        if (dateStr === todayStr) {
            rates[dateStr] = currentPrice;
        } else {
            // Random rate between currentPrice - 500 and currentPrice + 500
            const variation = Math.floor(Math.random() * 1000) - 500;
            rates[dateStr] = Math.max(5500, Math.min(7500, currentPrice + variation));
        }
    }
    return rates;
};

export function GoldCalendar() {
    const currentDate = new Date();
    const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
    const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
    const [selectedDate, setSelectedDate] = useState(null);
    const [goldRates] = useState(() => generateGoldRates(selectedYear));

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
        const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
        const calendar = [];

        // Empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendar.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const rate = goldRates[dateStr];
            const isSelected = selectedDate === dateStr;
            const isToday = day === currentDate.getDate() && selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();

            calendar.push(
                <button
                    key={day}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`w-8 h-8 text-xs border rounded transition-colors ${isSelected
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : isToday
                            ? 'bg-gray-300 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-black dark:text-white'
                            : 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700'
                        } flex items-center justify-center`}
                    title={`₹${rate}/gram`}
                >
                    {day}
                </button>
            );
        }

        return calendar;
    };

    const selectedRate = selectedDate ? goldRates[selectedDate] : null;

    return (
        <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Gold Price Calendar</h1>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1">
                    <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {months[selectedMonth]} {selectedYear}
                            </h2>
                            <div className="flex gap-2">
                                <select
                                    value={selectedMonth}
                                    onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                    className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                >
                                    {months.map((month, index) => (
                                        <option key={index} value={index}>{month}</option>
                                    ))}
                                </select>
                                <select
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    className="p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                                >
                                    <option value={2023}>2023</option>
                                    <option value={2024}>2024</option>
                                    <option value={2025}>2025</option>
                                    <option value={2026}>2026</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {daysOfWeek.map(day => (
                                    <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                                        {day}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                                {renderCalendar()}
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                            <p>• Click on any date to view gold rate</p>
                            <p>• Gray/Dark square indicates today</p>
                            <p>• Black/White square indicates selected date</p>
                        </div>
                    </div>
                </div>

                <div className="lg:w-80">
                    <div className="bg-surface p-6 rounded-lg shadow sticky top-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Gold Rate Details</h3>
                        {selectedDate ? (
                            <div className="text-center">
                                <div className="text-3xl font-bold text-black dark:text-white mb-2">
                                    ₹{selectedRate?.toLocaleString()}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">per gram (22K gold)</p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    <p>Date: {new Date(selectedDate).toLocaleDateString('en-IN', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-gray-500 dark:text-gray-400">
                                <p>Select a date to view gold rate</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
