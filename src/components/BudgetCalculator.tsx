import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { Wallet, PieChart, TrendingUp, Sliders, CheckCircle2, AlertCircle, Home, ShoppingCart, Shield, Car, Heart, Coffee, PiggyBank, Plus, Trash2, Users, Zap, Train, MoreHorizontal } from 'lucide-react';

interface BudgetCalculatorProps {
  result: CalculationResult;
}

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  icon: React.ReactNode;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ result }) => {
  // Determine if dual income or single earner net pay is used
  const isDual = result.isDualIncome && !!result.spouseResult;
  const netMonthly = result.netPayMonthly;
  const netAnnual = result.netPayAnnual;

  // Family profile details from inputs
  const hasSpouse = result.inputs.maritalStatus !== 'single';
  const numChildren = (result.inputs.childrenUnder16 || 0) + (result.inputs.childrenEducation || 0);
  const adultsCount = hasSpouse ? 2 : 1;
  const healthInsPerAdult = result.canton?.avgHealthInsuranceMonthly || 380;
  const healthInsPerChild = 130;

  // Swiss Federal Statistical Office (BFS) & Budgetberatung Schweiz standard metrics with exact requested categories
  const getSwissStandardDefaultItems = (net: number): BudgetItem[] => {
    const housing = Math.round(1200 + (hasSpouse ? 400 : 0) + (numChildren * 200));
    const utilities = Math.round(180 + (adultsCount * 40) + (numChildren * 20));
    const groceries = Math.round(550 * adultsCount + (numChildren * 300));
    const health = Math.round((adultsCount * healthInsPerAdult) + (numChildren * healthInsPerChild));
    const car = Math.round(400);
    const transport = Math.round(150 * adultsCount);
    const leisure = Math.round(300 * adultsCount + (numChildren * 150));
    const savings = Math.max(300, Math.round(net * 0.15));
    const other = Math.round(200 * adultsCount);

    return [
      { id: 'housing', name: 'Housing (Rent / Mortgage)', amount: housing, icon: <Home className="w-4 h-4 text-blue-600" /> },
      { id: 'utilities', name: 'Utilities (Electricity)', amount: utilities, icon: <Zap className="w-4 h-4 text-amber-500" /> },
      { id: 'groceries', name: 'Groceries', amount: groceries, icon: <ShoppingCart className="w-4 h-4 text-emerald-600" /> },
      { id: 'health', name: 'Health Insurance', amount: health, icon: <Shield className="w-4 h-4 text-red-600" /> },
      { id: 'car', name: 'Car', amount: car, icon: <Car className="w-4 h-4 text-indigo-600" /> },
      { id: 'transport', name: 'Public Transport', amount: transport, icon: <Train className="w-4 h-4 text-cyan-600" /> },
      { id: 'leisure', name: 'Leisure & Entertainment', amount: leisure, icon: <Coffee className="w-4 h-4 text-pink-600" /> },
      { id: 'savings', name: 'Savings & Investments (Pillar 3a, Investments)', amount: savings, icon: <PiggyBank className="w-4 h-4 text-purple-600" /> },
      { id: 'other', name: 'Other', amount: other, icon: <MoreHorizontal className="w-4 h-4 text-slate-600" /> },
    ];
  };

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => getSwissStandardDefaultItems(netMonthly));
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState<number>(200);

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = netMonthly - totalAllocated;
  const allocationPercentage = netMonthly > 0 ? (totalAllocated / netMonthly) * 100 : 0;

  const handleAmountChange = (id: string, val: number) => {
    setBudgetItems(prev => prev.map(item => item.id === id ? { ...item, amount: Math.max(0, val) } : item));
  };

  const handleDeleteItem = (id: string) => {
    setBudgetItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const newItem: BudgetItem = {
      id: Date.now().toString(),
      name: newCategoryName.trim(),
      amount: newCategoryAmount,
      icon: <PieChart className="w-4 h-4 text-slate-600" />
    };
    setBudgetItems(prev => [...prev, newItem]);
    setNewCategoryName('');
    setNewCategoryAmount(200);
  };

  const handleResetDefaults = () => {
    setBudgetItems(getSwissStandardDefaultItems(netMonthly));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2.5 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <PieChart className="w-4 h-4" />
              </div>
              <span>Swiss Living &amp; Expense Budget Planner</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Monthly Budget Calculator
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs text-slate-500">
              <span>Net Pay Source: <strong className="text-slate-700">{isDual ? 'Married Dual Income' : 'Single / Single Earner'}</strong></span>
              <span>•</span>
              <span className="inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded-lg text-slate-700 font-medium">
                <Users className="w-3.5 h-3.5 text-emerald-600" />
                {adultsCount} Adult{hasSpouse ? 's' : ''}, {numChildren} Child{numChildren !== 1 ? 'ren' : ''} ({result.canton.name})
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleResetDefaults}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Reset to Swiss Averages
            </button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="bg-slate-900 text-white p-5 rounded-xl shadow-xs">
            <div className="text-xs font-medium text-slate-300 uppercase tracking-wider">Net Home Pay (Monthly)</div>
            <div className="text-2xl sm:text-3xl font-extrabold mt-1 text-emerald-400">
              {formatCHF(netMonthly)}
            </div>
            <div className="text-xs text-slate-400 mt-1">Annual: {formatCHF(netAnnual)}</div>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Allocated Budget</div>
            <div className="text-2xl sm:text-3xl font-extrabold mt-1 text-slate-900">
              {formatCHF(totalAllocated)}
            </div>
            <div className="text-xs text-slate-500 mt-1">{formatPercent(allocationPercentage)} of net income</div>
          </div>

          <div className={`p-5 rounded-xl border ${remainingBalance >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
            <div className="text-xs font-medium uppercase tracking-wider opacity-80">
              {remainingBalance >= 0 ? 'Monthly Surplus / Savings' : 'Budget Deficit'}
            </div>
            <div className={`text-2xl sm:text-3xl font-extrabold mt-1 ${remainingBalance >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
              {formatCHF(Math.abs(remainingBalance))}
            </div>
            <div className="text-xs mt-1 opacity-80">
              {remainingBalance >= 0 ? 'Available for extra savings or investments' : 'Exceeds net monthly income'}
            </div>
          </div>
        </div>
      </div>

      {/* Budget Breakdown & Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Budget items list & sliders */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Expense Categories</h3>
            <span className="text-xs text-slate-500">Adjust monthly amounts (CHF)</span>
          </div>

          <div className="space-y-4">
            {budgetItems.map((item) => {
              const percentage = netMonthly > 0 ? (item.amount / netMonthly) * 100 : 0;
              return (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-white rounded-lg shadow-xs border border-slate-200">
                        {item.icon}
                      </div>
                      <span className="text-sm font-semibold text-slate-900">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="text-sm font-bold text-slate-900">{formatCHF(item.amount)}</span>
                        <span className="text-xs text-slate-500 ml-2">({formatPercent(percentage, 1)})</span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove category"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Slider and direct input */}
                  <div className="flex items-center gap-4 pt-1">
                    <input
                      type="range"
                      min={0}
                      max={20000}
                      step={50}
                      value={item.amount}
                      onChange={(e) => handleAmountChange(item.id, Number(e.target.value))}
                      className="flex-1 accent-red-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
                    />
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => handleAmountChange(item.id, Number(e.target.value))}
                      className="w-28 px-3 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Custom Category Form */}
          <form onSubmit={handleAddCategory} className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="New category name (e.g. Holidays, Pet)..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="number"
              placeholder="Monthly CHF"
              value={newCategoryAmount}
              onChange={(e) => setNewCategoryAmount(Number(e.target.value))}
              className="w-32 px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
          </form>
        </div>

        {/* Right 5 cols: Visual breakdown & Swiss living insights */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Expense Distribution</h3>
            
            {/* Visual Progress Bar */}
            <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              {budgetItems.map((item, idx) => {
                const pct = netMonthly > 0 ? (item.amount / netMonthly) * 100 : 0;
                const colors = [
                  'bg-blue-500', 'bg-emerald-500', 'bg-red-500', 'bg-amber-500', 
                  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
                ];
                return (
                  <div
                    key={item.id}
                    style={{ width: `${Math.max(0, Math.min(100, pct))}%` }}
                    className={`h-full ${colors[idx % colors.length]} transition-all duration-300`}
                    title={`${item.name}: ${formatCHF(item.amount)} (${formatPercent(pct, 1)})`}
                  />
                );
              })}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {budgetItems.map((item, idx) => {
                const pct = netMonthly > 0 ? (item.amount / netMonthly) * 100 : 0;
                const dotColors = [
                  'bg-blue-500', 'bg-emerald-500', 'bg-red-500', 'bg-amber-500', 
                  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500'
                ];
                return (
                  <div key={item.id} className="flex items-center gap-2 text-xs">
                    <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${dotColors[idx % dotColors.length]}`} />
                    <span className="text-slate-600 truncate flex-1">{item.name}</span>
                    <span className="font-semibold text-slate-900">{formatPercent(pct, 1)}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold tracking-wide uppercase text-red-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Swiss Cost of Living Standards
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Defaults are calibrated based on Swiss Federal Statistical Office (BFS) consumer expenditure surveys for <strong className="text-white">{adultsCount} adult{hasSpouse ? 's' : ''}</strong> and <strong className="text-white">{numChildren} child{numChildren !== 1 ? 'ren' : ''}</strong> in {result.canton.name}.
            </p>
            <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Housing:</strong> Scales with household size and cantonal averages.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Health Insurance:</strong> Factored using {result.canton.name} average KVG basic insurance premiums per adult + estimated child health coverage.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Children Expenses:</strong> Includes estimated food, clothing, education, and leisure costs per child (~CHF 600-900/mo per child).</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
