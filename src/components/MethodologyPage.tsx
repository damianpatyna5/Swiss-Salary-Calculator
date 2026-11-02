import React from 'react';
import {
  FileText,
  Calculator,
  ShieldCheck,
  Building2,
  Globe,
  ExternalLink,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Layers,
  Percent,
} from 'lucide-react';
import { Link } from './Link';
import { AdPlacement } from './AdPlacement';

export const MethodologyPage: React.FC = () => {
  return (
    <article className="space-y-10 max-w-4xl mx-auto">
      {/* Hero Header */}
      <header className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <FileText className="w-3.5 h-3.5" />
          <span>Calculation Documentation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Calculation Methodology, Statutory Rates &amp; Sources
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Complete technical transparency on how LohnLab.ch calculates Swiss net pay, social security contributions, occupational pensions, and estimated income taxes across all 26 Swiss cantons for the <strong>2025/2026</strong> tax and payroll periods.
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500 border-t border-slate-100 font-mono">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            Tax &amp; Social Period: 2025 / 2026
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Statutory Rates Verified (BSV &amp; ESTV)
          </span>
          <span>·</span>
          <span>Model Version: 3.2.0</span>
        </div>
      </header>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="text-xs font-bold text-red-600 uppercase tracking-wider">
            1st Pillar (AHV/IV/EO)
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">5.30%</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Statutory employee deduction. Uncapped across entire gross salary. Matched 5.30% by employer (total 10.60%).
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-wider">
            Unemployment (ALV)
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">1.10%</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Capped at CHF 148,200/year. Solidarity surtax above cap was legally abolished as of Jan 1, 2023.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
            2nd Pillar (BVG / LPP)
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">3.5% – 9.0%</div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Age-dependent employee share on coordinated salary (CHF 3,675 – CHF 62,475) after CHF 25,725 coordination deduction.
          </p>
        </div>
      </div>

      {/* Primary Content Sections */}
      <div className="space-y-8 bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs">
        {/* Section 1: 1st Pillar AHV/IV/EO */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold">1</span>
            1st Pillar: Swiss State Social Security (AHV / IV / EO)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            All individuals gainfully employed in Switzerland are subject to mandatory contributions to the 1st Pillar, which secures basic old-age pensions, disability support, and loss of income compensation (military service, maternity, paternity).
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden font-mono">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Statutory Branch</th>
                  <th className="py-2.5 px-3">Legal Basis</th>
                  <th className="py-2.5 px-3">Employee Rate</th>
                  <th className="py-2.5 px-3">Employer Share</th>
                  <th className="py-2.5 px-3">Income Ceiling</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">AHV / AVS (Old Age &amp; Survivors)</td>
                  <td className="py-2.5 px-3">AHVG / LAVS Art. 5</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">4.35%</td>
                  <td className="py-2.5 px-3">4.35%</td>
                  <td className="py-2.5 px-3">None (uncapped)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">IV / AI (Disability Insurance)</td>
                  <td className="py-2.5 px-3">IVG / LAI Art. 3</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">0.70%</td>
                  <td className="py-2.5 px-3">0.70%</td>
                  <td className="py-2.5 px-3">None (uncapped)</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">EO / APG (Income Compensation)</td>
                  <td className="py-2.5 px-3">EOG / LAPG Art. 27</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">0.25%</td>
                  <td className="py-2.5 px-3">0.25%</td>
                  <td className="py-2.5 px-3">None (uncapped)</td>
                </tr>
                <tr className="bg-slate-50/80 font-bold text-slate-900">
                  <td className="py-2.5 px-3">Total 1st Pillar Deduction</td>
                  <td className="py-2.5 px-3">Federal BSV Rate</td>
                  <td className="py-2.5 px-3 text-red-600">5.30%</td>
                  <td className="py-2.5 px-3 text-red-600">5.30%</td>
                  <td className="py-2.5 px-3">No Upper Cap</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Source: <a href="https://www.bsv.admin.ch" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">Federal Social Insurance Office (BSV / OFAS)</a>.
          </p>
        </section>

        {/* Section 2: ALV Unemployment */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
            Unemployment Insurance (ALV / AC)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Unemployment contributions are regulated under the Unemployment Insurance Act (AVIG / LACI).
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="flex justify-between items-center py-1 border-b border-slate-200 font-mono">
              <span>Standard Contribution Rate (Employee)</span>
              <span className="font-bold text-slate-900">1.10%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200 font-mono">
              <span>Standard Contribution Rate (Employer)</span>
              <span className="font-bold text-slate-900">1.10%</span>
            </div>
            <div className="flex justify-between items-center py-1 border-b border-slate-200 font-mono">
              <span>Statutory Annual Ceiling (UVG / ALV Maximum)</span>
              <span className="font-bold text-slate-900">CHF 148,200</span>
            </div>
            <div className="flex justify-between items-center py-1 font-mono">
              <span>Solidarity Surcharge above CHF 148,200</span>
              <span className="font-bold text-emerald-700">0.00% (Abolished since Jan 1, 2023)</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Note: On salaries exceeding CHF 148,200/year, ALV deductions stop completely once the CHF 148,200 ceiling is reached (maximum employee contribution is CHF 1,630.20 per year).
          </p>
        </section>

        {/* Section 3: BVG Occupational Pension */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">3</span>
            2nd Pillar: Occupational Pension (BVG / LPP)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            The Federal Act on Occupational Old Age, Survivors&apos; and Invalidity Pension (BVG) mandates employer and employee savings credits for employees aged 18 to standard retirement age earning above the entry threshold.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-[11px]">BVG Entry Threshold (Eintrittsschwelle)</div>
              <div className="text-base font-bold text-slate-900 mt-1">CHF 22,050 / year</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Employees earning less are exempt from mandatory Pillar 2</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-[11px]">Coordination Deduction (Koordinationsabzug)</div>
              <div className="text-base font-bold text-slate-900 mt-1">CHF 25,725 / year</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Deducted from gross salary to avoid double-insuring 1st Pillar</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-[11px]">Maximum Coordinated Salary</div>
              <div className="text-base font-bold text-slate-900 mt-1">CHF 62,475 / year</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Upper statutory limit for mandatory BVG savings</div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <div className="text-slate-500 text-[11px]">Minimum Coordinated Salary</div>
              <div className="text-base font-bold text-slate-900 mt-1">CHF 3,675 / year</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Guaranteed minimum insured amount for small salaries</div>
            </div>
          </div>

          <h3 className="text-sm font-bold text-slate-900 mt-4">Statutory BVG Savings Credits by Age (Art. 16 BVG)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden font-mono">
              <thead className="bg-slate-50 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Age Group</th>
                  <th className="py-2.5 px-3">Total Legal Savings Credit</th>
                  <th className="py-2.5 px-3">Statutory Employee Share</th>
                  <th className="py-2.5 px-3">Minimum Employer Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-600">
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ages 18–24</td>
                  <td className="py-2.5 px-3">Risk insurance only (no savings)</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">~0.70% (model avg)</td>
                  <td className="py-2.5 px-3">50% minimum</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ages 25–34</td>
                  <td className="py-2.5 px-3">7.00%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">3.50%</td>
                  <td className="py-2.5 px-3">3.50%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ages 35–44</td>
                  <td className="py-2.5 px-3">10.00%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">5.00%</td>
                  <td className="py-2.5 px-3">5.00%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ages 45–54</td>
                  <td className="py-2.5 px-3">15.00%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">7.50%</td>
                  <td className="py-2.5 px-3">7.50%</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">Ages 55–65</td>
                  <td className="py-2.5 px-3">18.00%</td>
                  <td className="py-2.5 px-3 font-bold text-slate-900">9.00%</td>
                  <td className="py-2.5 px-3">9.00%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Plan Variability Limitation:</span> The figures above represent the <em>statutory minimum</em> (BVG-Obligatorium). Many Swiss employers maintain non-statutory or enveloping pension plans (<em>umhüllende Vorsorgekassen</em>) that waive or reduce the coordination deduction, insure salaries up to higher limits (e.g., CHF 150k+), or contribute 60%–70% of the cost. Check your individual pension certificate (<em>Pensionskassenausweis</em>) for your exact company rate.
          </div>
        </section>

        {/* Section 4: NBU & KTG */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">4</span>
            Accident Insurance (UVG / NBU) &amp; Sickness Daily Allowance (KTG)
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              <strong>Non-Occupational Accident Insurance (NBU / AANP):</strong> Employees working more than 8 hours per week are mandatorily insured for non-occupational accidents under the Federal Accident Insurance Act (UVG / LAA). Premium rates vary between 1.0% and 2.5% depending on employer safety classification and SUVA industry risk pools. LohnLab.ch uses an empirical baseline of <strong>1.2%</strong> (customizable in advanced settings).
            </p>
            <p>
              <strong>Daily Sickness Benefit (KTG / IJM):</strong> While not federally mandatory, most Swiss collective bargaining agreements (GAV / CCT) and employment contracts require daily sickness indemnity insurance guaranteeing 80% pay for up to 730 days. Premiums (typically 1.0% – 2.0%) are commonly split 50/50 between employer and employee. LohnLab.ch models a standard employee share of <strong>0.8%</strong>.
            </p>
          </div>
        </section>

        {/* Section 5: Family Allowances */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-pink-100 text-pink-700 flex items-center justify-center text-xs font-bold">5</span>
            Cantonal Family Allowances (Familienzulagen / Allocations familiales)
          </h2>
          <p className="text-sm text-slate-700 leading-relaxed">
            Under the Federal Family Allowances Act (FamZG / LAFam), cantons set minimum cash benefits paid to employees for dependent children. These are funded 100% by employer contributions and added onto the employee&apos;s monthly net pay.
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 space-y-2">
            <p>
              <strong>Child Allowance (Kinderzulage, age 0–16):</strong> Federal floor is CHF 215/month (standard in ZH, AG, BE, etc.). Higher in Geneva (CHF 315/mo), Valais (CHF 305/mo), and Vaud (CHF 310/mo).
            </p>
            <p>
              <strong>Education Allowance (Ausbildungszulage, age 16–25):</strong> Federal floor is CHF 268/month. Ranging up to CHF 420–477/month in French-speaking cantons (e.g. GE, VS, VD).
            </p>
          </div>
        </section>

        {/* Section 6: Tax Estimation Engine */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-bold">6</span>
            Income Tax Estimation Engine (Federal, Cantonal, Municipal)
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Switzerland levies income tax at three distinct government tiers:
            </p>
            <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-700">
              <li>
                <strong>Direct Federal Tax (Direkte Bundessteuer):</strong> Strictly uniform nationwide progressive tariff based on the Federal Direct Tax Act (DBG / LIFD). We model separate statutory scales for single filers (Tarif I) and married filers (Tarif II), including the standard federal professional deduction (CHF 3,200), insurance deduction (CHF 1,800 single / CHF 3,600 married), and child deductions (CHF 6,700/child).
              </li>
              <li>
                <strong>Cantonal Tax (Kantonssteuer):</strong> Each of the 26 cantons applies its own basic tax rate curve (<em>einfache Staatssteuer</em>) multiplied by the annual cantonal tax multiplier (<em>Kantonssteuerfuss</em>).
              </li>
              <li>
                <strong>Municipal Tax (Gemeindesteuer):</strong> Levied by each of the ~2,130 Swiss communes as a percentage multiplier of the cantonal base tax.
              </li>
              <li>
                <strong>Church Tax (Kirchensteuer):</strong> Optional levy for members of recognized state churches (approx. 0.3% – 1.8% of taxable income depending on canton and denomination).
              </li>
            </ol>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
              <strong>Modeling Note:</strong> Because each canton has dozens of distinct municipal tax rates, LohnLab.ch benchmarks the cantonal index and reference communal multiplier of the main economic center / cantonal weighted average. Actual tax due in small rural communes vs. urban centers can vary by ±1% to 2.5% of net salary.
            </div>
          </div>
        </section>

        {/* Section 7: Cross-Border Treaty Rules */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">7</span>
            Cross-Border Workers (Frontaliers / Grenzgänger)
          </h2>
          <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
            <p>
              Cross-border workers commuting from France, Germany, Italy, or Austria are governed by specific bilateral double-taxation agreements (DBA):
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">France (1983 Accord - 8 Cantons)</div>
                <p className="text-slate-600">
                  Cantons BE, BL, BS, JU, NE, SO, VD, VS: Salaried workers resident in France with form 2041-AS are taxed in France. Switzerland levies 0% withholding and receives a 4.5% fiscal compensation transfer from France.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">France (Geneva 1973 Agreement)</div>
                <p className="text-slate-600">
                  Canton Geneva (GE) taxes cross-border employees directly at source (Barème d&apos;impôt à la source), returning 3.5% of gross payroll to French border departments.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">Germany (Art. 15a DBA DE-CH)</div>
                <p className="text-slate-600">
                  With German Grenzgänger certificate (Formular Gre-1), Switzerland retains max 4.5% withholding tax. Germany assesses regular German income tax and credits the 4.5% paid in Switzerland.
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900">Italy (2024 New Accord)</div>
                <p className="text-slate-600">
                  &quot;New&quot; cross-border workers within 20km zone are taxed up to 80% of standard Swiss withholding tax, with residual taxation in Italy (with a EUR 10,000 tax-free exemption and credit for Swiss tax).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 8: Limitations & Scope */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span className="w-6 h-6 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">8</span>
            Explicit Limitations &amp; Scope of Calculations
          </h2>
          <div className="bg-amber-50/70 p-5 rounded-xl border border-amber-200 space-y-2.5 text-xs sm:text-sm text-amber-950">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Planning Estimation Only:</strong> All outputs generated by LohnLab.ch are mathematical simulations designed for career planning, relocations, and household budgeting. They do not constitute official tax advice, an employer payroll statement, or an official tax decree (<em>Steuerveranlagung</em>).
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Not Modeled:</strong> Wealth tax (<em>Vermögenssteuer</em>), capital gains, individual Pillar 3a tax deductions, voluntary pension buy-ins (<em>Einkauf in die Pensionskasse</em>), real-estate ownership imputed rental value (<em>Eigenmietwert</em>), or specialized debt deductions.
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                <strong>Official Resources:</strong> For binding official tax simulations, refer to the Federal Tax Administration&apos;s <a href="https://swisstaxcalculator.estv.admin.ch" target="_blank" rel="noopener noreferrer" className="underline font-semibold">ESTV Swiss Tax Calculator</a> or your cantonal tax office (<em>Kantonales Steueramt</em>).
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Navigation action */}
      <div className="flex items-center justify-between p-6 bg-slate-900 text-white rounded-2xl">
        <div>
          <h3 className="text-base font-bold">Ready to simulate your Swiss compensation?</h3>
          <p className="text-xs text-slate-300 mt-1">Apply these exact formulas to your canton, salary, and household profile.</p>
        </div>
        <Link
          href="/"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          Open Salary Calculator →
        </Link>
      </div>

      <AdPlacement slot="3456789012" />
    </article>
  );
};
