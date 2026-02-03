import React from 'react';
import { Scale } from 'lucide-react';

export function RiskAssessment() {
    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">Risk Assessment Quiz</h1>
            <div className="bg-surface p-8 rounded-2xl shadow-lg text-center border border-gray-100 dark:border-gray-700 dark:bg-gray-800 transition-colors">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Scale className="w-8 h-8 text-black dark:text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Know Your Risk Profile</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Understanding your risk tolerance is crucial before investing. We are building a psychological quiz to help you identify if you are a conservative, moderate, or aggressive investor.
                </p>
                <button className="px-6 py-2 bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 rounded-full cursor-not-allowed">
                    Quiz Coming Soon
                </button>
            </div>
        </div>
    );
}
