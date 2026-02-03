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

// Reusable Donut Chart Component
function DonutChart({ data, centerText }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;

  const calculatePath = (percentage, startAngle) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;

    const startX = 50 + 40 * Math.cos((Math.PI * startAngle) / 180);
    const startY = 50 + 40 * Math.sin((Math.PI * startAngle) / 180);
    const endX = 50 + 40 * Math.cos((Math.PI * endAngle) / 180);
    const endY = 50 + 40 * Math.sin((Math.PI * endAngle) / 180);

    return `M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArc} 1 ${endX} ${endY} Z`;
  };

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="w-64 h-64">
        {/* Background circle */}
        <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" />

        {/* Donut segments */}
        {data.map((item, index) => {
          const percentage = (item.value / total) * 100;
          const path = calculatePath(percentage, currentAngle);
          currentAngle += (percentage / 100) * 360;

          return (
            <path
              key={index}
              d={path}
              fill={item.color}
              opacity="0.9"
              className="hover:opacity-100 transition-opacity cursor-pointer"
            />
          );
        })}

        {/* Inner white circle to create donut effect */}
        <circle cx="50" cy="50" r="32" fill="white" />

        {/* Center text */}
        {centerText && (
          <>
            <text
              x="50"
              y="45"
              textAnchor="middle"
              className="text-[4px] fill-gray-500 font-medium"
              style={{ fontSize: '4px' }}
            >
              {centerText.label}
            </text>
            <text
              x="50"
              y="58"
              textAnchor="middle"
              className="text-[6px] font-bold fill-gray-900"
              style={{ fontSize: '6px' }}
            >
              {centerText.value}
            </text>
          </>
        )}
      </svg>

      {/* Legend */}
      <div className="mt-4 space-y-2 w-full">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-700">{item.label}</span>
            </div>
            <span className="font-semibold">{item.displayValue}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Reusable Slider Input Component
function SliderInput({ label, value, onChange, min, max, step, unit, helpText }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium">{label}</label>
        <span className="text-lg font-semibold text-primary-600">
          {unit === '₹' ? `₹${parseFloat(value || 0).toLocaleString()}` : `${value || 0}${unit || ''}`}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value || min}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{unit === '₹' ? `₹${min.toLocaleString()}` : `${min}${unit || ''}`}</span>
        <span>{unit === '₹' ? `₹${max.toLocaleString()}` : `${max}${unit || ''}`}</span>
      </div>
      {helpText && <p className="text-xs text-gray-500 mt-1">{helpText}</p>}
    </div>
  );
}

