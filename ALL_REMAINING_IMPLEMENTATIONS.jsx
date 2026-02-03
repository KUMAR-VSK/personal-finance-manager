// ============================================
// ALL REMAINING CALCULATOR IMPLEMENTATIONS
// ============================================
// Copy these into App.jsx to complete the project

// 1. TDS CALCULATOR - Tax Deducted at Source
function TDSCalculator() {
    const [amount, setAmount] = useState('');
    const [tdsRate, setTdsRate] = useState('10');
    const [incomeType, setIncomeType] = useState('salary');
    const [result, setResult] = useState(null);

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

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">TDS Calculator</h1>

            <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 mb-6">
                <p className="text-sm text-indigo-700">
                    Calculate Tax Deducted at Source (TDS) on various income types as per IT Act.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Income Type</label>
                        <select value={incomeType}
                            onChange={(e) => {
                                setIncomeType(e.target.value);
                                const selected = incomeTypes.find(t => t.value === e.target.value);
                                setTdsRate(selected.rate);
                            }}
                            className="w-full p-2 border rounded">
                            {incomeTypes.map(type => (
                                <option key={type.value} value={type.value}>{type.label} ({type.rate}%)</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Gross Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded" placeholder="Enter gross amount" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">TDS Rate (%)</label>
                        <input type="number" step="0.1" value={tdsRate} onChange={(e) => setTdsRate(e.target.value)}
                            className="w-full p-2 border rounded" />
                    </div>

                    <button onClick={calculateTDS}
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
                        Calculate TDS
                    </button>
                </div>
            </div>

            {result && (
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">TDS Calculation</h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">Gross Amount</span>
                            <span className="text-lg font-semibold">₹{parseFloat(result.grossAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b">
                            <span className="text-gray-600">TDS @ {result.tdsRate}%</span>
                            <span className="text-lg font-semibold text-red-600">₹{parseFloat(result.tdsAmount).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2">
                            <span className="text-gray-800 font-medium">Net Amount Receivable</span>
                            <span className="text-2xl font-bold text-green-600">₹{parseFloat(result.netAmount).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 2. DEDUCTION CALCULATOR
function DeductionCalculator() {
    const [investments, setInvestments] = useState({
        ppf: '',
        elss: '',
        lifeInsurance: '',
        nsc: '',
        homeLoanPrincipal: '',
        tuitionFees: '',
        nps80CCD: '',
        healthInsurance: '',
        preventiveCheckup: '',
        savingsInterest: '',
        educationLoan: '',
        homeLoanInterest: '',
        donations: ''
    });
    const [result, setResult] = useState(null);

    const handleChange = (key, value) => {
        setInvestments({ ...investments, [key]: value });
    };

    const calculateDeductions = () => {
        const section80C = Math.min(
            150000,
            (parseFloat(investments.ppf) || 0) +
            (parseFloat(investments.elss) || 0) +
            (parseFloat(investments.lifeInsurance) || 0) +
            (parseFloat(investments.nsc) || 0) +
            (parseFloat(investments.homeLoanPrincipal) || 0) +
            (parseFloat(investments.tuitionFees) || 0)
        );

        const nps80CCD = Math.min(50000, parseFloat(investments.nps80CCD) || 0);
        const section80D = Math.min(25000, (parseFloat(investments.healthInsurance) || 0) + (parseFloat(investments.preventiveCheckup) || 0));
        const section80TTA = Math.min(10000, parseFloat(investments.savingsInterest) || 0);
        const section80E = parseFloat(investments.educationLoan) || 0;
        const section24 = Math.min(200000, parseFloat(investments.homeLoanInterest) || 0);
        const section80G = (parseFloat(investments.donations) || 0) * 0.5;

        const totalDeductions = section80C + nps80CCD + section80D + section80TTA + section80E + section24 + section80G;

        setResult({
            section80C,
            nps80CCD,
            section80D,
            section80TTA,
            section80E,
            section24,
            section80G,
            totalDeductions
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Tax Deduction Calculator</h1>

            <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                <p className="text-sm text-green-700">
                    Calculate total tax deductions available under various sections of Income Tax Act.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Section 80C (Max ₹1.5L)</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium mb-1">PPF</label>
                            <input type="number" value={investments.ppf} onChange={(e) => handleChange('ppf', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">ELSS</label>
                            <input type="number" value={investments.elss} onChange={(e) => handleChange('elss', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Life Insurance</label>
                            <input type="number" value={investments.lifeInsurance} onChange={(e) => handleChange('lifeInsurance', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">NSC</label>
                            <input type="number" value={investments.nsc} onChange={(e) => handleChange('nsc', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Home Loan Principal</label>
                            <input type="number" value={investments.homeLoanPrincipal} onChange={(e) => handleChange('homeLoanPrincipal', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Tuition Fees</label>
                            <input type="number" value={investments.tuitionFees} onChange={(e) => handleChange('tuitionFees', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4">Other Deductions</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-medium mb-1">NPS 80CCD(1B) - Max ₹50K</label>
                            <input type="number" value={investments.nps80CCD} onChange={(e) => handleChange('nps80CCD', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Health Insurance (80D) - Max ₹25K</label>
                            <input type="number" value={investments.healthInsurance} onChange={(e) => handleChange('healthInsurance', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Preventive Checkup (80D)</label>
                            <input type="number" value={investments.preventiveCheckup} onChange={(e) => handleChange('preventiveCheckup', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Savings Interest (80TTA) - Max ₹10K</label>
                            <input type="number" value={investments.savingsInterest} onChange={(e) => handleChange('savingsInterest', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Education Loan (80E)</label>
                            <input type="number" value={investments.educationLoan} onChange={(e) => handleChange('educationLoan', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Home Loan Interest (24) - Max ₹2L</label>
                            <input type="number" value={investments.homeLoanInterest} onChange={(e) => handleChange('homeLoanInterest', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                        <div>
                            <label className="block text-xs font-medium mb-1">Donations (80G)</label>
                            <input type="number" value={investments.donations} onChange={(e) => handleChange('donations', e.target.value)}
                                className="w-full p-2 border rounded text-sm" placeholder="₹0" />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={calculateDeductions}
                className="mt-6 w-full bg-green-600 text-white py-3 px-4 rounded hover:bg-green-700 text-lg font-semibold">
                Calculate Total Deductions
            </button>

            {result && (
                <div className="mt-6 bg-white p-6 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold mb-4">Deduction Summary</h2>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80C</span>
                            <span className="font-semibold">₹{result.section80C.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80CCD(1B) - NPS</span>
                            <span className="font-semibold">₹{result.nps80CCD.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80D - Health Insurance</span>
                            <span className="font-semibold">₹{result.section80D.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80TTA - Savings Interest</span>
                            <span className="font-semibold">₹{result.section80TTA.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80E - Education Loan</span>
                            <span className="font-semibold">₹{result.section80E.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 24 - Home Loan Interest</span>
                            <span className="font-semibold">₹{result.section24.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b">
                            <span>Section 80G - Donations (50%)</span>
                            <span className="font-semibold">₹{result.section80G.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between pt-3 mt-3 border-t-2">
                            <span className="text-lg font-bold">Total Deductions</span>
                            <span className="text-2xl font-bold text-green-600">₹{result.totalDeductions.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// 3. BILL REMINDERS
function BillReminders() {
    const [bills, setBills] = useState([]);
    const [billName, setBillName] = useState('');
    const [amount, setAmount] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('utilities');

    const addBill = () => {
        if (!billName || !amount || !dueDate) {
            alert('Please fill all fields');
            return;
        }

        const newBill = {
            id: Date.now(),
            name: billName,
            amount: parseFloat(amount),
            dueDate: dueDate,
            category: category,
            isPaid: false
        };

        setBills([...bills, newBill]);
        setBillName('');
        setAmount('');
        setDueDate('');
    };

    const togglePaid = (id) => {
        setBills(bills.map(bill =>
            bill.id === id ? { ...bill, isPaid: !bill.isPaid } : bill
        ));
    };

    const deleteBill = (id) => {
        setBills(bills.filter(bill => bill.id !== id));
    };

    const getDaysUntilDue = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    const upcomingBills = bills.filter(b => !b.isPaid && getDaysUntilDue(b.dueDate) >= 0);
    const overdueBills = bills.filter(b => !b.isPaid && getDaysUntilDue(b.dueDate) < 0);

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Bill Payment Reminders</h1>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                <p className="text-sm text-blue-700">
                    Never miss a bill payment! Track all your recurring bills and due dates.
                </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow mb-6">
                <h2 className="text-xl font-semibold mb-4">Add New Bill</h2>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Bill Name</label>
                        <input type="text" value={billName} onChange={(e) => setBillName(e.target.value)}
                            className="w-full p-2 border rounded" placeholder="e.g., Electricity" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Amount (₹)</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-2 border rounded" placeholder="Bill amount" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Due Date</label>
                        <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                            className="w-full p-2 border rounded" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded">
                            <option value="utilities">Utilities</option>
                            <option value="rent">Rent</option>
                            <option value="insurance">Insurance</option>
                            <option value="subscription">Subscription</option>
                            <option value="loan">Loan EMI</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <button onClick={addBill} className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                    Add Bill Reminder
                </button>
            </div>

            {overdueBills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4 text-red-600">⚠️ Overdue Bills ({overdueBills.length})</h2>
                    <div className="space-y-3">
                        {overdueBills.map(bill => (
                            <div key={bill.id} className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-semibold text-red-900">{bill.name}</h3>
                                        <p className="text-sm text-red-700">₹{bill.amount.toLocaleString()} · {bill.category}</p>
                                        <p className="text-xs text-red-600 mt-1">{Math.abs(getDaysUntilDue(bill.dueDate))} days overdue</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => togglePaid(bill.id)} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                                            Mark Paid
                                        </button>
                                        <button onClick={() => deleteBill(bill.id)} className="text-red-600 hover:text-red-800">
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {upcomingBills.length > 0 && (
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Upcoming Bills ({upcomingBills.length})</h2>
                    <div className="space-y-3">
                        {upcomingBills.map(bill => {
                            const daysUntil = getDaysUntilDue(bill.dueDate);
                            const isUrgent = daysUntil <= 3;

                            return (
                                <div key={bill.id} className={`bg-white border-l-4 ${isUrgent ? 'border-yellow-500' : 'border-blue-500'} p-4 rounded shadow`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold">{bill.name}</h3>
                                            <p className="text-sm text-gray-600">₹{bill.amount.toLocaleString()} · {bill.category}</p>
                                            <p className={`text-xs mt-1 ${isUrgent ? 'text-yellow-700 font-semibold' : 'text-gray-500'}`}>
                                                Due in {daysUntil} days · {new Date(bill.dueDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => togglePaid(bill.id)} className="text-sm bg-green-600 text-white px-3 py-1 rounded">
                                                Mark Paid
                                            </button>
                                            <button onClick={() => deleteBill(bill.id)} className="text-gray-600 hover:text-gray-800">
                                                ×
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {bills.filter(b => b.isPaid).length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-green-600">✓ Paid Bills</h2>
                    <div className="space-y-2">
                        {bills.filter(b => b.isPaid).map(bill => (
                            <div key={bill.id} className="bg-green-50 p-3 rounded flex justify-between items-center">
                                <div>
                                    <span className="font-medium text-green-900">{bill.name}</span>
                                    <span className="text-sm text-green-700 ml-2">₹{bill.amount.toLocaleString()}</span>
                                </div>
                                <button onClick={() => deleteBill(bill.id)} className="text-gray-500 hover:text-gray-700">
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

// Continue in next file...
