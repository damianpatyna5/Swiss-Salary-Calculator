import React from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { Landmark, Shield, PiggyBank, Baby } from 'lucide-react';

interface TaxBreakdownCardProps {
  result: CalculationResult;
}

export const TaxBreakdownCard: React.FC<TaxBreakdownCardProps> = ({ result }) => {
  const gross = result.grossSalaryAnnual;
  const net = result.netPayAnnual;
  const tax = result.tax.totalTaxAnnual;
  const social = result.socialSecurity.totalDeductionsAnnual;
  const allowance = result.familyAllowances.totalAllowanceAnnual;

  const netPercent = gross > 0 ? (net / (gross + allowance)) * 100 : 0;
  const taxPercent = gross > 0 ? (tax / (gross + allowance)) * 100 : 0;
  const socialPercent = gross > 0 ? (social / (gross + allowance)) * 100 : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Landmark className="w-5 h-5 text-red-600" />
            Tax & Deduction Distribution
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Breakdown of your income distribution in Canton {result.canton.name}
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500">Effective Tax Rate</span>
          <div className="text-lg font-bold text-red-600 font-mono tabular-nums">
            {formatPercent(result.tax.effectiveTaxRate)}
          </div>
        </div>
      </div>

      {/* Visual Proportional Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-semibold text-slate-700">
          <span>Income Flow Allocation</span>
          <span className="font-mono text-slate-500">Total: {formatCHF(gross + allowance)}/yr</span>
        </div>
        <div className="h-4 w-full bg-slate-100 rounded-lg overflow-hidden flex shadow-inner">
          <div
            style={{ width: `${Math.min(100, Math.max(5, netPercent))}%` }}
            className="bg-emerald-600 h-full transition-all duration-300"
            title={`Net Take-Home: ${formatPercent(netPercent)}`}
          />
          <div
            style={{ width: `${Math.max(2, taxPercent)}%` }}
            className="bg-red-500 h-full transition-all duration-300"
            title={`Taxes: ${formatPercent(taxPercent)}`}
          />
          <div
            style={{ width: `${Math.max(2, socialPercent)}%` }}
            className="bg-blue-600 h-full transition-all duration-300"
            title={`Social Security: ${formatPercent(socialPercent)}`}
          />
        </div>
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
            <span className="text-slate-600">Net Take-Home ({formatPercent(netPercent, 1)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-xs bg-red-500" />
            <span className="text-slate-600">Taxes ({formatPercent(taxPercent, 1)})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-xs bg-blue-600" />
            <span className="text-slate-600">Social Security ({formatPercent(socialPercent, 1)})</span>
          </div>
        </div>
      </div>

      {/* 4 Summary Mini Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/60">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <PiggyBank className="w-3.5 h-3.5 text-emerald-600" /> Net Monthly
          </div>
          <div className="text-base font-bold text-slate-900 font-mono mt-1">
            {formatCHF(result.netPayMonthly)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {formatCHF(result.netPayAnnual)} /yr
          </div>
        </div>

        <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/60">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Landmark className="w-3.5 h-3.5 text-red-600" /> Total Taxes
          </div>
          <div className="text-base font-bold text-slate-900 font-mono mt-1">
            {formatCHF(result.tax.totalTaxMonthly)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {formatCHF(result.tax.totalTaxAnnual)} /yr
          </div>
        </div>

        <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/60">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-blue-600" /> Social Deductions
          </div>
          <div className="text-base font-bold text-slate-900 font-mono mt-1">
            {formatCHF(result.socialSecurity.totalDeductionsMonthly)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {formatPercent(result.socialSecurity.effectiveSocialRate)} of gross
          </div>
        </div>

        <div className="bg-slate-50/80 p-3 rounded-lg border border-slate-200/60">
          <div className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
            <Baby className="w-3.5 h-3.5 text-amber-600" /> Child Allowance
          </div>
          <div className="text-base font-bold text-slate-900 font-mono mt-1">
            {formatCHF(result.familyAllowances.totalAllowanceMonthly)}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {formatCHF(result.familyAllowances.totalAllowanceAnnual)} /yr
          </div>
        </div>
      </div>

      {/* Deep-dive Tax Breakdown details */}
      <div className="border border-slate-200/80 rounded-lg p-4 space-y-3">
        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Tax Authorities Split (Annual)
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <div>
              <span className="font-semibold text-slate-800">Direkte Bundessteuer (Confederation)</span>
              <div className="text-[10px] text-slate-500">Federal progressive tariff</div>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {formatCHF(result.tax.federalTaxAnnual)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <div>
              <span className="font-semibold text-slate-800">Kantonssteuer (Canton {result.canton.name})</span>
              <div className="text-[10px] text-slate-500">State tax with cantonal tax rate</div>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {formatCHF(result.tax.cantonalTaxAnnual)}
            </span>
          </div>

          <div className="flex justify-between items-center py-1 border-b border-slate-100">
            <div>
              <span className="font-semibold text-slate-800">Gemeindesteuer (Municipality)</span>
              <div className="text-[10px] text-slate-500">Local commune surcharge</div>
            </div>
            <span className="font-mono font-bold text-slate-900">
              {formatCHF(result.tax.municipalTaxAnnual)}
            </span>
          </div>

          {result.tax.churchTaxAnnual > 0 && (
            <div className="flex justify-between items-center py-1 border-b border-slate-100">
              <div>
                <span className="font-semibold text-slate-800">Kirchensteuer (Church Tax)</span>
                <div className="text-[10px] text-slate-500">
                  {result.inputs.churchAffiliation.replace('_', ' ')}
                </div>
              </div>
              <span className="font-mono font-bold text-slate-900">
                {formatCHF(result.tax.churchTaxAnnual)}
              </span>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 font-bold text-slate-900">
            <span>Total Annual Tax Liability:</span>
            <span className="font-mono text-red-600 text-sm">
              {formatCHF(result.tax.totalTaxAnnual)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
