import React, { useState, useMemo } from 'react';
import { CalculatorInputs } from './types/calculator';
import { calculateSwissSalary, formatCHF, formatPercent } from './utils/calculator';
import { Header } from './components/Header';
import { SalaryInputForm } from './components/SalaryInputForm';
import { PayslipView } from './components/PayslipView';
import { TaxBreakdownCard } from './components/TaxBreakdownCard';
import { CantonComparison } from './components/CantonComparison';
import { EmployerCostCard } from './components/EmployerCostCard';
import { SwissSalaryGuide } from './components/SwissSalaryGuide';
import { Footer } from './components/Footer';
import {
  Wallet,
  Building2,
  FileText,
  Briefcase,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Percent,
  CheckCircle,
} from 'lucide-react';

const DEFAULT_INPUTS: CalculatorInputs = {
  grossSalary: 85000,
  salaryPeriod: 'annual',
  numberOfMonths: 12,
  cantonCode: 'ZH',
  maritalStatus: 'single',
  spouseGrossSalary: 65000,
  spouseSalaryPeriod: 'annual',
  spouseNumberOfMonths: 12,
  spouseAge: 32,
  spousePillar3aContribution: 0,
  childrenUnder16: 0,
  childrenEducation: 0,
  age: 32,
  isChurchMember: false,
  taxationType: 'ordinary',
  pillar3aContribution: 0,
  includeHealthInsurance: false,
  nbuRate: 1.2,
  ktgRate: 0.8,
};

export default function App() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [activeSection, setActiveSection] = useState<string>('calculator');

  const result = useMemo(() => calculateSwissSalary(inputs), [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSelectCanton = (code: string) => {
    setInputs((prev) => ({ ...prev, cantonCode: code }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header with Top Bar Contract */}
      <Header
        onReset={handleReset}
        onPrint={handlePrint}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Hero Headline and Key Figure Banner */}
      <div className="bg-white border-b border-slate-200 py-8 px-4 sm:px-6 lg:px-8 no-print">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-red-600 mb-1.5 uppercase tracking-wider">
                <span>Switzerland Net Salary & Tax Calculator</span>
                <span>·</span>
                <span>All 26 Cantons</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Calculate Your Real Swiss Net Pay & Taxes
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl text-balance">
                Accurate breakdown of AHV/IV/EO, ALV, BVG pension, cantonal child allowances,
                church tax, and multi-tier income tax across all Swiss cantons.
              </p>
            </div>

            {/* Top Quick Status Pill-less KPI */}
            <div className="flex items-center gap-6 bg-slate-50 border border-slate-200/80 rounded-xl p-4 shrink-0">
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Net Monthly Payout
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
                  {formatCHF(result.netPayMonthly)}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Effective Tax Rate
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-red-600 font-mono tabular-nums">
                  {formatPercent(result.tax.effectiveTaxRate)}
                </span>
              </div>
              <div className="h-8 w-px bg-slate-200" />
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block">
                  Canton
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-slate-800 font-mono">
                  {result.canton.code}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={() => setActiveSection('calculator')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === 'calculator'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Wallet className="w-3.5 h-3.5" />
              Calculator & Overview
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('payslip')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === 'payslip'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Payslip (Lohnabrechnung)
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('cantons')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === 'cantons'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              Compare All 26 Cantons
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('employer')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === 'employer'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              Employer Cost
            </button>
            <button
              type="button"
              onClick={() => setActiveSection('guide')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeSection === 'guide'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Swiss Salary Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Print-only Payslip view */}
        <div className="hidden print-only">
          <PayslipView result={result} onPrint={handlePrint} />
        </div>

        {/* Section: Calculator / Main Dual Column */}
        {activeSection === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Controls & Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <SalaryInputForm inputs={inputs} onChange={setInputs} />
            </div>

            {/* Right 7 Cols: Real-time Analysis & Payslip preview */}
            <div className="lg:col-span-7 space-y-6">
              <TaxBreakdownCard result={result} />
              <PayslipView result={result} onPrint={handlePrint} />
            </div>
          </div>
        )}

        {/* Section: Payslip Dedicated */}
        {activeSection === 'payslip' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <PayslipView result={result} onPrint={handlePrint} />
          </div>
        )}

        {/* Section: Canton Comparison */}
        {activeSection === 'cantons' && (
          <div className="space-y-6">
            <CantonComparison inputs={inputs} onSelectCanton={handleSelectCanton} />
          </div>
        )}

        {/* Section: Employer Cost */}
        {activeSection === 'employer' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <EmployerCostCard result={result} />
          </div>
        )}

        {/* Section: Swiss Guide */}
        {activeSection === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <SwissSalaryGuide />
          </div>
        )}

        {/* Bottom Contextual Insights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-200">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Retain More With Pillar 3a
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Contributing the maximum CHF 7'056/year to Pillar 3a can reduce your tax bill by CHF 1'200 – CHF 2'400 depending on your canton and tax bracket.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Building2 className="w-4 h-4 text-blue-600" />
              Cantonal Differences
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Taxes in Switzerland vary by up to 2.5x between cantons. Living in Zug (ZG) or Schwyz (SZ) leaves substantially higher net income than Geneva or Neuchâtel.
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <CheckCircle className="w-4 h-4 text-red-600" />
              Child Allowances Paid to You
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              In Switzerland, family allowances (CHF 215 – 477/mo per child) are added directly onto your paycheck each month by your employer.
            </p>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <Footer />
    </div>
  );
}
