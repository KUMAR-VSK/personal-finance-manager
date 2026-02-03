import React, { useState, useEffect } from 'react';
import { Coins, ArrowRight, CheckCircle, AlertTriangle, BarChart3, Clock } from 'lucide-react';

export function GoldInvestment() {
    const [selectedMetal, setSelectedMetal] = useState('gold');

    const metals = {
        gold: {
            name: 'Gold',
            symbol: 'XAUUSD',
            mcxSymbol: 'FX_IDC:XAUINRG',
            chartUrl: 'https://in.tradingview.com/chart/vkQNiPZ4/?symbol=FX_IDC%3AXAUINRG',
            color: 'yellow',
            types: [
                {
                    type: 'Physical Gold',
                    description: 'Traditional gold coins, bars, and jewelry.',
                    pros: ['Tangible asset', 'No counterparty risk', 'Cultural value'],
                    cons: ['Storage costs', 'Purity verification', 'Making charges']
                },
                {
                    type: 'Digital Gold',
                    description: 'Gold stored electronically through apps.',
                    pros: ['Easy storage', 'Low minimum', 'Fractional ownership'],
                    cons: ['Platform risk', 'Digital security', 'No physical possession']
                },
                {
                    type: 'Gold ETFs',
                    description: 'Exchange-traded funds like GoldBees.',
                    pros: ['Easy trading', 'Regulated', 'No storage issues'],
                    cons: ['Management fees', 'Demat account needed', 'Market timing risk']
                },
                {
                    type: 'Sovereign Gold Bonds',
                    description: 'RBI-issued bonds with 2.5% interest.',
                    pros: ['Govt guarantee', '2.5% interest', 'Tax benefits'],
                    cons: ['8-year lock-in', 'Limited liquidity', 'Interest rate risk']
                }
            ]
        },
        silver: {
            name: 'Silver',
            symbol: 'XAGUSD',
            mcxSymbol: 'FX_IDC:XAGINRG',
            chartUrl: 'https://in.tradingview.com/chart/vkQNiPZ4/?symbol=FX_IDC%3AXAGINRG',
            color: 'gray',
            types: [
                {
                    type: 'Physical Silver',
                    description: 'Silver bars, coins, and jewelry.',
                    pros: ['Affordable entry', 'Industrial demand', 'Tangible asset'],
                    cons: ['Higher storage space', 'Tarnishing', 'Transaction costs']
                },
                {
                    type: 'Silver ETFs',
                    description: 'Exchange-traded funds backed by physical silver.',
                    pros: ['Easy trading', 'No storage', 'Regulated'],
                    cons: ['Management fees', 'Demat account needed', 'Tracking error']
                },
                {
                    type: 'Digital Silver',
                    description: 'Buy and store silver electronically.',
                    pros: ['Low minimum', 'Easy storage', 'Fractional ownership'],
                    cons: ['Platform risk', 'Limited availability', 'Premium charges']
                },
                {
                    type: 'Silver Futures',
                    description: 'MCX silver futures for trading.',
                    pros: ['Leverage', 'Price discovery', 'Hedging'],
                    cons: ['High risk', 'Requires knowledge', 'Daily margins']
                }
            ]
        }
    };

    const currentMetal = metals[selectedMetal];

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/tv.js';
        script.async = true;
        script.onload = () => {
            if (window.TradingView) {
                const container = document.getElementById('tradingview_chart');
                if (container) {
                    container.innerHTML = '';
                    new window.TradingView.widget({
                        width: '100%',
                        height: 480,
                        symbol: currentMetal.mcxSymbol,
                        interval: 'D',
                        timezone: 'Asia/Kolkata',
                        theme: document.documentElement.getAttribute('data-theme') || 'light',
                        style: '1',
                        locale: 'in',
                        toolbar_bg: '#f1f3f6',
                        enable_publishing: false,
                        hide_side_toolbar: false,
                        allow_symbol_change: true,
                        container_id: 'tradingview_chart'
                    });
                }
            }
        };

        if (!document.querySelector('script[src="https://s3.tradingview.com/tv.js"]')) {
            document.head.appendChild(script);
        } else if (window.TradingView) {
            script.onload();
        }

        return () => {
            const container = document.getElementById('tradingview_chart');
            if (container) container.innerHTML = '';
        };
    }, [selectedMetal]);

    return (
        <div className="max-w-6xl mx-auto animate-slide-up space-y-8">

            {/* Header Section */}
            <div className="text-center md:text-left">
                <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-black dark:text-white">
                    Precious Metals <span className="text-gray-500 dark:text-gray-400 font-light">Investment</span>
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
                    Track live prices and explore investment opportunities in Gold and Silver.
                    Use these assets to hedge against inflation and secure your portfolio.
                </p>
            </div>

            {/* Metal Selector & Intro */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass p-2 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft">
                <div className="flex p-1 bg-gray-100/50 dark:bg-gray-800/50 rounded-xl w-full md:w-auto">
                    <button
                        onClick={() => setSelectedMetal('gold')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-sm transition-all duration-300 ${selectedMetal === 'gold'
                            ? 'bg-black text-white shadow-lg scale-100 dark:bg-white dark:text-black'
                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        <Coins className={`w-4 h-4 ${selectedMetal === 'gold' ? 'text-yellow-400' : ''}`} />
                        GOLD
                    </button>
                    <button
                        onClick={() => setSelectedMetal('silver')}
                        className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-sm transition-all duration-300 ${selectedMetal === 'silver'
                            ? 'bg-black text-white shadow-lg scale-100 dark:bg-white dark:text-black'
                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                            }`}
                    >
                        <Coins className={`w-4 h-4 ${selectedMetal === 'silver' ? 'text-gray-300' : ''}`} />
                        SILVER
                    </button>
                </div>

                <div className="px-4 text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-2 animate-pulse-subtle">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> Live Market Data
                </div>
            </div>

            {/* Chart Section */}
            <div key={selectedMetal} className="glass p-1 rounded-2xl shadow-glass-lg animate-fade-in border border-gray-100 dark:border-gray-700">
                <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden relative">
                    <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 dark:border-gray-800 shadow-sm">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200 tracking-wider">
                            {currentMetal.name.toUpperCase()} / INR
                        </span>
                    </div>
                    <div id="tradingview_chart" className="w-full h-[480px]"></div>
                </div>
                <div className="py-3 px-6 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
                    <span className="text-xs text-gray-400">Data provided by TradingView</span>
                    <a
                        href={currentMetal.chartUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors"
                    >
                        Open Full Chart <ArrowRight className="w-3 h-3" />
                    </a>
                </div>
            </div>

            {/* Investment Types Grid */}
            <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3 text-black dark:text-white">
                    Ways to Invest in {currentMetal.name}
                    <div className="h-px flex-1 bg-gray-200 dark:bg-gray-700 ml-4"></div>
                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {currentMetal.types.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-soft hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-white transition-colors">{item.type}</h3>
                                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md font-medium border border-gray-200 dark:border-gray-600">
                                    {index === 0 ? 'Popular' : 'Alternative'}
                                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                                {item.description}
                            </p>

                            <div className="space-y-4">
                                <div className="bg-green-50/50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100/50 dark:border-green-800/30">
                                    <h4 className="font-semibold text-green-800 dark:text-green-400 text-sm mb-2 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4" /> Advantages
                                    </h4>
                                    <ul className="space-y-1">
                                        {item.pros.map((pro, i) => (
                                            <li key={i} className="text-xs text-gray-700 dark:text-gray-300 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-green-500">
                                                {pro}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-red-50/50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100/50 dark:border-red-800/30">
                                    <h4 className="font-semibold text-red-800 dark:text-red-400 text-sm mb-2 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4" /> Risks & Costs
                                    </h4>
                                    <ul className="space-y-1">
                                        {item.cons.map((con, i) => (
                                            <li key={i} className="text-xs text-gray-700 dark:text-gray-300 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-red-500">
                                                {con}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Investment Tips */}
            <section className="bg-black dark:bg-white text-white dark:text-black p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 dark:bg-gray-200 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
                <div className="relative z-10">
                    <h2 className="text-2xl font-bold mb-8">Smart Investment Tips</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-black/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all cursor-default">
                            <div className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                                <BarChart3 className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">Diversify Wisely</h4>
                            <p className="text-gray-300 dark:text-gray-600 text-sm leading-relaxed">Allocate 5-10% of portfolio to precious metals. Don't over-invest as they don't generate passive income.</p>
                        </div>

                        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-black/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all cursor-default">
                            <div className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                                <Clock className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">Think Long-term</h4>
                            <p className="text-gray-300 dark:text-gray-600 text-sm leading-relaxed">Best suited for 5+ years horizon. Short-term prices can be volatile due to global events.</p>
                        </div>

                        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 dark:border-black/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all cursor-default">
                            <div className="w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-lg flex items-center justify-center mb-4 shadow-lg">
                                <CheckCircle className="w-5 h-5" />
                            </div>
                            <h4 className="font-bold text-lg mb-2">Verify Purity</h4>
                            <p className="text-gray-300 dark:text-gray-600 text-sm leading-relaxed">Always check for BIS Hallmark when buying physical gold. Trade only on regulated exchanges for digital forms.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
