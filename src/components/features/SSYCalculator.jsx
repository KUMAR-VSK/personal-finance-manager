import React, { useState } from 'react';
import { SliderInput } from '../ui/SliderInput';
import { DonutChart } from '../ui/DonutChart';
import { Baby, Calendar, ArrowRight } from 'lucide-react';

export function SSYCalculator() {
    const [yearlyInvestment, setYearlyInvestment] = useState(150000);
    const [girlAge, setGirlAge] = useState(1);
    const [startYear, setStartYear] = useState(new Date().getFullYear());
    const [interestRate, setInterestRate] = useState(8.2);

    const calculateSSY = () => {
        let balance = 0;
        let totalInvested = 0;
        const investmentYears = 15;
        const maturityYears = 21;

        // Start Year to Maturity Year loop
        for (let year = 1; year <= maturityYears; year++) {
            if (year <= investmentYears) {
                balance += yearlyInvestment;
                totalInvested += yearlyInvestment;
            }
            // Interest is added on the balance at the end of the year
            balance += balance * (interestRate / 100);
        }

        const totalInterest = balance - totalInvested;
        const maturityYear = startYear + maturityYears;

        return {
            totalInvested: Math.round(totalInvested),
            totalInterest: Math.round(totalInterest),
            maturityValue: Math.round(balance),
            maturityYear
        };
    };

    const { totalInvested, totalInterest, maturityValue, maturityYear } = calculateSSY();

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Baby className="w-6 h-6 text-pink-500" />
                    SSY Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Sukanya Samriddhi Yojana - Secure your daughter's future.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderInput
                        label="Yearly Investment"
                        value={yearlyInvestment}
                        setValue={setYearlyInvestment}
                        min={250}
                        max={150000}
                        step={250}
                        prefix="₹"
                        helpText="Max ₹1.5L per year allowed"
                    />
                    <SliderInput
                        label="Girl's Age"
                        value={girlAge}
                        setValue={setGirlAge}
                        min={0}
                        max={10}
                        suffix=" Years"
                        helpText="Account can be opened up to age 10"
                    />
                    <SliderInput
                        label="Interest Rate"
                        value={interestRate}
                        setValue={setInterestRate}
                        min={7}
                        max={10}
                        step={0.1}
                        suffix="%"
                        helpText="Current Gov rate is ~8.2%"
                    />

                    <div className="flex items-center gap-4 p-4 bg-pink-50 dark:bg-pink-900/10 rounded-xl border border-pink-100 dark:border-pink-800/30">
                        <Calendar className="w-5 h-5 text-pink-500" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Maturity Year</p>
                            <p className="font-bold text-gray-900 dark:text-white">{maturityYear}</p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 mx-auto" />
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Girl's Age at Maturity</p>
                            <p className="font-bold text-gray-900 dark:text-white">{girlAge + 21}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <DonutChart
                        data={[
                            { name: 'Total Invested', value: totalInvested, color: '#DB2777' },
                            { name: 'Total Interest', value: totalInterest, color: '#F472B6' },
                        ]}
                        totalLabel="Maturity Value"
                        totalValue={`₹${maturityValue.toLocaleString()}`}
                    />

                    <div className="mt-8 space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Total Invested</span>
                            <span className="text-lg font-bold text-gray-900 dark:text-white">₹{totalInvested.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                            <span className="text-gray-600 dark:text-gray-300">Total Interest</span>
                            <span className="text-lg font-bold text-pink-500">₹{totalInterest.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-pink-50 dark:bg-pink-900/20 rounded-xl border border-pink-100 dark:border-pink-800">
                            <span className="text-gray-900 dark:text-gray-200 font-medium">Maturity Amount</span>
                            <span className="text-xl font-bold text-pink-600 dark:text-pink-400">₹{maturityValue.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
