import React, { useState } from 'react';
import { SliderInput } from '../ui/SliderInput';
import { Home } from 'lucide-react';

export function HRACalculator() {
    const [basicSalary, setBasicSalary] = useState(500000);
    const [da, setDA] = useState(0);
    const [hraReceived, setHraReceived] = useState(200000);
    const [rentPaid, setRentPaid] = useState(180000);
    const [isMetro, setIsMetro] = useState(true);

    const calculateHRA = () => {
        const salary = basicSalary + da;

        // 1. Actual HRA Received
        const condition1 = hraReceived;

        // 2. 50% of Salary (Metro) or 40% (Non-Metro)
        const condition2 = salary * (isMetro ? 0.5 : 0.4);

        // 3. Rent paid - 10% of salary
        const rentMinusTenPercent = rentPaid - (salary * 0.1);
        const condition3 = rentMinusTenPercent > 0 ? rentMinusTenPercent : 0;

        const exemptedHRA = Math.min(condition1, condition2, condition3);
        const taxableHRA = hraReceived - exemptedHRA;

        return {
            exemptedHRA: Math.round(exemptedHRA),
            taxableHRA: Math.round(taxableHRA),
        };
    };

    const { exemptedHRA, taxableHRA } = calculateHRA();

    return (
        <div className="animate-fadeIn">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Home className="w-6 h-6 text-purple-500" />
                    HRA Calculator
                </h2>
                <p className="text-gray-600 dark:text-gray-400">Calculate your House Rent Allowance exemption benefits.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <SliderInput
                        label="Basic Salary (Yearly)"
                        value={basicSalary}
                        setValue={setBasicSalary}
                        min={100000}
                        max={5000000}
                        step={10000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Dearness Allowance (DA) (Yearly)"
                        value={da}
                        setValue={setDA}
                        min={0}
                        max={2000000}
                        step={5000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="HRA Received (Yearly)"
                        value={hraReceived}
                        setValue={setHraReceived}
                        min={10000}
                        max={2000000}
                        step={5000}
                        prefix="₹"
                    />
                    <SliderInput
                        label="Rent Paid (Yearly)"
                        value={rentPaid}
                        setValue={setRentPaid}
                        min={10000}
                        max={2000000}
                        step={5000}
                        prefix="₹"
                    />

                    <div className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">City Type:</span>
                        <div className="flex bg-white dark:bg-gray-700 rounded-lg p-1 border border-gray-200 dark:border-gray-600">
                            <button
                                onClick={() => setIsMetro(true)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${isMetro ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            >
                                Metro (50%)
                            </button>
                            <button
                                onClick={() => setIsMetro(false)}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${!isMetro ? 'bg-purple-600 text-white shadow-sm' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600'}`}
                            >
                                Non-Metro (40%)
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="text-center mb-8">
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium mb-2">Exempted HRA Amount</h3>
                        <div className="text-4xl font-bold text-green-500">
                            ₹{exemptedHRA.toLocaleString()}
                        </div>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">Amount you save from tax</p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-100 dark:border-red-800">
                            <span className="text-gray-700 dark:text-gray-300">Taxable HRA</span>
                            <span className="text-lg font-bold text-red-600 dark:text-red-400">₹{taxableHRA.toLocaleString()}</span>
                        </div>
                    </div>

                    <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl text-sm text-gray-600 dark:text-gray-400">
                        <p className="font-semibold mb-2">Calculation Logic (Lowest of):</p>
                        <ul className="list-disc pl-5 space-y-1">
                            <li>Actual HRA Received</li>
                            <li>{isMetro ? '50%' : '40%'} of Salary (Basic + DA)</li>
                            <li>Rent Paid - 10% of Salary</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
