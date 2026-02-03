import React, { useState } from 'react';
import { Wallet, Shield, TrendingUp, BarChart3, PieChart, Clock, FileText, Scale, GraduationCap } from 'lucide-react';

export function FinancialLiteracy() {
    const [activeTab, setActiveTab] = useState('basics');

    const content = {
        basics: [
            {
                title: 'The 50/30/20 Rule',
                content: 'A timeless budgeting framework: Allocate 50% of income for Needs (Rent, Food, Bills), 30% for Wants (Dining, Entertainment), and 20% strictly for Savings & Debt Repayment.',
                icon: <Wallet className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'Emergency Fund',
                content: 'Your financial oxygen mask. Aim to save 3-6 months of essential living expenses in a liquid fund (Savings/FD) to handle job loss or medical emergencies without debt.',
                icon: <Shield className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'Inflation',
                content: 'The silent wealth killer. It reduces the purchasing power of money over time. Your investments must grow faster than inflation (~6%) to grow real wealth.',
                icon: <TrendingUp className="w-6 h-6 text-black dark:text-white" />
            }
        ],
        investing: [
            {
                title: 'Power of Compounding',
                content: 'Earning interest on interest. The key is "Time in the Market", not "Timing the Market". Starting 5 years early can potentially double your retirement corpus.',
                icon: <BarChart3 className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'Diversification',
                content: "Don't put all eggs in one basket. Spread risk across Asset Classes: Equity (Growth), Debt (Stability), and Gold (Hedge).",
                icon: <PieChart className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'SIP (Rupee Cost Averaging)',
                content: 'Invest fixed amounts regularly. You buy more units when markets are down and fewer when up, averaging your cost and reducing volatility risk.',
                icon: <Clock className="w-6 h-6 text-black dark:text-white" />
            }
        ],
        taxation: [
            {
                title: 'Section 80C',
                content: 'The most popular tax-saving tool. Claim up to ₹1.5 Lakh deduction by investing in PPF, ELSS Mutual Funds, EPF, or paying Life Insurance premiums.',
                icon: <FileText className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'Tax Regime Selection',
                content: 'Old Regime allows various deductions (HRA, 80C, 80D) but has higher slab rates. New Regime has lower rates but zero deductions. Compare before filing.',
                icon: <Scale className="w-6 h-6 text-black dark:text-white" />
            },
            {
                title: 'Health Insurance (Section 80D)',
                content: 'Double benefit: Protects your savings from medical bills AND saves tax. You can claim up to ₹25,000 for self/family and additional for parents.',
                icon: <Shield className="w-6 h-6 text-black dark:text-white" />
            }
        ]
    };

    const glossary = [
        { term: 'Expense Ratio', definition: 'Annual fee charged by Mutual Funds to manage your money. Lower is better.' },
        { term: 'Liquidity', definition: 'How quickly you can convert an asset into cash without loss.' },
        { term: 'Bull vs Bear', definition: 'Bull market = Rising prices (Optimism). Bear market = Falling prices (Pessimism).' },
        { term: 'Blue Chip', definition: 'Shares of very large, well-established, and financially sound companies.' },
        { term: 'Term Insurance', definition: 'Pure life cover. Pays sum assured to family on death. No maturity benefit. Cheapest & Best.' }
    ];

    return (
        <div className="max-w-6xl mx-auto animate-slide-up">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4 text-black dark:text-white">
                    Financial Knowledge Hub
                </h1>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                    "An investment in knowledge pays the best interest." - Benjamin Franklin
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
                {['basics', 'investing', 'taxation', 'glossary'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-6 py-2.5 rounded-full font-bold capitalize transition-all duration-300 transform hover:scale-105 ${activeTab === tab
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg'
                            : 'bg-white text-gray-600 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'glossary' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {glossary.map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-black dark:border-white">
                                <h3 className="font-bold text-gray-800 dark:text-white mb-2">{item.term}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{item.definition}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {content[activeTab].map((item, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-gray-700">
                                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-100 dark:group-hover:bg-gray-600 transition-colors">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{item.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-12 bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 flex items-start gap-4">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-full shadow-sm hidden sm:block">
                    <GraduationCap className="w-8 h-8 text-black dark:text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-black dark:text-white mb-2">Continuous Learning</h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        Financial literacy is not a destination, but a journey. The concepts here are just the beginning.
                        Use the tools in this app to apply these principles—track your budget, plan your SIPs, and optimize your taxes.
                    </p>
                </div>
            </div>
        </div>
    );
}
