import React, { useState } from 'react';
import { SliderInput } from '../ui/SliderInput';
import { TrendingUp, ArrowRight } from 'lucide-react';

export function InflationCalculator() {
    const [currentCost, setCurrentCost] = useState(100000);
    const [inflationRate, setInflationRate] = useState(6);
    const [years, setYears] = useState(10);

    const calculateInflation = () => {
        const futureValue = currentCost * Math.pow((1 + inflationRate / 100), years);
        const increase = futureValue - currentCost;

        return {
            futureValue: Math.round(futureValue),
            increase: Math.round(increase)
        };
    };

    const { futureValue, increase } = calculateInflation();

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <TrendingUp className="w-6 h-6 text-red-500" />
                    Inflation Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Understand how inflation impacts your purchasing power over time.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderInput
                        label="Current Cost"
                        value={currentCost}
                        setValue={setCurrentCost}
                        min={1000}
                        max={10000000}
                        step={1000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Inflation Rate (p.a)"
                        value={inflationRate}
                        setValue={setInflationRate}
                        min={1}
                        max={15}
                        step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Time Period"
                        value={years}
                        setValue={setYears}
                        min={1}
                        max={50}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col justify-center">

                    <div className="flex items-center justify-between mb-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cost Today</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">₹{currentCost.toLocaleString()}</p>
                        </div>
                        <ArrowRight className="w-6 h-6 text-gray-400" />
                        <div className="text-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Cost in {years} Years</p>
                            <p className="text-2xl font-bold text-red-500">₹{futureValue.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-xl border border-red-100 dark:border-red-800/30 text-center">
                        <p className="text-gray-600 dark:text-gray-300 mb-2">Price Increase</p>
                        <p className="text-3xl font-extrabold text-red-600 dark:text-red-400">+ ₹{increase.toLocaleString()}</p>
                        <p className="text-xs text-red-400 dark:text-red-500 mt-2">
                            You will need ₹{futureValue.toLocaleString()} to buy the same thing that costs ₹{currentCost.toLocaleString()} today.
                        </p>
                    </div>

                    <div className="mt-8">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                        <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                            Purchasing power erosion over time due to inflation
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
