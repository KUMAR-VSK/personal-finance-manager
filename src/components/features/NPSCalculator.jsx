import React, { useState } from 'react';
import { Calculator, Shield } from 'lucide-react';
import { SimpleSliderInput as SliderInput } from '../ui/SliderInput';
import { DonutChart } from '../ui/DonutChart';

export function NPSCalculator() {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyContribution, setMonthlyContribution] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(10);
    const [annuityPercentage, setAnnuityPercentage] = useState(40);

    // Constants
    const minAge = 18;
    const maxAge = 75;
    const annuityRate = 6; // Assumed 6% return on annuity

    // Calculations
    const investmentYears = Math.max(0, retirementAge - currentAge);
    const totalMonths = investmentYears * 12;
    const monthlyRate = expectedReturn / 12 / 100;

    // SIP Formula for Corpus: P * [ (1+i)^n - 1 ] * (1+i) / i
    const totalInvested = monthlyContribution * totalMonths;
    let maturityAmount = 0;

    if (monthlyRate > 0 && totalMonths > 0) {
        maturityAmount = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    } else {
        maturityAmount = totalInvested;
    }

    const interestEarned = maturityAmount - totalInvested;

    // Withdrawal Logic
    const annuityAmount = maturityAmount * (annuityPercentage / 100);
    const lumpsumAmount = maturityAmount - annuityAmount;
    const estimatedMonthlyPension = (annuityAmount * (annuityRate / 100)) / 12;

    const chartData = [
        { label: 'Invested Amount', value: Math.round(totalInvested), color: '#333333', displayValue: `₹${Math.round(totalInvested).toLocaleString()}` },
        { label: 'Interest Earned', value: Math.round(interestEarned), color: '#999999', displayValue: `₹${Math.round(interestEarned).toLocaleString()}` }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">
                    NPS Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Plan your retirement with the National Pension System. Calculate your corpus, lump sum withdrawal, and expected monthly pension.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Inputs */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 space-y-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-black dark:text-white" />
                        Investment Details
                    </h2>

                    <SliderInput
                        label="Current Age"
                        value={currentAge}
                        onChange={setCurrentAge}
                        min={18}
                        max={60}
                        step={1}
                        unit=" Yrs"
                    />

                    <SliderInput
                        label="Retirement Age"
                        value={retirementAge}
                        onChange={setRetirementAge}
                        min={currentAge + 1}
                        max={75}
                        step={1}
                        unit=" Yrs"
                    />

                    <SliderInput
                        label="Monthly Contribution"
                        value={monthlyContribution}
                        onChange={setMonthlyContribution}
                        min={500}
                        max={150000}
                        step={500}
                        unit="₹"
                    />

                    <SliderInput
                        label="Expected Return (ROI)"
                        value={expectedReturn}
                        onChange={setExpectedReturn}
                        min={8}
                        max={15}
                        step={0.1}
                        unit="%"
                        helpText="Historical NPS Equity returns range from 9-12%"
                    />

                    <SliderInput
                        label="Annuity Reinvestment"
                        value={annuityPercentage}
                        onChange={setAnnuityPercentage}
                        min={40}
                        max={100}
                        step={5}
                        unit="%"
                        helpText="Min 40% of corpus must be used to purchase annuity"
                    />
                </div>

                {/* Right Column: Results & Visualization */}
                <div className="space-y-6">
                    {/* Chart Card */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Projected Corpus</h3>
                        <DonutChart
                            data={chartData}
                            centerText={{ label: 'Total Corpus', value: `₹${(maturityAmount / 10000000).toFixed(2)}Cr` }}
                        />
                    </div>

                    {/* Results Summary Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">Lump Sum (Tax Free)</p>
                            <p className="text-xl font-bold text-black dark:text-white mt-1">₹{Math.round(lumpsumAmount).toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-500">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">Annuity Amount</p>
                            <p className="text-xl font-bold text-black dark:text-white mt-1">₹{Math.round(annuityAmount).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-black dark:bg-white p-6 rounded-2xl shadow-lg text-white dark:text-black relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-sm font-medium opacity-90 mb-1">Estimated Monthly Pension</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold">₹{Math.round(estimatedMonthlyPension).toLocaleString()}</span>
                                <span className="text-sm opacity-80">/ month</span>
                            </div>
                            <p className="text-xs mt-2 opacity-75">*Based on {annuityPercentage}% corpus reinvested at {annuityRate}% annuity rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tax Benefits Info */}
            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-5 rounded-r-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <Shield className="h-5 w-5 text-black dark:text-white" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-black dark:text-white">Tax Saving Benefits</h3>
                        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 space-y-1">
                            <p>• <strong>Sec 80CCD(1):</strong> Tax deduction up to 10% of salary (Basic + DA) within ₹1.5 Lakh limit of 80C.</p>
                            <p>• <strong>Sec 80CCD(1B):</strong> Additional exclusive deduction of ₹50,000 over and above 80C.</p>
                            <p>• <strong>Tax Efficiency:</strong> 60% of corpus withdrawal at maturity is completely Tax-Free.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
