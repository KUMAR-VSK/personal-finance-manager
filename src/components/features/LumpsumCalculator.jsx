import React, { useState } from 'react';
import { SliderInput } from '../ui/SliderInput';
import { DonutChart } from '../ui/DonutChart';
import { Wallet, PieChart } from 'lucide-react';

export function LumpsumCalculator() {
    const [investment, setInvestment] = useState(100000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);

    const calculateReturns = () => {
        const totalValue = investment * Math.pow((1 + rate / 100), years);
        const estReturns = totalValue - investment;
        return {
            totalValue: Math.round(totalValue),
            estReturns: Math.round(estReturns),
            invested: investment
        };
    };

    const { totalValue, estReturns, invested } = calculateReturns();

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-indigo-500" />
                    Lumpsum Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Calculate returns on your one-time mutual fund investments.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderInput
                        label="Total Investment"
                        value={investment}
                        setValue={setInvestment}
                        min={500}
                        max={10000000}
                        step={500}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Expected Return Rate (p.a)"
                        value={rate}
                        setValue={setRate}
                        min={1}
                        max={30}
                        step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Time Period"
                        value={years}
                        setValue={setYears}
                        min={1}
                        max={40}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <DonutChart
                        data={[
                            { name: 'Invested Amount', value: invested, color: '#4F46E5' },
                            { name: 'Est. Returns', value: estReturns, color: '#10B981' }
                        ]}
                        totalLabel="Total Value"
                        totalValue={`₹${totalValue.toLocaleString()}`}
                    />

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Invested Amount</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{invested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Est. Returns</span>
                            <span className="text-lg font-bold text-green-500">₹{estReturns.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800">
                            <span className="text-gray-900 dark:text-gray-200 font-medium">Total Value</span>
                            <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{totalValue.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
