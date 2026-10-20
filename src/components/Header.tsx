import React from 'react';
import { Printer, RefreshCw, Landmark } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onReset,
  activeSection,
  setActiveSection,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center shadow-xs">
            {/* Swiss Cross */}
            <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white" aria-hidden="true">
              <rect x="13" y="6" width="6" height="20" rx="0.5" />
              <rect x="6" y="13" width="20" height="6" rx="0.5" />
            </svg>
          </div>
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap hover:text-red-700 transition-colors"
          >
            LohnLab<span className="text-red-600 font-extrabold">.ch</span>
          </a>
        </div>

        {/* Zone 2: 4-5 single-line clean nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            type="button"
            onClick={() => setActiveSection('calculator')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeSection === 'calculator'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Calculator
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('budget')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeSection === 'budget'
                ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-0.5'
                : ''
            }`}
          >
            Budget Calculator
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('payslip')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeSection === 'payslip'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Payslip View
          </button>
          <button
            type="button"
            onClick={() => setActiveSection('cantons')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeSection === 'cantons'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Compare Cantons
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('guide')}
            className={`cursor-pointer whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeSection === 'guide'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Swiss Guide
          </button>
        </nav>

        {/* Zone 3: 1 primary action button / quick utilities */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onReset}
            title="Reset to default values"
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
