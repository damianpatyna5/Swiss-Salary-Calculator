import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Swiss Data Protection Compliant (revDSG)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy (Datenschutzerklärung)
        </h1>
        <p className="text-xs text-slate-500">
          Effective Date: January 1, 2026 · Complies with the Swiss Federal Act on Data Protection (revFADP / DSG) and EU GDPR.
        </p>
      </div>

      {/* Key Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Zero Salary Data Collection</h3>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Your gross pay, marital status, and budget allocations remain exclusively in browser memory. We never transmit them to any database.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">No Tracking Pixels</h3>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We do not sell advertising profiles, embed behavioral trackers, or monetize your financial calculations.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <h3 className="text-xs font-bold text-slate-900">Local Client Computing</h3>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All arithmetic, social security formulas, and tax calculations run natively via client JavaScript.
          </p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Data Controller Overview</h2>
          <p>
            The operator of LohnLab.ch acts as the data controller in accordance with Article 5 of the Swiss Federal Act on Data Protection (revDSG):
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs font-mono text-slate-700 space-y-0.5">
            <div>LohnLab.ch — Swiss Salary &amp; Budget Technologies</div>
            <div>Bahnhofstrasse 100, CH-8001 Zürich, Switzerland</div>
            <div>Email: privacy@lohnlab.ch</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Processing of Financial &amp; Salary Inputs</h2>
          <p>
            When utilizing our salary calculator, canton comparison, or budget tools:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
            <li>Any entered numerical values (e.g. gross wages, pension age, children, spouse earnings, living expenses) are stored exclusively in ephemeral local browser memory (React state).</li>
            <li>No personal financial data is stored on our servers, transmitted via cookies, or logged into external databases.</li>
            <li>Closing or refreshing your browser tab clears any active session values.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Technical Server Log Files</h2>
          <p>
            When accessing our web services, your browser automatically transmits technical metadata necessary to deliver web assets securely:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-slate-600">
            <li>Browser type and version</li>
            <li>Operating system used</li>
            <li>Referrer URL (previously visited page)</li>
            <li>Host name of the accessing device (IP address in truncated/anonymized form)</li>
            <li>Date and time of server inquiry</li>
          </ul>
          <p className="text-xs text-slate-500 pt-1">
            This technical data is processed pursuant to legitimate interest under Swiss revDSG for maintaining web availability, preventing DDoS attacks, and resolving technical crashes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Contact Inquiries</h2>
          <p>
            If you transmit a message via our Contact form, your submitted name, email address, and message contents are processed solely to evaluate and respond to your inquiry. We never share these details with third parties or use them for unsolicited promotional emails.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Your Statutory Rights</h2>
          <p>
            Under Swiss data protection laws (revDSG Art. 25–29) and applicable European GDPR provisions, you have the right to request confirmation as to whether data concerning you is processed, to obtain information about such data, and to request correction or deletion where applicable.
          </p>
          <p>
            For any privacy inquiries or rights requests, contact us at: <a href="mailto:privacy@lohnlab.ch" className="text-red-600 underline font-semibold">privacy@lohnlab.ch</a>.
          </p>
        </section>
      </div>
    </div>
  );
};
