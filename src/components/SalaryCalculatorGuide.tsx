import React from 'react';
import {
  FileText,
  Calculator,
  Shield,
  HelpCircle,
  Building2,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { Link } from './Link';
import { formatCHF } from '../utils/calculator';

export const SalaryCalculatorGuide: React.FC = () => {
  return (
    <section className="mt-12 space-y-10 border-t border-slate-200/80 pt-10 text-slate-800">
      {/* Overview Block */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Salary Guide &amp; Technical Reference</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          How the Swiss Gross-to-Net Salary Calculator Works
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          The LohnLab.ch salary calculator estimates your exact take-home pay in Switzerland for the <strong>2025/2026</strong> payroll period. It models statutory social security deductions (1st Pillar AHV/IV/EO and ALV), age-based occupational pension funds (2nd Pillar BVG), accident insurance (NBU), and progressive income tax estimates (Direct Federal, Cantonal, and Municipal) across all 26 Swiss cantons.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="font-bold text-slate-900 mb-1">Target Audience</div>
            <p className="text-slate-600">
              Swiss residents (citizens, Permit C, Permit B/L), cross-border workers (Frontaliers / Grenzgänger), expats negotiating compensation packages, and dual-income married couples.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="font-bold text-slate-900 mb-1">Applicable Period</div>
            <p className="text-slate-600">
              Updated for 2025 / 2026 statutory rates, including the modern ALV ceiling (CHF 148,200, no solidarity tax) and current BVG coordination parameters (CHF 25,725).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
            <div className="font-bold text-slate-900 mb-1">Calculation Scope</div>
            <p className="text-slate-600">
              Calculates net salary before and after estimated taxes. Clearly distinguishes mandatory employer withholdings from voluntary deductions.
            </p>
          </div>
        </div>
      </div>

      {/* Guide: Inputs and 12 vs 13 payments */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Understanding Calculator Inputs &amp; The 13th Salary (13. Monatslohn)
        </h3>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <p>
            In Switzerland, compensation is typically agreed upon as an <strong>annual gross salary (Jahresbruttolohn)</strong> in employment contracts. However, payroll distribution commonly follows one of two models:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">12-Month Payment Schedule</div>
              <p className="mt-1 text-slate-600 font-sans">
                Your annual salary is divided evenly by 12. Each month you receive exactly 1/12th of your total earnings (common in multinational firms, consulting, and startups).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <div className="font-bold text-slate-900 text-sm">13-Month Payment Schedule (13. Monatslohn)</div>
              <p className="mt-1 text-slate-600 font-sans">
                Your annual salary is divided by 13. You receive 1/13th from January through November, and a double salary (2/13th) in December. <em>Note:</em> The 13th salary is contracted base pay, not a variable performance bonus.
              </p>
            </div>
          </div>

          <p>
            Switching between 12 and 13 months in the calculator adjusts your standard monthly cash flow so you can budget realistically for regular months without relying on the December double payout.
          </p>
        </div>
      </div>

      {/* Step by Step Deduction Workflow */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <h3 className="text-lg font-bold text-slate-900">
          Step-by-Step: From Gross Salary to Net Take-Home Pay
        </h3>

        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 font-bold flex items-center justify-center shrink-0 text-xs">
              1
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Gross Salary (Bruttolohn)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                The total contractual compensation before any statutory employee deductions or taxes.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center shrink-0 text-xs">
              2
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Mandatory Social Deductions (Sozialabzüge)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Statutory deductions automatically deducted by the employer each month:
                <br />
                • <strong>AHV/IV/EO (5.30%):</strong> State retirement, disability, and income compensation (uncapped).
                <br />
                • <strong>ALV (1.10%):</strong> Unemployment insurance, capped at CHF 148,200/year.
                <br />
                • <strong>BVG / Pillar 2 (3.5% – 9.0%):</strong> Occupational pension contributions based on age tier applied to coordinated salary.
                <br />
                • <strong>NBU (~1.2%):</strong> Non-occupational accident insurance.
                <br />
                • <strong>KTG (~0.8%):</strong> Collective sickness daily allowance.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-xs">
              3
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Net Salary Before Taxes (Nettolohn vor Steuern)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Gross salary minus mandatory social deductions plus any cantonal child or education allowances (Familienzulagen). For Swiss citizens and C-permit holders, this is the amount paid directly into your Swiss bank account.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold flex items-center justify-center shrink-0 text-xs">
              4
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Income Taxes (Federal, Cantonal, Municipal)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Estimated income tax liability based on your canton, marital status, children, and church affiliation. See below for the critical distinction between withholding tax and ordinary tax assessment.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center shrink-0 text-xs">
              5
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Net Take-Home Pay (Reines Nettoeinkommen)</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Your true disposable financial resources remaining after fulfilling both social contributions and income taxes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Planning Deduction vs Withholding Tax */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-red-600">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Withholding Tax (Quellensteuer) vs. Ordinary Assessment (Ordentliche Veranlagung)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          One of the most confusing aspects of Swiss compensation is how taxes are paid:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 font-sans text-sm">
              Withholding Tax (Quellensteuer)
            </div>
            <p className="text-slate-600 font-sans leading-relaxed">
              <strong>Who it applies to:</strong> Foreign nationals on B-Permit or L-Permit, and cross-border workers (Permit G) in non-exempt cantons.
              <br /><br />
              <strong>How it works:</strong> The employer is legally required to deduct taxes directly from your gross pay each month. Your bank transfer reflects net take-home <em>after</em> tax.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="font-bold text-slate-900 font-sans text-sm">
              Ordinary Assessment (Ordentliche Veranlagung)
            </div>
            <p className="text-slate-600 font-sans leading-relaxed">
              <strong>Who it applies to:</strong> Swiss citizens, C-Permit permanent residents, and B-Permit holders earning over CHF 120,000/year who submit a tax declaration.
              <br /><br />
              <strong>How it works:</strong> Your employer transfers the net salary before taxes. You receive provisional tax bills throughout the year and file an annual tax return (<em>Steuererklärung</em>). The tax displayed in LohnLab.ch is a <strong>planning deduction</strong> to help you reserve funds.
            </p>
          </div>
        </div>
      </div>

      {/* Worked Example Derived Directly From Engine */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Real Worked Example: CHF 80,000 in Canton Zurich (ZH)
          </h3>
          <span className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 font-mono rounded-md">
            Profile: Single, Age 32, No Children, 12 Months
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          To illustrate how each formula operates in practice, here is the exact breakdown for an employee earning <strong>CHF 80,000.00 gross per year</strong> (CHF 6,666.67/month) living in Zurich (ZH):
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden font-mono">
            <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Position</th>
                <th className="py-2.5 px-3">Calculation Formula / Rate</th>
                <th className="py-2.5 px-3 text-right">Annual (CHF)</th>
                <th className="py-2.5 px-3 text-right">Monthly (CHF)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="bg-slate-50/50 font-bold">
                <td className="py-2 px-3">Gross Salary</td>
                <td className="py-2 px-3">Contractual gross base</td>
                <td className="py-2 px-3 text-right">80,000.00</td>
                <td className="py-2 px-3 text-right">6,666.67</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− AHV / IV / EO</td>
                <td className="py-2 px-3">5.30% of CHF 80,000</td>
                <td className="py-2 px-3 text-right text-red-600">−4,240.00</td>
                <td className="py-2 px-3 text-right text-red-600">−353.33</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− ALV (Unemployment)</td>
                <td className="py-2 px-3">1.10% of CHF 80,000</td>
                <td className="py-2 px-3 text-right text-red-600">−880.00</td>
                <td className="py-2 px-3 text-right text-red-600">−73.33</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− BVG / LPP Pension</td>
                <td className="py-2 px-3">3.5% of coord. salary (CHF 54,275)</td>
                <td className="py-2 px-3 text-right text-red-600">−1,899.63</td>
                <td className="py-2 px-3 text-right text-red-600">−158.30</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− NBU (Accident)</td>
                <td className="py-2 px-3">1.20% of CHF 80,000</td>
                <td className="py-2 px-3 text-right text-red-600">−960.00</td>
                <td className="py-2 px-3 text-right text-red-600">−80.00</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− KTG (Sickness)</td>
                <td className="py-2 px-3">0.80% of CHF 80,000</td>
                <td className="py-2 px-3 text-right text-red-600">−640.00</td>
                <td className="py-2 px-3 text-right text-red-600">−53.33</td>
              </tr>
              <tr className="bg-slate-50/70 font-semibold text-slate-900">
                <td className="py-2.5 px-3">Total Social Deductions</td>
                <td className="py-2.5 px-3">10.77% effective deduction</td>
                <td className="py-2.5 px-3 text-right text-red-600">−8,619.63</td>
                <td className="py-2.5 px-3 text-right text-red-600">−718.30</td>
              </tr>
              <tr className="bg-blue-50/50 font-bold text-blue-950">
                <td className="py-2.5 px-3">Net Salary Before Taxes</td>
                <td className="py-2.5 px-3">Gross minus social security</td>
                <td className="py-2.5 px-3 text-right">71,380.37</td>
                <td className="py-2.5 px-3 text-right">5,948.36</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− Federal Direct Tax</td>
                <td className="py-2 px-3">LIFD Single Tariff (taxable: CHF 66,380)</td>
                <td className="py-2 px-3 text-right text-red-600">−891.96</td>
                <td className="py-2 px-3 text-right text-red-600">−74.33</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− Cantonal Tax (ZH)</td>
                <td className="py-2 px-3">52% share of cantonal/communal scale</td>
                <td className="py-2 px-3 text-right text-red-600">−3,331.52</td>
                <td className="py-2 px-3 text-right text-red-600">−277.63</td>
              </tr>
              <tr>
                <td className="py-2 px-3 pl-6">− Municipal Tax (ZH)</td>
                <td className="py-2 px-3">48% share of cantonal/communal scale</td>
                <td className="py-2 px-3 text-right text-red-600">−3,075.25</td>
                <td className="py-2 px-3 text-right text-red-600">−256.27</td>
              </tr>
              <tr className="bg-emerald-50 font-bold text-emerald-950">
                <td className="py-3 px-3">Final Net Take-Home Pay</td>
                <td className="py-3 px-3">80.1% Net Retention Rate</td>
                <td className="py-3 px-3 text-right text-emerald-800 text-sm">CHF 64,081.64</td>
                <td className="py-3 px-3 text-right text-emerald-800 text-sm">CHF 5,340.14</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Actual Payslips May Differ */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-lg font-bold text-slate-900">
          Why Your Actual Employer Payslip May Differ
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          While LohnLab.ch uses official statutory scales, individual employer contracts can vary in specific ways:
        </p>
        <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Company Pension Plan (Pensionskassen-Reglement):</strong> Many Swiss employers offer plans with better terms than the statutory BVG minimum (e.g. paying 60% of the premium instead of 50%, or waiving the coordination deduction for higher savings).
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Communal Tax Multipliers (Steuerfuss):</strong> Moving between municipalities in the same canton (e.g. city of Zurich at 119% vs. Kilchberg at 72%) changes your municipal tax significantly.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-600 font-bold">•</span>
            <span>
              <strong>Individual Tax Deductions:</strong> Actual tax assessments account for your personal third pillar (3a) contributions, health insurance cost ceilings, and commute distances.
            </span>
          </li>
        </ul>
      </div>

      {/* Frequently Asked Questions */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-red-600" />
          <h3 className="text-lg font-bold text-slate-900">Frequently Asked Questions</h3>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-slate-700 divide-y divide-slate-100">
          <div className="pt-3 first:pt-0 space-y-1.5">
            <h4 className="font-bold text-slate-900">Is mandatory health insurance (KVG / LAMal) deducted from payroll?</h4>
            <p className="text-slate-600 leading-relaxed">
              No. In Switzerland, basic health insurance is personal, not employer-sponsored. You contract directly with an authorized health insurer (e.g. Helsana, Swica, CSS) and pay the monthly premium directly out of your net take-home pay. You can use our <Link href="/budget/" className="text-red-600 underline font-medium">Budget Calculator</Link> to budget for these monthly premiums.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">What is the coordination deduction in the 2nd Pillar?</h4>
            <p className="text-slate-600 leading-relaxed">
              The coordination deduction (CHF 25,725) is subtracted from your gross salary to determine your &quot;coordinated salary&quot; insured under BVG. Because the 1st Pillar (AHV) already insures base income, the coordination deduction prevents paying duplicate social security contributions on the same initial slice of income.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">Are child allowances tax-free in Switzerland?</h4>
            <p className="text-slate-600 leading-relaxed">
              No. Cantonal child allowances (Kinderzulagen) and education allowances (Ausbildungszulagen) are treated as taxable earned income under Swiss federal and cantonal tax law. However, parents benefit from generous child tax deductions (Kinderabzug) on their tax declarations to offset this.
            </p>
          </div>

          <div className="pt-3 space-y-1.5">
            <h4 className="font-bold text-slate-900">Where can I see the full mathematical formulas?</h4>
            <p className="text-slate-600 leading-relaxed">
              You can review the full formulas, statutory citations, and cross-border agreements in our <Link href="/methodology/" className="text-red-600 underline font-medium">Methodology &amp; Sources documentation</Link>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
