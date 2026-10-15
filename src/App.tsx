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
import { BudgetCalculator } from './components/BudgetCalculator';
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
  PieChart,
} from 'lucide-react';

const DEFAULT_INPUTS: CalculatorInputs = {
  grossSalary: 80000,
  salaryPeriod: 'annual',
  numberOfMonths: 12,
  cantonCode: 'ZH',
  maritalStatus: 'single',
  spouseGrossSalary: 65000,
  spouseSalaryPeriod: 'annual',
  spouseNumberOfMonths: 12,
  spouseAge: 32,
  spouseIsChurchMember: false,
  childrenUnder16: 0,
  childrenEducation: 0,
  age: 32,
  isChurchMember: false,
  taxationType: 'ordinary',
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

  const handleSelectCanton = (code: string) => {
    setInputs((prev) => ({ ...prev, cantonCode: code }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Header with Top Bar Contract */}
      <Header
        onReset={handleReset}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />



      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Section: Calculator / Main Dual Column */}
        {activeSection === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: Controls & Inputs */}
            <div className="lg:col-span-5 space-y-6">
              <SalaryInputForm inputs={inputs} onChange={setInputs} />
            </div>

            {/* Right 7 Cols: Streamlined Real-time Overview */}
            <div className="lg:col-span-7 space-y-6">
              {/* Quick Budget Calculator Button */}
              <button
                type="button"
                onClick={() => setActiveSection('budget')}
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-4 rounded-xl shadow-xs flex items-center justify-between group transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/15 rounded-lg">
                    <PieChart className="w-5 h-5 text-emerald-200" />
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-bold">Monthly Budget &amp; Expense Calculator</div>
                    <div className="text-xs text-emerald-100 opacity-90">Plan housing, groceries, savings &amp; Swiss living costs</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg group-hover:bg-white/30 transition-colors shrink-0">
                  <span>Open Budget</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </button>

              <TaxBreakdownCard
                result={result}
                onNavigateToPayslip={() => setActiveSection('payslip')}
                onNavigateToCantons={() => setActiveSection('cantons')}
              />
            </div>
          </div>
        )}

        {/* Section: Budget Calculator */}
        {activeSection === 'budget' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <BudgetCalculator result={result} setActiveSection={setActiveSection} />
          </div>
        )}

        {/* Section: Payslip Dedicated */}
        {activeSection === 'payslip' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <PayslipView result={result} />
          </div>
        )}

        {/* Section: Canton Comparison */}
        {activeSection === 'cantons' && (
          <div className="space-y-6">
            <CantonComparison inputs={inputs} onSelectCanton={handleSelectCanton} />
          </div>
        )}



        {/* Section: Swiss Guide */}
        {activeSection === 'guide' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <SwissSalaryGuide />
          </div>
        )}

        {/* Bottom Contextual Insights Strip */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-200">
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
