import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { FileText, Printer, CheckCircle2, AlertCircle } from 'lucide-react';

interface PayslipViewProps {
  result: CalculationResult;
  onPrint: () => void;
}

export const PayslipView: React.FC<PayslipViewProps> = ({ result, onPrint }) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');

  const isMonthly = viewMode === 'monthly';
  const gross = isMonthly ? result.grossSalaryMonthly : result.grossSalaryAnnual;
  const ahv = isMonthly ? result.socialSecurity.ahvMonthly : result.socialSecurity.ahvAnnual;
  const alv = isMonthly ? result.socialSecurity.alvMonthly : result.socialSecurity.alvAnnual;
  const nbu = isMonthly ? result.socialSecurity.nbuMonthly : result.socialSecurity.nbuAnnual;
  const ktg = isMonthly ? result.socialSecurity.ktgMonthly : result.socialSecurity.ktgAnnual;
  const bvg = isMonthly ? result.socialSecurity.bvgMonthly : result.socialSecurity.bvgAnnual;
  const totalSocial = isMonthly
    ? result.socialSecurity.totalDeductionsMonthly
    : result.socialSecurity.totalDeductionsAnnual;

  const netBeforeTax = isMonthly ? result.netBeforeTaxMonthly : result.netBeforeTaxAnnual;

  const childAllowance = isMonthly
    ? result.familyAllowances.childAllowanceMonthly
    : result.familyAllowances.childAllowanceAnnual;
  const eduAllowance = isMonthly
    ? result.familyAllowances.educationAllowanceMonthly
    : result.familyAllowances.educationAllowanceAnnual;
  const totalAllowance = isMonthly
    ? result.familyAllowances.totalAllowanceMonthly
    : result.familyAllowances.totalAllowanceAnnual;

  const fedTax = isMonthly ? result.tax.federalTaxMonthly : result.tax.federalTaxAnnual;
  const cantonalTax = isMonthly ? result.tax.cantonalTaxMonthly : result.tax.cantonalTaxAnnual;
  const municipalTax = isMonthly ? result.tax.municipalTaxMonthly : result.tax.municipalTaxAnnual;
  const churchTax = isMonthly ? result.tax.churchTaxMonthly : result.tax.churchTaxAnnual;
  const totalTax = isMonthly ? result.tax.totalTaxMonthly : result.tax.totalTaxAnnual;

  const finalNetPay = isMonthly ? result.netPayMonthly : result.netPayAnnual;
  const healthInsurance = isMonthly
    ? result.healthInsuranceMonthly
    : result.healthInsuranceAnnual;
  const disposableIncome = isMonthly
    ? result.disposableIncomeMonthly
    : result.disposableIncomeAnnual;

  return (
    <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
      {/* Action / View toggle banner */}
      <div className="bg-slate-900 text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <FileText className="w-5 h-5 text-red-400" />
          <div>
            <h3 className="text-sm font-bold tracking-tight">
              Official Swiss Payslip Preview (Lohnabrechnung)
            </h3>
            <p className="text-xs text-slate-300">
              Canton {result.canton.name} ({result.canton.code}) · {result.inputs.numberOfMonths} Salary Model
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
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

      {/* Payslip Content Area */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Document Header */}
        <div className="flex justify-between items-start border-b border-slate-200 pb-4 text-xs">
          <div>
            <div className="font-bold text-slate-900 text-sm">SAMPLE COMPANY SWITZERLAND AG</div>
            <div className="text-slate-500">Bahnhofstrasse 100, 8001 Zürich</div>
            <div className="text-slate-500 mt-1">UID: CHE-123.456.789 MWST</div>
          </div>
          <div className="text-right">
            <div className="font-semibold text-slate-700">Period: {isMonthly ? 'Current Month' : 'Full Calendar Year'}</div>
            <div className="text-slate-500">Residence: Canton {result.canton.name}</div>
            <div className="text-slate-500">Tariff: {result.inputs.maritalStatus === 'single' ? 'Single' : 'Married'}</div>
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
                  <div>Base Gross Salary (Monatslohn / Grundlohn)</div>
                  {result.inputs.numberOfMonths === 13 && isMonthly && (
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
                  {formatPercent(result.socialSecurity.ahvRate)}
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
                      ? Math.min(gross, 148200 / result.inputs.numberOfMonths)
                      : Math.min(gross, 148200)
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(result.socialSecurity.alvRate)}
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
                      ? Math.min(gross, 148200 / result.inputs.numberOfMonths)
                      : Math.min(gross, 148200)
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(result.socialSecurity.nbuRate)}
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
                  {formatPercent(result.socialSecurity.ktgRate)}
                </td>
                <td className="py-2.5 text-right text-red-600 font-medium">-{formatCHF(ktg)}</td>
                <td className="py-2.5 text-right text-slate-400">—</td>
              </tr>

              {/* 5. BVG */}
              <tr className="hover:bg-slate-50/50">
                <td className="py-2.5 pl-2 font-sans">
                  <span className="font-medium text-slate-900">BVG / LPP (Pensionskasse 2. Säule)</span>
                  <div className="text-[10px] text-slate-500 font-normal">
                    Occupational retirement pension (Age {result.inputs.age})
                  </div>
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatCHF(
                    isMonthly
                      ? result.socialSecurity.bvgCoordinatedSalary / result.inputs.numberOfMonths
                      : result.socialSecurity.bvgCoordinatedSalary
                  )}
                </td>
                <td className="py-2.5 text-right text-slate-600">
                  {formatPercent(result.socialSecurity.bvgRate)}
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
              {result.familyAllowances.totalAllowanceAnnual > 0 && (
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
                    Direct federal progressive income tax
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
                    Cantonal basic rate with cantonal multiplier
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
                    Municipal tax based on average municipal multiplier
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
                      Levied for {result.inputs.churchAffiliation.replace('_', ' ')}
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
                  Total Estimated Taxes (Effective: {formatPercent(result.tax.effectiveTaxRate)})
                </td>
                <td className="py-2 text-right text-red-700 font-mono font-bold">
                  -{formatCHF(totalTax)}
                </td>
                <td className="py-2 text-right text-slate-400">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Final Net Pay Bank Payout Banner */}
        <div className="bg-red-50/60 border-2 border-red-500/80 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-red-800 uppercase tracking-wider">
              Auszahlungsbetrag (Net Take-Home Pay)
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums mt-0.5">
              {formatCHF(finalNetPay)}
              <span className="text-xs font-sans font-medium text-slate-500 ml-2">
                /{isMonthly ? 'month' : 'year'}
              </span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Net retention: <span className="font-bold text-slate-900">{formatPercent(result.totalRetentionRate)}</span> of gross salary
            </div>
          </div>

          <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-red-200/60">
            <div className="text-xs text-slate-500">Bank Transfer to Account</div>
            <div className="text-xs font-mono text-slate-700 font-medium mt-0.5">
              CH93 0076 2011 6238 5295 7
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-1 flex items-center sm:justify-end gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Direct Net Disbursement
            </div>
          </div>
        </div>

        {/* Health Insurance Note */}
        {result.inputs.includeHealthInsurance && (
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200/80 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                Remaining Disposable Income (After Mandatory Swiss Health Insurance):
              </span>
              <span className="font-bold text-slate-900 font-mono text-sm">
                {formatCHF(disposableIncome)} /{isMonthly ? 'mo' : 'yr'}
              </span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Estimated standard health insurance premium in Canton {result.canton.name}: {formatCHF(healthInsurance)} /{isMonthly ? 'mo' : 'yr'} (paid privately by employee).
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
