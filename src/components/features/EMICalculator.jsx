import React, { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function EMICalculator() {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [loanTenure, setLoanTenure] = useState('');
    const [result, setResult] = useState(null);

    const calculateEMI = () => {
        const P = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTenure) * 12;

        if (isNaN(P) || P <= 0 || isNaN(r) || r < 0 || isNaN(n) || n <= 0) {
            alert('Please enter valid loan details');
            return;
        }

        // EMI formula: E = P × r × (1 + r)^n / ((1 + r)^n - 1)
        let emi = 0;
        if (r === 0) {
            emi = P / n;
        } else {
            emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        }
        const totalPayment = emi * n;
        const totalInterest = totalPayment - P;

        setResult({
            monthlyEMI: emi.toFixed(0),
            totalInterest: totalInterest.toFixed(0),
            totalPayment: totalPayment.toFixed(0),
            principalAmount: P.toFixed(0)
        });
    };

    const downloadPDF = async () => {
        const input = document.getElementById('emi-calculator-container');
        if (!input) return;

        try {
            const canvas = await html2canvas(input, {
                backgroundColor: document.documentElement.className.includes('dark') ? '#000000' : '#ffffff',
                scale: 2
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`EMI_Calculation_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export failed", error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto" id="emi-calculator-container">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-black dark:text-white">EMI Calculator</h1>
                {result && (
                    <button
                        onClick={downloadPDF}
                        className="text-xs bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full font-bold hover:opacity-90 transition-opacity"
                    >
                        Download PDF
                    </button>
                )}
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-4 mb-6 transition-colors">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                    Calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans, and more.
                </p>
            </div>

            <div className="bg-surface p-6 rounded-lg shadow mb-6 border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Loan Amount (₹)</label>
                        <input
                            type="number"
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter loan amount"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</label>
                        <input
                            type="number"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Enter interest rate"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Home loan: 8-9%, Personal loan: 10-16%</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Loan Tenure (Years)</label>
                        <input
                            type="number"
                            value={loanTenure}
                            onChange={(e) => setLoanTenure(e.target.value)}
                            className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
                            placeholder="Loan duration in years"
                        />
                    </div>

                    <button
                        onClick={calculateEMI}
                        className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 rounded hover:bg-gray-800 dark:hover:bg-gray-200 font-bold transition-all shadow-lg"
                    >
                        Calculate EMI
                    </button>
                </div>
            </div>

            {result && (
                <div className="space-y-4 animate-fadeIn">
                    <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <div className="text-center mb-6">
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Monthly EMI</p>
                            <p className="text-4xl font-bold text-black dark:text-white">₹{parseFloat(result.monthlyEMI).toLocaleString()}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Principal Amount</p>
                                <p className="text-lg font-semibold text-gray-900 dark:text-gray-200">₹{parseFloat(result.principalAmount).toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Interest</p>
                                <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">₹{parseFloat(result.totalInterest).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface p-6 rounded-lg shadow border border-gray-100 dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-800 dark:text-gray-200 font-medium">Total Payment</span>
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{parseFloat(result.totalPayment).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
