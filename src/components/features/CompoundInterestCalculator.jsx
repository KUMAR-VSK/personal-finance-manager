import { useState } from 'react';

export function CompoundInterestCalculator() {
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
