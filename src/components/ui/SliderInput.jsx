import React from 'react';

// Reusable Slider Input Component
export function SliderInput({ label, value, onChange, min, max, step, unit, helpText }) {
    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>
                <span className="text-lg font-semibold text-black dark:text-white">
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
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>{unit === '₹' ? `₹${min.toLocaleString()}` : `${min}${unit || ''}`}</span>
                <span>{unit === '₹' ? `₹${max.toLocaleString()}` : `${max}${unit || ''}`}</span>
            </div>
            {helpText && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helpText}</p>}
        </div>
    );
}
