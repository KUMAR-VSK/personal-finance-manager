import React from 'react';

export function StockPortfolioManager() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Stock Portfolio Manager</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-6 mb-8 rounded-r-lg transition-colors">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">Portfolio Manager Coming Soon!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                    Soon you will be able to track your stock holdings, visualize sector allocation, and analyze performance.
                </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Stock Market Basics</h2>

                <div className="space-y-6">
                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-white dark:text-black font-bold">1</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">What is a Stock?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">A stock (or share) represents a fractional ownership in a company. When you buy a stock, you become a shareholder.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-white dark:text-black font-bold">2</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Why invest in Stocks?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">Historically, stocks have provided the highest returns among all asset classes over the long term, beating inflation significantly.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                            <span className="text-white dark:text-black font-bold">3</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white">Key Metrics to Watch</h3>
                            <div className="grid grid-cols-2 gap-4 mt-3">
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                                    <span className="font-bold text-gray-800 dark:text-white block">P/E Ratio</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Price to Earnings. Indicates if a stock is over/undervalued.</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded border border-gray-200 dark:border-gray-600 transition-colors">
                                    <span className="font-bold text-gray-800 dark:text-white block">Market Cap</span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Total value of all company shares. (Large, Mid, Small cap).</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
