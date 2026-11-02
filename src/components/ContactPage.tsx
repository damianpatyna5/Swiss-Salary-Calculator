import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, HelpCircle, MessageSquare } from 'lucide-react';
import { Link } from './Link';

export const ContactPage: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const email = 'contact@lohnlab.ch';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const subjectOptions = [
    { label: 'Cantonal Tax & Rate Feedback', subject: 'Rate feedback for Canton: ' },
    { label: 'Cross-Border Calculation Question', subject: 'Cross-border calculation question' },
    { label: 'Feature Recommendation', subject: 'Feature recommendation for LohnLab.ch' },
    { label: 'General Technical Inquiry', subject: 'General technical inquiry' },
  ];

  return (
    <article className="space-y-8 max-w-3xl mx-auto">
      {/* Header */}
      <header className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
          <Mail className="w-3.5 h-3.5" />
          <span>Contact Information</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Contact LohnLab.ch
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
          Have factual feedback regarding Swiss social security scales, cantonal tax rates, or cross-border treaty guidelines? We welcome constructive updates and suggestions.
        </p>
      </header>

      {/* Direct Email Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-8 shadow-xs space-y-6">
        <h2 className="text-lg font-bold text-slate-900">Direct Email Contact</h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          LohnLab.ch is an independent digital tool. All calculator inputs and simulation data remain strictly local to your browser; we do not store customer profiles or payroll records. For all inquiries, please reach out directly via email:
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="font-mono font-bold text-slate-900 text-base sm:text-lg flex-1 text-center sm:text-left">
            {email}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <a
              href={`mailto:${email}?subject=Inquiry%20regarding%20LohnLab.ch`}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-semibold bg-red-600 hover:bg-red-700 text-white flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Inquiry Subject Templates */}
        <div className="space-y-3 pt-4 border-t border-slate-100">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Pre-Formatted Subject Templates
          </h3>
          <p className="text-xs text-slate-500">
            Click any template below to open your email client with a pre-filled subject line:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {subjectOptions.map((opt, i) => (
              <a
                key={i}
                href={`mailto:${email}?subject=${encodeURIComponent(opt.subject)}`}
                className="p-3 rounded-lg border border-slate-200 hover:border-red-300 hover:bg-red-50/40 text-xs text-slate-700 hover:text-red-700 transition-colors flex items-center justify-between group"
              >
                <span>{opt.label}</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-red-600" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Helpful Links */}
      <div className="p-6 bg-slate-100/70 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
        <div className="font-bold text-slate-800 flex items-center gap-1.5">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          Looking for statutory details or calculation rules?
        </div>
        <p>
          Before emailing about formula specifics, check our{' '}
          <Link href="/methodology/" className="text-red-600 underline font-semibold">
            Calculation Methodology
          </Link>{' '}
          and{' '}
          <Link href="/guide/" className="text-red-600 underline font-semibold">
            Swiss Salary Guide
          </Link>
          , where we detail applicable federal statutes, BSV scales, and BVG age brackets.
        </p>
      </div>
    </article>
  );
};
