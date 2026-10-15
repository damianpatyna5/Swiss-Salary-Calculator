import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { FileText, Printer, User, Users } from 'lucide-react';

interface PayslipViewProps {
  result: CalculationResult;
  onPrint: () => void;
}

export const PayslipView: React.FC<PayslipViewProps> = ({ result, onPrint }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');
  const [personTab, setPersonTab] = useState<'primary' | 'spouse' | 'combined'>('primary');

  const isMonthly = viewMode === 'monthly';
  const isDual = result.isDualIncome && !!result.spouseResult;

  // Selected profile for payslip
  const isSpouseView = isDual && personTab === 'spouse';
  const isCombinedView = isDual && personTab === 'combined';
  const activeProfile = isSpouseView ? result.spouseResult! : result.primaryResult;

  // Determine line items based on active selection
  const gross = isCombinedView
    ? isMonthly
      ? result.grossSalaryMonthly
      : result.grossSalaryAnnual
    : isMonthly
    ? activeProfile.grossSalaryMonthly
    : activeProfile.grossSalaryAnnual;

  const social = isCombinedView ? result.socialSecurity : activeProfile.socialSecurity;
  const ahv = isMonthly ? social.ahvMonthly : social.ahvAnnual;
  const alv = isMonthly ? social.alvMonthly : social.alvAnnual;
  const nbu = isMonthly ? social.nbuMonthly : social.nbuAnnual;
  const ktg = isMonthly ? social.ktgMonthly : social.ktgAnnual;
  const bvg = isMonthly ? social.bvgMonthly : social.bvgAnnual;
  const totalSocial = isMonthly
    ? social.totalDeductionsMonthly
    : social.totalDeductionsAnnual;

  const netBeforeTax = isCombinedView
    ? isMonthly
      ? result.netBeforeTaxMonthly
      : result.netBeforeTaxAnnual
    : isMonthly
    ? activeProfile.netBeforeTaxMonthly
    : activeProfile.netBeforeTaxAnnual;

  // Child allowances (attributed to primary earner or combined)
  const showAllowance = !isSpouseView && result.familyAllowances.totalAllowanceAnnual > 0;
  const childAllowance = isMonthly
    ? result.familyAllowances.childAllowanceMonthly
    : result.familyAllowances.childAllowanceAnnual;
  const eduAllowance = isMonthly
    ? result.familyAllowances.educationAllowanceMonthly
    : result.familyAllowances.educationAllowanceAnnual;
  const totalAllowance = showAllowance
    ? isMonthly
      ? result.familyAllowances.totalAllowanceMonthly
      : result.familyAllowances.totalAllowanceAnnual
    : 0;

  // Tax allocation
  const taxRatio = isCombinedView
    ? 1
    : isSpouseView
    ? result.tax.totalTaxAnnual > 0
      ? activeProfile.taxShareAnnual / result.tax.totalTaxAnnual
      : 0
    : result.tax.totalTaxAnnual > 0
    ? activeProfile.taxShareAnnual / result.tax.totalTaxAnnual
    : 1;

  const fedTax = (isMonthly ? result.tax.federalTaxMonthly : result.tax.federalTaxAnnual) * taxRatio;
  const cantonalTax =
    (isMonthly ? result.tax.cantonalTaxMonthly : result.tax.cantonalTaxAnnual) * taxRatio;
  const municipalTax =
    (isMonthly ? result.tax.municipalTaxMonthly : result.tax.municipalTaxAnnual) * taxRatio;
  const churchTax =
    (isMonthly ? result.tax.churchTaxMonthly : result.tax.churchTaxAnnual) * taxRatio;
  const totalTax = isCombinedView
    ? isMonthly
      ? result.tax.totalTaxMonthly
      : result.tax.totalTaxAnnual
    : isMonthly
    ? activeProfile.taxShareMonthly
    : activeProfile.taxShareAnnual;

  const finalNetPay = isCombinedView
    ? isMonthly
      ? result.netPayMonthly
      : result.netPayAnnual
    : isMonthly
    ? activeProfile.netPayMonthly
    : activeProfile.netPayAnnual;

  const retentionRate = isCombinedView
    ? result.totalRetentionRate
    : activeProfile.totalRetentionRate;

  const currentMonths = isCombinedView
    ? result.inputs.numberOfMonths
    : activeProfile.numberOfMonths;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-red-400" />
          <div>
            <h3 className="text-sm font-bold tracking-tight">
              Official Swiss Payslip Preview (Lohnabrechnung)
            </h3>
            <p className="text-xs text-slate-300">
              Canton {result.canton.name} ({result.canton.code}) · {currentMonths} Salary Model
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {/* Monthly / Annual toggle */}
          <div className="flex p-0.5 bg-slate-800 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setViewMode('monthly')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                isMonthly ? 'bg-red-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setViewMode('annual')}
              className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                !isMonthly ? 'bg-red-600 text-white font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Annual Total
            </button>
          </div>
          <button
            type="button"
            onClick={onPrint}
            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg transition-colors cursor-pointer"
            title="Print payslip"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dual Income Person Switcher (When Married Dual Income is active) */}
      {isDual && (
        <div className="bg-slate-100 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between gap-3 text-xs">
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-red-600" /> Select Payslip View:
          </span>
          <div className="flex p-0.5 bg-white rounded-lg border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setPersonTab('primary')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                personTab === 'primary'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              You (Primary)
            </button>
            <button
              type="button"
              onClick={() => setPersonTab('spouse')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                personTab === 'spouse'
                  ? 'bg-red-600 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Spouse
            </button>
            <button
              type="button"
              onClick={() => setPersonTab('combined')}
              className={`px-3 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                personTab === 'combined'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Household Total
            </button>
          </div>
        </div>
      )}

      {/* Payslip Content Area */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4 text-xs">
          <div>
            <div className="font-bold text-slate-900 text-sm">SAMPLE COMPANY SWITZERLAND AG</div>
            <div className="text-slate-500">Bahnhofstrasse 100, 8001 Zürich</div>
            <div className="text-slate-500 mt-0.5">UID: CHE-123.456.789 MWST</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-700">
              Period: {isMonthly ? 'Current Month' : 'Full Calendar Year'}
            </div>
            <div className="text-slate-500">Residence: Canton {result.canton.name}</div>
            <div className="text-slate-500">
              Employee:{' '}
              <strong className="text-slate-700">
                {isCombinedView
                  ? 'Household (Both Spouses)'
                  : isSpouseView
                  ? 'Spouse (Person 2)'
                  : 'Primary Earer (Person 1)'}
              </strong>
            </div>
          </div>
        </div>

        {/* Payslip Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-2.5 text-left">Component / Deduction</th>
                <th className="py-2.5 text-right">Basis</th>
                <th className="py-2.5 text-right">Rate %</th>
                <th className="py-2.5 text-right">Deduction (-)</th>
                <th className="py-2.5 text-right">Payment (+)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono tabular-nums">
              {/* Gross Salary Base */}
              <tr className="bg-slate-50/60 font-sans font-semibold text-slate-900">
                <td className="py-3 pl-2">
                  <div>
                    {isCombinedView
                      ? 'Combined Household Gross Salary'
                      : isSpouseView
                      ? "Spouse's Base Gross Salary (Monatslohn Partner)"
                      : 'Base Gross Salary (Monatslohn / Grundlohn)'}
                  </div>
                  {currentMonths === 13 && isMonthly && (
                    <div className="text-[10px] text-slate-500 font-normal">
                      Based on 13 monthly salaries (1/13th)
                    </div>
                  )}
                </td>
                <td className="py-3 text-right font-mono">{formatCHF(gross)}</td>
                <td className="py-3 text-right font-mono">100.00%</td>
                <td className="py-3 text-right text-slate-400 font-mono">—</td>
                <td className="py-3 text-right font-bold text-slate-900 pr-2 font-mono">
                  {formatCHF(gross)}
                </td>
              </tr>

              {/* 1. AHV/IV/EO */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">AHV / IV / EO (1. Säule)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Old Age, Disability, Income Compensation
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">{formatCHF(gross)}</td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(social.ahvRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(ahv)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* 2. ALV */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">ALV (Arbeitslosenversicherung)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Unemployment insurance (up to max CHF 148'200)
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatCHF(
                    isMonthly
                      ? Math.min(gross, 148200 / currentMonths)
                      : Math.min(gross, 148200)
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(social.alvRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(alv)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* 3. NBU */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">NBU (Nichtbetriebsunfall)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Non-occupational accident insurance
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatCHF(
                    isMonthly
                      ? Math.min(gross, 148200 / currentMonths)
                      : Math.min(gross, 148200)
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(social.nbuRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(nbu)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* 4. KTG */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">KTG (Krankentaggeld)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Daily sickness allowance insurance
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">{formatCHF(gross)}</td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(social.ktgRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(ktg)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* 5. BVG */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">BVG / LPP (Pensionskasse 2. Säule)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Occupational retirement pension (Age{' '}
                    {isCombinedView
                      ? `${result.inputs.age} & ${result.inputs.spouseAge}`
                      : isSpouseView
                      ? result.inputs.spouseAge
                      : result.inputs.age}
                    )
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatCHF(
                    isMonthly
                      ? social.bvgCoordinatedSalary / currentMonths
                      : social.bvgCoordinatedSalary
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(social.bvgRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(bvg)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* Net Wage I (Before tax) */}
              <tr className="border-t border-b border-slate-300 bg-slate-50 font-sans font-semibold text-slate-900">
                <td className="py-2.5 pl-2" colSpan={3}>
                  Net Salary Before Taxes (Nettolohn I)
                </td>
                <td className="py-2.5 text-right text-red-600 font-mono">
                  -{formatCHF(totalSocial)}
                </td>
                <td className="py-2.5 text-right font-mono font-bold pr-2">
                  {formatCHF(netBeforeTax)}
                </td>
              </tr>

              {/* Child Allowances (+) */}
              {showAllowance && (
                <>
                  {childAllowance > 0 && (
                    <tr className="hover:bg-emerald-50/30">
                      <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                        <span className="font-medium text-emerald-900">
                          Kinderzulage ({result.inputs.childrenUnder16} Child/Children &lt;16)
                        </span>
                        <div className="text-[10px] text-emerald-600">
                          Canton {result.canton.name} statutory child allowance
                        </div>
                      </td>
                      <td className="py-2.5 text-right text-slate-400">—</td>
                      <td className="py-2.5 text-right text-emerald-700 font-bold font-mono pr-2">
                        +{formatCHF(childAllowance)}
                      </td>
                    </tr>
                  )}
                  {eduAllowance > 0 && (
                    <tr className="hover:bg-emerald-50/30">
                      <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                        <span className="font-medium text-emerald-900">
                          Ausbildungszulage ({result.inputs.childrenEducation} Youth 16-25 in training)
                        </span>
                        <div className="text-[10px] text-emerald-600">
                          Cantonal education allowance
                        </div>
                      </td>
                      <td className="py-2.5 text-right text-slate-400">—</td>
                      <td className="py-2.5 text-right text-emerald-700 font-bold font-mono pr-2">
                        +{formatCHF(eduAllowance)}
                      </td>
                    </tr>
                  )}
                </>
              )}

              {/* Taxes (-) */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                  <span className="font-medium text-slate-900">Direkte Bundessteuer (Federal Tax)</span>
                  <div className="text-[10px] text-slate-500">
                    Direct federal progressive income tax {isDual && !isCombinedView && `(${Math.round(taxRatio * 100)}% share)`}
                  </div>
                </td>
                <td className="py-2.5 text-right text-red-600 font-mono">-{formatCHF(fedTax)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                  <span className="font-medium text-slate-900">
                    Kantonssteuer (Canton {result.canton.name} Tax)
                  </span>
                  <div className="text-[10px] text-slate-500">
                    Cantonal basic rate with cantonal multiplier {isDual && !isCombinedView && `(${Math.round(taxRatio * 100)}% share)`}
                  </div>
                </td>
                <td className="py-2.5 text-right text-red-600 font-mono">
                  -{formatCHF(cantonalTax)}
                </td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                  <span className="font-medium text-slate-900">Gemeindesteuer (Municipal Tax)</span>
                  <div className="text-[10px] text-slate-500">
                    Municipal tax based on average municipal multiplier {isDual && !isCombinedView && `(${Math.round(taxRatio * 100)}% share)`}
                  </div>
                </td>
                <td className="py-2.5 text-right text-red-600 font-mono">
                  -{formatCHF(municipalTax)}
                </td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {churchTax > 0 && (
                <tr className="hover:bg-slate-50/50">
                  <td className="py-2.5 pl-2 font-sans" colSpan={3}>
                    <span className="font-medium text-slate-900">Kirchensteuer (Church Tax)</span>
                    <div className="text-[10px] text-slate-500">
                      Canton {result.canton.name} church tax ({result.canton.churchTaxRate}%)
                    </div>
                  </td>
                  <td className="py-2.5 text-right text-red-600 font-mono">
                    -{formatCHF(churchTax)}
                  </td>
                  <td className="py-2.5 text-right text-slate-400">—</td>
                </tr>
              )}

              {/* Total Taxes Line */}
              <tr className="border-t border-slate-200 bg-slate-50/60 font-sans">
                <td className="py-2 pl-2 text-slate-600 font-medium" colSpan={3}>
                  Total Estimated Taxes{' '}
                  <span className="text-slate-400 text-[10px]">
                    (Effective:{' '}
                    {formatPercent(
                      isCombinedView
                        ? result.tax.effectiveTaxRate
                        : activeProfile.effectiveTaxRate
                    )}
                    )
                  </span>
                </td>
                <td className="py-2 text-right text-red-700 font-mono font-bold">
                  -{formatCHF(totalTax)}
                </td>
                <td className="py-2 text-right text-slate-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Final Net Pay Payout Banner - Bank Transfer section removed as requested */}
        <div className="bg-red-50/60 border-2 border-red-500/80 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-800 uppercase tracking-wider">
              {isCombinedView
                ? 'Combined Household Net Pay (Total)'
                : isSpouseView
                ? "Spouse's Net Take-Home Pay (Auszahlungsbetrag Partner)"
                : 'Auszahlungsbetrag (Net Take-Home Pay)'}
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
              {formatCHF(finalNetPay)}
              <span className="text-xs font-sans font-medium text-slate-500 ml-2">
                /{isMonthly ? 'month' : 'year'}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Net retention: <span className="font-bold text-slate-900">{formatPercent(retentionRate)}</span> of gross salary
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
