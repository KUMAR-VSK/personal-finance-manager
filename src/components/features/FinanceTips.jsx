import React, { useState } from 'react';
import { Lightbulb, ChevronDown, CheckCircle, X } from 'lucide-react';

export function FinanceTips() {
    const [currentTipIndex, setCurrentTipIndex] = useState(0);

    const tips = [
        "Pay yourself first: Save at least 20% of your income before spending.",
        "Avoid lifestyle inflation: Don't increase spending just because your income increased.",
        "Understand the difference between 'Good Debt' (Education, Home) and 'Bad Debt' (High interest credit cards).",
        "Review your bank statements monthly to catch recurring subscriptions you don't use.",
        "Never mix insurance with investment. Buy Term Insurance for protection and Mutual Funds for growth.",
        "Time in the market beats timing the market. Stay invested for the long term.",
        "Emergency Fund is not an investment. It's insurance against bad luck. Keep it liquid.",
        "Credit Score matters. Pay all dues on time and keep credit utilization below 30%."
    ];

    const nextTip = () => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    };

    return (
        <div className="max-w-4xl mx-auto animate-fadeIn">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
                Personal Finance Smart Tips
            </h1>

            {/* Featured Tip Card */}
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 relative overflow-hidden mb-8 transition-colors">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Lightbulb className="w-32 h-32 text-black dark:text-white" />
                </div>

                <div className="relative z-10">
                    <h2 className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest mb-2">Tip of the Moment</h2>
                    <p className="text-2xl font-bold text-black dark:text-white leading-snug mb-6 min-h-[80px]">
                        "{tips[currentTipIndex]}"
                    </p>

                    <button
                        onClick={nextTip}
                        className="bg-black text-white dark:bg-white dark:text-black font-semibold py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200"
                    >
                        Next Tip <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-black dark:text-white" /> Do's
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Track every rupee you spend</li>
                        <li>• Automate your investments (SIP)</li>
                        <li>• Review your portfolio yearly</li>
                        <li>• Discuss finances with your partner</li>
                    </ul>
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                    <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                        <X className="w-5 h-5 text-black dark:text-white" /> Don'ts
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                        <li>• Don't invest in things you don't understand</li>
                        <li>• Don't use emergency fund for vacations</li>
                        <li>• Don't ignore inflation</li>
                        <li>• Don't panic sell during market dips</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
