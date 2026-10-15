import React, { useState } from 'react';
import {
  CalculatorInputs,
  MaritalStatus,
  ChurchAffiliation,
} from '../types/calculator';
import { CANTON_LIST, CANTONS_DATA } from '../data/cantons';
import { formatCHF, getBvgEmployeeRate } from '../utils/calculator';
import {
  ChevronDown,
  Info,
  Sliders,
  Users,
  Baby,
  Church,
  ShieldAlert,
  Wallet,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';

interface SalaryInputFormProps {
  inputs: CalculatorInputs;
  onChange: (inputs: CalculatorInputs) => void;
}

export const SalaryInputForm: React.FC<SalaryInputFormProps> = ({ inputs, onChange }) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
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

  // Quick salary presets (Swiss annual benchmarks)
  const salaryPresets = [
    { label: "CHF 65'000", value: 65000, desc: 'Entry' },
    { label: "CHF 85'000", value: 85000, desc: 'Median' },
    { label: "CHF 120'000", value: 120000, desc: 'Professional' },
    { label: "CHF 160'000", value: 160000, desc: 'Senior' },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs p-6 space-y-6">
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Wallet className="w-5 h-5 text-red-600" />
            Salary & Personal Profile
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure your Swiss gross salary, canton, family status, and deductions.
          </p>
        </div>
      </div>

      {/* Salary Amount & Cadence */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-semibold text-slate-700 tracking-wide">
            Gross Salary (Bruttolohn)
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
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
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
                className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                  inputs.numberOfMonths === 13
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="13th month salary common in Switzerland"
              >
                13x (13. Lohn)
              </button>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 font-semibold text-sm">
            CHF
          </div>
          <input
            type="number"
            min={0}
            step={inputs.salaryPeriod === 'annual' ? 1000 : 100}
            value={inputs.grossSalary || ''}
            onChange={(e) => updateField('grossSalary', Math.max(0, parseFloat(e.target.value) || 0))}
            className="w-full pl-13 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-lg font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 tabular-nums font-mono transition-colors"
            placeholder={inputs.salaryPeriod === 'annual' ? '85000' : '7083'}
          />
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] text-slate-400 font-medium mr-1">Presets:</span>
          {salaryPresets.map((preset) => (
            <button
              key={preset.value}
              type="button"
              onClick={() => {
                const targetVal =
                  inputs.salaryPeriod === 'annual'
                    ? preset.value
                    : Math.round(preset.value / inputs.numberOfMonths);
                updateField('grossSalary', targetVal);
              }}
              className="px-2.5 py-1 text-xs text-slate-600 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors tabular-nums cursor-pointer"
            >
              {preset.label} <span className="text-slate-400 text-[10px]">({preset.desc})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Canton Selection */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Canton of Residence (Wohnkanton)
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
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Marital Status */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-slate-500" />
          Marital Status (Zivilstand)
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'single')}
            className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'single'
                ? 'border-red-600 bg-red-50/40 text-red-950 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Single (Ledig)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Individual tariff</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'married_single_income')}
            className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'married_single_income'
                ? 'border-red-600 bg-red-50/40 text-red-950 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Married (Single Earner)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Joint married splitting</div>
          </button>

          <button
            type="button"
            onClick={() => updateField('maritalStatus', 'married_dual_income')}
            className={`px-3 py-2.5 rounded-lg border text-xs font-medium text-left transition-all cursor-pointer ${
              inputs.maritalStatus === 'married_dual_income'
                ? 'border-red-600 bg-red-50/40 text-red-950 font-semibold ring-1 ring-red-600'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
            }`}
          >
            <div className="font-semibold text-slate-900">Married (Dual Income)</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Both spouses employed</div>
          </button>
        </div>
      </div>

      {/* Children & Child Allowances */}
      <div className="bg-slate-50/80 rounded-lg p-4 border border-slate-200/70 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Baby className="w-4 h-4 text-red-600" />
            <h3 className="text-xs font-bold text-slate-900">
              Family & Child Allowances (Familienzulagen)
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-red-700 bg-red-100/60 px-2 py-0.5 rounded">
            Canton {selectedCanton.code} Rate
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* Children under 16 */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-700 font-medium">Children (&lt; 16 years)</span>
              <span className="text-slate-500 font-mono">
                {formatCHF(selectedCanton.childAllowanceMonthly)}/mo each
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
              <div className="flex-1 text-center font-bold text-slate-900 bg-white border-y border-slate-200 py-2 text-sm font-mono">
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
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-700 font-medium">In Education (16–25)</span>
              <span className="text-slate-500 font-mono">
                {formatCHF(selectedCanton.educationAllowanceMonthly)}/mo each
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
              <div className="flex-1 text-center font-bold text-slate-900 bg-white border-y border-slate-200 py-2 text-sm font-mono">
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
            <span className="text-slate-600">Total Monthly Allowance Added to Pay:</span>
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

      {/* Church Affiliation */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <Church className="w-3.5 h-3.5 text-slate-500" />
            Church Membership (Kirchensteuer)
          </label>
          {!selectedCanton.hasChurchTax && (
            <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-medium">
              Voluntary in {selectedCanton.name}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'none', label: 'No Church Tax', sub: 'Keine' },
            { id: 'roman_catholic', label: 'Roman Catholic', sub: 'Röm.-Kath.' },
            { id: 'reformed', label: 'Reformed / Evang.', sub: 'Evang.-Ref.' },
            { id: 'christian_catholic', label: 'Christ-Catholic', sub: 'Christkath.' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => updateField('churchAffiliation', item.id as ChurchAffiliation)}
              className={`p-2 rounded-lg border text-left transition-colors cursor-pointer ${
                inputs.churchAffiliation === item.id
                  ? 'border-red-600 bg-red-50/40 text-red-950 ring-1 ring-red-600'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              <div className="text-xs font-semibold text-slate-900">{item.label}</div>
              <div className="text-[10px] text-slate-500">{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Age & BVG Pension Tier */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-slate-700">
            Age (Determines 2nd Pillar / BVG Pension rate)
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

      {/* Advanced Drawer Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 px-3 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5" />
            Additional Swiss Details (Pillar 3a, Health Insurance, Accident Insurance)
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              showAdvanced ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Advanced Settings */}
      {showAdvanced && (
        <div className="pt-2 space-y-4 border-t border-slate-100">
          {/* Pillar 3a (Säule 3a) voluntary tax deduction */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Pillar 3a (Säule 3a) Contribution
              </label>
              <span className="text-xs font-mono font-bold text-slate-900">
                {formatCHF(inputs.pillar3aContribution)} / year (Max CHF 7'056)
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={7056}
              step={50}
              value={inputs.pillar3aContribution}
              onChange={(e) =>
                updateField('pillar3aContribution', parseInt(e.target.value, 10))
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
            />
            <p className="text-[11px] text-slate-500">
              Fully deducts from taxable income, saving substantial cantonal and federal taxes!
            </p>
          </div>

          {/* Health Insurance Benchmark Toggle */}
          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
            <div>
              <div className="text-xs font-semibold text-slate-900">
                Include Mandatory Health Insurance (KVG)
              </div>
              <div className="text-[11px] text-slate-500">
                In Switzerland, health insurance is paid out-of-pocket (not deducted by employer).
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                updateField('includeHealthInsurance', !inputs.includeHealthInsurance)
              }
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors cursor-pointer ${
                inputs.includeHealthInsurance ? 'bg-red-600' : 'bg-slate-300'
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  inputs.includeHealthInsurance ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* NBU & KTG insurance adjustments */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Non-Occupational Accident (NBU) Rate
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="3.5"
                  value={inputs.nbuRate}
                  onChange={(e) => updateField('nbuRate', parseFloat(e.target.value) || 1.2)}
                  className="w-24 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
                <span className="text-xs text-slate-500">% (Avg. 1.2% - 1.5%)</span>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Daily Sickness Allowance (KTG) Rate
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="2.5"
                  value={inputs.ktgRate}
                  onChange={(e) => updateField('ktgRate', parseFloat(e.target.value) || 0.8)}
                  className="w-24 px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                />
                <span className="text-xs text-slate-500">% (Employee share ~0.8%)</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