// Professional Footer Component
function Footer() {
  return (
    <footer className="bg-surface border-t border-gray-200 mt-auto backdrop-blur-sm">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-black p-1.5 rounded-lg">
                <IndianRupee className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold text-black">
                FinManager
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Empowering Indian investors with professional tools for tax planning, investment tracking, and wealth creation.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">
              Modules
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button className="hover:text-primary-600 transition-colors">Taxation Guide</button></li>
              <li><button className="hover:text-primary-600 transition-colors">Gold Portfolio</button></li>
              <li><button className="hover:text-primary-600 transition-colors">Investment Tools</button></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">
              Legal & Support
            </h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><button className="hover:text-primary-600 transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-primary-600 transition-colors">Disclaimer</button></li>
              <li><button className="hover:text-primary-600 transition-colors">Contact Support</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Personal Finance Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-2 bg-gray-50 text-gray-800 px-3 py-2 rounded-lg border border-gray-200 max-w-xl">
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

function App() {
  const [currentSection, setCurrentSection] = useState('taxation');
  const [isTaxDropdownOpen, setIsTaxDropdownOpen] = useState(false);
  const [isGoldDropdownOpen, setIsGoldDropdownOpen] = useState(false);
  const [isInvestmentDropdownOpen, setIsInvestmentDropdownOpen] = useState(false);
  const [isBudgetDropdownOpen, setIsBudgetDropdownOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isExternalDropdownOpen, setIsExternalDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

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
        className="hidden md:block fixed top-6 right-6 z-50 p-3 rounded-full bg-surface text-xl shadow-lg border border-gray-200 hover:shadow-xl hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black"
        title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
      >
        {theme === 'light' ? '🌙' : '☀️'}
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
      <div className="md:hidden bg-surface shadow-md border-b border-gray-200">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-primary-600" />
            <h1 className="text-lg font-bold text-gray-800">FinManager</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
              title="Toggle Theme"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        <div className="bg-surface border-t border-gray-200">
          <nav className="px-2 pt-2 pb-3 space-y-1">
            <button
              onClick={() => setCurrentSection('taxation')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentSection === 'taxation'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Taxation
            </button>
            <button
              onClick={() => setCurrentSection('calculator')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentSection === 'calculator'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Tax Calculator
            </button>
            <button
              onClick={() => setCurrentSection('gold')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentSection === 'gold'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Gold Investment
            </button>
            <button
              onClick={() => setCurrentSection('calendar')}
              className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${currentSection === 'calendar'
                ? 'bg-green-100 text-green-800'
                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
            >
              Gold Calendar
            </button>
          </nav>
        </div>
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

function Taxation() {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-black">
          Indian Taxation Guide
        </h1>
        <p className="text-gray-600 text-lg">
          Comprehensive guide to understanding Indian tax regimes and optimize your tax planning
        </p>
      </div>

      {/* Tax Regime Comparison */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
          <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
          Tax Regime Comparison
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <Landmark className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Old Regime</h3>
            </div>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Traditional tax system with more deductions and exemptions but higher tax rates.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">More deductions available (80C, 80D, HRA)</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Higher tax slabs (5%, 20%, 30%)</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">4% cess on total tax</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-900 rounded-lg flex items-center justify-center mr-3">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">New Regime</h3>
            </div>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Simplified system with lower tax rates but fewer deductions.
            </p>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Lower tax slabs (5%, 10%, 15%)</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Limited deductions available</span>
              </div>
              <div className="flex items-start">
                <svg className="w-5 h-5 text-gray-700 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">4% cess on total tax</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Terms Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
          Key Taxation Terms
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Gross Income</h4>
            </div>
            <p className="text-gray-600 text-sm">Total income before any deductions or exemptions.</p>
          </div>

          <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Taxable Income</h4>
            </div>
            <p className="text-gray-600 text-sm">Gross income minus deductions and exemptions.</p>
          </div>

          <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Deductions</h4>
            </div>
            <p className="text-gray-600 text-sm">Amounts you can subtract from gross income (e.g., 80C).</p>
          </div>

          <div className="bg-surface p-5 rounded-xl shadow-md border-l-4 border-gray-800 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                <svg className="w-5 h-5 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800">Exemptions</h4>
            </div>
            <p className="text-gray-600 text-sm">Income that is not taxed (e.g., HRA).</p>
          </div>
        </div>
      </section>

      {/* Common Deductions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
          Popular Tax Deductions
        </h2>
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold text-lg">80C</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-gray-800">Section 80C</h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Up to ₹1.5 lakh
                  </span>
                </div>
                <p className="text-gray-600">Investments in PPF, ELSS mutual funds, life insurance premiums, home loan principal, NSC, 5-year tax-saving FDs, etc.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold text-lg">80D</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-gray-800">Section 80D (Health Insurance)</h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Up to ₹75k
                  </span>
                </div>
                <p className="text-gray-600">Premium paid for medical insurance for self, family, and parents. Additional deduction for senior citizens.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white font-bold text-sm">HRA</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-lg text-gray-800">HRA (House Rent Allowance)</h4>
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Variable
                  </span>
                </div>
                <p className="text-gray-600">Exemption for rent paid if living in rented accommodation. Calculated based on actual HRA received, rent paid, and salary.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tax Slabs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
          <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
          Income Tax Slabs (FY 2024-25)
        </h2>
        <div className="bg-surface rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="p-4 text-left font-bold">Income Range</th>
                  <th className="p-4 text-left font-bold">Old Regime Rate</th>
                  <th className="p-4 text-left font-bold">New Regime Rate</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-700">Up to ₹2.5 lakh</td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">0%</span></td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">0%</span></td>
                </tr>
                <tr className="border-b bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-semibold text-gray-700">₹2.5 lakh - ₹5 lakh</td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">5%</span></td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">5%</span></td>
                </tr>
                <tr className="border-b hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-semibold text-gray-700">₹5 lakh - ₹10 lakh</td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">20%</span></td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">10%</span></td>
                </tr>
                <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
                  <td className="p-4 font-semibold text-gray-700">Above ₹10 lakh</td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">30%</span></td>
                  <td className="p-4"><span className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm font-semibold">15%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 p-4 border-t border-gray-200">
            <p className="text-sm text-gray-700 flex items-center">
              <svg className="w-5 h-5 mr-2 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <strong>Note:</strong> All tax amounts are subject to 4% cess (Health and Education Cess)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function TaxCalculator() {
  const [salary, setSalary] = useState('');
  const [deductions, setDeductions] = useState('');
  const [regime, setRegime] = useState('old');
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const sal = parseFloat(salary);
    const ded = parseFloat(deductions) || 0;

    if (isNaN(sal) || sal < 0) {
      alert('Please enter valid salary');
      return;
    }
    if (ded < 0) {
      alert('Deductions cannot be negative');
      return;
    }

    const taxableIncome = Math.max(0, sal - ded);
    let tax = 0;
    const breakdown = [];

    if (regime === 'old') {
      // Old Regime Slabs
      // Rebate u/s 87A for Old Regime: Tax is 0 if income <= 5L
      if (taxableIncome <= 500000) {
        breakdown.push({ slab: 'Up to ₹5L (Rebate u/s 87A)', rate: '0%', amount: 0 });
        tax = 0;
      } else {
        if (taxableIncome <= 250000) {
          breakdown.push({ slab: 'Up to ₹2.5L', rate: '0%', amount: 0 });
        } else {
          // 0 - 2.5L
          breakdown.push({ slab: 'Up to ₹2.5L', rate: '0%', amount: 0 });

          if (taxableIncome > 250000) {
            const amt = Math.min(taxableIncome - 250000, 250000);
            tax += amt * 0.05;
            breakdown.push({ slab: '₹2.5L - ₹5L', rate: '5%', amount: amt * 0.05 });
          }
          if (taxableIncome > 500000) {
            const amt = Math.min(taxableIncome - 500000, 500000);
            tax += amt * 0.20;
            breakdown.push({ slab: '₹5L - ₹10L', rate: '20%', amount: amt * 0.20 });
          }
          if (taxableIncome > 1000000) {
            const amt = taxableIncome - 1000000;
            tax += amt * 0.30;
            breakdown.push({ slab: 'Above ₹10L', rate: '30%', amount: amt * 0.30 });
          }
        }
      }
    } else {
      // New Regime Slabs (FY 2023-24 onwards)
      // Rebate u/s 87A for New Regime: Tax is 0 if income <= 7L
      if (taxableIncome <= 700000) {
        breakdown.push({ slab: 'Up to ₹7L (Rebate u/s 87A)', rate: '0%', amount: 0 });
        tax = 0;
      } else {
        if (taxableIncome <= 300000) {
          breakdown.push({ slab: 'Up to ₹3L', rate: '0%', amount: 0 });
        } else {
          // 0 - 3L
          breakdown.push({ slab: 'Up to ₹3L', rate: '0%', amount: 0 });

          if (taxableIncome > 300000) {
            const amt = Math.min(taxableIncome - 300000, 300000); // 3L-6L
            tax += amt * 0.05;
            breakdown.push({ slab: '₹3L - ₹6L', rate: '5%', amount: amt * 0.05 });
          }
          if (taxableIncome > 600000) {
            const amt = Math.min(taxableIncome - 600000, 300000); // 6L-9L
            tax += amt * 0.10;
            breakdown.push({ slab: '₹6L - ₹9L', rate: '10%', amount: amt * 0.10 });
          }
          if (taxableIncome > 900000) {
            const amt = Math.min(taxableIncome - 900000, 300000); // 9L-12L
            tax += amt * 0.15;
            breakdown.push({ slab: '₹9L - ₹12L', rate: '15%', amount: amt * 0.15 });
          }
          if (taxableIncome > 1200000) {
            const amt = Math.min(taxableIncome - 1200000, 300000); // 12L-15L
            tax += amt * 0.20;
            breakdown.push({ slab: '₹12L - ₹15L', rate: '20%', amount: amt * 0.20 });
          }
          if (taxableIncome > 1500000) {
            const amt = taxableIncome - 1500000;
            tax += amt * 0.30;
            breakdown.push({ slab: 'Above ₹15L', rate: '30%', amount: amt * 0.30 });
          }
        }
      }
    }

    const cess = tax * 0.04;
    const totalTax = tax + cess;

    setResult({
      taxableIncome,
      tax,
      cess,
      totalTax,
      breakdown
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-black">
          Income Tax Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate your income tax liability for both old and new tax regimes
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200 mb-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          Enter Your Details
        </h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Annual Salary (₹)
            </label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              placeholder="Enter your annual salary"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Total Deductions (₹)
            </label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-black focus:ring-2 focus:ring-gray-200 transition-all outline-none"
              placeholder="80C, 80D, HRA, etc."
            />
            <p className="text-xs text-gray-500 mt-1">Include all eligible deductions (80C, 80D, HRA, etc.)</p>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Tax Regime
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setRegime('old')}
                className={`p-3 rounded-lg border-2 font-semibold transition-all ${regime === 'old'
                  ? 'bg-black text-white border-black shadow-lg'
                  : 'bg-surface border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
              >
                Old Regime
              </button>
              <button
                onClick={() => setRegime('new')}
                className={`p-3 rounded-lg border-2 font-semibold transition-all ${regime === 'new'
                  ? 'bg-black text-white border-black shadow-lg'
                  : 'bg-surface border-gray-200 text-gray-700 hover:border-gray-400'
                  }`}
              >
                New Regime
              </button>
            </div>
          </div>

          <button
            onClick={calculateTax}
            className="w-full bg-black text-white py-4 px-6 rounded-xl hover:bg-gray-800 font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Calculate Tax
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-6 animate-fadeIn">
          {/* Tax Summary Card */}
          <div className="bg-black p-8 rounded-2xl shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <svg className="w-7 h-7 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Tax Summary
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-1">Taxable Income</p>
                <p className="text-3xl font-bold">₹{result.taxableIncome.toLocaleString()}</p>
              </div>

              <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-1">Base Tax</p>
                <p className="text-3xl font-bold">₹{result.tax.toLocaleString()}</p>
              </div>

              <div className="bg-surface bg-opacity-20 backdrop-blur-sm p-5 rounded-xl border border-gray-700">
                <p className="text-sm text-gray-300 mb-1">Health & Education Cess (4%)</p>
                <p className="text-2xl font-bold">₹{result.cess.toLocaleString()}</p>
              </div>

              <div className="bg-white p-5 rounded-xl shadow-lg">
                <p className="text-sm text-gray-900 mb-1">Total Tax Liability</p>
                <p className="text-4xl font-bold text-black">₹{result.totalTax.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Tax Breakdown Card */}
          <div className="bg-surface p-8 rounded-2xl shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <svg className="w-6 h-6 mr-2 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              Slab-wise Breakdown
            </h2>

            <div className="space-y-3">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold text-sm">{index + 1}</span>
                    </div>
                    <div>
                      <span className="font-bold text-gray-800">{item.slab}</span>
                      <span className="text-sm text-gray-500 ml-2 bg-gray-100 px-2 py-1 rounded">
                        {item.rate}
                      </span>
                    </div>
                  </div>
                  <span className="text-xl font-bold text-black">
                    ₹{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

function TradingViewWidget({ symbol, name }) {
  const container = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "symbols": [
        [
          name,
          symbol
        ]
      ],
      "chartOnly": false,
      "width": "100%",
      "height": "400",
      "locale": "in",
      "colorTheme": "light",
      "autosize": true,
      "showVolume": false,
      "showMA": false,
      "hideDateRanges": false,
      "hideMarketStatus": false,
      "hideSymbolLogo": false,
      "scalePosition": "right",
      "scaleMode": "Normal",
      "fontFamily": "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
      "fontSize": "10",
      "noTimeScale": false,
      "valuesTracking": "1",
      "changeMode": "price-and-percent",
      "chartType": "area",
      "maLineColor": "#2962FF",
      "maLineWidth": 1,
      "maLength": 9,
      "lineWidth": 2,
      "lineType": 0,
      "dateRanges": [
        "1d|1",
        "1m|30",
        "3m|60",
        "12m|1D",
        "60m|1W",
        "all|1M"
      ]
    });

    if (container.current) {
      container.current.innerHTML = '';
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container h-[400px] w-full mb-6 rounded-xl overflow-hidden shadow-lg border border-gray-200" ref={container}>
      <div className="tradingview-widget-container__widget h-full w-full"></div>
    </div>
  );
}

function GoldInvestment() {
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
            theme: 'light',
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
        <h1 className="text-4xl font-extrabold tracking-tight mb-3 text-black">
          Precious Metals <span className="text-gray-500 font-light">Investment</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Track live prices and explore investment opportunities in Gold and Silver.
          Use these assets to hedge against inflation and secure your portfolio.
        </p>
      </div>

      {/* Metal Selector & Intro */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between glass p-2 rounded-2xl border border-gray-100 shadow-soft">
        <div className="flex p-1 bg-gray-100/50 rounded-xl w-full md:w-auto">
          <button
            onClick={() => setSelectedMetal('gold')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-sm transition-all duration-300 ${selectedMetal === 'gold'
              ? 'bg-black text-white shadow-lg scale-100'
              : 'text-gray-500 hover:text-black hover:bg-white/50'
              }`}
          >
            <Coins className={`w-4 h-4 ${selectedMetal === 'gold' ? 'text-yellow-400' : ''}`} />
            GOLD
          </button>
          <button
            onClick={() => setSelectedMetal('silver')}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-8 rounded-lg font-bold text-sm transition-all duration-300 ${selectedMetal === 'silver'
              ? 'bg-black text-white shadow-lg scale-100'
              : 'text-gray-500 hover:text-black hover:bg-white/50'
              }`}
          >
            <Coins className={`w-4 h-4 ${selectedMetal === 'silver' ? 'text-gray-300' : ''}`} />
            SILVER
          </button>
        </div>

        <div className="px-4 text-sm font-medium text-gray-500 flex items-center gap-2 animate-pulse-subtle">
          <span className="w-2 h-2 rounded-full bg-green-500"></span> Live Market Data
        </div>
      </div>

      {/* Chart Section */}
      <div key={selectedMetal} className="glass p-1 rounded-2xl shadow-glass-lg animate-fade-in border border-gray-100">
        <div className="bg-white rounded-xl overflow-hidden relative">
          <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-100 shadow-sm">
            <span className="text-xs font-bold text-gray-800 tracking-wider">
              {currentMetal.name.toUpperCase()} / INR
            </span>
          </div>
          <div id="tradingview_chart" className="w-full h-[480px]"></div>
        </div>
        <div className="py-3 px-6 flex justify-between items-center bg-gray-50/50 rounded-b-xl">
          <span className="text-xs text-gray-400">Data provided by TradingView</span>
          <a
            href={currentMetal.chartUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline flex items-center gap-1 transition-colors"
          >
            Open Full Chart <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Investment Types Grid */}
      <section>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          Ways to Invest in {currentMetal.name}
          <div className="h-px flex-1 bg-gray-200 ml-4"></div>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {currentMetal.types.map((item, index) => (
            <div
              key={index}
              className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-soft hover:shadow-glass-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-black transition-colors">{item.type}</h3>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md font-medium border border-gray-200">
                  {index === 0 ? 'Popular' : 'Alternative'}
                </span>
              </div>

              <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                {item.description}
              </p>

              <div className="space-y-4">
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100/50">
                  <h4 className="font-semibold text-green-800 text-sm mb-2 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> Advantages
                  </h4>
                  <ul className="space-y-1">
                    {item.pros.map((pro, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-green-500">
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-red-50/50 p-4 rounded-xl border border-red-100/50">
                  <h4 className="font-semibold text-red-800 text-sm mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Risks & Costs
                  </h4>
                  <ul className="space-y-1">
                    {item.cons.map((con, i) => (
                      <li key={i} className="text-xs text-gray-700 pl-6 relative before:content-['•'] before:absolute before:left-2 before:text-red-500">
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
      <section className="bg-black text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-3xl opacity-20 -mr-20 -mt-20"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-8">Smart Investment Tips</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
              <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2">Diversify Wisely</h4>
              <p className="text-gray-300 text-sm leading-relaxed">Allocate 5-10% of portfolio to precious metals. Don't over-invest as they don't generate passive income.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
              <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2">Think Long-term</h4>
              <p className="text-gray-300 text-sm leading-relaxed">Best suited for 5+ years horizon. Short-term prices can be volatile due to global events.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 hover:bg-white/15 transition-all cursor-default">
              <div className="w-10 h-10 bg-white text-black rounded-lg flex items-center justify-center mb-4 shadow-lg">
                <CheckCircle className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-lg mb-2">Verify Purity</h4>
              <p className="text-gray-300 text-sm leading-relaxed">Always check for BIS Hallmark when buying physical gold. Trade only on regulated exchanges for digital forms.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate dummy gold rates for a year
const generateGoldRates = (year, currentPrice = 6500) => {
  const rates = {};
  const start = new Date(year, 0, 1);
  const end = new Date(year + 1, 0, 1);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (dateStr === todayStr) {
      rates[dateStr] = currentPrice;
    } else {
      // Random rate between currentPrice - 500 and currentPrice + 500
      const variation = Math.floor(Math.random() * 1000) - 500;
      rates[dateStr] = Math.max(5500, Math.min(7500, currentPrice + variation));
    }
  }
  return rates;
};

function GoldCalendar() {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedDate, setSelectedDate] = useState(null);
  const [goldRates] = useState(() => generateGoldRates(selectedYear));

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);
    const calendar = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const rate = goldRates[dateStr];
      const isSelected = selectedDate === dateStr;
      const isToday = day === currentDate.getDate() && selectedMonth === currentDate.getMonth() && selectedYear === currentDate.getFullYear();

      calendar.push(
        <button
          key={day}
          onClick={() => setSelectedDate(dateStr)}
          className={`w-8 h-8 text-xs border rounded ${isSelected ? 'bg-black text-white' : isToday ? 'bg-gray-300' : 'bg-gray-100 hover:bg-gray-200'
            } flex items-center justify-center`}
          title={`₹${rate}/gram`}
        >
          {day}
        </button>
      );
    }

    return calendar;
  };

  const selectedRate = selectedDate ? goldRates[selectedDate] : null;

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gold Price Calendar</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-surface p-6 rounded-lg shadow mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                {months[selectedMonth]} {selectedYear}
              </h2>
              <div className="flex gap-2">
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                  className="p-2 border rounded"
                >
                  {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                  ))}
                </select>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                  className="p-2 border rounded"
                >
                  <option value={2023}>2023</option>
                  <option value={2024}>2024</option>
                  <option value={2025}>2025</option>
                  <option value={2026}>2026</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map(day => (
                  <div key={day} className="w-8 h-8 flex items-center justify-center text-xs font-medium text-gray-600">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {renderCalendar()}
              </div>
            </div>

            <div className="text-sm text-gray-600">
              <p>• Click on any date to view gold rate</p>
              <p>• Green square indicates today</p>
              <p>• Blue square indicates selected date</p>
            </div>
          </div>
        </div>

        <div className="lg:w-80">
          <div className="bg-surface p-6 rounded-lg shadow sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Gold Rate Details</h3>
            {selectedDate ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-black mb-2">
                  ₹{selectedRate?.toLocaleString()}
                </div>
                <p className="text-gray-600 mb-4">per gram (22K gold)</p>
                <div className="text-sm text-gray-500">
                  <p>Date: {new Date(selectedDate).toLocaleDateString('en-IN', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a date to view gold rate</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Placeholder Components for all new features

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState('5000');
  const [expectedReturn, setExpectedReturn] = useState('12');
  const [timePeriod, setTimePeriod] = useState('10');
  const [result, setResult] = useState(null);


  const calculateSIP = () => {
    const P = parseFloat(monthlyInvestment);
    const r = parseFloat(expectedReturn) / 100 / 12;
    const n = parseFloat(timePeriod) * 12;

    if (isNaN(P) || P <= 0 || isNaN(n) || n <= 0) {
      return;
    }

    const maturityValue = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
    const investedAmount = P * n;
    const estimatedReturns = maturityValue - investedAmount;

    setResult({
      investedAmount: investedAmount.toFixed(0),
      estimatedReturns: estimatedReturns.toFixed(0),
      totalValue: maturityValue.toFixed(0)
    });
  };


  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">SIP Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Systematic Investment Plan (SIP) allows you to invest a fixed amount regularly in mutual funds.
          Use interactive sliders to see how your investments can grow!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Investment Details</h2>
          <div className="space-y-6">
            <SliderInput
              label="Monthly Investment"
              value={monthlyInvestment}
              onChange={(val) => setMonthlyInvestment(val)}
              min={500}
              max={100000}
              step={500}
              unit="₹"
            />

            <SliderInput
              label="Expected Annual Return"
              value={expectedReturn}
              onChange={(val) => setExpectedReturn(val)}
              min={1}
              max={30}
              step={0.5}
              unit="%"
              helpText="Average equity mutual fund returns: 10-15%"
            />

            <SliderInput
              label="Time Period"
              value={timePeriod}
              onChange={(val) => setTimePeriod(val)}
              min={1}
              max={40}
              step={1}
              unit=" years"
            />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-6">Investment Summary</h2>

          {result && parseFloat(result.totalValue) > 0 ? (
            <>
              <DonutChart
                data={[
                  {
                    label: 'Invested Amount',
                    value: parseFloat(result.investedAmount),
                    color: '#666666',
                    displayValue: `₹${parseFloat(result.investedAmount).toLocaleString()}`
                  },
                  {
                    label: 'Estimated Returns',
                    value: parseFloat(result.estimatedReturns),
                    color: '#000000',
                    displayValue: `₹${parseFloat(result.estimatedReturns).toLocaleString()}`
                  }
                ]}
                centerText={{
                  label: 'Total Value',
                  value: `₹${(parseFloat(result.totalValue) / 100000).toFixed(1)}L`
                }}
              />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-1">Maturity Amount</p>
                  <p className="text-3xl font-bold text-black">₹{parseFloat(result.totalValue).toLocaleString()}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Your ₹{parseFloat(monthlyInvestment).toLocaleString()}/month can grow to this in {timePeriod} years
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <p>Adjust sliders to see results</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTenure, setLoanTenure] = useState('');
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTenure) * 12;

    if (isNaN(P) || P <= 0 || isNaN(r) || r < 0 || isNaN(n) || n <= 0) {
      alert('Please enter valid loan details');
      return;
    }

    // EMI formula: E = P × r × (1 + r)^n / ((1 + r)^n - 1)
    let emi = 0;
    if (r === 0) {
      emi = P / n;
    } else {
      emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyEMI: emi.toFixed(0),
      totalInterest: totalInterest.toFixed(0),
      totalPayment: totalPayment.toFixed(0),
      principalAmount: P.toFixed(0)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">EMI Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Calculate your Equated Monthly Installment (EMI) for home loans, car loans, personal loans, and more.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Loan Amount (₹)</label>
            <input
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter loan amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter interest rate"
            />
            <p className="text-xs text-gray-500 mt-1">Home loan: 8-9%, Personal loan: 10-16%</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Loan Tenure (Years)</label>
            <input
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Loan duration in years"
            />
          </div>

          <button
            onClick={calculateEMI}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate EMI
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-surface p-6 rounded-lg shadow">
            <div className="text-center mb-6">
              <p className="text-sm text-gray-600 mb-2">Monthly EMI</p>
              <p className="text-4xl font-bold text-black">₹{parseFloat(result.monthlyEMI).toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Principal Amount</p>
                <p className="text-lg font-semibold">₹{parseFloat(result.principalAmount).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Interest</p>
                <p className="text-lg font-semibold text-gray-800">₹{parseFloat(result.totalInterest).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-lg shadow">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 font-medium">Total Payment</span>
              <span className="text-2xl font-bold text-gray-900">₹{parseFloat(result.totalPayment).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('60');
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [inflation, setInflation] = useState('6');
  const [returnRate, setReturnRate] = useState('12');
  const [result, setResult] = useState(null);

  const calculateRetirement = () => {
    const age = parseInt(currentAge);
    const retAge = parseInt(retirementAge);
    const expense = parseFloat(monthlyExpense);
    const inf = parseFloat(inflation) / 100;
    const ret = parseFloat(returnRate) / 100;

    if (isNaN(age) || isNaN(retAge) || isNaN(expense) || retAge <= age) {
      alert('Please enter valid details');
      return;
    }

    const yearsToRetirement = retAge - age;
    const yearsInRetirement = 85 - retAge;

    // Future value of monthly expenses at retirement
    const futureMonthlyExpense = expense * Math.pow(1 + inf, yearsToRetirement);
    const annualExpenseAtRetirement = futureMonthlyExpense * 12;

    // Calculate required corpus using PV of Annuity for retirement years
    // Inflation-adjusted return (Real Rate of Return)
    const realRate = (1 + ret) / (1 + inf) - 1;

    // Corpus needed to fund expenses for yearsInRetirement
    // PV = Payment * [ (1 - (1+r)^-n) / r ]
    // Payment is annualExpenseAtRetirement

    let corpusNeeded;
    if (realRate === 0) {
      corpusNeeded = annualExpenseAtRetirement * yearsInRetirement;
    } else {
      corpusNeeded = annualExpenseAtRetirement * ((1 - Math.pow(1 + realRate, -yearsInRetirement)) / realRate);
    }

    // Monthly SIP needed
    const monthlyRate = ret / 12;
    const months = yearsToRetirement * 12;
    const monthlySIP = corpusNeeded / (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate));

    setResult({
      corpusNeeded: corpusNeeded.toFixed(0),
      monthlySIP: monthlySIP.toFixed(0),
      futureExpense: futureMonthlyExpense.toFixed(0),
      yearsToRetirement: yearsToRetirement
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Retirement Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Plan your retirement by calculating the corpus you'll need and the monthly savings required.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Current Age</label>
              <input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Retirement Age</label>
              <input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Current Monthly Expense (₹)</label>
            <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(e.target.value)}
              className="w-full p-2 border rounded" placeholder="Enter monthly expenses" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Expected Inflation (%)</label>
              <input type="number" step="0.1" value={inflation} onChange={(e) => setInflation(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Expected Return (%)</label>
              <input type="number" step="0.1" value={returnRate} onChange={(e) => setReturnRate(e.target.value)}
                className="w-full p-2 border rounded" />
            </div>
          </div>

          <button onClick={calculateRetirement}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Calculate Retirement Plan
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-surface p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Retirement Plan</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Retirement Corpus Needed</span>
                <span className="text-xl font-bold text-black">₹{parseFloat(result.corpusNeeded).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Monthly SIP Required</span>
                <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.monthlySIP).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Future Monthly Expense</span>
                <span className="text-lg font-semibold">₹{parseFloat(result.futureExpense).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Years to Retirement</span>
                <span className="text-lg font-semibold">{result.yearsToRetirement} years</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function EmergencyFundCalculator() {
  const [monthlyExpense, setMonthlyExpense] = useState('');
  const [months, setMonths] = useState('6');
  const [existingSavings, setExistingSavings] = useState('');
  const [result, setResult] = useState(null);

  const calculateEmergencyFund = () => {
    const expense = parseFloat(monthlyExpense);
    const duration = parseInt(months);
    const savings = parseFloat(existingSavings) || 0;

    if (isNaN(expense) || expense <= 0) {
      alert('Please enter valid monthly expense');
      return;
    }

    const requiredFund = expense * duration;
    const gap = requiredFund - savings;
    const percentageComplete = savings > 0 ? (savings / requiredFund) * 100 : 0;

    setResult({
      requiredFund: requiredFund.toFixed(0),
      existingSavings: savings.toFixed(0),
      gap: gap.toFixed(0),
      percentageComplete: percentageComplete.toFixed(1),
      isComplete: gap <= 0
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Emergency Fund Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Financial experts recommend keeping 3-6 months of expenses as an emergency fund.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Expense (₹)</label>
            <input type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(e.target.value)}
              className="w-full p-2 border rounded" placeholder="Enter monthly expenses" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Coverage Duration (Months)</label>
            <select value={months} onChange={(e) => setMonths(e.target.value)} className="w-full p-2 border rounded">
              <option value="3">3 months</option>
              <option value="6">6 months (Recommended)</option>
              <option value="9">9 months</option>
              <option value="12">12 months</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Existing Emergency Savings (₹)</label>
            <input type="number" value={existingSavings} onChange={(e) => setExistingSavings(e.target.value)}
              className="w-full p-2 border rounded" placeholder="Current emergency fund" />
          </div>

          <button onClick={calculateEmergencyFund}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
            Calculate Emergency Fund
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Emergency Fund Status</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Required Fund</span>
              <span className="text-lg font-semibold">₹{parseFloat(result.requiredFund).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Current Savings</span>
              <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.existingSavings).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">{result.isComplete ? 'Surplus' : 'Gap'}</span>
              <span className={`text-lg font-semibold ${result.isComplete ? 'text-gray-700' : 'text-gray-900'}`}>
                ₹{Math.abs(parseFloat(result.gap)).toLocaleString()}
              </span>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Progress</span>
                <span className="font-semibold">{result.percentageComplete}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div className={`h-4 rounded-full ${result.isComplete ? 'bg-black' : 'bg-gray-600'}`}
                  style={{ width: `${Math.min(result.percentageComplete, 100)}%` }}></div>
              </div>
            </div>
            {result.isComplete ? (
              <div className="bg-gray-50 border-l-4 border-black p-4 mt-4">
                <p className="text-sm text-gray-700 font-medium">✓ Your emergency fund is complete!</p>
              </div>
            ) : (
              <div className="bg-gray-50 border-l-4 border-black p-4 mt-4">
                <p className="text-sm text-gray-700 font-medium">
                  You need ₹{Math.abs(parseFloat(result.gap)).toLocaleString()} more to complete your emergency fund.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [frequency, setFrequency] = useState('4');
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseFloat(frequency);

    if (isNaN(P) || P <= 0 || isNaN(r) || r < 0 || isNaN(t) || t <= 0) {
      alert('Please enter valid values');
      return;
    }

    // A = P(1 + r/n)^(nt)
    const amount = P * Math.pow((1 + r / n), n * t);
    const interest = amount - P;

    setResult({
      principal: P.toFixed(0),
      interest: interest.toFixed(0),
      total: amount.toFixed(0)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Compound Interest Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Principal Amount (₹)</label>
            <input
              type="number"
              value={principal}
              onChange={(e) => setPrincipal(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter principal amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter annual interest rate"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Time Period (Years)</label>
            <input
              type="number"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Investment duration in years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Compounding Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="1">Annually</option>
              <option value="2">Semi-Annually</option>
              <option value="4">Quarterly</option>
              <option value="12">Monthly</option>
              <option value="365">Daily</option>
            </select>
          </div>

          <button
            onClick={calculateCompoundInterest}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Results</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Principal Amount</span>
              <span className="text-lg font-semibold">₹{parseFloat(result.principal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Total Interest</span>
              <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.interest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-medium">Maturity Amount</span>
              <span className="text-2xl font-bold text-black">₹{parseFloat(result.total).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CAGRCalculator() {
  const [mode, setMode] = useState('basic'); // 'basic' or 'advanced'
  const [initialValue, setInitialValue] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('0');

  // Advanced mode - multiple investments
  const [investments, setInvestments] = useState([
    { year: '0', amount: '' },
  ]);

  const [result, setResult] = useState(null);

  const calculateCAGR = () => {
    if (mode === 'basic') {
      const beginning = parseFloat(initialValue);
      const ending = parseFloat(finalValue);
      const timeYears = parseFloat(years);
      const timeMonths = parseFloat(months) || 0;

      if (isNaN(beginning) || beginning <= 0 || isNaN(ending) || ending <= 0 || isNaN(timeYears) || timeYears < 0) {
        alert('Please enter valid values');
        return;
      }

      const totalTime = timeYears + (timeMonths / 12);

      if (totalTime <= 0) {
        alert('Time period must be greater than 0');
        return;
      }

      // CAGR formula: [(Ending Value / Beginning Value) ^ (1 / Number of Years)] - 1
      const cagr = (Math.pow(ending / beginning, 1 / totalTime) - 1) * 100;
      const absoluteReturn = ((ending - beginning) / beginning) * 100;
      const totalGain = ending - beginning;

      // Calculate year-by-year breakdown
      const yearlyBreakdown = [];
      let currentValue = beginning;
      const wholeYears = Math.floor(totalTime);

      for (let i = 1; i <= wholeYears; i++) {
        const previousValue = currentValue;
        currentValue = previousValue * (1 + cagr / 100);
        yearlyBreakdown.push({
          year: i,
          startValue: previousValue,
          endValue: currentValue,
          growth: currentValue - previousValue,
          percentage: cagr
        });
      }

      // Add partial year if exists
      if (timeMonths > 0 && wholeYears === timeYears) {
        const previousValue = currentValue;
        const partialGrowth = (cagr / 100) * (timeMonths / 12);
        currentValue = previousValue * (1 + partialGrowth);
        yearlyBreakdown.push({
          year: `${wholeYears + 1} (${timeMonths} months)`,
          startValue: previousValue,
          endValue: currentValue,
          growth: currentValue - previousValue,
          percentage: (partialGrowth * 100)
        });
      }

      setResult({
        cagr: cagr.toFixed(2),
        absoluteReturn: absoluteReturn.toFixed(2),
        totalGain: totalGain.toFixed(0),
        initialInvestment: beginning.toFixed(0),
        finalValue: ending.toFixed(0),
        duration: totalTime.toFixed(2),
        yearlyBreakdown
      });
    } else {
      // Advanced mode calculation
      alert('Advanced mode calculation coming soon!');
    }
  };

  const addInvestment = () => {
    setInvestments([...investments, { year: '', amount: '' }]);
  };

  const removeInvestment = (index) => {
    const updated = investments.filter((_, i) => i !== index);
    setInvestments(updated);
  };

  const updateInvestment = (index, field, value) => {
    const updated = [...investments];
    updated[index][field] = value;
    setInvestments(updated);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-3 text-black">
          CAGR Calculator
        </h1>
        <p className="text-gray-600 text-lg">
          Calculate Compound Annual Growth Rate (CAGR) of your investments
        </p>
      </div>

      {/* Info Banner */}
      <div className="bg-gray-50 border-l-4 border-black p-6 mb-8 rounded-xl shadow-md">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-bold text-gray-900 mb-1">What is CAGR?</h3>
            <p className="text-sm text-gray-700">
              CAGR (Compound Annual Growth Rate) is the rate of return that would be required for an investment to grow from its beginning balance to its ending balance, assuming profits were reinvested at the end of each year. It's one of the most accurate ways to calculate and determine returns for individual assets, investment portfolios, and anything that can rise or fall in value over time.
            </p>
          </div>
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setMode('basic')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${mode === 'basic'
            ? 'bg-black text-white shadow-lg scale-105'
            : 'bg-surface text-gray-700 border-2 border-gray-200 hover:border-gray-400'
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Basic Calculator
          </div>
        </button>
        <button
          onClick={() => setMode('advanced')}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${mode === 'advanced'
            ? 'bg-black text-white shadow-lg scale-105'
            : 'bg-surface text-gray-700 border-2 border-gray-200 hover:border-gray-400'
            }`}
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Advanced Mode
          </div>
        </button>
      </div>

      {/* Calculator Form */}
      {mode === 'basic' ? (
        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Calculate Your Returns</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Initial Investment (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  type="number"
                  value={initialValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                  placeholder="100000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Final Value (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                <input
                  type="number"
                  value={finalValue}
                  onChange={(e) => setFinalValue(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                  placeholder="250000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Investment Period (Years)
              </label>
              <input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                placeholder="5"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Additional Months (Optional)
              </label>
              <input
                type="number"
                min="0"
                max="11"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-black focus:ring-2 focus:ring-gray-200 transition-all"
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Enter 0-11 months for precise calculation</p>
            </div>
          </div>

          <button
            onClick={calculateCAGR}
            className="w-full mt-8 bg-black text-white py-4 px-6 rounded-xl font-bold text-lg hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Calculate CAGR
          </button>
        </div>
      ) : (
        <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Multiple Investments (Advanced)</h2>
          <div className="bg-gray-50 border-l-4 border-black p-4 mb-6 rounded">
            <p className="text-sm text-gray-700">
              Track multiple investments made at different times. This feature is coming soon!
            </p>
          </div>
          <div className="space-y-4">
            {investments.map((investment, index) => (
              <div key={index} className="flex gap-4 items-end">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Year</label>
                  <input
                    type="number"
                    value={investment.year}
                    onChange={(e) => updateInvestment(index, 'year', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl"
                    placeholder="0"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    value={investment.amount}
                    onChange={(e) => updateInvestment(index, 'amount', e.target.value)}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl"
                    placeholder="100000"
                  />
                </div>
                {investments.length > 1 && (
                  <button
                    onClick={() => removeInvestment(index)}
                    className="px-4 py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            onClick={addInvestment}
            className="mt-4 px-6 py-2 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition-colors font-medium"
          >
            + Add Investment
          </button>
        </div>
      )}

      {/* Results Section */}
      {result && (
        <div className="space-y-6 animate-slide-up">
          {/* Key Metrics Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-black p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold opacity-90">CAGR</h3>
                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">{result.cagr}%</p>
              <p className="text-xs opacity-80">Annual Growth Rate</p>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold opacity-90">Total Gain</h3>
                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">₹{parseFloat(result.totalGain).toLocaleString()}</p>
              <p className="text-xs opacity-80">Absolute Profit</p>
            </div>

            <div className="bg-gray-700 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-transform">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold opacity-90">Absolute Return</h3>
                <svg className="w-6 h-6 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-4xl font-bold mb-2">{result.absoluteReturn}%</p>
              <p className="text-xs opacity-80">Total Returns</p>
            </div>
          </div>

          {/* Detailed Breakdown */}
          <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
              Investment Summary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Initial Investment</span>
                  <span className="text-xl font-bold text-gray-800">₹{parseFloat(result.initialInvestment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Final Value</span>
                  <span className="text-xl font-bold text-black">₹{parseFloat(result.finalValue).toLocaleString()}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Investment Duration</span>
                  <span className="text-xl font-bold text-gray-800">{result.duration} years</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Money Multiplier</span>
                  <span className="text-xl font-bold text-black">{(parseFloat(result.finalValue) / parseFloat(result.initialInvestment)).toFixed(2)}x</span>
                </div>
              </div>
            </div>
          </div>

          {/* Year-by-Year Breakdown */}
          {result.yearlyBreakdown && result.yearlyBreakdown.length > 0 && (
            <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="w-1 h-8 bg-black mr-3 rounded-full"></span>
                Year-by-Year Growth
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tl-xl">Year</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Start Value</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">End Value</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Growth</th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider rounded-tr-xl">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {result.yearlyBreakdown.map((year, index) => (
                      <tr key={index} className="hover:bg-orange-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3">
                              {typeof year.year === 'number' ? year.year : '★'}
                            </div>
                            <span className="text-sm font-semibold text-gray-900">Year {year.year}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-700">
                          ₹{year.startValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-black">
                          ₹{year.endValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                            +₹{year.growth.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-black">
                          {year.percentage.toFixed(2)}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Insights & Tips */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-black mb-2">Understanding CAGR</h3>
                  <p className="text-sm text-gray-700">
                    CAGR smooths out volatility and gives you the average annual growth rate. A higher CAGR indicates better investment performance over time. For reference, the Nifty 50 has delivered approximately 12-15% CAGR over the long term.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-black mb-2">Investment Tip</h3>
                  <p className="text-sm text-gray-700">
                    {parseFloat(result.cagr) > 15
                      ? "Excellent returns! Your investment has outperformed most market indices. Consider maintaining this strategy."
                      : parseFloat(result.cagr) > 10
                        ? "Good performance! Your returns are competitive with market benchmarks. Keep up the consistent investing."
                        : "Your returns could be improved. Consider reviewing your investment strategy and diversifying your portfolio for better growth."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MutualFundTracker() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mutual Fund Tracker</h1>

      <div className="bg-gray-50 border-l-4 border-black p-6 mb-8 rounded-r-lg">
        <h3 className="text-lg font-bold text-black mb-2">Feature Coming Soon!</h3>
        <p className="text-gray-700">
          We are building a comprehensive tracker for your mutual fund investments. In the meantime, learn about the basics below.
        </p>
      </div>

      <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">What is a Mutual Fund?</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          A mutual fund is a company that pools money from many investors and invests the money in securities such as stocks, bonds, and short-term debt. The combined holdings of the mutual fund are known as its portfolio. Investors buy shares in mutual funds.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-black">Types of Mutual Funds</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• <strong>Equity Funds:</strong> Invest in stocks. High risk, high return.</li>
              <li>• <strong>Debt Funds:</strong> Invest in bonds/government securities. Lower risk.</li>
              <li>• <strong>Hybrid Funds:</strong> Mix of equity and debt. Balanced risk.</li>
              <li>• <strong>ELSS:</strong> Equity Linked Savings Scheme. Tax saving funds (80C).</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <h3 className="font-bold text-lg mb-3 text-black">Benefits</h3>
            <ul className="space-y-2 text-sm text-gray-700">
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

function StockPortfolioManager() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Stock Portfolio Manager</h1>

      <div className="bg-gray-50 border-l-4 border-black p-6 mb-8 rounded-r-lg">
        <h3 className="text-lg font-bold text-black mb-2">Portfolio Manager Coming Soon!</h3>
        <p className="text-gray-700">
          Soon you will be able to track your stock holdings, visualize sector allocation, and analyze performance.
        </p>
      </div>

      <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Stock Market Basics</h2>

        <div className="space-y-6">
          <div className="flex items-start">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white font-bold">1</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">What is a Stock?</h3>
              <p className="text-gray-600 mt-1">A stock (or share) represents a fractional ownership in a company. When you buy a stock, you become a shareholder.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white font-bold">2</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Why invest in Stocks?</h3>
              <p className="text-gray-600 mt-1">Historically, stocks have provided the highest returns among all asset classes over the long term, beating inflation significantly.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <span className="text-white font-bold">3</span>
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">Key Metrics to Watch</h3>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <span className="font-bold text-gray-800 block">P/E Ratio</span>
                  <span className="text-xs text-gray-500">Price to Earnings. Indicates if a stock is over/undervalued.</span>
                </div>
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <span className="font-bold text-gray-800 block">Market Cap</span>
                  <span className="text-xs text-gray-500">Total value of all company shares. (Large, Mid, Small cap).</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FDCalculator() {
  const [deposit, setDeposit] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [result, setResult] = useState(null);

  const calculateFD = () => {
    const P = parseFloat(deposit);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(tenure);

    if (isNaN(P) || P <= 0 || isNaN(r) || r < 0 || isNaN(t) || t <= 0) {
      alert('Please enter valid values');
      return;
    }

    // FD maturity with quarterly compounding
    const n = 4; // Quarterly compounding
    const maturityAmount = P * Math.pow((1 + r / n), n * t);
    const interest = maturityAmount - P;

    setResult({
      principal: P.toFixed(0),
      interest: interest.toFixed(0),
      maturity: maturityAmount.toFixed(0)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fixed Deposit Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Fixed Deposits are one of the safest investment options in India with guaranteed returns. Calculate your FD maturity amount here.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Deposit Amount (₹)</label>
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter deposit amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Annual Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter interest rate"
            />
            <p className="text-xs text-gray-500 mt-1">Current FD rates: 6-7.5% (varies by bank)</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
            <input
              type="number"
              step="0.5"
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="FD duration in years"
            />
          </div>

          <button
            onClick={calculateFD}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate Maturity
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Maturity Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Principal Amount</span>
              <span className="text-lg font-semibold">₹{parseFloat(result.principal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-3 border-b">
              <span className="text-gray-600">Interest Earned</span>
              <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.interest).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-medium">Maturity Amount</span>
              <span className="text-2xl font-bold text-black">₹{parseFloat(result.maturity).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function PPFCalculator() {
  const [yearlyDeposit, setYearlyDeposit] = useState('');
  const [tenure, setTenure] = useState('15');
  const [result, setResult] = useState(null);

  const calculatePPF = () => {
    const P = parseFloat(yearlyDeposit);
    const t = parseFloat(tenure);
    const r = 0.071; // Current PPF rate 7.1%

    if (isNaN(P) || P <= 0 || P > 150000) {
      alert('Please enter valid yearly deposit (max ₹1.5 lakh)');
      return;
    }

    if (t < 15) {
      alert('Minimum PPF tenure is 15 years');
      return;
    }

    // PPF calculation with annual compounding
    let maturityAmount = 0;
    for (let year = 1; year <= t; year++) {
      maturityAmount = (maturityAmount + P) * (1 + r);
    }

    const totalInvested = P * t;
    const totalInterest = maturityAmount - totalInvested;

    setResult({
      invested: totalInvested.toFixed(0),
      interest: totalInterest.toFixed(0),
      maturity: maturityAmount.toFixed(0)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">PPF Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Public Provident Fund is a long-term savings scheme backed by the Government of India with tax benefits under Section 80C.
          Current interest rate: 7.1% per annum (compounded annually).
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Yearly Deposit (₹)</label>
            <input
              type="number"
              value={yearlyDeposit}
              onChange={(e) => setYearlyDeposit(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter yearly deposit amount"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum: ₹500, Maximum: ₹1,50,000 per year</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tenure (Years)</label>
            <select
              value={tenure}
              onChange={(e) => setTenure(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="15">15 years</option>
              <option value="20">20 years</option>
              <option value="25">25 years</option>
              <option value="30">30 years</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Minimum tenure is 15 years</p>
          </div>

          <button
            onClick={calculatePPF}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate Maturity
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-4">
          <div className="bg-surface p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">PPF Maturity Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Total Investment</span>
                <span className="text-lg font-semibold">₹{parseFloat(result.invested).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-gray-600">Interest Earned</span>
                <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.interest).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-gray-800 font-medium">Maturity Value</span>
                <span className="text-2xl font-bold text-black">₹{parseFloat(result.maturity).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-black p-4">
            <p className="text-sm text-gray-700 font-medium">Tax Benefits:</p>
            <ul className="text-xs text-gray-700 mt-2 space-y-1">
              <li>• Deposits qualify for deduction under Section 80C</li>
              <li>• Interest earned is tax-free</li>
              <li>• Maturity amount is completely tax-free</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

function NPSCalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [annuityPercentage, setAnnuityPercentage] = useState(40);

  // Constants
  const minAge = 18;
  const maxAge = 75;
  const annuityRate = 6; // Assumed 6% return on annuity

  // Calculations
  const investmentYears = Math.max(0, retirementAge - currentAge);
  const totalMonths = investmentYears * 12;
  const monthlyRate = expectedReturn / 12 / 100;

  // SIP Formula for Corpus: P * [ (1+i)^n - 1 ] * (1+i) / i
  const totalInvested = monthlyContribution * totalMonths;
  let maturityAmount = 0;

  if (monthlyRate > 0 && totalMonths > 0) {
    maturityAmount = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
  } else {
    maturityAmount = totalInvested;
  }

  const interestEarned = maturityAmount - totalInvested;

  // Withdrawal Logic
  const annuityAmount = maturityAmount * (annuityPercentage / 100);
  const lumpsumAmount = maturityAmount - annuityAmount;
  const estimatedMonthlyPension = (annuityAmount * (annuityRate / 100)) / 12;

  const chartData = [
    { label: 'Invested Amount', value: Math.round(totalInvested), color: '#333333', displayValue: `₹${Math.round(totalInvested).toLocaleString()}` },
    { label: 'Interest Earned', value: Math.round(interestEarned), color: '#999999', displayValue: `₹${Math.round(interestEarned).toLocaleString()}` }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-black mb-2">
          NPS Calculator
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Plan your retirement with the National Pension System. Calculate your corpus, lump sum withdrawal, and expected monthly pension.
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Left Column: Inputs */}
        <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 space-y-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Calculator className="w-5 h-5 text-black" />
            Investment Details
          </h2>

          <SliderInput
            label="Current Age"
            value={currentAge}
            onChange={setCurrentAge}
            min={18}
            max={60}
            step={1}
            unit=" Yrs"
          />

          <SliderInput
            label="Retirement Age"
            value={retirementAge}
            onChange={setRetirementAge}
            min={currentAge + 1}
            max={75}
            step={1}
            unit=" Yrs"
          />

          <SliderInput
            label="Monthly Contribution"
            value={monthlyContribution}
            onChange={setMonthlyContribution}
            min={500}
            max={150000}
            step={500}
            unit="₹"
          />

          <SliderInput
            label="Expected Return (ROI)"
            value={expectedReturn}
            onChange={setExpectedReturn}
            min={8}
            max={15}
            step={0.1}
            unit="%"
            helpText="Historical NPS Equity returns range from 9-12%"
          />

          <SliderInput
            label="Annuity Reinvestment"
            value={annuityPercentage}
            onChange={setAnnuityPercentage}
            min={40}
            max={100}
            step={5}
            unit="%"
            helpText="Min 40% of corpus must be used to purchase annuity"
          />
        </div>

        {/* Right Column: Results & Visualization */}
        <div className="space-y-6">
          {/* Chart Card */}
          <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex flex-col items-center justify-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Projected Corpus</h3>
            <DonutChart
              data={chartData}
              centerText={{ label: 'Total Corpus', value: `₹${(maturityAmount / 10000000).toFixed(2)}Cr` }}
            />
          </div>

          {/* Results Summary Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Lump Sum (Tax Free)</p>
              <p className="text-xl font-bold text-black mt-1">₹{Math.round(lumpsumAmount).toLocaleString()}</p>
            </div>
            <div className="bg-gray-100 p-4 rounded-xl border border-gray-200">
              <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">Annuity Amount</p>
              <p className="text-xl font-bold text-black mt-1">₹{Math.round(annuityAmount).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-black p-6 rounded-2xl shadow-lg text-white relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-90 mb-1">Estimated Monthly Pension</p>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">₹{Math.round(estimatedMonthlyPension).toLocaleString()}</span>
                <span className="text-sm opacity-80">/ month</span>
              </div>
              <p className="text-xs mt-2 opacity-75">*Based on {annuityPercentage}% corpus reinvested at {annuityRate}% annuity rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tax Benefits Info */}
      <div className="bg-gray-50 border-l-4 border-black p-5 rounded-r-lg">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Shield className="h-5 w-5 text-black" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-black">Tax Saving Benefits</h3>
            <div className="mt-2 text-sm text-gray-700 space-y-1">
              <p>• <strong>Sec 80CCD(1):</strong> Tax deduction up to 10% of salary (Basic + DA) within ₹1.5 Lakh limit of 80C.</p>
              <p>• <strong>Sec 80CCD(1B):</strong> Additional exclusive deduction of ₹50,000 over and above 80C.</p>
              <p>• <strong>Tax Efficiency:</strong> 60% of corpus withdrawal at maturity is completely Tax-Free.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BudgetPlanner() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    food: '',
    transportation: '',
    utilities: '',
    entertainment: '',
    savings: '',
    other: ''
  });
  const [result, setResult] = useState(null);

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);

    if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
      alert('Please enter a valid monthly income');
      return;
    }

    const totalExpenses = Object.values(expenses).reduce((sum, exp) => {
      const val = parseFloat(exp) || 0;
      return sum + val;
    }, 0);

    const balance = monthlyIncome - totalExpenses;
    const savingsPercentage = (balance / monthlyIncome) * 100;

    setResult({
      income: monthlyIncome,
      totalExpenses: totalExpenses,
      balance: balance,
      savingsPercentage: savingsPercentage.toFixed(1)
    });
  };

  const handleExpenseChange = (category, value) => {
    setExpenses({ ...expenses, [category]: value });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Monthly Budget Planner</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Plan your monthly budget using the 50/30/20 rule: 50% needs, 30% wants, 20% savings.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Income</h2>
          <div>
            <label className="block text-sm font-medium mb-2">Monthly Income (₹)</label>
            <input
              type="number"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your monthly income"
            />
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Expenses</h2>
          <div className="space-y-3">
            {[
              { key: 'housing', label: 'Housing (Rent/EMI)' },
              { key: 'food', label: 'Food & Groceries' },
              { key: 'transportation', label: 'Transportation' },
              { key: 'utilities', label: 'Utilities & Bills' },
              { key: 'entertainment', label: 'Entertainment' },
              { key: 'savings', label: 'Savings/Investments' },
              { key: 'other', label: 'Other' }
            ].map(({ key, label }) => (
              <div key={key}>
                <label className="block text-xs font-medium mb-1">{label}</label>
                <input
                  type="number"
                  value={expenses[key]}
                  onChange={(e) => handleExpenseChange(key, e.target.value)}
                  className="w-full p-2 border rounded text-sm"
                  placeholder="0"
                />
              </div>
            ))}
          </div>
          <button
            onClick={calculateBudget}
            className="w-full mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate Budget
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-1">Monthly Income</p>
              <p className="text-2xl font-bold text-black">₹{result.income.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-800">₹{result.totalExpenses.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 mb-1">Balance</p>
              <p className={`text-2xl font-bold ${result.balance >= 0 ? 'text-black' : 'text-gray-600'}`}>
                ₹{result.balance.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500 mt-1">({result.savingsPercentage}% of income)</p>
            </div>
          </div>
          {result.balance < 0 && (
            <div className="mt-4 bg-gray-50 border-l-4 border-black p-4">
              <p className="text-sm text-gray-700 font-medium">
                ⚠️ Warning: Your expenses exceed your income. Consider reducing discretionary spending.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = [
    { value: 'food', label: 'Food & Dining', color: 'bg-gray-100 text-gray-800' },
    { value: 'transport', label: 'Transportation', color: 'bg-gray-100 text-gray-800' },
    { value: 'shopping', label: 'Shopping', color: 'bg-gray-100 text-gray-800' },
    { value: 'bills', label: 'Bills & Utilities', color: 'bg-gray-100 text-gray-800' },
    { value: 'entertainment', label: 'Entertainment', color: 'bg-gray-100 text-gray-800' },
    { value: 'health', label: 'Healthcare', color: 'bg-gray-100 text-gray-800' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
  ];

  const addExpense = () => {
    if (!description || !amount || parseFloat(amount) <= 0) {
      alert('Please enter valid expense details');
      return;
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category,
      date
    };

    setExpenses([newExpense, ...expenses]);
    setDescription('');
    setAmount('');
    setCategory('food');
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const getCategoryColor = (cat) => {
    return categories.find(c => c.value === cat)?.color || 'bg-gray-100';
  };

  const getCategoryLabel = (cat) => {
    return categories.find(c => c.value === cat)?.label || cat;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Expense Tracker</h1>

      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2 bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="What did you spend on?"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
            <button
              onClick={addExpense}
              className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
            >
              Add Expense
            </button>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Summary</h2>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total Expenses</p>
            <p className="text-3xl font-bold text-black">₹{totalExpenses.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-4">{expenses.length} transaction{expenses.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No expenses recorded yet. Add your first expense above!</p>
        ) : (
          <div className="space-y-2">
            {expenses.map(expense => (
              <div key={expense.id} className="flex items-center justify-between p-3 border rounded hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(expense.category)}`}>
                      {getCategoryLabel(expense.category)}
                    </span>
                    <span className="font-medium">{expense.description}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{new Date(expense.date).toLocaleDateString('en-IN', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-lg font-semibold">₹{expense.amount.toLocaleString()}</span>
                  <button
                    onClick={() => deleteExpense(expense.id)}
                    className="text-gray-600 hover:text-black"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SavingsGoalTracker() {
  const [goals, setGoals] = useState([]);
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const addGoal = () => {
    if (!goalName || !targetAmount || !targetDate) {
      alert('Please fill all fields');
      return;
    }

    const target = parseFloat(targetAmount);
    const current = parseFloat(currentSavings) || 0;
    const today = new Date();
    const target_date = new Date(targetDate);
    const monthsRemaining = (target_date.getFullYear() - today.getFullYear()) * 12 + (target_date.getMonth() - today.getMonth());
    const monthlySavingsNeeded = monthsRemaining > 0 ? (target - current) / monthsRemaining : 0;

    const newGoal = {
      id: Date.now(),
      name: goalName,
      targetAmount: target,
      currentSavings: current,
      targetDate: targetDate,
      progress: (current / target) * 100,
      monthsRemaining: monthsRemaining,
      monthlySavingsNeeded: monthlySavingsNeeded
    };

    setGoals([...goals, newGoal]);
    setGoalName('');
    setTargetAmount('');
    setCurrentSavings('');
    setTargetDate('');
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Savings Goal Tracker</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Set financial goals and track your progress. Calculate monthly savings needed to reach your targets.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New Goal</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Goal Name</label>
            <input type="text" value={goalName} onChange={(e) => setGoalName(e.target.value)}
              className="w-full p-2 border rounded" placeholder="e.g., Car, House, Vacation" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Target Amount (₹)</label>
            <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(e.target.value)}
              className="w-full p-2 border rounded" placeholder="Target amount" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Current Savings (₹)</label>
            <input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)}
              className="w-full p-2 border rounded" placeholder="Amount saved so far" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Target Date</label>
            <input type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)}
              className="w-full p-2 border rounded" />
          </div>
        </div>
        <button onClick={addGoal} className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800">
          Add Goal
        </button>
      </div>

      {goals.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Your Goals ({goals.length})</h2>
          {goals.map(goal => (
            <div key={goal.id} className="bg-surface p-6 rounded-lg shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{goal.name}</h3>
                  <p className="text-sm text-gray-500">Target: {new Date(goal.targetDate).toLocaleDateString()}</p>
                </div>
                <button onClick={() => deleteGoal(goal.id)} className="text-gray-600 hover:text-black p-1 hover:bg-gray-100 rounded-full transition-colors" title="Delete Goal">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600">Target Amount</p>
                  <p className="text-lg font-semibold">₹{goal.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Current Savings</p>
                  <p className="text-lg font-semibold text-gray-800">₹{goal.currentSavings.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Remaining</p>
                  <p className="text-lg font-semibold text-black">₹{(goal.targetAmount - goal.currentSavings).toLocaleString()}</p>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-semibold">{goal.progress.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-black h-3 rounded-full" style={{ width: `${Math.min(goal.progress, 100)}%` }}></div>
                </div>
              </div>
              {goal.monthsRemaining > 0 && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm font-medium text-gray-700">
                    Save ₹{goal.monthlySavingsNeeded.toFixed(0).toLocaleString()}/month for {goal.monthsRemaining} months to reach your goal
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BillReminders() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Bill Payment Reminders</h1>
      <div className="bg-surface p-6 rounded-lg shadow">
        <p className="text-gray-600">Bill Reminders feature coming soon!</p>
        <p className="text-sm text-gray-500 mt-2">Never miss a bill payment with smart reminders.</p>
      </div>
    </div>
  );
}

function FinancialHealthScore() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Financial Health Score</h1>
      <div className="bg-surface p-6 rounded-lg shadow">
        <p className="text-gray-600">Financial Health Score feature coming soon!</p>
        <p className="text-sm text-gray-500 mt-2">Get a comprehensive score of your financial health.</p>
      </div>
    </div>
  );
}

function TaxSavingGuide() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tax Saving Guide</h1>

      <div className="bg-gray-50 border-l-4 border-black p-6 mb-8 rounded-r-lg">
        <h3 className="text-lg font-bold text-black mb-2">Full Guide Coming Soon!</h3>
        <p className="text-gray-700">
          We are compiling a detailed guide for FY 2024-25. Here is a quick checklist of popular Section 80C options.
        </p>
      </div>

      <div className="bg-surface p-8 rounded-2xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular Tax Saving Options (Section 80C)</h2>
        <p className="text-sm text-gray-500 mb-6">Max Deduction: ₹1.5 Lakhs per financial year</p>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-1">PPF (Public Provident Fund)</h3>
            <p className="text-sm text-gray-600">15-year lock-in. Risk-free returns.</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-1">ELSS Mutual Funds</h3>
            <p className="text-sm text-gray-600">3-year lock-in (Lowest). Market linked returns.</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-1">Life Insurance Premium</h3>
            <p className="text-sm text-gray-600">Term plans or traditional policies.</p>
          </div>
          <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-1">EPF (Employee Provident Fund)</h3>
            <p className="text-sm text-gray-600">Employee contribution to PF deducted from salary.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function DeductionCalculator() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Investment Deduction Calculator</h1>
      <div className="bg-surface p-6 rounded-lg shadow">
        <p className="text-gray-600">Deduction Calculator feature coming soon!</p>
        <p className="text-sm text-gray-500 mt-2">Calculate tax deductions from various investments.</p>
      </div>
    </div>
  );
}

function TaxFilingChecklist() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tax Filing Checklist</h1>
      <div className="bg-surface p-6 rounded-lg shadow">
        <p className="text-gray-600">Tax Filing Checklist feature coming soon!</p>
        <p className="text-sm text-gray-500 mt-2">Complete checklist for hassle-free tax filing.</p>
      </div>
    </div>
  );
}

function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [calculationType, setCalculationType] = useState('exclusive'); // exclusive or inclusive
  const [result, setResult] = useState(null);

  const calculateGST = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate) / 100;

    if (isNaN(amt) || amt <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    let gstAmount, cgst, sgst, totalAmount;

    if (calculationType === 'exclusive') {
      // Amount is excluding GST
      gstAmount = amt * rate;
      totalAmount = amt + gstAmount;
    } else {
      // Amount is including GST
      gstAmount = amt - (amt / (1 + rate));
      totalAmount = amt;
    }

    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
    const baseAmount = totalAmount - gstAmount;

    setResult({
      baseAmount: baseAmount.toFixed(2),
      cgst: cgst.toFixed(2),
      sgst: sgst.toFixed(2),
      totalGST: gstAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2)
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">GST Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6">
        <p className="text-sm text-gray-700">
          Calculate Goods and Services Tax (GST) for India. Choose between exclusive (add GST) or inclusive (GST already included) modes.
        </p>
      </div>

      <div className="bg-surface p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Calculation Type</label>
            <select
              value={calculationType}
              onChange={(e) => setCalculationType(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="exclusive">Exclusive (Add GST to amount)</option>
              <option value="inclusive">Inclusive (GST already included)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Amount (₹)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={calculationType === 'exclusive' ? 'Enter amount without GST' : 'Enter amount with GST'}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">GST Rate (%)</label>
            <select
              value={gstRate}
              onChange={(e) => setGstRate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="5">5%</option>
              <option value="12">12%</option>
              <option value="18">18%</option>
              <option value="28">28%</option>
            </select>
            <p className="text-xs text-gray-500 mt-1">Common GST rates in India</p>
          </div>

          <button
            onClick={calculateGST}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          >
            Calculate GST
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-surface p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">GST Breakdown</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">Base Amount</span>
              <span className="text-lg font-semibold">₹{parseFloat(result.baseAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">CGST ({gstRate / 2}%)</span>
              <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.cgst).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600">SGST ({gstRate / 2}%)</span>
              <span className="text-lg font-semibold text-gray-800">₹{parseFloat(result.sgst).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b">
              <span className="text-gray-600 font-medium">Total GST</span>
              <span className="text-lg font-semibold text-black">₹{parseFloat(result.totalGST).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-800 font-medium">Total Amount</span>
              <span className="text-2xl font-bold text-black">₹{parseFloat(result.totalAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function TDSCalculator() {
  const [amount, setAmount] = useState('');
  const [tdsRate, setTdsRate] = useState('10');
  const [incomeType, setIncomeType] = useState('salary');
  const [result, setResult] = useState(null);

  const calculateTDS = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(tdsRate);

    if (isNaN(amt) || amt <= 0) {
      alert('Please enter valid amount');
      return;
    }

    const tdsAmount = (amt * rate) / 100;
    const netAmount = amt - tdsAmount;

    setResult({
      grossAmount: amt.toFixed(0),
      tdsAmount: tdsAmount.toFixed(0),
      netAmount: netAmount.toFixed(0),
      tdsRate: rate
    });
  };

  const incomeTypes = [
    { value: 'salary', label: 'Salary', rate: '10' },
    { value: 'professional', label: 'Professional Fees', rate: '10' },
    { value: 'commission', label: 'Commission', rate: '5' },
    { value: 'rent', label: 'Rent', rate: '10' },
    { value: 'contractor', label: 'Contractor', rate: '2' },
    { value: 'interest', label: 'Interest (Bank)', rate: '10' },
    { value: 'dividend', label: 'Dividend', rate: '10' },
    { value: 'lottery', label: 'Lottery/Gambling', rate: '30' }
  ];

  return (
    <div className="max-w-2xl mx-auto animate-slide-up">
      <h1 className="text-3xl font-bold mb-6 text-black">TDS Calculator</h1>

      <div className="bg-gray-50 border-l-4 border-black p-4 mb-6 rounded-r-lg">
        <p className="text-sm text-gray-700">
          Calculate Tax Deducted at Source (TDS) on various income types as per IT Act.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border border-gray-100">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Income Type</label>
            <select value={incomeType}
              onChange={(e) => {
                setIncomeType(e.target.value);
                const selected = incomeTypes.find(t => t.value === e.target.value);
                setTdsRate(selected.rate);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800">
              {incomeTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label} ({type.rate}%)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Gross Amount (₹)</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800" placeholder="Enter gross amount" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">TDS Rate (%)</label>
            <input type="number" step="0.1" value={tdsRate} onChange={(e) => setTdsRate(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800" />
          </div>

          <button onClick={calculateTDS}
            className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors shadow-lg">
            Calculate TDS
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 text-black">TDS Calculation</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Gross Amount</span>
              <span className="text-lg font-semibold text-black">₹{parseFloat(result.grossAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">TDS @ {result.tdsRate}%</span>
              <span className="text-lg font-semibold text-black">₹{parseFloat(result.tdsAmount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-black font-medium">Net Amount Receivable</span>
              <span className="text-2xl font-bold text-black">₹{parseFloat(result.netAmount).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FinancialLiteracy() {
  const [activeTab, setActiveTab] = useState('basics');

  const content = {
    basics: [
      {
        title: 'The 50/30/20 Rule',
        content: 'A timeless budgeting framework: Allocate 50% of income for Needs (Rent, Food, Bills), 30% for Wants (Dining, Entertainment), and 20% strictly for Savings & Debt Repayment.',
        icon: <Wallet className="w-6 h-6 text-black" />
      },
      {
        title: 'Emergency Fund',
        content: 'Your financial oxygen mask. Aim to save 3-6 months of essential living expenses in a liquid fund (Savings/FD) to handle job loss or medical emergencies without debt.',
        icon: <Shield className="w-6 h-6 text-black" />
      },
      {
        title: 'Inflation',
        content: 'The silent wealth killer. It reduces the purchasing power of money over time. Your investments must grow faster than inflation (~6%) to grow real wealth.',
        icon: <TrendingUp className="w-6 h-6 text-black" />
      }
    ],
    investing: [
      {
        title: 'Power of Compounding',
        content: 'Earning interest on interest. The key is "Time in the Market", not "Timing the Market". Starting 5 years early can potentially double your retirement corpus.',
        icon: <BarChart3 className="w-6 h-6 text-black" />
      },
      {
        title: 'Diversification',
        content: "Don't put all eggs in one basket. Spread risk across Asset Classes: Equity (Growth), Debt (Stability), and Gold (Hedge).",
        icon: <PieChart className="w-6 h-6 text-black" />
      },
      {
        title: 'SIP (Rupee Cost Averaging)',
        content: 'Invest fixed amounts regularly. You buy more units when markets are down and fewer when up, averaging your cost and reducing volatility risk.',
        icon: <Clock className="w-6 h-6 text-black" />
      }
    ],
    taxation: [
      {
        title: 'Section 80C',
        content: 'The most popular tax-saving tool. Claim up to ₹1.5 Lakh deduction by investing in PPF, ELSS Mutual Funds, EPF, or paying Life Insurance premiums.',
        icon: <FileText className="w-6 h-6 text-black" />
      },
      {
        title: 'Tax Regime Selection',
        content: 'Old Regime allows various deductions (HRA, 80C, 80D) but has higher slab rates. New Regime has lower rates but zero deductions. Compare before filing.',
        icon: <Scale className="w-6 h-6 text-black" />
      },
      {
        title: 'Health Insurance (Section 80D)',
        content: 'Double benefit: Protects your savings from medical bills AND saves tax. You can claim up to ₹25,000 for self/family and additional for parents.',
        icon: <Shield className="w-6 h-6 text-black" />
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
        <h1 className="text-3xl font-bold mb-4 text-black">
          Financial Knowledge Hub
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          "An investment in knowledge pays the best interest." - Benjamin Franklin
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {['basics', 'investing', 'taxation', 'glossary'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full font-bold capitalize transition-all duration-300 transform hover:scale-105 ${activeTab === tab
              ? 'bg-black text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm border border-gray-200'
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
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-t-4 border-black">
                <h3 className="font-bold text-gray-800 mb-2">{item.term}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.definition}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {content[activeTab].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-soft hover:shadow-lg transition-all duration-300 group border border-gray-100">
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-12 bg-gray-50 p-8 rounded-2xl border border-gray-200 flex items-start gap-4">
        <div className="bg-white p-3 rounded-full shadow-sm hidden sm:block">
          <GraduationCap className="w-8 h-8 text-black" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-black mb-2">Continuous Learning</h2>
          <p className="text-gray-700 leading-relaxed">
            Financial literacy is not a destination, but a journey. The concepts here are just the beginning.
            Use the tools in this app to apply these principles—track your budget, plan your SIPs, and optimize your taxes.
          </p>
        </div>
      </div>
    </div>
  );
}

function InvestmentStrategy() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Investment Strategy Guide</h1>
      <div className="bg-surface p-8 rounded-2xl shadow-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Coming Soon: Personalized Strategy</h2>
          <p className="text-gray-600">We are building a tool to help you allocate assets based on your age and goals.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-black">Conservative</h3>
            <p className="text-sm text-gray-600">Focus on capital preservation. High allocation to FD, Debt Funds.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-black">Balanced</h3>
            <p className="text-sm text-gray-600">Mix of growth and safety. Equity and Debt in 50:50 or 60:40 ratio.</p>
          </div>
          <div className="p-4 border border-gray-200 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-black">Aggressive</h3>
            <p className="text-sm text-gray-600">Focus on high growth. High allocation to Small/Mid-cap Stocks.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RiskAssessment() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Risk Assessment Quiz</h1>
      <div className="bg-surface p-8 rounded-2xl shadow-lg text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Scale className="w-8 h-8 text-black" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Know Your Risk Profile</h2>
        <p className="text-gray-600 mb-6">
          Understanding your risk tolerance is crucial before investing. We are building a psychological quiz to help you identify if you are a conservative, moderate, or aggressive investor.
        </p>
        <button className="px-6 py-2 bg-gray-200 text-gray-500 rounded-full cursor-not-allowed">
          Quiz Coming Soon
        </button>
      </div>
    </div>
  );
}

function FinanceTips() {
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
      <h1 className="text-3xl font-bold mb-6 text-black">
        Personal Finance Smart Tips
      </h1>

      {/* Featured Tip Card */}
      <div className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-200 relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Lightbulb className="w-32 h-32 text-black" />
        </div>

        <div className="relative z-10">
          <h2 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-2">Tip of the Moment</h2>
          <p className="text-2xl font-bold text-black leading-snug mb-6 min-h-[80px]">
            "{tips[currentTipIndex]}"
          </p>

          <button
            onClick={nextTip}
            className="bg-black text-white font-semibold py-2 px-6 rounded-full shadow-sm hover:shadow-md transition-all flex items-center gap-2 hover:bg-gray-800"
          >
            Next Tip <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-black" /> Do's
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Track every rupee you spend</li>
            <li>• Automate your investments (SIP)</li>
            <li>• Review your portfolio yearly</li>
            <li>• Discuss finances with your partner</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <X className="w-5 h-5 text-black" /> Don'ts
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
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

export default App
