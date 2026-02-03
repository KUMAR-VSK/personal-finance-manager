import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function TaxCalculator() {
    const [salary, setSalary] = useState('');
    const [deductions, setDeductions] = useState('');
    const [regime, setRegime] = useState('old');
    const [result, setResult] = useState(null);

    const calculateTax = () => {
        const sal = parseFloat(salary);
        const ded = parseFloat(deductions) || 0;

        if (isNaN(sal) || sal < 0) {
            alert('Please enter valid salary');
            return;
        }
        if (ded < 0) {
            alert('Deductions cannot be negative');
            return;
        }

        const taxableIncome = Math.max(0, sal - ded);
        let tax = 0;
        const breakdown = [];

        if (regime === 'old') {
            // Old Regime Slabs (Simplified logic for demo)
            if (taxableIncome <= 500000) {
                breakdown.push({ slab: 'Up to ₹5L (Rebate u/s 87A)', rate: '0%', amount: 0 });
                tax = 0;
            } else {
                if (taxableIncome <= 250000) {
                    breakdown.push({ slab: 'Up to ₹2.5L', rate: '0%', amount: 0 });
                } else {
                    // 0 - 2.5L
                    breakdown.push({ slab: 'Up to ₹2.5L', rate: '0%', amount: 0 });

                    if (taxableIncome > 250000) {
                        const amt = Math.min(taxableIncome - 250000, 250000);
                        tax += amt * 0.05;
                        breakdown.push({ slab: '₹2.5L - ₹5L', rate: '5%', amount: amt * 0.05 });
                    }
                    if (taxableIncome > 500000) {
                        const amt = Math.min(taxableIncome - 500000, 500000);
                        tax += amt * 0.20;
                        breakdown.push({ slab: '₹5L - ₹10L', rate: '20%', amount: amt * 0.20 });
                    }
                    if (taxableIncome > 1000000) {
                        const amt = taxableIncome - 1000000;
                        tax += amt * 0.30;
                        breakdown.push({ slab: 'Above ₹10L', rate: '30%', amount: amt * 0.30 });
                    }
                }
            }
        } else {
            // New Regime Slabs
            if (taxableIncome <= 700000) {
                breakdown.push({ slab: 'Up to ₹7L (Rebate u/s 87A)', rate: '0%', amount: 0 });
                tax = 0;
            } else {
                if (taxableIncome <= 300000) {
                    breakdown.push({ slab: 'Up to ₹3L', rate: '0%', amount: 0 });
                } else {
                    // 0 - 3L
                    breakdown.push({ slab: 'Up to ₹3L', rate: '0%', amount: 0 });

                    if (taxableIncome > 300000) {
                        const amt = Math.min(taxableIncome - 300000, 300000);
                        tax += amt * 0.05;
                        breakdown.push({ slab: '₹3L - ₹6L', rate: '5%', amount: amt * 0.05 });
                    }
                    if (taxableIncome > 600000) {
                        const amt = Math.min(taxableIncome - 600000, 300000);
                        tax += amt * 0.10;
                        breakdown.push({ slab: '₹6L - ₹9L', rate: '10%', amount: amt * 0.10 });
                    }
                    if (taxableIncome > 900000) {
                        const amt = Math.min(taxableIncome - 900000, 300000);
                        tax += amt * 0.15;
                        breakdown.push({ slab: '₹9L - ₹12L', rate: '15%', amount: amt * 0.15 });
                    }
                    if (taxableIncome > 1200000) {
                        const amt = Math.min(taxableIncome - 1200000, 300000);
                        tax += amt * 0.20;
                        breakdown.push({ slab: '₹12L - ₹15L', rate: '20%', amount: amt * 0.20 });
                    }
                    if (taxableIncome > 1500000) {
                        const amt = taxableIncome - 1500000;
                        tax += amt * 0.30;
                        breakdown.push({ slab: 'Above ₹15L', rate: '30%', amount: amt * 0.30 });
                    }
                }
            }
        }

        const cess = tax * 0.04;
        const totalTax = tax + cess;

        setResult({
            taxableIncome,
            tax,
            cess,
            totalTax,
            breakdown
        });
    };

    const downloadPDF = async () => {
        const input = document.getElementById('tax-result-card');
        if (!input) return;

        try {
            const canvas = await html2canvas(input, {
                backgroundColor: document.documentElement.className.includes('dark') ? '#000000' : '#ffffff',
                scale: 2 // Improved quality
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`Tax_Calculation_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export failed", error);
        }
    };

    const handleReset = () => {
        setSalary('');
        setDeductions('');
        setResult(null);
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3 text-black dark:text-white">
                    Income Tax Calculator
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Calculate your income tax liability for both old and new tax regimes
                </p>
            </div>

            {/* Input Card */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 mb-8">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-gray-800 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Enter Your Details
                </h2>

                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Annual Salary (₹)
                        </label>
                        <input
                            type="number"
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all outline-none"
                            placeholder="Enter your annual salary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Total Deductions (₹)
                        </label>
                        <input
                            type="number"
                            value={deductions}
                            onChange={(e) => setDeductions(e.target.value)}
                            className="w-full p-3 border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-900 dark:text-white rounded-lg focus:border-black dark:focus:border-white focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 transition-all outline-none"
                            placeholder="80C, 80D, HRA, etc."
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Include all eligible deductions (80C, 80D, HRA, etc.)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                            Tax Regime
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setRegime('old')}
                                className={`p-3 rounded-lg border-2 font-semibold transition-all ${regime === 'old'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg'
                                    : 'bg-surface border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400'
                                    }`}
                            >
                                Old Regime
                            </button>
                            <button
                                onClick={() => setRegime('new')}
                                className={`p-3 rounded-lg border-2 font-semibold transition-all ${regime === 'new'
                                    ? 'bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-lg'
                                    : 'bg-surface border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-400'
                                    }`}
                            >
                                New Regime
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={calculateTax}
                            className="flex-1 bg-black text-white dark:bg-white dark:text-black py-4 px-6 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-200 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                        >
                            Calculate Tax
                        </button>
                        {result && (
                            <button onClick={handleReset} className="px-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                                Reset
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {result && (
                <div className="space-y-6 animate-fadeIn" id="tax-result-card">
                    {/* Tax Summary Card */}
                    <div className="bg-black dark:bg-white p-8 rounded-2xl shadow-2xl text-white dark:text-black">
                        <h2 className="text-2xl font-bold mb-6 flex items-center justify-between">
                            <div className="flex items-center">
                                <svg className="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Tax Summary
                            </div>
                            <button
                                onClick={downloadPDF}
                                className="text-xs bg-white text-black dark:bg-black dark:text-white px-3 py-1 rounded-full font-bold hover:opacity-90 transition-opacity"
                            >
                                Download PDF
                            </button>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700 dark:border-gray-200">
                                <p className="text-sm text-gray-300 dark:text-gray-600 mb-1">Taxable Income</p>
                                <p className="text-3xl font-bold">₹{result.taxableIncome.toLocaleString()}</p>
                            </div>

                            <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700 dark:border-gray-200">
                                <p className="text-sm text-gray-300 dark:text-gray-600 mb-1">Base Tax</p>
                                <p className="text-3xl font-bold">₹{result.tax.toLocaleString()}</p>
                            </div>

                            <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700 dark:border-gray-200">
                                <p className="text-sm text-gray-300 dark:text-gray-600 mb-1">Health & Education Cess (4%)</p>
                                <p className="text-2xl font-bold">₹{result.cess.toLocaleString()}</p>
                            </div>

                            <div className="bg-white dark:bg-black p-5 rounded-xl shadow-lg border border-transparent dark:border-gray-700">
                                <p className="text-sm text-gray-900 dark:text-gray-300 mb-1">Total Tax Liability</p>
                                <p className="text-4xl font-bold text-black dark:text-white">₹{result.totalTax.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    {/* Tax Breakdown Card */}
                    <div className="bg-surface p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800">
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
                            <svg className="w-6 h-6 mr-2 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            Slab-wise Breakdown
                        </h2>

                        <div className="space-y-3">
                            {result.breakdown.map((item, index) => (
                                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 bg-black dark:bg-white rounded-lg flex items-center justify-center mr-4">
                                            <span className="text-white dark:text-black font-bold text-sm">{index + 1}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-800 dark:text-white">{item.slab}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-300 ml-2 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded">
                                                {item.rate}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xl font-bold text-black dark:text-white">
                                        ₹{item.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
