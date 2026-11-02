import React from 'react';
import { Link } from './Link';
import { useRouter } from '../router';

export const Footer: React.FC = () => {
  const { currentPath } = useRouter();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center shadow-xs group-hover:bg-red-700 transition-colors">
                  <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                    <rect x="13" y="6" width="6" height="20" rx="0.5" />
                    <rect x="6" y="13" width="20" height="6" rx="0.5" />
                  </svg>
                </div>
                <span className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                  LohnLab<span className="text-red-600 font-extrabold">.ch</span>
                </span>
              </Link>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Switzerland&apos;s independent, client-side gross-to-net salary, tax comparison, and monthly living budget calculator across all 26 Swiss cantons. All calculations run strictly in your browser.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} LohnLab.ch · Independent Swiss Resource
            </div>
          </div>

          {/* Calculators & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Calculators &amp; Resources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Salary Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/budget/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/budget/' ? 'text-emerald-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Budget Calculator
                </Link>
              </li>
              <li>
                <Link
                  href="/payslip/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/payslip/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Payslip Preview (Estimated)
                </Link>
              </li>
              <li>
                <Link
                  href="/compare-cantons/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/compare-cantons/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Compare Cantons
                </Link>
              </li>
              <li>
                <Link
                  href="/guide/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/guide/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Swiss Salary Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/methodology/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/methodology/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Methodology &amp; Sources (2025/2026)
                </Link>
              </li>
            </ul>
          </div>

          {/* Information & Legal Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Information &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/about/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  About LohnLab.ch
                </Link>
              </li>
              <li>
                <Link
                  href="/contact/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/contact/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Contact Details
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/privacy/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Privacy Policy (revDSG / GDPR)
                </Link>
              </li>
              <li>
                <Link
                  href="/terms/"
                  className={`hover:text-red-600 transition-colors ${
                    currentPath === '/terms/' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            Disclaimer: Calculations provided by LohnLab.ch are mathematical simulations based on published Swiss Federal Tax Administration (ESTV) circulars, standard cantonal multipliers, and statutory AHV/IV/EO, ALV, and BVG scales for 2025/2026. Final tax obligations are determined solely by your cantonal tax authority.
          </p>
          <div className="flex items-center gap-4 shrink-0 text-slate-500">
            <Link href="/privacy/" className="hover:underline">
              Privacy
            </Link>
            <span>·</span>
            <Link href="/terms/" className="hover:underline">
              Terms
            </Link>
            <span>·</span>
            <Link href="/contact/" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
