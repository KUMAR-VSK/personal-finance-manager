import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { SliderInput } from '../ui/SliderInput';
import { DonutChart } from '../ui/DonutChart';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function SIPCalculator() {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [timePeriod, setTimePeriod] = useState(10);
    const [result, setResult] = useState(null);


    useEffect(() => {
        // Auto-calculate on mount and changes
        const P = parseFloat(monthlyInvestment);
        const r = parseFloat(expectedReturn) / 100 / 12;
        const n = parseFloat(timePeriod) * 12;

        if (!isNaN(P) && P > 0 && !isNaN(n) && n > 0) {
            const maturityValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
            const investedAmount = P * n;
            const estimatedReturns = maturityValue - investedAmount;

            setResult({
                investedAmount: investedAmount,
                estimatedReturns: estimatedReturns,
                totalValue: maturityValue
            });
        }
    }, [monthlyInvestment, expectedReturn, timePeriod]);


    const chartData = result ? [
        { label: 'Invested Amount', value: Math.round(result.investedAmount), color: '#333333', displayValue: `₹${Math.round(result.investedAmount).toLocaleString()}` },
        { label: 'Est. Returns', value: Math.round(result.estimatedReturns), color: '#999999', displayValue: `₹${Math.round(result.estimatedReturns).toLocaleString()}` }
    ] : [];

    const downloadPDF = async () => {
        const input = document.getElementById('sip-result-section');
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
            pdf.save(`SIP_Calculation_${new Date().toISOString().split('T')[0]}.pdf`);
        } catch (error) {
            console.error("PDF Export failed", error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
            {/* Header */}
            <div className="text-center">
                <h1 className="text-3xl font-bold text-black dark:text-white mb-2">SIP Calculator</h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Systematic Investment Plan (SIP) is a disciplined way of investing. Calculate how your small monthly investments grow over time.
                </p>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id="sip-result-section">

                {/* Left Column: Inputs */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                            <Calculator className="w-5 h-5 text-black dark:text-white" />
                            Investment Details
                        </h2>
                        <button
                            onClick={downloadPDF}
                            className="text-xs bg-black text-white dark:bg-white dark:text-black px-3 py-1 rounded-full font-bold hover:opacity-90 transition-opacity"
                        >
                            Download PDF
                        </button>
                    </div>

                    <SliderInput
                        label="Monthly Investment"
                        value={monthlyInvestment}
                        onChange={setMonthlyInvestment}
                        min={500}
                        max={100000}
                        step={500}
                        unit="₹"
                    />

                    <SliderInput
                        label="Expected Annual Return"
                        value={expectedReturn}
                        onChange={setExpectedReturn}
                        min={1}
                        max={30}
                        step={0.5}
                        unit="%"
                        helpText="Historical Equity Mutual Fund returns: 12-15%"
                    />

                    <SliderInput
                        label="Time Period"
                        value={timePeriod}
                        onChange={setTimePeriod}
                        min={1}
                        max={40}
                        step={1}
                        unit=" Yr"
                    />
                </div>

                {/* Right Column: Results */}
                <div className="space-y-6">
                    {/* Chart */}
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft border border-gray-100 dark:border-gray-700 flex flex-col items-center justify-center">
                        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Wealth Projection</h3>
                        {result && (
                            <DonutChart
                                data={chartData}
                                centerText={{
                                    label: 'Total Value',
                                    value: `₹${(result.totalValue / 100000).toFixed(2)}L`
                                }}
                            />
                        )}
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl border border-gray-200 dark:border-gray-600">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">Invested Amount</p>
                            <p className="text-xl font-bold text-black dark:text-white mt-1">₹{result?.investedAmount?.toLocaleString()}</p>
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-600 p-4 rounded-xl border border-gray-200 dark:border-gray-500">
                            <p className="text-xs text-gray-600 dark:text-gray-300 font-bold uppercase tracking-wider">Estimated Returns</p>
                            <p className="text-xl font-bold text-black dark:text-white mt-1">₹{result?.estimatedReturns?.toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="bg-black dark:bg-white p-6 rounded-2xl shadow-lg text-white dark:text-black relative overflow-hidden">
                        <div className="relative z-10">
                            <p className="text-sm font-medium opacity-90 mb-1">Maturity Amount</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold">₹{result?.totalValue ? Math.round(result.totalValue).toLocaleString() : '0'}</span>
                            </div>
                            <p className="text-xs mt-2 opacity-75">
                                Total corpus created in {timePeriod} years
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
