import React from 'react';
import { Shield, Award, Users, Calculator, CheckCircle2, Landmark, HeartHandshake } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <Landmark className="w-3.5 h-3.5" />
          <span>About LohnLab.ch</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Demystifying Swiss Salaries, Social Security &amp; Taxes
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          LohnLab.ch was built to provide Swiss residents, cross-border professionals (Frontaliers / Grenzgänger), and expats with a transparent, accurate, and completely private gross-to-net salary and living-cost calculator.
        </p>
      </div>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">100% Client-Side Privacy</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your compensation and living costs are strictly confidential. All calculations execute directly in your browser. We never store, log, or transmit your financial profile.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">All 26 Cantons Modeled</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Switzerland’s federalist tax system is complex. We account for cantonal tax scales, municipal indices, church tax options, and cantonal child allowance variations.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Statutory Swiss Standards</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Built using statutory contribution rules for AHV/IV/EO (5.3%), ALV (1.1%), age-based BVG pension fund tiers (3.5%–9.0%), and Swiss Federal Statistical Office budget guidelines.
          </p>
        </div>
      </div>

      {/* Methodology Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Our Calculation Methodology</h2>
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
          <p>
            In Switzerland, transitioning from gross salary (Bruttolohn) to net salary (Nettolohn) requires multiple successive layers of social deductions and fiscal calculations:
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">1st Pillar Social Security (1. Säule):</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Mandatory contributions to AHV (Old Age &amp; Survivors Insurance), IV (Disability Insurance), and EO (Income Compensation) total 10.60%, split evenly between employee (5.30%) and employer (5.30%).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Unemployment Insurance (ALV):</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  1.10% employee contribution on gross salary up to the statutory cap of CHF 148,200/year.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Occupational Pension Fund (2. Säule - BVG/LPP):</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Applies to the coordinated salary (gross salary minus coordination deduction of CHF 25,725). Rates scale according to age: 3.5% (age 25–34), 5.0% (35–44), 7.5% (45–54), and 9.0% (55–65).
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200/70">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-900 font-semibold">Federal, Cantonal &amp; Municipal Taxes:</strong>
                <p className="text-xs text-slate-600 mt-0.5">
                  Switzerland taxes income across three jurisdictions: Federal Direct Tax (Direkte Bundessteuer), Cantonal Tax (Kantonssteuer), and Municipal Tax (Gemeindesteuer). Our simulation incorporates cantonal multipliers and marital status splitting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Community & Commitment */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 space-y-4">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-6 h-6 text-red-400" />
          <h2 className="text-lg font-bold">Independent &amp; Free Resource</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          LohnLab.ch is developed independently by software engineers and payroll enthusiasts based in Switzerland. Our goal is to ensure every worker in Switzerland has immediate, transparent access to their true take-home pay and budget realities without paywalls or registrations.
        </p>
      </div>
    </div>
  );
};
