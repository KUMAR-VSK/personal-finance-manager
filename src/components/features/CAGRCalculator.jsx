import { useState } from 'react';

export function CAGRCalculator() {
    const [mode, setMode] = useState('basic'); // 'basic' or 'advanced'
    const [initialValue, setInitialValue] = useState('');
    const [finalValue, setFinalValue] = useState('');
    const [years, setYears] = useState('');
    const [months, setMonths] = useState('0');

    // Advanced mode - multiple investments
    const [investments, setInvestments] = useState([
        { year: '0', amount: '' },
    ]);

    const [result, setResult] = useState(null);

    const calculateCAGR = () => {
        if (mode === 'basic') {
            const beginning = parseFloat(initialValue);
            const ending = parseFloat(finalValue);
            const timeYears = parseFloat(years);
            const timeMonths = parseFloat(months) || 0;

            if (isNaN(beginning) || beginning <= 0 || isNaN(ending) || ending <= 0 || isNaN(timeYears) || timeYears < 0) {
                alert('Please enter valid values');
                return;
            }

            const totalTime = timeYears + (timeMonths / 12);

            if (totalTime <= 0) {
                alert('Time period must be greater than 0');
                return;
            }

            // CAGR formula: [(Ending Value / Beginning Value) ^ (1 / Number of Years)] - 1
            const cagr = (Math.pow(ending / beginning, 1 / totalTime) - 1) * 100;
            const absoluteReturn = ((ending - beginning) / beginning) * 100;
            const totalGain = ending - beginning;

            // Calculate year-by-year breakdown
            const yearlyBreakdown = [];
            let currentValue = beginning;
            const wholeYears = Math.floor(totalTime);

            for (let i = 1; i <= wholeYears; i++) {
                const previousValue = currentValue;
                currentValue = previousValue * (1 + cagr / 100);
                yearlyBreakdown.push({
                    year: i,
                    startValue: previousValue,
                    endValue: currentValue,
                    growth: currentValue - previousValue,
                    percentage: cagr
                });
            }

            // Add partial year if exists
            if (timeMonths > 0 && wholeYears === timeYears) {
                const previousValue = currentValue;
                const partialGrowth = (cagr / 100) * (timeMonths / 12);
                currentValue = previousValue * (1 + partialGrowth);
                yearlyBreakdown.push({
                    year: `${wholeYears + 1} (${timeMonths} months)`,
                    startValue: previousValue,
                    endValue: currentValue,
                    growth: currentValue - previousValue,
                    percentage: (partialGrowth * 100)
                });
            }

            setResult({
                cagr: cagr.toFixed(2),
                absoluteReturn: absoluteReturn.toFixed(2),
                totalGain: totalGain.toFixed(0),
                initialInvestment: beginning.toFixed(0),
                finalValue: ending.toFixed(0),
                duration: totalTime.toFixed(2),
                yearlyBreakdown
            });
        } else {
            // Advanced mode calculation
            alert('Advanced mode calculation coming soon!');
        }
    };

    const addInvestment = () => {
        setInvestments([...investments, { year: '', amount: '' }]);
    };

    const removeInvestment = (index) => {
        const updated = investments.filter((_, i) => i !== index);
        setInvestments(updated);
    };

    const updateInvestment = (index, field, value) => {
        const updated = [...investments];
        updated[index][field] = value;
        setInvestments(updated);
    };

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3 text-black">
                    CAGR Calculator
                </h1>
                <p className="text-gray-600 text-lg">
                    Calculate Compound Annual Growth Rate (CAGR) of your investments
                </p>
            </div>

            {/* Info Banner */}
            <div className="bg-gray-50 border-l-4 border-black p-6 mb-8 rounded-xl shadow-md">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-bold text-gray-900 mb-1">What is CAGR?</h3>
                        <p className="text-sm text-gray-700">
                            CAGR (Compound Annual Growth Rate) is the rate of return that would be required for an investment to grow from its beginning balance to its ending balance, assuming profits were reinvested at the end of each year. It's one of the most accurate ways to calculate and determine returns for individual assets, investment portfolios, and anything that can rise or fall in value over time.
                        </p>
                    </div>
                </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setMode('basic')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${mode === 'basic'
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'bg-surface text-gray-700 border-2 border-gray-200 hover:border-gray-400'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        Basic Calculator
                    </div>
                </button>
                <button
                    onClick={() => setMode('advanced')}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${mode === 'advanced'
                        ? 'bg-black text-white shadow-lg scale-105'
                        : 'bg-surface text-gray-700 border-2 border-gray-200 hover:border-gray-400'
                        }`}
                >
                    <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Advanced Mode
                    </div>
                </button>
            </div>

            {/* Calculator Form */}
            {mode === 'basic' ? (
                <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Calculate Your Returns</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Initial Investment (₹)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input
                                    type="number"
                                    value={initialValue}
                                    onChange={(e) => setInitialValue(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                                    placeholder="100000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Final Value (₹)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input
                                    type="number"
                                    value={finalValue}
                                    onChange={(e) => setFinalValue(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                                    placeholder="250000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Investment Period (Years)
                            </label>
                            <input
                                type="number"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                                placeholder="5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Additional Months (Optional)
                            </label>
                            <input
                                type="number"
                                min="0"
                                max="11"
                                value={months}
                                onChange={(e) => setMonths(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                                placeholder="0"
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter 0-11 months for precise calculation</p>
                        </div>
                    </div>

                    <button
                        onClick={calculateCAGR}
                        className="w-full mt-8 bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        Calculate CAGR
                    </button>
                </div>
            ) : (
                <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Multiple Investments (Advanced)</h2>
                    <div className="bg-gray-50 border-l-4 border-black p-4 mb-6 rounded">
                        <p className="text-sm text-gray-700">
                            Track multiple investments made at different times. This feature is coming soon!
                        </p>
                    </div>
                    <div className="space-y-4">
                        {investments.map((investment, index) => (
                            <div key={index} className="flex gap-4 items-end">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">Year</label>
                                    <input
                                        type="number"
                                        value={investment.year}
                                        onChange={(e) => updateInvestment(index, 'year', e.target.value)}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl"
                                        placeholder="0"
                                    />
                                </div>
                                <div className="flex-1">
                                    <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                                    <input
                                        type="number"
                                        value={investment.amount}
                                        onChange={(e) => updateInvestment(index, 'amount', e.target.value)}
                                        className="w-full p-3 border-2 border-gray-200 rounded-xl"
                                        placeholder="100000"
                                    />
                                </div>
                                {investments.length > 1 && (
                                    <button
                                        onClick={() => removeInvestment(index)}
                                        className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                    <button
                        onClick={addInvestment}
                        className="mt-4 px-6 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                        + Add Investment
                    </button>
                </div>
            )}

            {/* Results Section */}
            {result && (
                <div className="space-y-6 animate-slide-up">
                    {/* Key Metrics Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-black p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold opacity-90">CAGR</h3>
                                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <p className="text-4xl font-bold mb-2">{result.cagr}%</p>
                            <p className="text-xs opacity-80">Annual Growth Rate</p>
                        </div>

                        <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold opacity-90">Total Gain</h3>
                                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-4xl font-bold mb-2">₹{parseFloat(result.totalGain).toLocaleString()}</p>
                            <p className="text-xs opacity-80">Absolute Profit</p>
                        </div>

                        <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold opacity-90">Absolute Return</h3>
                                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <p className="text-4xl font-bold mb-2">{result.absoluteReturn}%</p>
                            <p className="text-xs opacity-80">Total Returns</p>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
                            Investment Summary
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600 font-medium">Initial Investment</span>
                                    <span className="text-xl font-bold text-gray-800">₹{parseFloat(result.initialInvestment).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600 font-medium">Final Value</span>
                                    <span className="text-xl font-bold text-black">₹{parseFloat(result.finalValue).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600 font-medium">Investment Duration</span>
                                    <span className="text-xl font-bold text-gray-800">{result.duration} years</span>
                                </div>
                                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                                    <span className="text-gray-600 font-medium">Money Multiplier</span>
                                    <span className="text-xl font-bold text-black">{(parseFloat(result.finalValue) / parseFloat(result.initialInvestment)).toFixed(2)}x</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Year-by-Year Breakdown */}
                    {result.yearlyBreakdown && result.yearlyBreakdown.length > 0 && (
                        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                                <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
                                Year-by-Year Growth
                            </h2>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tl-xl">Year</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Start Value</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">End Value</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Growth</th>
                                            <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tr-xl">Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {result.yearlyBreakdown.map((year, index) => (
                                            <tr key={index} className="hover:bg-orange-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                                                            {typeof year.year === 'number' ? year.year : '★'}
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-900">Year {year.year}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-700">
                                                    ₹{year.startValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-black">
                                                    ₹{year.endValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right">
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                                                        +₹{year.growth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-black">
                                                    {year.percentage.toFixed(2)}%
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Insights & Tips */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-black mb-2">Understanding CAGR</h3>
                                    <p className="text-sm text-gray-700">
                                        CAGR smooths out volatility and gives you the average annual growth rate. A higher CAGR indicates better investment performance over time. For reference, the Nifty 50 has delivered approximately 12-15% CAGR over the long term.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg font-bold text-black mb-2">Investment Tip</h3>
                                    <p className="text-sm text-gray-700">
                                        {parseFloat(result.cagr) > 15
                                            ? "Excellent returns! Your investment has outperformed most market indices. Consider maintaining this strategy."
                                            : parseFloat(result.cagr) > 10
                                                ? "Good performance! Your returns are competitive with market benchmarks. Keep up the consistent investing."
                                                : "Your returns could be improved. Consider reviewing your investment strategy and diversifying your portfolio for better growth."}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
