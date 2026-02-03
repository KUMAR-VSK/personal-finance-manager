import React from 'react';

// Reusable Donut Chart Component
export function DonutChart({ data, centerText }) {
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
                <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="stroke-gray-200 dark:stroke-gray-700" />

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

                {/* Inner white circle to create donut effect - Adapted for Dark Mode */}
                <circle cx="50" cy="50" r="32" className="fill-surface" />

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
                            className="text-[6px] font-bold fill-gray-900 dark:fill-white"
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
                            <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{item.displayValue}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
