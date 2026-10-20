import React from 'react';
import { CalculatorInputs, MaritalStatus } from '../types/calculator';
import { CANTON_LIST, CANTONS_DATA } from '../data/cantons';
import { formatCHF, getBvgEmployeeRate, FR_1983_ACCORD_CANTONS } from '../utils/calculator';
import {
  ChevronDown,
  Users,
  Baby,
  Church,
  Wallet,
  Globe,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Heart,
  Laptop,
} from 'lucide-react';

interface SalaryInputFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
  onReset?: () => void;
}

export const SalaryInputForm: React.FC<SalaryInputFormProps> = ({ inputs, onChange, onReset }) => {
  const selectedCanton = CANTONS_DATA[inputs.cantonCode] || CANTONS_DATA.ZH;
  const bvgRate = getBvgEmployeeRate(inputs.age);

  const updateField = <K extends keyof CalculatorInputs>(
    field: K,
    value: CalculatorInputs[K]
  ) => {
    onChange({
      ...inputs,
      [field]: value,
    });
  };

  const currentCb = inputs.crossBorder || {
    country: 'FR',
    commuteType: 'daily',
    hasFrenchTaxCertificate: true,
    franceHealthOption: 'lamal',
    teleworkPercent: 0,
    hasGermanGrenzgangerCert: true,
    italyRegime: 'new',
    isWithin20kmZone: true,
  };

  const updateCrossBorder = <K extends keyof NonNullable<CalculatorInputs['crossBorder']>>(
    key: K,
    val: NonNullable<CalculatorInputs['crossBorder']>[K]
  ) => {
    onChange({
      ...inputs,
      crossBorder: {
        ...currentCb,
        [key]: val,
      },
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 sm:p-7 space-y-6">
      {/* Card Header */}
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4" />
            </div>
            Salary &amp; Personal Profile
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Configure your Swiss gross salary, canton, family allowances, and pension.
          </p>
        </div>
        {onReset && (
          <button
            type="button"
            onClick={onReset}
            className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer shrink-0"
          >
            Reset
          </button>
        )}
      </div>

      {/* 1. Gross Salary Amount & Cadence */}
      <div className="space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-semibold text-slate-700">
            {inputs.maritalStatus === 'married_dual_income'
              ? 'Your Gross Salary (Person 1)'
              : 'Gross Salary (Bruttolohn)'}
          </label>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            {/* Period switch */}
            <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => updateField('salaryPeriod', 'annual')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  inputs.salaryPeriod === 'annual'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Annual
              </button>
              <button
                type="button"
                onClick={() => updateField('salaryPeriod', 'monthly')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  inputs.salaryPeriod === 'monthly'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
            </div>

            {/* Months count */}
            <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                type="button"
                onClick={() => updateField('numberOfMonths', 12)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  inputs.numberOfMonths === 12
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                12x
              </button>
              <button
                type="button"
                onClick={() => updateField('numberOfMonths', 13)}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  inputs.numberOfMonths === 13
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="13th month salary common in Switzerland"
              >
                13x
              </button>
            </div>
          </div>
        </div>

        {/* Red Promoted Salary Entry Box */}
        <div className="flex items-stretch rounded-xl border-2 border-red-400 bg-white shadow-xs focus-within:ring-4 focus-within:ring-red-300/15 focus-within:border-red-400 transition-all overflow-hidden">
          <div className="bg-red-300 text-black font-bold text-sm px-4 flex items-center justify-center select-none font-mono tracking-wide">
            CHF
          </div>
          <input
            type="number"
            min={0}
            step={1000}
            value={inputs.grossSalary || ''}
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              const cleaned = e.target.value.replace(/^0+(?=\d)/, '');
              updateField('grossSalary', Math.max(0, parseFloat(cleaned) || 0));
            }}
            className="w-full px-3.5 py-2.5 text-lg font-extrabold text-slate-900 bg-transparent focus:outline-none tabular-nums font-mono tracking-tight placeholder-slate-300"
            placeholder={inputs.salaryPeriod === 'annual' ? '85000' : '7083'}
          />
        </div>
      </div>

      {/* 2. Residency Status: Swiss Resident vs. Cross-Border Worker (Frontalier / Grenzgänger) */}
      <div className="space-y-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Globe className="w-4 h-4 text-red-600" />
            Residency Status (Wohnsitz / Grenzgänger)
          </label>
          <span className="text-[11px] text-slate-500 font-medium">
            {inputs.residenceStatus === 'cross_border' ? 'Permit G (Frontalier)' : 'Swiss Resident'}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => updateField('residenceStatus', 'resident')}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
              inputs.residenceStatus !== 'cross_border'
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">🇨🇭 Swiss Resident</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Lives in Switzerland (Permit B/C/Citizen)</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('residenceStatus', 'cross_border')}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
              inputs.residenceStatus === 'cross_border'
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">🌍 Cross-Border Worker</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Permit G (Frontalier / Grenzgänger)</div>
          </button>
        </div>

        {/* Expanded Cross-Border Options */}
        {inputs.residenceStatus === 'cross_border' && (
          <div className="pt-3 border-t border-slate-200/80 space-y-4">
            {/* Country of Residence */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Country of Residence (Wohnsitzland)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {[
                  { code: 'FR', label: 'France 🇫🇷' },
                  { code: 'DE', label: 'Germany 🇩🇪' },
                  { code: 'IT', label: 'Italy 🇮🇹' },
                  { code: 'AT', label: 'Austria 🇦🇹' },
                ].map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => updateCrossBorder('country', c.code as any)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      currentCb.country === c.code
                        ? 'border-red-600 bg-white text-slate-900 font-semibold ring-1 ring-red-600'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Commute Frequency */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">
                Commute Frequency (Rückkehr)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => updateCrossBorder('commuteType', 'daily')}
                  className={`p-2 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                    currentCb.commuteType === 'daily'
                      ? 'border-red-600 bg-white text-slate-900 font-semibold ring-1 ring-red-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">Daily Commuter</div>
                  <div className="text-[10px] text-slate-500">Returns home daily (≤60 non-return days)</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateCrossBorder('commuteType', 'weekly')}
                  className={`p-2 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
                    currentCb.commuteType === 'weekly'
                      ? 'border-red-600 bg-white text-slate-900 font-semibold ring-1 ring-red-600'
                      : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">Weekly Commuter</div>
                  <div className="text-[10px] text-slate-500">Stays in Switzerland during workweek</div>
                </button>
              </div>
            </div>

            {/* Country-Specific Accord Settings */}
            {/* 1. FRANCE */}
            {currentCb.country === 'FR' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    🇫🇷 Franco-Swiss Tax Accord Rules
                  </span>
                  <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                    Canton {selectedCanton.code}
                  </span>
                </div>

                {FR_1983_ACCORD_CANTONS.has(inputs.cantonCode) ? (
                  <div className="space-y-2">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={currentCb.hasFrenchTaxCertificate}
                        onChange={(e) => updateCrossBorder('hasFrenchTaxCertificate', e.target.checked)}
                        className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                      />
                      <div className="text-xs">
                        <span className="font-semibold text-slate-900">Holds French Tax Residency Certificate (Formulaire 2041-AS)</span>
                        <p className="text-[11px] text-emerald-700 mt-0.5 leading-relaxed font-medium">
                          {currentCb.hasFrenchTaxCertificate && currentCb.commuteType === 'daily'
                            ? '✓ 0.0% Swiss Withholding Tax applies! Under the 1983 Agreement, Canton ' + selectedCanton.name + ' withholds 0% tax. Your entire wage is taxed in France.'
                            : 'Without certificate or if weekly commuter, Swiss tax is withheld at source.'}
                        </p>
                      </div>
                    </label>
                  </div>
                ) : inputs.cantonCode === 'GE' ? (
                  <div className="p-2.5 bg-blue-50 border border-blue-200/70 rounded-lg text-xs text-blue-900 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      Geneva (GE) 1973 Accord: Taxed at Source
                    </div>
                    <p className="text-[11px] text-blue-800 leading-relaxed">
                      Canton Geneva retains income tax directly at source. Geneva pays ~3.5% compensatory retrocession to Ain and Haute-Savoie. You declare in France with a tax credit to avoid double taxation.
                    </p>
                  </div>
                ) : (
                  <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900">Canton {selectedCanton.name} (Non-1983 Accord)</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      Taxes are withheld at source in Switzerland (Quellensteuer). In France, you declare with a foreign tax credit.
                    </p>
                  </div>
                )}

                {/* Health Insurance Droit d'option */}
                <div className="space-y-1 pt-1 border-t border-slate-100">
                  <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                    <Heart className="w-3 h-3 text-red-600" />
                    Health Insurance Option (Droit d&apos;option)
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => updateCrossBorder('franceHealthOption', 'lamal')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentCb.franceHealthOption === 'lamal'
                          ? 'border-red-600 bg-red-50/40 text-slate-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">LAMal Frontalier</div>
                      <div className="text-[10px] text-slate-500">~CHF 175/mo (Swiss KVG for French frontaliers)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCrossBorder('franceHealthOption', 'cmu')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentCb.franceHealthOption === 'cmu'
                          ? 'border-red-600 bg-red-50/40 text-slate-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">French CMU (PUMA)</div>
                      <div className="text-[10px] text-slate-500">8% of income above French exemption threshold</div>
                    </button>
                  </div>
                </div>

                {/* Teleworking (Télétravail) */}
                <div className="space-y-1 pt-1 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <label className="font-semibold text-slate-700 flex items-center gap-1">
                      <Laptop className="w-3 h-3 text-slate-600" />
                      Teleworking / Home Office (Télétravail)
                    </label>
                    <span className="font-mono font-bold text-slate-900">
                      {currentCb.teleworkPercent}% ({Math.round((currentCb.teleworkPercent / 100) * 5 * 10) / 10} days/wk)
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={50}
                    step={5}
                    value={currentCb.teleworkPercent}
                    onChange={(e) => updateCrossBorder('teleworkPercent', parseInt(e.target.value, 10))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                  />
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>0% (Full on-site)</span>
                    <span className={currentCb.teleworkPercent <= 40 ? 'text-emerald-700 font-semibold' : 'text-red-600 font-semibold'}>
                      {currentCb.teleworkPercent <= 40 ? '✓ Within 40% Bilateral Treaty Quota' : '⚠️ Exceeds 40% Quota!'}
                    </span>
                    <span>Max 50%</span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. GERMANY */}
            {currentCb.country === 'DE' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">🇩🇪 DBA Deutschland-Schweiz (Art. 15a)</span>
                  <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                    {currentCb.commuteType === 'daily' && currentCb.hasGermanGrenzgangerCert ? '4.50% Flat Swiss Tax' : 'Quellensteuer'}
                  </span>
                </div>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={currentCb.hasGermanGrenzgangerCert}
                    onChange={(e) => updateCrossBorder('hasGermanGrenzgangerCert', e.target.checked)}
                    className="mt-0.5 rounded text-red-600 focus:ring-red-500 w-4 h-4 cursor-pointer"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Ansässigkeitsbescheinigung Gre-1 / Gre-2 Certificate</span>
                    <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                      {currentCb.commuteType === 'daily' && currentCb.hasGermanGrenzgangerCert
                        ? '✓ Switzerland retains flat 4.50% withholding tax (Pauschalsteuer). Germany taxes your income and fully credits the 4.5% paid in Switzerland.'
                        : 'Without certificate or for >60 non-return days, standard Swiss withholding tax applies.'}
                    </p>
                  </div>
                </label>
              </div>
            )}

            {/* 3. ITALY */}
            {currentCb.country === 'IT' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="font-bold text-slate-900">🇮🇹 Nuovo Accordo Frontalieri (2024)</span>
                  <span className="text-[10px] font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded">
                    {currentCb.italyRegime === 'new' ? '80% Swiss Tax' : '100% Swiss Tax Only'}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-700">Frontalier Status Category</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => updateCrossBorder('italyRegime', 'new')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentCb.italyRegime === 'new'
                          ? 'border-red-600 bg-red-50/40 text-slate-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">Nuovi Frontalieri</div>
                      <div className="text-[10px] text-slate-500">Hired on/after 17 July 2023 (80% CH tax + IT credit)</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateCrossBorder('italyRegime', 'old')}
                      className={`p-2 rounded-lg border text-left transition-all cursor-pointer ${
                        currentCb.italyRegime === 'old'
                          ? 'border-red-600 bg-red-50/40 text-slate-900 font-semibold'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="font-semibold text-slate-900">Vecchi Frontalieri</div>
                      <div className="text-[10px] text-slate-500">Active 2018–2023 in TI/GR/VS (100% CH tax, 0% IT)</div>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. AUSTRIA */}
            {currentCb.country === 'AT' && (
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5">
                <div className="font-bold text-slate-900">🇦🇹 DBA Österreich-Schweiz</div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Daily commuters are subject to a maximum 3.00% flat withholding tax in Switzerland. Austria taxes the salary under Austrian progressive income tax with a full credit for the Swiss tax.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Canton Selection */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            {inputs.residenceStatus === 'cross_border'
              ? 'Canton of Workplace in Switzerland (Arbeitskanton)'
              : 'Canton of Residence (Wohnkanton)'}
          </label>
          <span className="text-[11px] text-slate-500">
            Child Allowance: {formatCHF(selectedCanton.childAllowanceMonthly)}/mo
          </span>
        </div>
        <div className="relative">
          <select
            value={inputs.cantonCode}
            onChange={(e) => updateField('cantonCode', e.target.value)}
            className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 cursor-pointer"
          >
            {CANTON_LIST.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} — {c.name} ({c.nameDe}) · Tax Index: {(c.taxIndex * 100).toFixed(0)}%
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* 3. Age & BVG Pension Tier */}
      <div className="space-y-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900">
            Age
          </label>
          <span className="text-xs font-mono font-bold text-slate-900">
            {inputs.age} years old ({bvgRate > 0 ? `${bvgRate}% employee share` : 'No retirement credits'})
          </span>
        </div>
        <input
          type="range"
          min={18}
          max={68}
          value={inputs.age}
          onChange={(e) => updateField('age', parseInt(e.target.value, 10))}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-0.5">
          <span>&lt;25 (Risk only)</span>
          <span>25-34 (3.5%)</span>
          <span>35-44 (5.0%)</span>
          <span>45-54 (7.5%)</span>
          <span>55-65 (9.0%)</span>
          <span>65+</span>
        </div>
      </div>

      {/* 4. Church Membership (Simple Yes / No selection) */}
      <div className="space-y-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
            <Church className="w-4 h-4 text-red-600" />
            Church Member (Kirchensteuer)
          </label>
          {!selectedCanton.hasChurchTax && (
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
              Voluntary in {selectedCanton.name}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => updateField('isChurchMember', false)}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
              !inputs.isChurchMember
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">No</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Exempt from church tax</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('isChurchMember', true)}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
              inputs.isChurchMember
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Yes</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Canton {selectedCanton.code} church tax applies (~{selectedCanton.churchTaxRate}%)
            </div>
          </button>
        </div>
      </div>

      {/* 5. Family & Child Allowances */}
      <div className="space-y-3 p-4 bg-slate-50/70 rounded-xl border border-slate-200/70">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Baby className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold text-slate-900">
              Family &amp; Child Allowances (Familienzulagen)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-red-700 bg-red-100/70 px-2 py-0.5 rounded">
            Canton {selectedCanton.code} Rate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-0.5">
          {/* Children under 16 */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-medium">Children (&lt; 16 years)</span>
              <span className="text-slate-500 font-mono text-[11px]">
                {formatCHF(selectedCanton.childAllowanceMonthly)}/mo
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  updateField('childrenUnder16', Math.max(0, inputs.childrenUnder16 - 1))
                }
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-l-lg text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-slate-900 bg-white border-y border-slate-200 py-1.5 text-sm font-mono">
                {inputs.childrenUnder16}
              </div>
              <button
                type="button"
                onClick={() =>
                  updateField('childrenUnder16', Math.min(10, inputs.childrenUnder16 + 1))
                }
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-r-lg text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Children 16-25 in education */}
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-slate-700 font-medium">In Education (16–25)</span>
              <span className="text-slate-500 font-mono text-[11px]">
                {formatCHF(selectedCanton.educationAllowanceMonthly)}/mo
              </span>
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() =>
                  updateField('childrenEducation', Math.max(0, inputs.childrenEducation - 1))
                }
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-l-lg text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                -
              </button>
              <div className="flex-1 text-center font-bold text-slate-900 bg-white border-y border-slate-200 py-1.5 text-sm font-mono">
                {inputs.childrenEducation}
              </div>
              <button
                type="button"
                onClick={() =>
                  updateField('childrenEducation', Math.min(10, inputs.childrenEducation + 1))
                }
                className="w-9 h-9 flex items-center justify-center bg-white border border-slate-200 rounded-r-lg text-slate-700 font-bold hover:bg-slate-100 transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {(inputs.childrenUnder16 > 0 || inputs.childrenEducation > 0) && (
          <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
            <span className="text-slate-600">Total Monthly Allowance Added:</span>
            <span className="font-bold text-emerald-700 font-mono">
              +{' '}
              {formatCHF(
                inputs.childrenUnder16 * selectedCanton.childAllowanceMonthly +
                  inputs.childrenEducation * selectedCanton.educationAllowanceMonthly
              )}
              /mo
            </span>
          </div>
        )}
      </div>



      {/* 7. Marital Status (Zivilstand) */}
      <div className="space-y-2 pt-1 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-red-600" />
          Marital Status (Zivilstand)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'single')}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'single'
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Single (Ledig)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Individual tariff</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'married_single_income')}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'married_single_income'
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Married (Single Earner)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Joint married splitting</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'married_dual_income')}
            className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'married_dual_income'
                ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Married (Dual Income)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Both spouses employed</div>
          </button>
        </div>

        {/* Spouse Income Card (Expands when Married Dual Income is selected) */}
        {inputs.maritalStatus === 'married_dual_income' && (
          <div className="mt-3.5 p-4 bg-red-50/30 rounded-xl border border-red-200/80 space-y-4">
            <div className="flex items-center justify-between border-b border-red-200/50 pb-2.5">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" />
                <h3 className="text-xs font-bold text-slate-900">
                  Spouse's Salary &amp; Employment Details
                </h3>
              </div>
              <span className="text-[10px] font-semibold text-red-700 bg-red-100/80 px-2 py-0.5 rounded">
                Joint Calculation
              </span>
            </div>

            {/* Spouse Gross Salary with identical red styling and clean 1'000 step */}
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <label className="text-xs font-semibold text-slate-700">
                  Spouse Gross Salary (Person 2)
                </label>
                <div className="flex items-center gap-1.5 self-start sm:self-auto">
                  {/* Period switch */}
                  <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => updateField('spouseSalaryPeriod', 'annual')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        inputs.spouseSalaryPeriod === 'annual'
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Annual
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('spouseSalaryPeriod', 'monthly')}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        inputs.spouseSalaryPeriod === 'monthly'
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Monthly
                    </button>
                  </div>

                  {/* Months count */}
                  <div className="flex p-0.5 bg-slate-100 rounded-lg text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => updateField('spouseNumberOfMonths', 12)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        inputs.spouseNumberOfMonths === 12
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      12x
                    </button>
                    <button
                      type="button"
                      onClick={() => updateField('spouseNumberOfMonths', 13)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        inputs.spouseNumberOfMonths === 13
                          ? 'bg-white text-slate-900 shadow-xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      13x
                    </button>
                  </div>
                </div>
              </div>

              {/* Red Promoted Salary Entry Box */}
              <div className="flex items-stretch rounded-xl border-2 border-red-400 bg-white shadow-xs focus-within:ring-4 focus-within:ring-red-300/15 focus-within:border-red-400 transition-all overflow-hidden">
                <div className="bg-red-300 text-black font-bold text-sm px-4 flex items-center justify-center select-none font-mono tracking-wide">
                  CHF
                </div>
                <input
                  type="number"
                  min={0}
                  step={1000}
                  value={inputs.spouseGrossSalary || ''}
                  onFocus={(e) => e.target.select()}
                  onChange={(e) => {
                    const cleaned = e.target.value.replace(/^0+(?=\d)/, '');
                    updateField(
                      'spouseGrossSalary',
                      Math.max(0, parseFloat(cleaned) || 0)
                    );
                  }}
                  className="w-full px-3.5 py-2.5 text-lg font-extrabold text-slate-900 bg-transparent focus:outline-none tabular-nums font-mono tracking-tight placeholder-slate-300"
                  placeholder={inputs.spouseSalaryPeriod === 'annual' ? '65000' : '5416'}
                />
              </div>
            </div>

            {/* Spouse Church Membership (Simple Yes / No selection) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Church className="w-3.5 h-3.5 text-slate-500" />
                  Is Spouse a Church Member?
                </label>
                {!selectedCanton.hasChurchTax && (
                  <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
                    Voluntary in {selectedCanton.name}
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => updateField('spouseIsChurchMember', false)}
                  className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                    !inputs.spouseIsChurchMember
                      ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">No</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Spouse exempt from church tax</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('spouseIsChurchMember', true)}
                  className={`px-3.5 py-2.5 rounded-lg border text-xs font-medium text-center transition-all cursor-pointer ${
                    inputs.spouseIsChurchMember
                      ? 'border-red-600 bg-red-50/50 text-slate-900 font-semibold ring-1 ring-red-600'
                      : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-slate-900">Yes</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Canton {selectedCanton.code} church tax applies
                  </div>
                </button>
              </div>
            </div>

            {/* Spouse Age (BVG) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-700">
                  Spouse Age
                </label>
                <span className="text-xs font-mono font-bold text-slate-900">
                  {inputs.spouseAge} years old ({getBvgEmployeeRate(inputs.spouseAge)}% employee share)
                </span>
              </div>
              <input
                type="range"
                min={18}
                max={68}
                value={inputs.spouseAge}
                onChange={(e) =>
                  updateField('spouseAge', parseInt(e.target.value, 10))
                }
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
            </div>


          </div>
        )}
      </div>
    </div>
  );
};
