import React from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { Briefcase, Building, Layers } from 'lucide-react';

interface EmployerCostCardProps {
  result: CalculationResult;
}

export const EmployerCostCard: React.FC<EmployerCostCardProps> = ({ result }) => {
  const { grossSalaryAnnual, employerCost } = result;
  const totalExtraPercent =
    grossSalaryAnnual > 0
      ? ((employerCost.totalEmployerCostAnnual - grossSalaryAnnual) / grossSalaryAnnual) * 100
      : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-red-600" />
            Employer Social Cost Breakdown (Arbeitgeberbelastung)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total cost to the company including mandatory Swiss employer social contributions
          </p>
        </div>
        <div className="text-right">
          <span className="text-xs font-semibold text-slate-500">Employer Surcharge</span>
          <div className="text-lg font-bold text-blue-600 font-mono tabular-nums">
            +{formatPercent(totalExtraPercent, 1)}
          </div>
        </div>
      </div>

      {/* Main KPI */}
      <div className="bg-blue-50/50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
            Total Employer Expenditure (Gesamtkosten)
          </span>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono mt-1">
            {formatCHF(employerCost.totalEmployerCostAnnual)}
            <span className="text-xs font-sans font-medium text-slate-500 ml-2">/year</span>
          </div>
          <div className="text-xs text-slate-600 mt-1">
            Monthly equivalent:{' '}
            <strong className="text-slate-900 font-mono">
              {formatCHF(employerCost.totalEmployerCostMonthly)}
            </strong>
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-xs text-slate-500">Base Gross Salary</div>
          <div className="text-sm font-bold text-slate-800 font-mono">
            {formatCHF(grossSalaryAnnual)}
          </div>
          <div className="text-xs text-blue-700 font-medium mt-1">
            + {formatCHF(employerCost.totalEmployerCostAnnual - grossSalaryAnnual)} mandatory company contributions
          </div>
        </div>
      </div>

      {/* Detailed Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[11px] font-semibold">
              <th className="py-2 text-left pl-2">Employer Contribution Component</th>
              <th className="py-2 text-right">Standard Rate</th>
              <th className="py-2 text-right">Monthly Cost</th>
              <th className="py-2 text-right pr-2">Annual Cost</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 pl-2 font-sans font-medium text-slate-900">
                Employer AHV / IV / EO Match
                <div className="text-[10px] text-slate-500 font-normal">
                  Statutory 50% split of 1st pillar
                </div>
              </td>
              <td className="py-2.5 text-right text-slate-600">5.30%</td>
              <td className="py-2.5 text-right text-slate-700">
                {formatCHF(employerCost.ahvEmployerAnnual / result.inputs.numberOfMonths)}
              </td>
              <td className="py-2.5 text-right text-slate-900 font-semibold pr-2">
                {formatCHF(employerCost.ahvEmployerAnnual)}
              </td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 pl-2 font-sans font-medium text-slate-900">
                Employer ALV Match
                <div className="text-[10px] text-slate-500 font-normal">
                  Unemployment insurance match (up to CHF 148'200)
                </div>
              </td>
              <td className="py-2.5 text-right text-slate-600">1.10%</td>
              <td className="py-2.5 text-right text-slate-700">
                {formatCHF(employerCost.alvEmployerAnnual / result.inputs.numberOfMonths)}
              </td>
              <td className="py-2.5 text-right text-slate-900 font-semibold pr-2">
                {formatCHF(employerCost.alvEmployerAnnual)}
              </td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 pl-2 font-sans font-medium text-slate-900">
                Employer BVG (2nd Pillar Pension)
                <div className="text-[10px] text-slate-500 font-normal">
                  Occupational pension matching fund (Age {result.inputs.age})
                </div>
              </td>
              <td className="py-2.5 text-right text-slate-600">
                {formatPercent(result.socialSecurity.bvgRate)}
              </td>
              <td className="py-2.5 text-right text-slate-700">
                {formatCHF(employerCost.bvgEmployerAnnual / result.inputs.numberOfMonths)}
              </td>
              <td className="py-2.5 text-right text-slate-900 font-semibold pr-2">
                {formatCHF(employerCost.bvgEmployerAnnual)}
              </td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 pl-2 font-sans font-medium text-slate-900">
                FAK (Familienausgleichskasse)
                <div className="text-[10px] text-slate-500 font-normal">
                  Funds cantonal child and education allowances (100% employer paid)
                </div>
              </td>
              <td className="py-2.5 text-right text-slate-600">~1.80%</td>
              <td className="py-2.5 text-right text-slate-700">
                {formatCHF(employerCost.fakEmployerAnnual / result.inputs.numberOfMonths)}
              </td>
              <td className="py-2.5 text-right text-slate-900 font-semibold pr-2">
                {formatCHF(employerCost.fakEmployerAnnual)}
              </td>
            </tr>

            <tr className="hover:bg-slate-50/50">
              <td className="py-2.5 pl-2 font-sans font-medium text-slate-900">
                BU (Betriebsunfallversicherung)
                <div className="text-[10px] text-slate-500 font-normal">
                  Occupational accident coverage (100% employer paid)
                </div>
              </td>
              <td className="py-2.5 text-right text-slate-600">~0.20%</td>
              <td className="py-2.5 text-right text-slate-700">
                {formatCHF(employerCost.buEmployerAnnual / result.inputs.numberOfMonths)}
              </td>
              <td className="py-2.5 text-right text-slate-900 font-semibold pr-2">
                {formatCHF(employerCost.buEmployerAnnual)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
