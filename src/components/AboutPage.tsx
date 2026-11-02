import React from 'react';
import { Shield, Calculator, Award, Landmark, HelpCircle, Mail, ExternalLink } from 'lucide-react';
import { Link } from './Link';

export const AboutPage: React.FC = () => {
  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Hero Header */}
      <header className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <Landmark className="w-3.5 h-3.5" />
          <span>Independent Resource</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          About LohnLab.ch
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
          LohnLab.ch is an independent Swiss digital calculator designed to make Swiss payroll deductions, federal and cantonal income taxes, and household living costs transparent, easy to simulate, and simple to understand.
        </p>
      </header>

      {/* Core Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Client-Side Privacy</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your personal salary and household finances are private. All calculations occur inside your browser&apos;s local memory without transmitting figures to remote databases.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Calculator className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">All 26 Cantons Modeled</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Switzerland&apos;s fiscal federalism means taxes and allowances differ widely. We provide side-by-side comparisons using empirical cantonal indices and benchmark multipliers.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900">Statutory Rules (2025/2026)</h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Formulas adhere to statutory guidelines from the Federal Social Insurance Office (BSV) and Federal Tax Administration (ESTV), including current BVG age bands and ALV caps.
          </p>
        </div>
      </div>

      {/* Purpose and Editorial Scope */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-5 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <h2 className="text-lg font-bold text-slate-900">Why LohnLab.ch Was Built</h2>
        <p>
          Navigating the Swiss compensation system can be daunting. Between the three-pillar pension system (AHV, BVG, Säule 3a), varying municipal tax multipliers (<em>Steuerfuss</em>), the 13th month salary tradition, and special bilateral cross-border agreements (e.g. French 1983 accord, German Grenzgänger, Italian 2024 treaty), gross salary numbers rarely tell the whole story.
        </p>
        <p>
          LohnLab.ch was built to bridge this gap: providing an accessible, fast, and completely free planning simulation for:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
          <li>Job seekers comparing salary offers across different cantons.</li>
          <li>Cross-border commuters evaluating French, German, or Italian taxation regimes.</li>
          <li>New residents moving to Switzerland planning their real monthly disposable budget.</li>
          <li>Dual-income married couples understanding the joint tax bracket impact (<em>Heiratsstrafe</em>).</li>
        </ul>

        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            For technical details on how our numbers are calculated, see our methodology documentation.
          </p>
          <Link
            href="/methodology/"
            className="text-xs font-semibold text-red-600 hover:text-red-700 underline flex items-center gap-1 shrink-0"
          >
            <span>Read Calculation Methodology</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Direct Contact Card */}
      <div className="bg-slate-100/70 rounded-2xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div>
          <div className="font-bold text-slate-900 flex items-center gap-2">
            <Mail className="w-4 h-4 text-slate-600" />
            <span>Questions, Feedback or Rate Inquiries</span>
          </div>
          <p className="text-slate-600 mt-1">
            Send an email to <span className="font-mono font-semibold text-slate-900">contact@lohnlab.ch</span>.
          </p>
        </div>
        <Link
          href="/contact/"
          className="px-4 py-2 bg-white border border-slate-300 text-slate-800 hover:bg-slate-50 rounded-xl font-semibold transition-colors shrink-0 shadow-xs"
        >
          Contact Details →
        </Link>
      </div>
    </article>
  );
};
