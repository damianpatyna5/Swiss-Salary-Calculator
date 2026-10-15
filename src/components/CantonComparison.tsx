import React, { useState } from 'react';
import { CalculatorInputs } from '../types/calculator';
import { calculateAllCantonsComparison, formatCHF, formatPercent } from '../utils/calculator';
import { Search, ArrowUpDown, Check, Building2 } from 'lucide-react';

interface CantonComparisonProps {
  inputs: CalculatorInputs;
  onSelectCanton: (code: string) => void;
}

export const CantonComparison: React.FC<CantonComparisonProps> = ({
  inputs,
  onSelectCanton,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState<'all' | 'de' | 'fr' | 'it'>('all');
  const [period, setPeriod] = useState<'monthly' | 'annual'>('annual');

  const comparisons = calculateAllCantonsComparison(inputs);

  const filtered = comparisons.filter((item) => {
    const matchesSearch =
      item.canton.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.canton.nameDe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.canton.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLang =
      languageFilter === 'all' ||
      item.canton.language === languageFilter ||
      (languageFilter === 'de' && item.canton.language === 'bi') ||
      (languageFilter === 'fr' && item.canton.language === 'bi');
    return matchesSearch && matchesLang;
  });

  const maxNet = Math.max(...comparisons.map((c) => c.netPayAnnual));
  const minNet = Math.min(...comparisons.map((c) => c.netPayAnnual));
  const spread = maxNet - minNet;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Building2 className="w-4 h-4" />
            </div>
            Comparison Across All 26 Swiss Cantons
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Compare net income, tax burden, and child allowances for your profile
          </p>
        </div>

        {/* Filters and controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Monthly / Annual toggle */}
          <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setPeriod('annual')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                period === 'annual'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual
            </button>
            <button
              type="button"
              onClick={() => setPeriod('monthly')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                period === 'monthly'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
          </div>

          {/* Language filter */}
          <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
            {(['all', 'de', 'fr', 'it'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguageFilter(lang)}
                className={`px-2 py-1 rounded-md uppercase text-[11px] transition-colors cursor-pointer ${
                  languageFilter === lang
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search canton by name or code (e.g. Zug, Zurich, Geneva, BE, VD)..."
          className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-2.5 text-left pl-2">Rank & Canton</th>
              <th className="py-2.5 text-right">
                Net Pay {period === 'annual' ? '(Yr)' : '(Mo)'}
              </th>
              <th className="py-2.5 text-right">Effective Tax Rate</th>
              <th className="py-2.5 text-right">Total Tax</th>
              <th className="py-2.5 text-right">Child Allowance</th>
              <th className="py-2.5 text-right">Diff. vs {inputs.cantonCode}</th>
              <th className="py-2.5 text-center pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 tabular-nums font-mono">
            {filtered.map((item, index) => {
              const isCurrent = item.canton.code === inputs.cantonCode;
              const netValue = period === 'annual' ? item.netPayAnnual : item.netPayMonthly;
              const taxValue =
                period === 'annual' ? item.totalTaxAnnual : item.totalTaxAnnual / 12;
              const allowanceValue =
                period === 'annual'
                  ? item.childAllowanceAnnual
                  : item.childAllowanceAnnual / 12;
              const diffValue =
                period === 'annual'
                  ? item.differenceToSelected
                  : item.differenceToSelected / 12;

              return (
                <tr
                  key={item.canton.code}
                  className={`transition-colors hover:bg-slate-50/80 ${
                    isCurrent ? 'bg-red-50/50 font-semibold' : ''
                  }`}
                >
                  <td className="py-3 pl-2 font-sans">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 w-5">
                        #{index + 1}
                      </span>
                      <span className="w-7 h-5 rounded-xs bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center font-mono border border-slate-300/60">
                        {item.canton.code}
                      </span>
                      <div>
                        <span className="text-slate-900 font-semibold">{item.canton.name}</span>
                        <span className="text-slate-400 text-[10px] ml-1">
                          ({item.canton.capital})
                        </span>
                      </div>
                      {isCurrent && (
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-medium">
                          Selected
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-3 text-right font-bold text-slate-900">
                    {formatCHF(netValue)}
                  </td>

                  <td className="py-3 text-right">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[11px] font-medium ${
                        item.effectiveTaxRate < 10
                          ? 'bg-emerald-100 text-emerald-800'
                          : item.effectiveTaxRate > 18
                          ? 'bg-red-100 text-red-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {formatPercent(item.effectiveTaxRate)}
                    </span>
                  </td>

                  <td className="py-3 text-right text-red-600 font-medium">
                    {formatCHF(taxValue)}
                  </td>

                  <td className="py-3 text-right text-emerald-700">
                    {formatCHF(allowanceValue)}
                  </td>

                  <td className="py-3 text-right">
                    {isCurrent ? (
                      <span className="text-slate-400 font-mono">—</span>
                    ) : diffValue > 0 ? (
                      <span className="text-emerald-600 font-bold font-mono">
                        +{formatCHF(diffValue)}
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium font-mono">
                        {formatCHF(diffValue)}
                      </span>
                    )}
                  </td>

                  <td className="py-3 text-center pr-2 font-sans">
                    {isCurrent ? (
                      <span className="text-slate-400 text-[11px] flex items-center justify-center gap-1">
                        <Check className="w-3.5 h-3.5 text-red-600" /> Active
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelectCanton(item.canton.code)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-red-600 hover:text-white rounded-md transition-colors cursor-pointer"
                      >
                        Select
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary Note */}
      <div className="bg-slate-50 rounded-lg p-3.5 border border-slate-200/80 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="font-semibold text-slate-800">Canton Tax Spread Insight:</span> You
          retain up to{' '}
          <strong className="text-emerald-700">{formatCHF(spread)} / year more</strong> in net
          income living in low-tax cantons (like {comparisons[0]?.canton.name}) compared to higher
          tax cantons.
        </div>
      </div>
    </div>
  );
};
