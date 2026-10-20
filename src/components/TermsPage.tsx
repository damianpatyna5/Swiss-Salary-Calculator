import React from 'react';
import { FileText, Scale, AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

export const TermsPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
          <Scale className="w-3.5 h-3.5 text-slate-600" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Terms of Service (Nutzungsbedingungen)
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: January 2026 · Governed by Swiss Substantive Law (Schweizerisches Obligationenrecht).
        </p>
      </div>

      {/* Prominent Legal Disclaimer Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 text-xs text-amber-900">
        <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-sm text-amber-950">Informational Calculation &amp; Non-Binding Disclaimer</div>
          <p className="leading-relaxed">
            All calculations provided by LohnLab.ch are mathematically calibrated simulations for informational orientation. They do not constitute formal legal, tax, or pension advisory services. Official tax obligations are determined solely by your cantonal tax office (Kantonale Steuerverwaltung) through binding assessment notices (Veranlagungsverfügung).
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Scope &amp; Acceptance</h2>
          <p>
            By accessing or using LohnLab.ch, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services. We reserve the right to amend these terms at any time in accordance with applicable Swiss legislation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Nature of Service</h2>
          <p>
            LohnLab.ch offers a free, accessible suite of tools including Swiss gross-to-net salary estimation, cantonal tax comparison, payslip preview, and household budget calculations.
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>Calculations reflect published Swiss Federal Tax Administration (ESTV) circulars, standard cantonal multipliers, and statutory BVG rates.</li>
            <li>Specific municipal surcharges (Gemeindesteuerfüsse), church taxes, individual lump-sum deductions, or unique cantonal exceptions may cause individual tax declarations to differ from modeled results.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Intellectual Property Rights</h2>
          <p>
            The software, layout, styling, text, interactive calculator algorithms, and brand assets of LohnLab.ch are protected under Swiss and international copyright and intellectual property laws. You may utilize the calculators for personal and professional calculation purposes; unauthorized reproduction, scraping, or commercial resale of the website codebase is prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by Swiss law (Art. 100 OR):
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>LohnLab.ch is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranty of any kind, whether express or implied.</li>
            <li>We disclaim all liability for direct, indirect, incidental, or consequential damages resulting from decisions made based on calculated estimates (e.g., wage negotiations, relocation decisions, or tax filings).</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Governing Law &amp; Place of Jurisdiction</h2>
          <p>
            These terms are exclusively governed by Swiss substantive law, excluding the UN Convention on Contracts for the International Sale of Goods (CISG). The exclusive place of jurisdiction for all disputes arising in connection with these terms is Zurich, Switzerland.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">6. Inquiries</h2>
          <p>
            Questions regarding these Terms of Service should be directed to: <a href="mailto:legal@lohnlab.ch" className="text-red-600 underline font-semibold">legal@lohnlab.ch</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
