import { useState, useEffect, useRef } from 'react';
import './App.css'
import {
  LayoutDashboard,
  Calculator,
  Coins,
  TrendingUp,
  Wallet,
  PiggyBank,
  BookOpen,
  Landmark,
  FileText,
  PieChart,
  Menu,
  X,
  ChevronDown,
  Moon,
  Sun,
  IndianRupee,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Shield,
  Briefcase,
  GraduationCap,
  Hammer,
  Lightbulb,
  Scale,
  Clock,
  BarChart3,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { DonutChart } from './components/ui/DonutChart';
import { SliderInput } from './components/ui/SliderInput';
import { Footer } from './components/layout/Footer';
import { Taxation } from './components/features/Taxation';
import { TaxCalculator } from './components/features/TaxCalculator';
import { GoldInvestment } from './components/features/GoldInvestment';
import { GoldCalendar } from './components/features/GoldCalendar';
import { SIPCalculator } from './components/features/SIPCalculator';
import { EMICalculator } from './components/features/EMICalculator';
import { RetirementCalculator } from './components/features/RetirementCalculator';
import { FDCalculator } from './components/features/FDCalculator';
import { PPFCalculator } from './components/features/PPFCalculator';
import { NPSCalculator } from './components/features/NPSCalculator';
import { BudgetPlanner } from './components/features/BudgetPlanner';
import { ExpenseTracker } from './components/features/ExpenseTracker';
import { SavingsGoalTracker } from './components/features/SavingsGoalTracker';
import { GSTCalculator } from './components/features/GSTCalculator';
import { TDSCalculator } from './components/features/TDSCalculator';
import { FinancialLiteracy } from './components/features/FinancialLiteracy';
import { FinanceTips } from './components/features/FinanceTips';
import { TaxSavingGuide } from './components/features/TaxSavingGuide';
import { MutualFundTracker } from './components/features/MutualFundTracker';
import { StockPortfolioManager } from './components/features/StockPortfolioManager';
import { BillReminders } from './components/features/BillReminders';
import { FinancialHealthScore } from './components/features/FinancialHealthScore';
import { DeductionCalculator } from './components/features/DeductionCalculator';
import { TaxFilingChecklist } from './components/features/TaxFilingChecklist';
import { InvestmentStrategy } from './components/features/InvestmentStrategy';
import { RiskAssessment } from './components/features/RiskAssessment';
import { EmergencyFundCalculator } from './components/features/EmergencyFundCalculator';
import { CompoundInterestCalculator } from './components/features/CompoundInterestCalculator';
import { CAGRCalculator } from './components/features/CAGRCalculator';
import { FDCalculator } from './components/features/FDCalculator';
import { PPFCalculator } from './components/features/PPFCalculator';
import { Taxation } from './components/features/Taxation';
import { TaxCalculator } from './components/features/TaxCalculator';
import { RetirementCalculator } from './components/features/RetirementCalculator';
import { TradingViewWidget } from './components/common/TradingViewWidget';

// Reusable Donut Chart Component


// Reusable Slider Input Component


// Professional Footer Component


function App() {
  const [currentSection, setCurrentSection] = useState('taxation');
  const [isTaxDropdownOpen, setIsTaxDropdownOpen] = useState(false);
  const [isGoldDropdownOpen, setIsGoldDropdownOpen] = useState(false);
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false);
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isExternalDropdownOpen, setIsExternalDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const sections = {
    taxation: <Taxation />,
    calculator: <TaxCalculator />,
    gold: <GoldInvestment />,
    calendar: <GoldCalendar />,
    sip: <SIPCalculator />,
    emi: <EMICalculator />,
    retirement: <RetirementCalculator />,
    emergency: <EmergencyFundCalculator />,
    compound: <CompoundInterestCalculator />,
    cagr: <CAGRCalculator />,
    mutual: <MutualFundTracker />,
    stocks: <StockPortfolioManager />,
    fd: <FDCalculator />,
    ppf: <PPFCalculator />,
    nps: <NPSCalculator />,
    budget: <BudgetPlanner />,
    expenses: <ExpenseTracker />,
    savings: <SavingsGoalTracker />,
    bills: <BillReminders />,
    health: <FinancialHealthScore />,
    taxSaving: <TaxSavingGuide />,
    deductions: <DeductionCalculator />,
    filing: <TaxFilingChecklist />,
    gst: <GSTCalculator />,
    tds: <TDSCalculator />,
    literacy: <FinancialLiteracy />,
    strategy: <InvestmentStrategy />,
    risk: <RiskAssessment />,
    tips: <FinanceTips />,
  };

  return (
    <div className="min-h-screen bg-surface flex relative overflow-hidden">
      {/* Background Elements - Minimal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Removed colorful blobs for minimal look */}
      </div>

      {/* Theme Toggle Button */}
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="hidden md:flex items-center justify-center fixed top-6 right-6 z-50 p-3 rounded-full bg-surface text-gray-900 shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        aria-label="Toggle theme"
      >
        {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>

      {/* Left Sidebar Navigation */}
      <aside className="w-72 glass shadow-glass-lg border-r border-white border-opacity-20 hidden md:block relative z-10 animate-slide-down">
        <div className="p-6">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-black p-2 rounded-xl shadow-lg shadow-gray-500/20">
                <IndianRupee className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-black tracking-tight">FinManager</h1>
                <p className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">Professional Edition</p>
              </div>
            </div>
          </div>
          <nav className="space-y-2">
            {/* Taxation Dropdown */}
            <div>
              <button
                onClick={() => setIsTaxDropdownOpen(!isTaxDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${currentSection === 'taxation' || currentSection === 'calculator'
                  ? 'bg-black text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Landmark className="w-5 h-5" />
                  <span>Taxation</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform ${isTaxDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isTaxDropdownOpen && (
                <div className="ml-10 mt-2 space-y-1.5 animate-slide-down">
                  <button
                    onClick={() => setCurrentSection('taxation')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${currentSection === 'taxation'
                      ? 'bg-gray-200 text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    📋 Taxation Guide
                  </button>
                  <button
                    onClick={() => setCurrentSection('calculator')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${currentSection === 'calculator'
                      ? 'bg-gray-200 text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    🧮 Tax Calculator
                  </button>
                </div>
              )}
            </div>

            {/* Gold Dropdown */}
            <div>
              <button
                onClick={() => setIsGoldDropdownOpen(!isGoldDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${currentSection === 'gold' || currentSection === 'calendar'
                  ? 'bg-black text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Coins className="w-5 h-5" />
                  <span>Gold & Silver</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isGoldDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isGoldDropdownOpen && (
                <div className="ml-10 mt-2 space-y-1.5 animate-slide-down">
                  <button
                    onClick={() => setCurrentSection('gold')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${currentSection === 'gold'
                      ? 'bg-gray-200 text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    🏅 Gold Investment
                  </button>
                  <button
                    onClick={() => setCurrentSection('calendar')}
                    className={`w-full text-left px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${currentSection === 'calendar'
                      ? 'bg-gray-200 text-black shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                  >
                    📅 Gold Calendar
                  </button>
                </div>
              )}
            </div>

            {/* Investment Dropdown */}
            <div>
              <button
                onClick={() => setIsInvestmentDropdownOpen(!isInvestmentDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${currentSection === 'sip' || currentSection === 'mutual' || currentSection === 'stocks' || currentSection === 'fd' || currentSection === 'ppf' || currentSection === 'nps'
                  ? 'bg-black text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5" />
                  <span>Investments</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isInvestmentDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isInvestmentDropdownOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <button
                    onClick={() => setCurrentSection('sip')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'sip'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    SIP Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('mutual')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'mutual'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Mutual Fund Tracker
                  </button>
                  <button
                    onClick={() => setCurrentSection('stocks')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'stocks'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Stock Portfolio
                  </button>
                  <button
                    onClick={() => setCurrentSection('fd')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'fd'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    FD Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('ppf')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'ppf'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    PPF Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('nps')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'nps'
                      ? 'bg-blue-200 text-blue-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    NPS Calculator
                  </button>
                </div>
              )}
            </div>

            {/* Budget & Tools Dropdown */}
            <div>
              <button
                onClick={() => setIsBudgetDropdownOpen(!isBudgetDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${currentSection === 'budget' || currentSection === 'expenses' || currentSection === 'savings' || currentSection === 'bills' || currentSection === 'health'
                  ? 'bg-black text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Wallet className="w-5 h-5" />
                  <span>Budget & Tools</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isBudgetDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isBudgetDropdownOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <button
                    onClick={() => setCurrentSection('budget')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'budget'
                      ? 'bg-purple-200 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Budget Planner
                  </button>
                  <button
                    onClick={() => setCurrentSection('expenses')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'expenses'
                      ? 'bg-purple-200 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Expense Tracker
                  </button>
                  <button
                    onClick={() => setCurrentSection('savings')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'savings'
                      ? 'bg-purple-200 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Savings Goals
                  </button>
                  <button
                    onClick={() => setCurrentSection('bills')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'bills'
                      ? 'bg-purple-200 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Bill Reminders
                  </button>
                  <button
                    onClick={() => setCurrentSection('health')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'health'
                      ? 'bg-purple-200 text-purple-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Financial Health
                  </button>
                </div>
              )}
            </div>

            {/* Financial Tools Dropdown */}
            <div>
              <button
                onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${currentSection === 'emi' || currentSection === 'retirement' || currentSection === 'emergency' || currentSection === 'compound' || currentSection === 'cagr' || currentSection === 'taxSaving' || currentSection === 'deductions' || currentSection === 'filing' || currentSection === 'gst' || currentSection === 'tds'
                  ? 'bg-black text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Calculator className="w-5 h-5" />
                  <span>Financial Tools</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isToolsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isToolsDropdownOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <button
                    onClick={() => setCurrentSection('emi')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'emi'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    EMI Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('retirement')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'retirement'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Retirement Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('emergency')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'emergency'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Emergency Fund
                  </button>
                  <button
                    onClick={() => setCurrentSection('compound')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'compound'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Compound Interest
                  </button>
                  <button
                    onClick={() => setCurrentSection('cagr')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'cagr'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    CAGR Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('taxSaving')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'taxSaving'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Tax Saving Guide
                  </button>
                  <button
                    onClick={() => setCurrentSection('deductions')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'deductions'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Deduction Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('filing')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'filing'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    Tax Filing Checklist
                  </button>
                  <button
                    onClick={() => setCurrentSection('gst')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'gst'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    GST Calculator
                  </button>
                  <button
                    onClick={() => setCurrentSection('tds')}
                    className={`w-full text-left px-3 py-2 rounded text-xs ${currentSection === 'tds'
                      ? 'bg-orange-200 text-orange-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                  >
                    TDS Calculator
                  </button>
                </div>
              )}
            </div>

            {/* External Resources Dropdown */}
            <div>
              <button
                onClick={() => setIsExternalDropdownOpen(!isExternalDropdownOpen)}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-between ${isExternalDropdownOpen
                  ? 'bg-neutral-800 text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-surface hover:bg-opacity-50 hover:shadow-soft'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <Briefcase className="w-5 h-5" />
                  <span>External Resources</span>
                </div>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${isExternalDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isExternalDropdownOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  <a
                    href="https://www.tradingview.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    📈 TradingView
                  </a>
                  <a
                    href="https://www.forexfactory.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    🏭 Forex Factory
                  </a>
                  <a
                    href="https://www.screener.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-left px-3 py-2 rounded text-xs text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                  >
                    🔍 Screener.in
                  </a>
                </div>
              )}
            </div>

            {/* Education Dropdown */}
            <div>
              <button
                onClick={() => setCurrentSection('literacy')}
                className={`w-full text-left px-5 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-3 ${currentSection === 'literacy' || currentSection === 'strategy' || currentSection === 'risk' || currentSection === 'tips'
                  ? 'bg-neutral-800 text-white shadow-soft scale-105'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-surface hover:bg-opacity-50 hover:shadow-soft'
                  }`}
              >
                <BookOpen className="w-5 h-5" />
                <span>Financial Education</span>
              </button>
            </div>
          </nav>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden bg-surface shadow-md border-b border-gray-200 relative z-50">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-black" />
            <h1 className="text-lg font-bold text-gray-900">FinManager</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors"
              title="Toggle Theme"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="absolute top-16 left-0 w-full bg-surface shadow-xl border-b border-gray-200 max-h-[80vh] overflow-y-auto animate-slide-down">
            <nav className="p-4 space-y-2">
              {/* Taxation Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsTaxDropdownOpen(!isTaxDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Landmark className="w-4 h-4" /> Taxation
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isTaxDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isTaxDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <button onClick={() => { setCurrentSection('taxation'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Taxation Guide</button>
                    <button onClick={() => { setCurrentSection('calculator'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Tax Calculator</button>
                  </div>
                )}
              </div>

              {/* Gold & Silver Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsGoldDropdownOpen(!isGoldDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4" /> Gold & Silver
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isGoldDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isGoldDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <button onClick={() => { setCurrentSection('gold'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Gold Investment</button>
                    <button onClick={() => { setCurrentSection('calendar'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Gold Calendar</button>
                  </div>
                )}
              </div>

              {/* Investments Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsInvestmentDropdownOpen(!isInvestmentDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Investments
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isInvestmentDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isInvestmentDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <button onClick={() => { setCurrentSection('sip'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">SIP Calculator</button>
                    <button onClick={() => { setCurrentSection('mutual'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Mutual Fund Tracker</button>
                    <button onClick={() => { setCurrentSection('stocks'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Stock Portfolio</button>
                    <button onClick={() => { setCurrentSection('fd'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">FD Calculator</button>
                    <button onClick={() => { setCurrentSection('ppf'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">PPF Calculator</button>
                    <button onClick={() => { setCurrentSection('nps'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">NPS Calculator</button>
                  </div>
                )}
              </div>

              {/* Budget & Tools Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsBudgetDropdownOpen(!isBudgetDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" /> Budget & Tools
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isBudgetDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isBudgetDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <button onClick={() => { setCurrentSection('budget'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Budget Planner</button>
                    <button onClick={() => { setCurrentSection('expenses'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Expense Tracker</button>
                    <button onClick={() => { setCurrentSection('savings'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Savings Goals</button>
                    <button onClick={() => { setCurrentSection('bills'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Bill Reminders</button>
                    <button onClick={() => { setCurrentSection('health'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Financial Health</button>
                  </div>
                )}
              </div>

              {/* Financial Tools Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsToolsDropdownOpen(!isToolsDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4" /> Financial Tools
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isToolsDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <button onClick={() => { setCurrentSection('emi'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">EMI Calculator</button>
                    <button onClick={() => { setCurrentSection('retirement'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Retirement Calculator</button>
                    <button onClick={() => { setCurrentSection('emergency'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Emergency Fund</button>
                    <button onClick={() => { setCurrentSection('compound'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Compound Interest</button>
                    <button onClick={() => { setCurrentSection('cagr'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">CAGR Calculator</button>
                    <button onClick={() => { setCurrentSection('taxSaving'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Tax Saving Guide</button>
                    <button onClick={() => { setCurrentSection('deductions'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Deduction Calculator</button>
                    <button onClick={() => { setCurrentSection('filing'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">Tax Filing Checklist</button>
                    <button onClick={() => { setCurrentSection('gst'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">GST Calculator</button>
                    <button onClick={() => { setCurrentSection('tds'); setIsMobileMenuOpen(false); }} className="block w-full text-left text-sm text-gray-600 py-1">TDS Calculator</button>
                  </div>
                )}
              </div>

              {/* External Resources Dropdown */}
              <div className="border-b border-gray-100 pb-2">
                <button
                  onClick={() => setIsExternalDropdownOpen(!isExternalDropdownOpen)}
                  className="w-full flex justify-between items-center py-2 text-gray-800 font-semibold"
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> External Resources
                  </div>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExternalDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {isExternalDropdownOpen && (
                  <div className="pl-6 space-y-2 mt-2">
                    <a href="https://www.tradingview.com/" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-gray-600 py-1">TradingView</a>
                    <a href="https://www.forexfactory.com/" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-gray-600 py-1">Forex Factory</a>
                    <a href="https://www.screener.in/" target="_blank" rel="noopener noreferrer" className="block w-full text-left text-sm text-gray-600 py-1">Screener.in</a>
                  </div>
                )}
              </div>

              {/* Education */}
              <button
                onClick={() => { setCurrentSection('literacy'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center gap-2 py-3 text-gray-800 font-semibold"
              >
                <BookOpen className="w-4 h-4" /> Financial Education
              </button>

            </nav>
          </div>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-full md:max-w-none md:ml-0 px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="animate-slide-up">
          {sections[currentSection]}
        </div>
      </main>
    </div>
  );
}



export default App;
