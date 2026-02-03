import React from 'react';

export function InvestmentStrategy() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Investment Strategy Guide</h1>
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Coming Soon: Personalized Strategy</h2>
                    <p className="text-gray-600 dark:text-gray-300">We are building a tool to help you allocate assets based on your age and goals.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors">
                        <h3 className="font-bold text-lg mb-2 text-black dark:text-white">Conservative</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Focus on capital preservation. High allocation to FD, Debt Funds.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors">
                        <h3 className="font-bold text-lg mb-2 text-black dark:text-white">Balanced</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Mix of growth and safety. Equity and Debt in 50:50 or 60:40 ratio.</p>
                    </div>
                    <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl transition-colors">
                        <h3 className="font-bold text-lg mb-2 text-black dark:text-white">Aggressive</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Focus on high growth. High allocation to Small/Mid-cap Stocks.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
