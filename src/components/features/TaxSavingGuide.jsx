import React from 'react';

export function TaxSavingGuide() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Tax Saving Guide</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-6 mb-8 rounded-r-lg transition-colors">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">Full Guide Coming Soon!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                    We are compiling a detailed guide for FY 2024-25. Here is a quick checklist of popular Section 80C options.
                </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Popular Tax Saving Options (Section 80C)</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Max Deduction: ₹1.5 Lakhs per financial year</p>

                <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow dark:text-gray-200">
                        <h3 className="font-bold text-lg mb-1">PPF (Public Provident Fund)</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">15-year lock-in. Risk-free returns.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow dark:text-gray-200">
                        <h3 className="font-bold text-lg mb-1">ELSS Mutual Funds</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">3-year lock-in (Lowest). Market linked returns.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow dark:text-gray-200">
                        <h3 className="font-bold text-lg mb-1">Life Insurance Premium</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Term plans or traditional policies.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow dark:text-gray-200">
                        <h3 className="font-bold text-lg mb-1">EPF (Employee Provident Fund)</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Employee contribution to PF deducted from salary.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
