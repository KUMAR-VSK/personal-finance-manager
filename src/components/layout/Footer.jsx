import React from 'react';
import { IndianRupee, AlertTriangle } from 'lucide-react';

// Professional Footer Component
export function Footer() {
    return (
        <footer className="bg-surface border-t border-gray-200 dark:border-gray-800 mt-auto backdrop-blur-sm transition-colors duration-300">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-black dark:bg-white p-1.5 rounded-lg">
                                <IndianRupee className="w-5 h-5 text-white dark:text-black" />
                            </div>
                            <span className="text-lg font-bold text-black dark:text-white">
                                FinManager
                            </span>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
                            Empowering Indian investors with professional tools for tax planning, investment tracking, and wealth creation.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                            Modules
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Taxation Guide</button></li>
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Gold Portfolio</button></li>
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Investment Tools</button></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-bold text-gray-900 dark:text-white tracking-wider uppercase mb-4">
                            Legal & Support
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Privacy Policy</button></li>
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Disclaimer</button></li>
                            <li><button className="hover:text-black dark:hover:text-white transition-colors">Contact Support</button></li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Personal Finance Manager. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 max-w-xl">
                        <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                        <p className="text-[10px] leading-tight">
                            <strong>Disclaimer:</strong> Financial figures are estimations. Consult a qualified CA or financial advisor before making decisions.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
