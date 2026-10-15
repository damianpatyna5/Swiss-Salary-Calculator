import React, { useState } from 'react';
import {
  HelpCircle,
  ShieldCheck,
  Building,
  Heart,
  Calendar,
  PiggyBank,
  ChevronDown,
} from 'lucide-react';

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
        '• Child Allowance (Kinderzulage): Federal minimum CHF 215/month per child up to age 16 (raised from CHF 200). Many cantons pay significantly more (e.g. Zug CHF 330, Valais CHF 327, Vaud CHF 322, Geneva CHF 311, Basel-Stadt & Jura CHF 275, Fribourg CHF 265, Nidwalden CHF 258, Bern CHF 250, St. Gallen & Appenzell IR CHF 245).\n' +
        '• Education Allowance (Ausbildungszulage): Federal minimum CHF 268/month for young adults aged 16–25 in vocational training or tertiary education (e.g. Valais CHF 477, Vaud CHF 425, Geneva CHF 415, Zug CHF 330, Basel-Stadt & Jura CHF 325, Fribourg CHF 325, Neuchâtel CHF 320, Nidwalden CHF 311, Bern CHF 310).\n' +
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
      summary: 'Standard practice in Swiss contracts, paid in November or December.',
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
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-5">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <HelpCircle className="w-4 h-4" />
            </div>
            Swiss Salary &amp; Tax Guide (Wissenswertes)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Key rules of Swiss payroll, social security, family allowances, and taxes
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = openItem === faq.id;
          const Icon = faq.icon;
          return (
            <div
              key={faq.id}
              className="border border-slate-200/80 rounded-lg overflow-hidden transition-colors"
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
    </div>
  );
};
