import React from 'react';
import { ShieldCheck, Lock, EyeOff, Server, FileText, CheckCircle2, Cookie } from 'lucide-react';
import { Link } from './Link';

export const PrivacyPage: React.FC = () => {
  return (
    <article className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Privacy Policy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy Policy (Datenschutzerklärung)
        </h1>
        <p className="text-xs text-slate-500">
          Last Updated: February 2026 · In compliance with the Swiss Federal Act on Data Protection (revFADP / revDSG) and EU General Data Protection Regulation (GDPR).
        </p>
      </header>

      {/* Key Architectural Guarantees */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">Zero Financial Data Storage</h2>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Your gross salary, deductions, marital status, children, and budget items exist exclusively in your browser memory. We never transmit them to any backend database.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Cookie className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">Transparent AdSense Disclosure</h2>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            We use Google AdSense to fund site availability. Google uses cookies to display ads in accordance with EU/Swiss user consent policies.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-xs space-y-2">
          <div className="w-9 h-9 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
          <h2 className="text-xs font-bold text-slate-900">Client-Side Calculation Engine</h2>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            All tax, social security, and pension arithmetic runs locally on your device via client-side JavaScript.
          </p>
        </div>
      </div>

      {/* Detailed Legal Sections */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">1. Data Controller</h2>
          <p>
            The operator of LohnLab.ch acts as the data controller in accordance with Article 5 of the Swiss Federal Act on Data Protection (revDSG) and Article 4(7) of the GDPR. For privacy questions, you can contact us at{' '}
            <a href="mailto:contact@lohnlab.ch" className="text-red-600 underline font-mono">
              contact@lohnlab.ch
            </a>
            .
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">2. Calculator Inputs &amp; Personal Financial Data</h2>
          <p>
            When you enter your gross compensation, choose an age band, select a canton, or customize household expenses in our budget tool:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-600">
            <li>These values are processed entirely within the runtime memory of your web browser.</li>
            <li>No salary data is sent across the internet to our servers or stored in any remote database.</li>
            <li>If you refresh or close your browser tab, all session state is discarded immediately unless saved locally in your own browser&apos;s localStorage.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">3. Advertising &amp; Third-Party Cookies (Google AdSense)</h2>
          <p>
            LohnLab.ch uses Google AdSense (publisher client <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-800">ca-pub-8017910120366285</code>) to display advertisements on eligible content pages.
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
            <li>
              Third-party vendors, including Google, use cookies to serve ads based on a user&apos;s prior visits to this website or other websites on the internet.
            </li>
            <li>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.
            </li>
            <li>
              Users residing in the European Economic Area (EEA), United Kingdom, or Switzerland are presented with consent mechanisms to choose whether personalized or non-personalized ads are delivered.
            </li>
            <li>
              You may opt out of personalized advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 underline"
              >
                Google Ad Settings
              </a>{' '}
              or via{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-600 underline"
              >
                www.aboutads.info
              </a>
              .
            </li>
            <li>
              <strong>Advertising-Free Pages:</strong> In strict compliance with Google Publisher Policies, advertisements are completely disabled on informational, contact, and legal policy pages (including About, Contact, Privacy Policy, Terms of Service, and error pages).
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">4. Hosting &amp; Technical Server Logs</h2>
          <p>
            When accessing LohnLab.ch, the hosting infrastructure automatically records technical access log data. This includes IP address, date and time of request, browser user-agent, referring URL, and HTTP status code. These logs are processed strictly for website security, technical debugging, and DDoS defense, and are retained only for the duration required by operational security standards.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-slate-900">5. Your Legal Rights</h2>
          <p>
            Under the Swiss revDSG and GDPR, you have the right to request information regarding any personal data processed about you, as well as the right to rectification, erasure, or restriction of processing. Because we do not store personal profiles or salary figures, we do not possess data linking your calculations to your identity.
          </p>
          <p>
            For any inquiries, contact:{' '}
            <a href="mailto:contact@lohnlab.ch" className="text-red-600 underline font-mono">
              contact@lohnlab.ch
            </a>
          </p>
        </section>
      </div>
    </article>
  );
};
