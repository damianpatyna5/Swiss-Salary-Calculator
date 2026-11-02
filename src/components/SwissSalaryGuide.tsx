import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Building,
  Heart,
  Calendar,
  PiggyBank,
  ChevronDown,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { Link } from './Link';
import { AdPlacement } from './AdPlacement';

interface FaqItem {
  id: string;
  icon: React.ElementType;
  title: string;
  summary: string;
  content: string;
}

export const SwissSalaryGuide: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>('pillar-system');

  const faqs: FaqItem[] = [
    {
      id: 'pillar-system',
      icon: ShieldCheck,
      title: 'How does the Swiss 3-Pillar Pension System work?',
      summary: 'AHV (1st Pillar), BVG (2nd Pillar), and Private 3a (3rd Pillar).',
      content:
        'Switzerland has a three-pillar retirement and disability framework:\n' +
        '• 1st Pillar (AHV/IV/EO): State pension funded 50/50 by employee (5.3%) and employer (5.3%). Covers basic living costs.\n' +
        '• 2nd Pillar (BVG/LPP): Mandatory occupational pension fund for employees earning over CHF 22,050/yr. The coordinated wage is insured, with contribution rates increasing with age from 3.5% (age 25–34) up to 9.0% (age 55–65).\n' +
        '• 3rd Pillar (Säule 3a): Optional private tax-deductible pension savings (maximum deduction of CHF 7,056/year). Every franc contributed directly reduces your taxable income.',
    },
    {
      id: 'child-allowance',
      icon: Heart,
      title: 'How are Child Allowances (Familienzulagen) calculated?',
      summary: 'Statutory family support paid monthly directly with your salary.',
      content:
        'Under the Federal Family Allowances Act (FamZG), all employees in Switzerland are entitled to family allowances:\n' +
        '• Child Allowance (Kinderzulage): Federal minimum CHF 215/month per child up to age 16. Many cantons pay significantly more (e.g. Zug CHF 330, Valais CHF 305, Vaud CHF 310, Geneva CHF 315).\n' +
        '• Education Allowance (Ausbildungszulage): Federal minimum CHF 268/month for young adults aged 16–25 in vocational training or tertiary education (e.g. Valais CHF 477, Vaud CHF 425, Geneva CHF 415, Zug CHF 330).\n' +
        '• Who pays it? 100% funded by employers through the cantonal Family Compensation Fund (FAK) and disbursed directly on your monthly payslip.',
    },
    {
      id: 'church-tax',
      icon: Building,
      title: 'How does Church Tax (Kirchensteuer) work in Switzerland?',
      summary: 'Cantonal surcharges for recognized religious communities.',
      content:
        'Church tax in Switzerland is tied to your declared confession at your municipality of residence (Einwohnerkontrolle):\n' +
        '• Official recognized confessions: Roman Catholic, Evangelical Reformed, and Christian Catholic.\n' +
        '• How it is billed: Levied as a percentage surcharge on your cantonal state tax (typically 8% to 20% depending on canton and parish).\n' +
        '• Special exceptions: In the cantons of Geneva (GE) and Neuchâtel (NE), state and church are strictly separated—church tax is purely voluntary and never collected by tax authorities. In Canton Vaud (VD), pastoral expenses are funded through regular cantonal tax.\n' +
        '• Leaving the church (Kirchenaustritt): By officially deregistering with the parish in writing, you become exempt from church tax.',
    },
    {
      id: '13th-salary',
      icon: Calendar,
      title: 'What is the 13th Month Salary (13. Monatslohn)?',
      summary: 'Contractual base salary, paid in November or December.',
      content:
        'Many Swiss employment agreements specify an annual gross salary divided into 13 equal payments rather than 12. The 13th installment is typically disbursed in November or December.\n' +
        '• It is not a discretionary bonus: It is a contractual entitlement.\n' +
        '• Pro-rata calculation: If you leave the company or start mid-year, the 13th month is paid pro-rata based on months worked.',
    },
    {
      id: 'health-insurance',
      icon: PiggyBank,
      title: 'Why is Health Insurance (KVG) NOT deducted from my payslip?',
      summary: 'Switzerland operates an individual private health insurance mandate.',
      content:
        'Unlike Germany, France, or the UK, Swiss basic health insurance (Krankenkassen-Grundversicherung / KVG) is not a payroll deduction:\n' +
        '• Every resident is legally required to choose an independent health insurer (e.g. Swica, CSS, Helsana) and pay monthly premiums directly.\n' +
        '• Average adult premiums range from CHF 320 to CHF 480 per month depending on canton of residence and chosen deductible (Franchise between CHF 300 and CHF 2,500).\n' +
        '• That is why net salary from an employer is higher on paper, but health insurance premiums must be budgeted from take-home pay.',
    },
  ];

  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <header className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Educational Guide</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Complete Guide to Swiss Salaries, Taxes &amp; Payroll
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          Everything you need to understand gross vs. net earnings, statutory employee deductions, age-based occupational pension funds (BVG), cantonal tax variations, and monthly household expenses in Switzerland.
        </p>
      </header>

      {/* Core Guide Chapters */}
      <div className="space-y-6">
        {/* Chapter 1: Gross vs Net */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">1</span>
            Gross Salary vs. Net Take-Home Pay in Switzerland
          </h2>
          <p>
            When discussing a job offer in Switzerland, the compensation is almost always stated as an annual gross amount (<em>Jahresbruttolohn</em>). From this figure, your employer mandatorily withholds social insurance contributions.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 font-sans">Bruttolohn (Gross Salary)</div>
              <p className="text-slate-600 font-sans">Total contractual earnings before any statutory social deductions or tax withholding.</p>
            </div>
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <div className="font-bold text-slate-900 font-sans">Nettolohn (Net Salary)</div>
              <p className="text-slate-600 font-sans">Gross pay minus statutory social contributions (AHV/IV/EO, ALV, BVG, NBU, KTG) plus family allowances.</p>
            </div>
          </div>
        </section>

        {/* Chapter 2: The Three-Pillar System */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">2</span>
            The Swiss Three-Pillar Retirement Framework
          </h2>
          <p>
            The Swiss social security architecture rests on three pillars under Article 111 of the Federal Constitution:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-600">
            <li>
              <strong>1st Pillar (AHV / IV / EO):</strong> Universal state social security guaranteeing basic existential livelihood. Funded strictly 50/50 by employee (5.30%) and employer (5.30%). There is no upper salary cap.
            </li>
            <li>
              <strong>2nd Pillar (BVG / LPP):</strong> Occupational pension fund aimed at maintaining living standards in retirement (approx. 60% of pre-retirement income together with Pillar 1). Mandatory for all employees earning over CHF 22,050/year.
            </li>
            <li>
              <strong>3rd Pillar (Säule 3a / 3b):</strong> Voluntary private retirement savings. Pillar 3a contributions (up to CHF 7,056/year for affiliated employees) are fully tax-deductible on your annual tax declaration.
            </li>
          </ol>
        </section>

        {/* Chapter 3: Cantonal Tax Multipliers */}
        <section className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center text-xs font-bold">3</span>
            How Cantonal Tax Multipliers (Steuerfuss) Impact Take-Home Pay
          </h2>
          <p>
            Switzerland is a federal confederation of 26 sovereign cantons. Each canton exercises fiscal sovereignty to define its own progressive income tax rates, child deductions, and wealth tax scales.
          </p>
          <p>
            Furthermore, within each canton, municipalities levy their own municipal multiplier (<em>Gemeindesteuerfuss</em>). As a result, living in the Canton of Zug (ZG) or Schwyz (SZ) leaves an employee with substantially more net take-home pay than living in Neuchâtel (NE), Bern (BE), or Geneva (GE).
          </p>
          <div className="pt-2">
            <Link
              href="/compare-cantons/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 hover:text-red-700 underline"
            >
              <span>Explore the 26 Cantons Comparison Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>
      </div>

      {/* Interactive FAQ Accordion Block */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-8 space-y-5">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-red-600" />
            Frequently Asked Swiss Payroll &amp; Social Security Questions
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Detailed answers to common questions about Swiss employment compensation
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => {
            const isOpen = openItem === faq.id;
            const Icon = faq.icon;
            return (
              <div
                key={faq.id}
                className="border border-slate-200/80 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenItem(isOpen ? null : faq.id)}
                  className="w-full text-left px-4 py-3.5 flex items-center justify-between gap-3 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900">{faq.title}</h3>
                      <p className="text-[11px] text-slate-500">{faq.summary}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-red-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 py-3.5 bg-white border-t border-slate-100 text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                    {faq.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Deeper Methodology Callout */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold">Need exact statutory formulas and source links?</h3>
          <p className="text-xs text-slate-300 mt-1">
            Review our complete mathematical breakdown, legal references (AHVG, AVIG, BVG), and cross-border agreements.
          </p>
        </div>
        <Link
          href="/methodology/"
          className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl transition-colors shrink-0"
        >
          View Methodology →
        </Link>
      </div>

      <AdPlacement slot="7890123456" />
    </article>
  );
};
