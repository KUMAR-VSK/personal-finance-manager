import React from 'react';

export function MutualFundTracker() {
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Mutual Fund Tracker</h1>

            <div className="bg-gray-50 dark:bg-gray-800 border-l-4 border-black dark:border-white p-6 mb-8 rounded-r-lg transition-colors">
                <h3 className="text-lg font-bold text-black dark:text-white mb-2">Feature Coming Soon!</h3>
                <p className="text-gray-700 dark:text-gray-300">
                    We are building a comprehensive tracker for your mutual fund investments. In the meantime, learn about the basics below.
                </p>
            </div>

            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">What is a Mutual Fund?</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    A mutual fund is a company that pools money from many investors and invests the money in securities such as stocks, bonds, and short-term debt. The combined holdings of the mutual fund are known as its portfolio. Investors buy shares in mutual funds.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl transition-colors">
                        <h3 className="font-bold text-lg mb-3 text-black dark:text-white">Types of Mutual Funds</h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li>• <strong>Equity Funds:</strong> Invest in stocks. High risk, high return.</li>
                            <li>• <strong>Debt Funds:</strong> Invest in bonds/government securities. Lower risk.</li>
                            <li>• <strong>Hybrid Funds:</strong> Mix of equity and debt. Balanced risk.</li>
                            <li>• <strong>ELSS:</strong> Equity Linked Savings Scheme. Tax saving funds (80C).</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 dark:bg-gray-700 p-5 rounded-xl transition-colors">
                        <h3 className="font-bold text-lg mb-3 text-black dark:text-white">Benefits</h3>
                        <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                            <li>• <strong>Professional Management:</strong> Managed by experts.</li>
                            <li>• <strong>Diversification:</strong> Spreads risk across many assets.</li>
                            <li>• <strong>Affordability:</strong> Start with as low as ₹500 via SIP.</li>
                            <li>• <strong>Liquidity:</strong> Easy to buy and sell.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
