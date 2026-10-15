import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import {
  ChevronDown,
  ChevronUp,
  FileText,
  Building2,
  Users,
  Shield,
  Landmark,
  Baby,
  ArrowRight,
} from 'lucide-react';

interface TaxBreakdownCardProps {
  result: CalculationResult;
  onNavigateToPayslip?: () => void;
  onNavigateToCantons?: () => void;
}

export const TaxBreakdownCard: React.FC<TaxBreakdownCardProps> = ({
  result,
  onNavigateToPayslip,
  onNavigateToCantons,
}) => {
  const [viewMode, setViewMode] = useState<'monthly' | 'annual'>('monthly');
  const [activeProfileTab, setActiveProfileTab] = useState<'combined' | 'primary' | 'spouse'>('combined');
  const [showSocialDetails, setShowSocialDetails] = useState<boolean>(false);
  const [showTaxDetails, setShowTaxDetails] = useState<boolean>(false);

  const isMonthly = viewMode === 'monthly';
  const isDual = result.isDualIncome && !!result.spouseResult;

  // Active profile selection
  const isSpouseSelected = isDual && activeProfileTab === 'spouse';
  const isPrimarySelected = isDual && activeProfileTab === 'primary';
  const isCombined = !isDual || activeProfileTab === 'combined';

  // Base profile data
  const currentProfile = isSpouseSelected
    ? result.spouseResult!
    : isPrimarySelected
    ? result.primaryResult
    : null;

  // Gross
  const grossAmount = isCombined
    ? isMonthly ? result.grossSalaryMonthly : result.grossSalaryAnnual
    : currentProfile
    ? isMonthly ? currentProfile.grossSalaryMonthly : currentProfile.grossSalaryAnnual
    : 0;

  // Allowances (family allowances go to household / primary earner)
  const allowanceAmount = isSpouseSelected
    ? 0
    : isMonthly
    ? result.familyAllowances.totalAllowanceMonthly
    : result.familyAllowances.totalAllowanceAnnual;

  // Social security
  const socialAmount = isCombined
    ? isMonthly
      ? result.socialSecurity.totalDeductionsMonthly
      : result.socialSecurity.totalDeductionsAnnual
    : currentProfile
    ? isMonthly
      ? currentProfile.socialSecurity.totalDeductionsMonthly
      : currentProfile.socialSecurity.totalDeductionsAnnual
    : 0;

  // Social security details
  const activeSocial = isCombined
    ? result.socialSecurity
    : currentProfile
    ? currentProfile.socialSecurity
    : result.socialSecurity;

  // Taxes
  const taxAmount = isCombined
    ? isMonthly ? result.tax.totalTaxMonthly : result.tax.totalTaxAnnual
    : currentProfile
    ? isMonthly ? currentProfile.taxShareMonthly : currentProfile.taxShareAnnual
    : 0;

  // Net Pay
  const netPayAmount = isCombined
    ? isMonthly ? result.netPayMonthly : result.netPayAnnual
    : currentProfile
    ? isMonthly ? currentProfile.netPayMonthly : currentProfile.netPayAnnual
    : 0;

  const effectiveTaxRate = isCombined
    ? result.tax.effectiveTaxRate
    : currentProfile
    ? currentProfile.effectiveTaxRate
    : 0;

  const retentionRate = isCombined
    ? result.totalRetentionRate
    : currentProfile
    ? currentProfile.totalRetentionRate
    : 0;

  // Distribution percentages
  const totalInflow = grossAmount + allowanceAmount;
  const netPct = totalInflow > 0 ? (netPayAmount / totalInflow) * 100 : 0;
  const taxPct = totalInflow > 0 ? (taxAmount / totalInflow) * 100 : 0;
  const socialPct = totalInflow > 0 ? (socialAmount / totalInflow) * 100 : 0;

  // Tax item details
  const taxRatio = isCombined
    ? 1
    : currentProfile && result.tax.totalTaxAnnual > 0
    ? currentProfile.taxShareAnnual / result.tax.totalTaxAnnual
    : 1;

  const fedTax = isCombined
    ? isMonthly ? result.tax.federalTaxMonthly : result.tax.federalTaxAnnual
    : currentProfile?.federalTaxAnnual !== undefined
    ? isMonthly ? currentProfile.federalTaxAnnual / 12 : currentProfile.federalTaxAnnual
    : (isMonthly ? result.tax.federalTaxMonthly : result.tax.federalTaxAnnual) * taxRatio;

  const cantonalTax = isCombined
    ? isMonthly ? result.tax.cantonalTaxMonthly : result.tax.cantonalTaxAnnual
    : currentProfile?.cantonalTaxAnnual !== undefined
    ? isMonthly ? currentProfile.cantonalTaxAnnual / 12 : currentProfile.cantonalTaxAnnual
    : (isMonthly ? result.tax.cantonalTaxMonthly : result.tax.cantonalTaxAnnual) * taxRatio;

  const municipalTax = isCombined
    ? isMonthly ? result.tax.municipalTaxMonthly : result.tax.municipalTaxAnnual
    : currentProfile?.municipalTaxAnnual !== undefined
    ? isMonthly ? currentProfile.municipalTaxAnnual / 12 : currentProfile.municipalTaxAnnual
    : (isMonthly ? result.tax.municipalTaxMonthly : result.tax.municipalTaxAnnual) * taxRatio;

  const churchTax = isCombined
    ? isMonthly ? result.tax.churchTaxMonthly : result.tax.churchTaxAnnual
    : currentProfile?.churchTaxAnnual !== undefined
    ? isMonthly ? currentProfile.churchTaxAnnual / 12 : currentProfile.churchTaxAnnual
    : (isMonthly ? result.tax.churchTaxMonthly : result.tax.churchTaxAnnual) * taxRatio;

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden space-y-0">
      {/* Header bar with Monthly/Annual Switch */}
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
            Salary &amp; Tax Overview
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Canton {result.canton.name} ({result.canton.code}) · {result.inputs.numberOfMonths}x Salary Model
          </p>
        </div>

        {/* View Cadence Switch */}
        <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('monthly')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              isMonthly
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly
          </button>
          <button
            type="button"
            onClick={() => setViewMode('annual')}
            className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
              !isMonthly
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Annual
          </button>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* Dual Income Person Filter (if applicable) */}
        {isDual && result.spouseResult && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-red-600" />
                Select Calculation Profile:
              </span>
              <span className="text-[11px] text-slate-500">Joint Swiss Married Tariff</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-medium">
              <button
                type="button"
                onClick={() => setActiveProfileTab('combined')}
                className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                  activeProfileTab === 'combined'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>Household Total</div>
                <div className="font-mono text-[11px] text-slate-500 font-normal mt-0.5">
                  {formatCHF(isMonthly ? result.netPayMonthly : result.netPayAnnual)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveProfileTab('primary')}
                className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                  activeProfileTab === 'primary'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>You (Person 1)</div>
                <div className="font-mono text-[11px] text-slate-500 font-normal mt-0.5">
                  {formatCHF(isMonthly ? result.primaryResult.netPayMonthly : result.primaryResult.netPayAnnual)}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setActiveProfileTab('spouse')}
                className={`py-2 px-2.5 rounded-lg transition-all text-center cursor-pointer ${
                  activeProfileTab === 'spouse'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <div>Spouse (Person 2)</div>
                <div className="font-mono text-[11px] text-slate-500 font-normal mt-0.5">
                  {formatCHF(isMonthly ? result.spouseResult.netPayMonthly : result.spouseResult.netPayAnnual)}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Clean, Unified Take-Home Pay & KPI Card (Dark) */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-5 space-y-4 shadow-md">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Net Take-Home Pay (Auszahlungsbetrag)
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-white tabular-nums">
                  {formatCHF(netPayAmount)}
                </span>
                <span className="text-sm font-semibold text-slate-400">
                  {isMonthly ? '/ month' : '/ year'}
                </span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-mono block">
                {isMonthly
                  ? `${formatCHF(isCombined ? result.netPayAnnual : currentProfile?.netPayAnnual || 0)} / year`
                  : `${formatCHF(isCombined ? result.netPayMonthly : currentProfile?.netPayMonthly || 0)} / month`}
              </span>
              <span className="text-[11px] text-emerald-400 font-medium">
                {formatPercent(retentionRate, 1)} of gross salary
              </span>
            </div>
          </div>

          {/* 3 Balanced KPI Metrics */}
          <div className="grid grid-cols-3 gap-3 pt-3.5 border-t border-slate-800">
            <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700/60 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 block truncate">Retention Rate</span>
              <span className="text-base sm:text-lg font-bold font-mono text-emerald-400 tabular-nums block mt-0.5">
                {formatPercent(retentionRate, 1)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">Net take-home</span>
            </div>

            <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700/60 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 block truncate">Effective Tax</span>
              <span className="text-base sm:text-lg font-bold font-mono text-red-400 tabular-nums block mt-0.5">
                {formatPercent(effectiveTaxRate, 1)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">All tax levels</span>
            </div>

            <div className="bg-slate-800/90 rounded-lg p-3 border border-slate-700/60 shadow-2xs">
              <span className="text-[11px] font-medium text-slate-400 block truncate">Total Deductions</span>
              <span className="text-base sm:text-lg font-bold font-mono text-slate-200 tabular-nums block mt-0.5 truncate">
                {formatCHF(socialAmount + taxAmount)}
              </span>
              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">
                {isMonthly ? 'Per month' : 'Per year'}
              </span>
            </div>
          </div>
        </div>

        {/* Sleek Allocation Proportion Bar */}
        <div className="space-y-1.5">
          <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div
              style={{ width: `${Math.min(100, Math.max(5, netPct))}%` }}
              className="bg-emerald-600 h-full transition-all duration-300"
              title={`Net Pay: ${formatPercent(netPct)}`}
            />
            <div
              style={{ width: `${Math.max(2, socialPct)}%` }}
              className="bg-blue-600 h-full transition-all duration-300"
              title={`Social Security: ${formatPercent(socialPct)}`}
            />
            <div
              style={{ width: `${Math.max(2, taxPct)}%` }}
              className="bg-red-500 h-full transition-all duration-300"
              title={`Taxes: ${formatPercent(taxPct)}`}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-600 pt-0.5 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <span>Net Pay: <strong className="text-slate-900 font-mono">{formatPercent(netPct, 1)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span>Social: <strong className="text-slate-900 font-mono">{formatPercent(socialPct, 1)}</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
              <span>Taxes: <strong className="text-slate-900 font-mono">{formatPercent(taxPct, 1)}</strong></span>
            </div>
          </div>
        </div>

        {/* Clean Structured Waterfall Calculation */}
        <div className="border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-100 text-sm bg-white">
          {/* Gross Salary */}
          <div className="px-4 py-3.5 flex items-center justify-between bg-slate-50/40">
            <span className="font-semibold text-slate-800">Gross Salary (Bruttolohn)</span>
            <span className="font-mono font-bold text-slate-900">{formatCHF(grossAmount)}</span>
          </div>

          {/* Child Allowances (if any) */}
          {allowanceAmount > 0 && (
            <div className="px-4 py-3.5 flex items-center justify-between text-emerald-800 bg-emerald-50/30">
              <span className="font-medium flex items-center gap-2">
                <Baby className="w-4 h-4 text-emerald-600 shrink-0" />
                + Family &amp; Child Allowances (Familienzulagen)
              </span>
              <span className="font-mono font-bold text-emerald-700">+{formatCHF(allowanceAmount)}</span>
            </div>
          )}

          {/* Social Security Deductions Header */}
          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowSocialDetails(!showSocialDetails)}
                className="flex items-center gap-2 text-left text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
              >
                <Shield className="w-4 h-4 text-blue-600 shrink-0" />
                <span>− Social Security Deductions (1st &amp; 2nd Pillar)</span>
                {showSocialDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              <span className="font-mono font-bold text-slate-900">−{formatCHF(socialAmount)}</span>
            </div>

            {/* Expandable Social Security line items */}
            {showSocialDetails && (
              <div className="mt-3 pl-6 pr-3 py-2.5 space-y-1.5 text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-200/60 font-mono">
                <div className="flex justify-between">
                  <span>AHV / IV / EO (5.30%)</span>
                  <span>{formatCHF(isMonthly ? activeSocial.ahvMonthly : activeSocial.ahvAnnual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>ALV Unemployment ({formatPercent(activeSocial.alvRate, 2)})</span>
                  <span>{formatCHF(isMonthly ? activeSocial.alvMonthly : activeSocial.alvAnnual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BVG / LPP Pension ({formatPercent(activeSocial.bvgRate, 1)})</span>
                  <span>{formatCHF(isMonthly ? activeSocial.bvgMonthly : activeSocial.bvgAnnual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>NBU Accident ({formatPercent(activeSocial.nbuRate, 1)})</span>
                  <span>{formatCHF(isMonthly ? activeSocial.nbuMonthly : activeSocial.nbuAnnual)}</span>
                </div>
                <div className="flex justify-between">
                  <span>KTG Sickness ({formatPercent(activeSocial.ktgRate, 1)})</span>
                  <span>{formatCHF(isMonthly ? activeSocial.ktgMonthly : activeSocial.ktgAnnual)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Taxes Header */}
          <div className="px-4 py-3.5">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowTaxDetails(!showTaxDetails)}
                className="flex items-center gap-2 text-left text-slate-700 hover:text-slate-900 font-medium cursor-pointer"
              >
                <Landmark className="w-4 h-4 text-red-600 shrink-0" />
                <span>− Income Taxes (Federal, Cantonal, Municipal{churchTax > 0 ? ', Church' : ''})</span>
                {showTaxDetails ? (
                  <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>
              <span className="font-mono font-bold text-red-600">−{formatCHF(taxAmount)}</span>
            </div>

            {/* Expandable Tax Authorities Split */}
            {showTaxDetails && (
              <div className="mt-3 pl-6 pr-3 py-2.5 space-y-1.5 text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-200/60 font-mono">
                <div className="flex justify-between">
                  <span>Direkte Bundessteuer (Federal)</span>
                  <span>{formatCHF(fedTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Kantonssteuer (Canton {result.canton.code})</span>
                  <span>{formatCHF(cantonalTax)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gemeindesteuer (Municipality)</span>
                  <span>{formatCHF(municipalTax)}</span>
                </div>
                {churchTax > 0 && (
                  <div className="flex justify-between">
                    <span>Kirchensteuer (Church Tax)</span>
                    <span>{formatCHF(churchTax)}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Final Net Take-Home Pay Result Row */}
          <div className="px-4 py-3.5 bg-emerald-50/60 flex items-center justify-between">
            <div>
              <span className="font-extrabold text-emerald-950 text-sm sm:text-base block">
                Net Take-Home Pay (Nettolohn)
              </span>
            </div>
            <div className="text-right">
              <span className="font-mono font-extrabold text-emerald-800 text-lg sm:text-xl tabular-nums block">
                {formatCHF(netPayAmount)}
              </span>
              <span className="text-[11px] text-emerald-600 font-mono block">
                {isMonthly
                  ? `${formatCHF(isCombined ? result.netPayAnnual : currentProfile?.netPayAnnual || 0)} /yr`
                  : `${formatCHF(isCombined ? result.netPayMonthly : currentProfile?.netPayMonthly || 0)} /mo`}
              </span>
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-xs">
          {onNavigateToPayslip && (
            <button
              type="button"
              onClick={onNavigateToPayslip}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors cursor-pointer shadow-xs"
            >
              <FileText className="w-4 h-4 text-red-400" />
              <span>View Full Official Payslip</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {onNavigateToCantons && (
            <button
              type="button"
              onClick={onNavigateToCantons}
              className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-lg border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <Building2 className="w-3.5 h-3.5 text-slate-500" />
              <span>Compare with 26 Cantons</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
