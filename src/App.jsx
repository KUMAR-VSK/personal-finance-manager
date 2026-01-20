import { useState } from 'react';
import './App.css'

function App() {
  const [currentSection, setCurrentSection] = useState('taxation');

  const sections = {
    taxation: <Taxation />,
    calculator: <TaxCalculator />,
    gold: <GoldInvestment />,
    calendar: <GoldCalendar />,
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Personal Finance Manager (India)</h2>
        </div>
        <nav className="mt-4">
          <button
            onClick={() => setCurrentSection('taxation')}
            className={`block w-full text-left p-4 hover:bg-gray-200 ${currentSection === 'taxation' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            Taxation
          </button>
          <button
            onClick={() => setCurrentSection('calculator')}
            className={`block w-full text-left p-4 hover:bg-gray-200 ${currentSection === 'calculator' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            Tax Calculator
          </button>
          <button
            onClick={() => setCurrentSection('gold')}
            className={`block w-full text-left p-4 hover:bg-gray-200 ${currentSection === 'gold' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            Gold Investment
          </button>
          <button
            onClick={() => setCurrentSection('calendar')}
            className={`block w-full text-left p-4 hover:bg-gray-200 ${currentSection === 'calendar' ? 'bg-blue-100 text-blue-600' : 'text-gray-700'}`}
          >
            Gold Calendar
          </button>
        </nav>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        {sections[currentSection]}
      </main>
    </div>
  );
}

function Taxation() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Indian Taxation Guide</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Old vs New Tax Regime</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3 text-red-600">Old Regime</h3>
            <p className="mb-3">Traditional tax system with more deductions and exemptions but higher tax rates.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>More deductions available</li>
              <li>Higher tax slabs</li>
              <li>4% cess on tax</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-3 text-green-600">New Regime</h3>
            <p className="mb-3">Simplified system with lower tax rates but fewer deductions.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Limited deductions</li>
              <li>Lower tax slabs</li>
              <li>4% cess on tax</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Key Terms</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold">Gross Income</h4>
            <p>Total income before any deductions or exemptions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold">Taxable Income</h4>
            <p>Gross income minus deductions and exemptions.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold">Deductions</h4>
            <p>Amounts you can subtract from gross income (e.g., 80C).</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold">Exemptions</h4>
            <p>Income that is not taxed (e.g., HRA).</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Common Deductions</h2>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-lg">80C (Up to ₹1.5 lakh)</h4>
            <p>Investments in PPF, ELSS, life insurance, home loan principal, etc.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-lg">80D (Health Insurance)</h4>
            <p>Premium paid for medical insurance for self, family, and parents.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold text-lg">HRA (House Rent Allowance)</h4>
            <p>Exemption for rent paid if living in rented accommodation.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Tax Slabs</h2>
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-4 text-left">Income Range</th>
                <th className="p-4 text-left">Old Regime Rate</th>
                <th className="p-4 text-left">New Regime Rate</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="p-4">Up to ₹2.5 lakh</td>
                <td className="p-4">0%</td>
                <td className="p-4">0%</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4">₹2.5 lakh - ₹5 lakh</td>
                <td className="p-4">5%</td>
                <td className="p-4">5%</td>
              </tr>
              <tr className="border-t">
                <td className="p-4">₹5 lakh - ₹10 lakh</td>
                <td className="p-4">20%</td>
                <td className="p-4">10%</td>
              </tr>
              <tr className="border-t bg-gray-50">
                <td className="p-4">Above ₹10 lakh</td>
                <td className="p-4">30%</td>
                <td className="p-4">15%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-gray-600">* Plus 4% cess on total tax amount</p>
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
      if (taxableIncome <= 250000) {
        breakdown.push({ slab: 'Up to ₹2.5L', rate: '0%', amount: 0 });
      } else {
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
    } else {
      if (taxableIncome <= 300000) {
        breakdown.push({ slab: 'Up to ₹3L', rate: '0%', amount: 0 });
      } else {
        if (taxableIncome > 300000) {
          const amt = Math.min(taxableIncome - 300000, 400000);
          tax += amt * 0.05;
          breakdown.push({ slab: '₹3L - ₹7L', rate: '5%', amount: amt * 0.05 });
        }
        if (taxableIncome > 700000) {
          const amt = Math.min(taxableIncome - 700000, 300000);
          tax += amt * 0.10;
          breakdown.push({ slab: '₹7L - ₹10L', rate: '10%', amount: amt * 0.10 });
        }
        if (taxableIncome > 1000000) {
          const amt = Math.min(taxableIncome - 1000000, 200000);
          tax += amt * 0.15;
          breakdown.push({ slab: '₹10L - ₹12L', rate: '15%', amount: amt * 0.15 });
        }
        if (taxableIncome > 1200000) {
          const amt = Math.min(taxableIncome - 1200000, 300000);
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
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Tax Calculator</h1>
      
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Annual Salary (₹)</label>
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Enter your annual salary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Total Deductions (₹)</label>
            <input
              type="number"
              value={deductions}
              onChange={(e) => setDeductions(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="80C, 80D, etc."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tax Regime</label>
            <select
              value={regime}
              onChange={(e) => setRegime(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="old">Old Regime</option>
              <option value="new">New Regime</option>
            </select>
          </div>
          
          <button
            onClick={calculateTax}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Calculate Tax
          </button>
        </div>
      </div>
      
      {result && (
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Tax Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Taxable Income</p>
                <p className="text-lg font-semibold">₹{result.taxableIncome.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Base Tax</p>
                <p className="text-lg font-semibold">₹{result.tax.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Cess (4%)</p>
                <p className="text-lg font-semibold">₹{result.cess.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Tax</p>
                <p className="text-2xl font-bold text-blue-600">₹{result.totalTax.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Tax Breakdown</h2>
            <div className="space-y-2">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <span className="font-medium">{item.slab}</span>
                    <span className="text-gray-600 ml-2">({item.rate})</span>
                  </div>
                  <span className="font-semibold">₹{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function GoldInvestment() {
  const goldTypes = [
    {
      type: 'Physical Gold',
      description: 'Traditional gold coins, bars, and jewelry. Requires storage and security.',
      pros: ['Tangible asset', 'No counterparty risk', 'Liquidity'],
      cons: ['Storage costs', 'Purity verification', 'Transaction fees']
    },
    {
      type: 'Digital Gold',
      description: 'Gold stored electronically through apps. Buy and sell fractions of grams.',
      pros: ['Easy storage', 'Low transaction costs', 'Fractional ownership'],
      cons: ['Counterparty risk', 'Digital security concerns', 'Less tangible']
    },
    {
      type: 'Gold ETFs',
      description: 'Exchange-traded funds backed by physical gold. Traded on stock exchanges.',
      pros: ['Easy to buy/sell', 'Regulated', 'No storage issues'],
      cons: ['Management fees', 'Market timing risk', 'Not pure gold ownership']
    },
    {
      type: 'Sovereign Gold Bonds',
      description: 'Government-backed gold bonds issued by RBI. Fixed interest and gold backing.',
      pros: ['Government guarantee', 'Fixed returns', 'Tax benefits'],
      cons: ['Lock-in period', 'Interest rate risk', 'Lower liquidity']
    }
  ];

  const currentPrice = 6500; // Dummy current price ₹/gram

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gold Investment Guide</h1>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Gold is a popular investment option in India due to its cultural significance and hedge against inflation. 
              However, returns can be volatile and it's important to understand different investment vehicles.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">Current Gold Price</h2>
        <div className="text-center">
          <div className="text-4xl font-bold text-yellow-600">₹{currentPrice.toLocaleString()}</div>
          <p className="text-gray-600">per gram (22K gold)</p>
          <p className="text-sm text-gray-500 mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Types of Gold Investments</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {goldTypes.map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">{item.type}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              
              <div className="mb-4">
                <h4 className="font-medium text-green-600 mb-2">Pros:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {item.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-red-600 mb-2">Cons:</h4>
                <ul className="list-disc list-inside text-sm space-y-1">
                  {item.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Investment Tips</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Diversify</h4>
            <p className="text-sm text-gray-600">Don't put all your money in gold. Balance with other assets.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Long-term View</h4>
            <p className="text-sm text-gray-600">Gold performs best as a long-term investment, not trading.</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h4 className="font-semibold mb-2">Check Purity</h4>
            <p className="text-sm text-gray-600">Always verify purity and buy from reputable sources.</p>
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
          className={`w-8 h-8 text-xs border rounded ${
            isSelected ? 'bg-blue-500 text-white' : isToday ? 'bg-green-200' : 'bg-gray-100 hover:bg-gray-200'
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
          <div className="bg-white p-6 rounded-lg shadow mb-6">
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
          <div className="bg-white p-6 rounded-lg shadow sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Gold Rate Details</h3>
            {selectedDate ? (
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-2">
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

export default App
