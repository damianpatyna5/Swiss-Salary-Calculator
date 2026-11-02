import React from 'react';
import { RotateCcw } from 'lucide-react';
import { Link } from './Link';
import { useRouter } from '../router';

interface HeaderProps {
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onReset }) => {
  const { currentPath } = useRouter();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 bg-red-600 rounded flex items-center justify-center shadow-xs group-hover:bg-red-700 transition-colors">
              {/* Swiss Cross */}
              <svg viewBox="0 0 32 32" className="w-4 h-4 fill-white" aria-hidden="true">
                <rect x="13" y="6" width="6" height="20" rx="0.5" />
                <rect x="6" y="13" width="20" height="6" rx="0.5" />
              </svg>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap group-hover:text-red-700 transition-colors">
              LohnLab<span className="text-red-600 font-extrabold">.ch</span>
            </span>
          </Link>
        </div>

        {/* Zone 2: Semantic navigation links with real href attributes */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Salary Calculator
          </Link>

          <Link
            href="/budget/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/budget/'
                ? 'text-emerald-600 font-semibold border-b-2 border-emerald-600 pb-0.5'
                : ''
            }`}
          >
            Budget Calculator
          </Link>

          <Link
            href="/payslip/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/payslip/'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Payslip View
          </Link>

          <Link
            href="/compare-cantons/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/compare-cantons/'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Compare Cantons
          </Link>

          <Link
            href="/guide/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/guide/'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Swiss Guide
          </Link>

          <Link
            href="/methodology/"
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              currentPath === '/methodology/'
                ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-0.5'
                : ''
            }`}
          >
            Methodology
          </Link>
        </nav>

        {/* Zone 3: Quick Reset button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onReset}
            title="Reset calculator inputs to default values"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Mobile Secondary Scrollable Navigation Bar */}
      <div className="lg:hidden flex items-center gap-4 px-4 py-2 overflow-x-auto border-t border-slate-100 text-xs font-medium text-slate-600 scrollbar-none">
        <Link
          href="/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/' ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
          }`}
        >
          Calculator
        </Link>
        <Link
          href="/budget/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/budget/' ? 'text-emerald-600 font-bold border-b-2 border-emerald-600' : ''
          }`}
        >
          Budget
        </Link>
        <Link
          href="/payslip/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/payslip/' ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
          }`}
        >
          Payslip
        </Link>
        <Link
          href="/compare-cantons/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/compare-cantons/' ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
          }`}
        >
          Cantons
        </Link>
        <Link
          href="/guide/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/guide/' ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
          }`}
        >
          Guide
        </Link>
        <Link
          href="/methodology/"
          className={`whitespace-nowrap py-1 ${
            currentPath === '/methodology/' ? 'text-red-600 font-bold border-b-2 border-red-600' : ''
          }`}
        >
          Methodology
        </Link>
      </div>
    </header>
  );
};
