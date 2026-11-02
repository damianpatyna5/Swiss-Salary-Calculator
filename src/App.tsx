import React, { useState, useMemo } from 'react';
import { CalculatorInputs } from './types/calculator';
import { calculateSwissSalary } from './utils/calculator';
import { RouterProvider, useRouter } from './router';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Link } from './components/Link';
import { SalaryInputForm } from './components/SalaryInputForm';
import { PayslipView } from './components/PayslipView';
import { TaxBreakdownCard } from './components/TaxBreakdownCard';
import { CantonComparison } from './components/CantonComparison';
import { SwissSalaryGuide } from './components/SwissSalaryGuide';
import { SalaryCalculatorGuide } from './components/SalaryCalculatorGuide';
import { BudgetCalculator } from './components/BudgetCalculator';
import { MethodologyPage } from './components/MethodologyPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { NotFoundPage } from './components/NotFoundPage';
import { AdPlacement } from './components/AdPlacement';
import {
  Building2,
  CheckCircle,
  ArrowRight,
  PieChart,
  ArrowLeft,
  Sparkles,
  Calendar,
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
  residenceStatus: 'resident',
  crossBorder: {
    country: 'FR',
    commuteType: 'daily',
    hasFrenchTaxCertificate: true,
    franceHealthOption: 'lamal',
    teleworkPercent: 0,
    hasGermanGrenzgangerCert: true,
    italyRegime: 'new',
    isWithin20kmZone: true,
  },
};

function AppContent() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const { currentPath, navigate, is404 } = useRouter();

  const result = useMemo(() => calculateSwissSalary(inputs), [inputs]);

  const handleReset = () => {
    setInputs(DEFAULT_INPUTS);
  };

  const handleSelectCanton = (code: string) => {
    setInputs((prev) => ({ ...prev, cantonCode: code }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      {/* Header with semantic routing */}
      <Header onReset={handleReset} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Route 1: Homepage / Swiss Gross-to-Net Calculator */}
        {currentPath === '/' && (
          <div className="space-y-8">
            {/* Page Title & Context Header */}
            <header className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                <Calendar className="w-3.5 h-3.5" />
                <span>2025 / 2026 Swiss Payroll &amp; Tax Standards</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
                Swiss Gross-to-Net Salary Calculator
              </h1>
              <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
                Estimate your exact take-home pay, statutory social security contributions (AHV, IV, EO, ALV), age-based occupational pension fund deductions (BVG), and estimated income taxes across all 26 Swiss cantons.
              </p>
            </header>

            {/* Main Dual Column Calculator Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 5 Cols: Controls & Inputs */}
              <div className="lg:col-span-5 space-y-6">
                <SalaryInputForm inputs={inputs} onChange={setInputs} onReset={handleReset} />
              </div>

              {/* Right 7 Cols: Streamlined Real-time Overview */}
              <div className="lg:col-span-7 space-y-6">
                {/* Quick Budget Calculator Banner Link */}
                <Link
                  href="/budget/"
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white p-4 rounded-xl shadow-xs flex items-center justify-between group transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/15 rounded-lg">
                      <PieChart className="w-5 h-5 text-emerald-200" />
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-bold">Monthly Budget &amp; Expense Calculator</div>
                      <div className="text-xs text-emerald-100 opacity-90">
                        Plan housing, health insurance, groceries &amp; Swiss living costs
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg group-hover:bg-white/30 transition-colors shrink-0">
                    <span>Open Budget</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>

                <TaxBreakdownCard
                  result={result}
                  onNavigateToPayslip={() => navigate('/payslip/')}
                  onNavigateToCantons={() => navigate('/compare-cantons/')}
                />
              </div>
            </div>

            {/* Ad Placement Slot 1 */}
            <AdPlacement slot="1234567890" />

            {/* In-Page Deep Publisher Content & Worked Example */}
            <SalaryCalculatorGuide />

            {/* Bottom Contextual Insights Strip */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
              <div className="bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  Cantonal Tax Diversity
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Taxes in Switzerland vary by up to 2.5x between cantons. Low-tax cantons like Zug (ZG) or Schwyz (SZ) leave higher take-home pay, but living expenses and rents can be higher.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                  <CheckCircle className="w-4 h-4 text-red-600" />
                  Child Allowances (Familienzulagen)
                </div>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Child allowances (CHF 215 – 477/month) are funded 100% by employer compensation funds and added directly onto your monthly payslip.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Route 2: /budget/ */}
        {currentPath === '/budget/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <BudgetCalculator result={result} setActiveSection={(s) => navigate(s === 'calculator' ? '/' : `/${s}/`)} />
          </div>
        )}

        {/* Route 3: /payslip/ */}
        {currentPath === '/payslip/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs no-print"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <PayslipView result={result} />
          </div>
        )}

        {/* Route 4: /compare-cantons/ */}
        {currentPath === '/compare-cantons/' && (
          <div className="space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <CantonComparison inputs={inputs} onSelectCanton={handleSelectCanton} />
          </div>
        )}

        {/* Route 5: /guide/ */}
        {currentPath === '/guide/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <SwissSalaryGuide />
          </div>
        )}

        {/* Route 6: /methodology/ */}
        {currentPath === '/methodology/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <MethodologyPage />
          </div>
        )}

        {/* Route 7: /about/ */}
        {currentPath === '/about/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <AboutPage />
          </div>
        )}

        {/* Route 8: /contact/ */}
        {currentPath === '/contact/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <ContactPage />
          </div>
        )}

        {/* Route 9: /privacy/ */}
        {currentPath === '/privacy/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <PrivacyPage />
          </div>
        )}

        {/* Route 10: /terms/ */}
        {currentPath === '/terms/' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Salary Calculator</span>
            </Link>
            <TermsPage />
          </div>
        )}

        {/* 404 Unknown Route */}
        {is404 && <NotFoundPage />}
      </main>

      {/* Footer with semantic links */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
