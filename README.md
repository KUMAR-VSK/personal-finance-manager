# Personal Finance Manager (India)

A comprehensive and beginner-friendly web application for managing personal finances in India. Designed to be understandble by everyone, this tool not only calculates taxes and investments but also educates you on financial concepts. Built with React, Vite, and Tailwind CSS.

## ✨ Features

### 📊 Tax Management
- **Taxation Guide** - Complete guide on Indian taxation system (Old vs New regime)
- **Tax Calculator** - Calculate income tax with proper slab-wise breakdown
- **GST Calculator** - Calculate GST with CGST/SGST breakdown for both inclusive and exclusive modes

### 💰 Investment Tools
- **SIP Calculator** - Calculate returns on Systematic Investment Plans
- **FD Calculator** - Fixed Deposit maturity calculator with quarterly compounding
- **PPF Calculator** - Public Provident Fund calculator with tax benefits information
- **Compound Interest Calculator** - General compound interest calculator with multiple compounding frequencies
- **Gold Investment Guide** - Information on different gold investment options
- **Gold Price Calendar** - Interactive calendar showing historical gold rates

### 🏦 Loan Calculators
- **EMI Calculator** - Calculate Equated Monthly Installments for all types of loans

### 📝 Budget & Expense Management
- **Budget Planner** - Monthly budget planner with income/expense tracking
- **Expense Tracker** - Track daily expenses with categories and visual summaries

### 🔜 Coming Soon Features
- Mutual Fund Tracker
- Stock Portfolio Manager
- NPS Calculator
- Retirement Calculator
- Emergency Fund Calculator
- Savings Goal Tracker
- Bill Reminders
- Financial Health Score
- Tax Saving Guide
- Deduction Calculator
- Tax Filing Checklist
- TDS Calculator
- Financial Literacy Resources
- Investment Strategy Guide
- Risk Assessment Quiz
- Personal Finance Tips

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "PERSONAL FINANCE MANAGER"
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

The production build will be available in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 4
- **Language:** JavaScript

## 📱 Features Overview

### Tax Calculator
- Supports both Old and New tax regimes
- Automatic slab-wise calculation
- Includes 4% cess
- Detailed tax breakdown

### SIP Calculator
- Monthly investment planning
- Expected return projections
- Time period flexibility
- Total value estimation

### EMI Calculator
- Loan amount calculation
- Interest rate analysis
- Tenure flexibility
- Principal and interest breakdown

### FD Calculator
- Quarterly compounding
- Interest rate customization
- Flexible tenure options
- Maturity amount calculation

### PPF Calculator
- 15-30 year investment planning
- Current rate: 7.1% per annum
- Maximum investment: ₹1,50,000/year
- Tax benefits information

### Compound Interest Calculator
- Multiple compounding frequencies
- Flexible interest rates
- Custom time periods
- Detailed breakdown

### GST Calculator
- Exclusive and inclusive modes
- CGST/SGST breakdown
- Multiple GST rate options (5%, 12%, 18%, 28%)
- Base amount calculation

### Budget Planner
- Monthly income tracking
- Category-wise expense management
- Savings percentage calculation
- Balance analysis
- 50/30/20 rule guidance

### Expense Tracker
- Transaction logging
- Category-based tracking
- Date-wise organization
- Total expense calculation
- Delete functionality

### Gold Investment
- Types of gold investments
- Pros and cons analysis
- Current price display
- Investment tips and guidelines

### Gold Calendar
- Interactive calendar interface
- Historical price tracking
- Date-wise rate display
- Year and month navigation

## 📋 Project Structure

```
PERSONAL FINANCE MANAGER/
├── src/
│   ├── App.jsx          # Main application component with all features
│   ├── App.css          # Application styles
│   └── main.jsx         # Application entry point
├── index.html           # HTML template
├── package.json         # Project dependencies
├── tailwind.config.js   # Tailwind CSS configuration
├── vite.config.js       # Vite configuration
└── README.md           # Project documentation
```

## 🎨 UI/UX Features

- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Intuitive Navigation** - Organized sidebar with dropdown menus
- **Color-Coded Categories** - Different sections use distinct color themes
- **Interactive Elements** - Hover effects and smooth transitions
- **Clean Layout** - Modern, card-based design
- **Accessibility** - Semantic HTML and proper form labels

## 💡 Tips for Users

1. **Tax Calculator**: Always check which tax regime is more beneficial for you before filing
2. **SIP Investments**: Start with smaller amounts and increase gradually
3. **EMI Planning**: Try to keep EMI under 40% of your monthly income
4. **PPF**: Maximum investment limit is ₹1.5 lakh per year with 15-year lock-in
5. **Budget Planning**: Follow the 50/30/20 rule - 50% needs, 30% wants, 20% savings

## 🔐 Data Privacy

All calculations are performed locally in your browser. No data is sent to any server, ensuring complete privacy of your financial information.

## 🐛 Known Issues

None at the moment. Please report any issues you encounter.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For questions or support, please open an issue in the repository.

## 🎯 Roadmap

- [ ] Add data persistence with localStorage
- [ ] Implement export to PDF functionality
- [ ] Add investment comparison tools
- [ ] Create financial goal planning module
- [ ] Integrate real-time gold prices API
- [ ] Add tax filing reminders
- [ ] Implement multi-language support
- [ ] Create mobile app version

---

**Built with ❤️ for the Indian personal finance community**
