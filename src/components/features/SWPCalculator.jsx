import React, { useState } from 'react';
import { SliderInput } from '../ui/SliderInput';
import { DonutChart } from '../ui/DonutChart';
import { ArrowDownCircle } from 'lucide-react';

export function SWPCalculator() {
    const [totalInvestment, setTotalInvestment] = useState(1000000);
    const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(8);
    const [timePeriod, setTimePeriod] = useState(10);

    const calculateSWP = () => {
        let balance = totalInvestment;
        let totalWithdrawn = 0;
        const monthlyRate = expectedReturn / 12 / 100;
        const months = timePeriod * 12;

        for (let i = 0; i < months; i++) {
            if (balance <= 0) break;
            // Valid growth then withdrawal
            const growth = balance * monthlyRate;
            balance = balance + growth - withdrawalPerMonth;
            totalWithdrawn += withdrawalPerMonth;
        }

        // If balance became negative during calculation
        if (balance < 0) balance = 0;

        return {
            finalValue: Math.round(balance),
            totalWithdrawn: Math.round(totalWithdrawn),
            investment: totalInvestment
        };
    };

    const { finalValue, totalWithdrawn, investment } = calculateSWP();

    // Calculate total value generated (Withdrawn + Final Balance)
    const totalValueGenerated = totalWithdrawn + finalValue;

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <ArrowDownCircle className="w-6 h-6 text-orange-500" />
                    SWP Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Systematic Withdrawal Plan - Calculate your monthly cash flow from investments.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderInput
                        label="Total Investment"
                        value={totalInvestment}
                        setValue={setTotalInvestment}
                        min={100000}
                        max={50000000}
                        step={10000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Withdrawal Per Month"
                        value={withdrawalPerMonth}
                        setValue={setWithdrawalPerMonth}
                        min={500}
                        max={200000}
                        step={500}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Expected Return Rate (p.a)"
                        value={expectedReturn}
                        setValue={setExpectedReturn}
                        min={1}
                        max={30}
                        step={0.1}
                        suffix="%"
                    />
                    <SliderInput
                        label="Time Period"
                        value={timePeriod}
                        setValue={setTimePeriod}
                        min={1}
                        max={30}
                        suffix=" Years"
                    />
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <DonutChart
                        data={[
                            { name: 'Total Invested', value: investment, color: '#6B7280' },
                            { name: 'Total Withdrawn', value: totalWithdrawn, color: '#F97316' },
                            { name: 'Final Value', value: finalValue, color: '#10B981' }
                        ]}
                        totalLabel="Total Value"
                        totalValue={`₹${totalValueGenerated.toLocaleString()}`}
                    />

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Total Investment</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{investment.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Total Withdrawn</span>
                            <span className="text-lg font-bold text-orange-500">₹{totalWithdrawn.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Final Balance</span>
                            <span className="text-lg font-bold text-green-500">₹{finalValue.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
