import React, { useState } from 'react';
import { CalculationResult } from '../types/calculator';
import { formatCHF, formatPercent } from '../utils/calculator';
import { Wallet, PieChart, TrendingUp, Sliders, CheckCircle2, AlertCircle, Home, ShoppingCart, Shield, Car, Heart, Coffee, PiggyBank, Plus, Trash2, Users, Zap, Train, MoreHorizontal, Smartphone } from 'lucide-react';

interface BudgetCalculatorProps {
  result: CalculationResult;
  setActiveSection: (section: string) => void;
}

interface BudgetItem {
  id: string;
  name: string;
  amount: number;
  icon: React.ReactNode;
}

export const BudgetCalculator: React.FC<BudgetCalculatorProps> = ({ result, setActiveSection }) => {
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
    const phone = Math.round(100);
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
      { id: 'phone', name: 'Phone & Internet', amount: phone, icon: <Smartphone className="w-4 h-4 text-sky-600" /> },
      { id: 'health', name: 'Health Insurance', amount: health, icon: <Shield className="w-4 h-4 text-red-600" /> },
      { id: 'car', name: 'Car', amount: car, icon: <Car className="w-4 h-4 text-indigo-600" /> },
      { id: 'transport', name: 'Public Transport', amount: transport, icon: <Train className="w-4 h-4 text-cyan-600" /> },
      { id: 'leisure', name: 'Leisure & Entertainment', amount: leisure, icon: <Coffee className="w-4 h-4 text-pink-600" /> },
      { id: 'savings', name: 'Savings & Investments (Investments)', amount: savings, icon: <PiggyBank className="w-4 h-4 text-purple-600" /> },
      { id: 'other', name: 'Other', amount: other, icon: <MoreHorizontal className="w-4 h-4 text-slate-600" /> },
    ];
  };

  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(() => getSwissStandardDefaultItems(netMonthly));
  const [isOverridingNet, setIsOverridingNet] = useState<boolean>(false);
  const [overrideNetMonthly, setOverrideNetMonthly] = useState<number>(netMonthly);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState<number>(200);

  const effectiveNetMonthly = isOverridingNet ? overrideNetMonthly : netMonthly;
  const effectiveNetAnnual = effectiveNetMonthly * 12;

  const totalAllocated = budgetItems.reduce((sum, item) => sum + item.amount, 0);
  const remainingBalance = effectiveNetMonthly - totalAllocated;
  const allocationPercentage = effectiveNetMonthly > 0 ? (totalAllocated / effectiveNetMonthly) * 100 : 0;

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
    setBudgetItems(getSwissStandardDefaultItems(effectiveNetMonthly));
  };

  return (
    <div className="space-y-6">
      {/* Back to Salary Calculator Button */}
      <button
        onClick={() => setActiveSection('calculator')}
        className="px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors cursor-pointer"
      >
        ← Back to Salary Calculator
      </button>

      {/* Budget Breakdown & Sliders */}
      <div className="space-y-8">
        {/* Key Metrics Grid */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-slate-900 text-white p-4 rounded-xl shadow-xs space-y-1">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-medium text-slate-300 uppercase tracking-wider">Net Home Pay</div>
                  <button
                    type="button"
                    onClick={() => {
                      if (!isOverridingNet) {
                        setOverrideNetMonthly(netMonthly);
                      }
                      setIsOverridingNet(!isOverridingNet);
                    }}
                    className="px-2 py-0.5 text-[10px] font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors cursor-pointer"
                  >
                    {isOverridingNet ? 'Use Calc' : 'Set Manually'}
                  </button>
              </div>
              {isOverridingNet ? (
                <div className="flex items-center gap-1 pt-0.5">
                  <span className="text-[10px] text-slate-400 font-mono">CHF</span>
                  <input
                    type="number"
                    min={0}
                    step={100}
                    placeholder="0"
                    value={overrideNetMonthly === 0 ? '' : overrideNetMonthly}
                    onFocus={(e) => e.target.select()}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === '') {
                        setOverrideNetMonthly(0);
                        return;
                      }
                      const cleaned = raw.replace(/^0+(?=\d)/, '');
                      setOverrideNetMonthly(Math.max(0, parseFloat(cleaned) || 0));
                    }}
                    className="w-full px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-sm font-bold text-emerald-400 focus:outline-none focus:ring-1 focus:ring-red-500 font-mono placeholder-slate-600"
                  />
                </div>
              ) : (
                <>
                  <div className="text-xl font-extrabold mt-0.5 text-emerald-400 font-mono">
                    {formatCHF(netMonthly)}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">Annual: {formatCHF(netAnnual)}</div>
                </>
              )}
            </div>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <div className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Allocated</div>
              <div className="text-xl font-extrabold mt-0.5 text-slate-900">
                {formatCHF(totalAllocated)}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{formatPercent(allocationPercentage)} of net</div>
            </div>

            <div className={`p-4 rounded-xl border ${remainingBalance >= 0 ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-red-50 border-red-200 text-red-900'}`}>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                {remainingBalance >= 0 ? 'Surplus / Savings' : 'Deficit'}
              </div>
              <div className={`text-xl font-extrabold mt-0.5 ${remainingBalance >= 0 ? 'text-emerald-700' : 'text-red-700'}`}>
                {formatCHF(Math.abs(remainingBalance))}
              </div>
              <div className="text-[10px] mt-0.5 opacity-80 truncate">
                {remainingBalance >= 0 ? 'Available for savings' : 'Exceeds net income'}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Expense Categories</h3>
            <button
              onClick={handleResetDefaults}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {budgetItems.map((item) => {
              const percentage = effectiveNetMonthly > 0 ? (item.amount / effectiveNetMonthly) * 100 : 0;
              return (
                <div key={item.id} className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-white rounded-lg shadow-xs border border-slate-200">
                        {item.icon}
                      </div>
                      <span className="text-xs font-semibold text-slate-900 truncate">{item.name}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors"
                      title="Remove category"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm font-bold text-slate-900">{formatCHF(item.amount)}</span>
                    <span className="text-[10px] text-slate-500 font-mono">({formatPercent(percentage, 1)})</span>
                  </div>
                </div>

                  {/* Direct input */}
                  <div className="pt-1">
                    <input
                      type="number"
                      min={0}
                      step={50}
                      placeholder="0"
                      value={item.amount === 0 ? '' : item.amount}
                      onFocus={(e) => e.target.select()}
                      onChange={(e) => {
                        const raw = e.target.value;
                        if (raw === '') {
                          handleAmountChange(item.id, 0);
                          return;
                        }
                        const cleaned = raw.replace(/^0+(?=\d)/, '');
                        handleAmountChange(item.id, Math.max(0, parseFloat(cleaned) || 0));
                      }}
                      className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-red-600"
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
              min={0}
              placeholder="Monthly CHF"
              value={newCategoryAmount === 0 ? '' : newCategoryAmount}
              onFocus={(e) => e.target.select()}
              onChange={(e) => {
                const raw = e.target.value;
                if (raw === '') {
                  setNewCategoryAmount(0);
                  return;
                }
                const cleaned = raw.replace(/^0+(?=\d)/, '');
                setNewCategoryAmount(Math.max(0, parseFloat(cleaned) || 0));
              }}
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
      </div>
    </div>
  );
};
