import React from 'react';

interface FooterProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, activeSection }) => {
  const handleNav = (section: string) => {
    onNavigate(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white text-xs text-slate-500 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center shadow-xs">
                <svg viewBox="0 0 32 32" className="w-3.5 h-3.5 fill-white" aria-hidden="true">
                  <rect x="13" y="6" width="6" height="20" rx="0.5" />
                  <rect x="6" y="13" width="20" height="6" rx="0.5" />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => handleNav('calculator')}
                className="text-base font-bold text-slate-900 hover:text-red-600 transition-colors cursor-pointer text-left"
              >
                LohnLab<span className="text-red-600 font-extrabold">.ch</span>
              </button>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              Switzerland&apos;s independent, client-side Swiss gross-to-net salary, tax comparison, and monthly living budget calculator across all 26 cantons.
            </p>
            <div className="text-[11px] text-slate-400">
              © {new Date().getFullYear()} LohnLab.ch · Built in Switzerland
            </div>
          </div>

          {/* Calculators & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Tools &amp; Views
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('calculator')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'calculator' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Salary Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('budget')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'budget' ? 'text-emerald-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Budget Calculator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('payslip')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'payslip' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Payslip View (Lohnabrechnung)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('cantons')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'cantons' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Compare Cantons
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('guide')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'guide' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Swiss Salary Guide
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Legal Pages */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Information &amp; Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'about' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'contact' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('privacy')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'privacy' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleNav('terms')}
                  className={`hover:text-red-600 transition-colors cursor-pointer ${
                    activeSection === 'terms' ? 'text-red-600 font-semibold' : 'text-slate-600'
                  }`}
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            Disclaimer: Calculations provided by LohnLab.ch are mathematical approximations based on Swiss Federal Tax Administration (ESTV) circulars, standard cantonal tax multipliers, statutory AHV/IV/EO, ALV, and BVG pension scales. Final tax assessments may vary based on exact municipal tax multipliers and personal deductions.
          </p>
          <div className="flex items-center gap-4 shrink-0 text-slate-500">
            <button
              type="button"
              onClick={() => handleNav('privacy')}
              className="hover:underline cursor-pointer"
            >
              Privacy
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('terms')}
              className="hover:underline cursor-pointer"
            >
              Terms
            </button>
            <span>·</span>
            <button
              type="button"
              onClick={() => handleNav('contact')}
              className="hover:underline cursor-pointer"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
