import React, { useState } from 'react';
import { Landmark, FileText, Calculator, PieChart, Wallet } from 'lucide-react';
import { DeductionCalculator } from './DeductionCalculator';
import { TaxFilingChecklist } from './TaxFilingChecklist';
import { TaxCalculator } from './TaxCalculator';
import { TaxSavingGuide } from './TaxSavingGuide';

export function Taxation() {
    const [activeTab, setActiveTab] = useState('slabs');

    const renderContent = () => {
        switch (activeTab) {
            case 'slabs':
                return (
                    <div className="animate-fadeIn">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold mb-3 text-black dark:text-white">
                                Indian Taxation Guide
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Comprehensive guide to understanding Indian tax regimes and optimize your tax planning
                            </p>
                        </div>

                        {/* Tax Regime Comparison */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center">
                                <span className="w-1 h-8 bg-black dark:bg-white mr-3 rounded-full"></span>
                                Tax Regime Comparison
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mr-3">
                                            <Landmark className="w-6 h-6 text-white dark:text-black" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Old Regime</h3>
                                    </div>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Traditional tax system with more deductions and exemptions but higher tax rates.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">More deductions available (80C, 80D, HRA)</span>
                                        </div>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">Higher tax slabs (5%, 20%, 30%)</span>
                                        </div>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">4% cess on total tax</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-surface p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
                                    <div className="flex items-center mb-4">
                                        <div className="w-12 h-12 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center mr-3">
                                            <FileText className="w-6 h-6 text-white dark:text-black" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">New Regime</h3>
                                    </div>
                                    <p className="mb-4 text-gray-700 dark:text-gray-300 leading-relaxed">
                                        Simplified system with lower tax rates but fewer deductions.
                                    </p>
                                    <div className="space-y-3">
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">Lower tax slabs (5%, 10%, 15%)</span>
                                        </div>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">Limited deductions available</span>
                                        </div>
                                        <div className="flex items-start">
                                            <svg className="w-5 h-5 text-gray-700 dark:text-gray-400 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">4% cess on total tax</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Key Terms Section */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                                <span className="w-1 h-8 bg-black dark:bg-white mr-3 rounded-full"></span>
                                Key Taxation Terms
                            </h2>
                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 dark:border-white hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-800 dark:text-white">Gross Income</h4>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Total income before any deductions or exemptions.</p>
                                </div>

                                <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 dark:border-white hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-800 dark:text-white">Taxable Income</h4>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Gross income minus deductions and exemptions.</p>
                                </div>

                                <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 dark:border-white hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-800 dark:text-white">Deductions</h4>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Amounts you can subtract from gross income (e.g., 80C).</p>
                                </div>

                                <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 dark:border-white hover:shadow-lg transition-shadow duration-300">
                                    <div className="flex items-center mb-2">
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mr-3">
                                            <svg className="w-5 h-5 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-800 dark:text-white">Exemptions</h4>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm">Income that is not taxed (e.g., HRA).</p>
                                </div>
                            </div>
                        </section>

                        {/* Common Deductions Section */}
                        <section className="mb-10">
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                                <span className="w-1 h-8 bg-black dark:bg-white mr-3 rounded-full"></span>
                                Popular Tax Deductions
                            </h2>
                            <div className="space-y-4">
                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-white dark:text-black font-bold text-lg">80C</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">Section 80C</h4>
                                                <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-semibold">
                                                    Up to ₹1.5 lakh
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">Investments in PPF, ELSS mutual funds, life insurance premiums, home loan principal, NSC, 5-year tax-saving FDs, etc.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-white dark:text-black font-bold text-lg">80D</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">Section 80D (Health Insurance)</h4>
                                                <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-semibold">
                                                    Up to ₹75k
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">Premium paid for medical insurance for self, family, and parents. Additional deduction for senior citizens.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                                    <div className="flex items-start">
                                        <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                                            <span className="text-white dark:text-black font-bold text-sm">HRA</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">HRA (House Rent Allowance)</h4>
                                                <span className="bg-black dark:bg-white text-white dark:text-black px-3 py-1 rounded-full text-sm font-semibold">
                                                    Variable
                                                </span>
                                            </div>
                                            <p className="text-gray-600 dark:text-gray-400">Exemption for rent paid if living in rented accommodation. Calculated based on actual HRA received, rent paid, and salary.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Tax Slabs Section */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                                <span className="w-1 h-8 bg-black dark:bg-white mr-3 rounded-full"></span>
                                Income Tax Slabs (FY 2024-25)
                            </h2>
                            <div className="bg-surface rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-black dark:bg-white text-white dark:text-black">
                                            <tr>
                                                <th className="p-4 text-left font-bold">Income Range</th>
                                                <th className="p-4 text-left font-bold">Old Regime Rate</th>
                                                <th className="p-4 text-left font-bold">New Regime Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody className="dark:text-gray-300">
                                            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <td className="p-4 font-semibold text-gray-700 dark:text-gray-200">Up to ₹2.5 lakh</td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">0%</span></td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">0%</span></td>
                                            </tr>
                                            <tr className="border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="p-4 font-semibold text-gray-700 dark:text-gray-200">₹2.5 lakh - ₹5 lakh</td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">5%</span></td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">5%</span></td>
                                            </tr>
                                            <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                                <td className="p-4 font-semibold text-gray-700 dark:text-gray-200">₹5 lakh - ₹10 lakh</td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">20%</span></td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">10%</span></td>
                                            </tr>
                                            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                                <td className="p-4 font-semibold text-gray-700 dark:text-gray-200">Above ₹10 lakh</td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">30%</span></td>
                                                <td className="p-4"><span className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded-full text-sm font-semibold">15%</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-800">
                                    <p className="text-sm text-gray-700 dark:text-gray-400 flex items-center">
                                        <svg className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <strong>Note:</strong> All tax amounts are subject to 4% cess (Health and Education Cess)
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>
                );
            case 'calculator':
                return <TaxCalculator />;
            case 'deductions':
                return <DeductionCalculator />;
            case 'saving':
                return <TaxSavingGuide />;
            case 'filing':
                return <TaxFilingChecklist />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                {[
                    { id: 'slabs', label: 'Tax Guide & Slabs', icon: <FileText className="w-4 h-4" /> },
                    { id: 'calculator', label: 'Tax Calculator', icon: <Calculator className="w-4 h-4" /> },
                    { id: 'deductions', label: 'Deductions (80C)', icon: <PieChart className="w-4 h-4" /> },
                    { id: 'saving', label: 'Tax Saving', icon: <Wallet className="w-4 h-4" /> },
                    { id: 'filing', label: 'Filing Checklist', icon: <FileText className="w-4 h-4" /> },
                ].map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${activeTab === tab.id
                                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {tab.icon}
                        <span className="font-medium text-sm">{tab.label}</span>
                    </button>
                ))}
            </div>

            {renderContent()}
        </div>
    );
}
