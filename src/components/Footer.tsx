import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-600 rounded-xs flex items-center justify-center">
            <svg viewBox="0 0 32 32" className="w-3 h-3 fill-white" aria-hidden="true">
              <rect x="13" y="6" width="6" height="20" rx="0.5" />
              <rect x="6" y="13" width="20" height="6" rx="0.5" />
            </svg>
          </div>
          <span className="font-bold text-slate-800">SwissSalary.ch</span>
          <span>· Swiss Net Salary & Tax Calculator</span>
        </div>

        <div className="text-center md:text-right text-[11px] text-slate-400 max-w-lg leading-relaxed">
          Disclaimer: Calculations are estimates based on standard Federal (ESTV), cantonal, and municipal tax multipliers, statutory AHV/ALV/BVG contributions, and cantonal family allowance regulations. Individual tax assessments may vary.
        </div>
      </div>
    </footer>
  );
};
