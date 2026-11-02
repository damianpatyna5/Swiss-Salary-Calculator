import React from 'react';
import { AlertCircle, ArrowLeft, Calculator, PieChart, Building2, BookOpen } from 'lucide-react';
import { Link } from './Link';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6">
      <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto shadow-xs">
        <AlertCircle className="w-8 h-8" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Page Not Found (404)
        </h1>
        <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
          The Swiss salary calculation tool or guide you requested could not be found at this address. Please choose one of our available tools below:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-lg mx-auto pt-4">
        <Link
          href="/"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-red-500 hover:shadow-xs transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Salary Calculator</div>
            <div className="text-[11px] text-slate-500">Gross-to-net payroll simulation</div>
          </div>
        </Link>

        <Link
          href="/budget/"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:shadow-xs transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <PieChart className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Budget Calculator</div>
            <div className="text-[11px] text-slate-500">Swiss living costs &amp; savings</div>
          </div>
        </Link>

        <Link
          href="/compare-cantons/"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-xs transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Compare Cantons</div>
            <div className="text-[11px] text-slate-500">26 cantons tax comparison</div>
          </div>
        </Link>

        <Link
          href="/guide/"
          className="p-4 rounded-xl border border-slate-200 bg-white hover:border-purple-500 hover:shadow-xs transition-all flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Salary Guide</div>
            <div className="text-[11px] text-slate-500">Swiss payroll &amp; BVG explained</div>
          </div>
        </Link>
      </div>

      <div className="pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
};
