import { CANTONS_DATA } from '../data/cantons';
import {
  CalculationResult,
  CalculatorInputs,
  EmployerContributions,
  FamilyAllowances,
  SocialSecurityDeductions,
  TaxDeductions,
} from '../types/calculator';

// Standard Federal Child Deduction
const FEDERAL_CHILD_DEDUCTION = 6700;
// Standard Federal Professional Expense Deduction
const FEDERAL_PROFESSIONAL_DEDUCTION = 3200;
// Standard Federal Insurance Deduction
const FEDERAL_INSURANCE_DEDUCTION_SINGLE = 1800;
const FEDERAL_INSURANCE_DEDUCTION_MARRIED = 3600;

// Maximum UVG/ALV ceiling in CHF
const UVG_ALV_CEILING = 148200;

// BVG 2024/2025/2026 constants
const BVG_ENTRY_THRESHOLD = 22050;
const BVG_COORDINATION_DEDUCTION = 25725;
const BVG_MAX_COORDINATED_SALARY = 62475;
const BVG_MIN_COORDINATED_SALARY = 3675;

/**
 * Determine BVG employee contribution rate based on age
 */
export function getBvgEmployeeRate(age: number): number {
  if (age < 25) {
    // Under 25: Only risk coverage (death and disability), usually ~0.5% - 1.0%
    return 0.7;
  } else if (age <= 34) {
    // 25-34: 7% total credit -> 3.5% employee share
    return 3.5;
  } else if (age <= 44) {
    // 35-44: 10% total credit -> 5.0% employee share
    return 5.0;
  } else if (age <= 54) {
    // 45-54: 15% total credit -> 7.5% employee share
    return 7.5;
  } else if (age <= 65) {
    // 55-65: 18% total credit -> 9.0% employee share
    return 9.0;
  } else {
    // Over 65: No mandatory pension contributions
    return 0.0;
  }
}

/**
 * Calculate Direct Federal Tax (Direkte Bundessteuer)
 */
function calculateFederalTax(taxableIncome: number, isMarried: boolean): number {
  if (taxableIncome <= 0) return 0;

  if (!isMarried) {
    // Single tariff (Tarif für Alleinstehende)
    if (taxableIncome <= 14800) return 0;
    if (taxableIncome <= 32200) return (taxableIncome - 14800) * 0.0077;
    if (taxableIncome <= 42200) return 133.98 + (taxableIncome - 32200) * 0.0088;
    if (taxableIncome <= 56800) return 221.98 + (taxableIncome - 42200) * 0.0264;
    if (taxableIncome <= 74400) return 607.42 + (taxableIncome - 56800) * 0.0297;
    if (taxableIncome <= 105400) return 1130.14 + (taxableIncome - 74400) * 0.0594;
    if (taxableIncome <= 137800) return 2971.54 + (taxableIncome - 105400) * 0.066;
    if (taxableIncome <= 180600) return 5110.14 + (taxableIncome - 137800) * 0.088;
    if (taxableIncome <= 768000) return 8876.54 + (taxableIncome - 180600) * 0.11;
    return 73490.54 + (taxableIncome - 768000) * 0.115;
  } else {
    // Married joint tariff (Tarif für Verheiratete)
    if (taxableIncome <= 29000) return 0;
    if (taxableIncome <= 51900) return (taxableIncome - 29000) * 0.01;
    if (taxableIncome <= 59500) return 229.0 + (taxableIncome - 51900) * 0.02;
    if (taxableIncome <= 768000) {
      // Progressive curve simplified for married
      const base = 381.0;
      const rate = Math.min(0.03 + ((taxableIncome - 59500) / 200000) * 0.075, 0.13);
      return base + (taxableIncome - 59500) * rate;
    }
    return 95000 + (taxableIncome - 768000) * 0.115;
  }
}

/**
 * Calculate Cantonal and Municipal Tax based on progressive rate and canton index
 */
function calculateCantonalAndMunicipalTax(
  taxableIncome: number,
  cantonCode: string,
  maritalStatus: string,
  hasChildren: boolean,
  childrenCount: number
): { cantonalTax: number; municipalTax: number } {
  if (taxableIncome <= 0) return { cantonalTax: 0, municipalTax: 0 };

  const canton = CANTONS_DATA[cantonCode] || CANTONS_DATA.ZH;
  const isMarried = maritalStatus.startsWith('married');

  // Baseline progressive rate curve (Switzerland median)
  let baseRate = 0;
  if (taxableIncome < 20000) {
    baseRate = 0.03;
  } else if (taxableIncome < 40000) {
    baseRate = 0.05 + ((taxableIncome - 20000) / 20000) * 0.03; // 5% -> 8%
  } else if (taxableIncome < 80000) {
    baseRate = 0.08 + ((taxableIncome - 40000) / 40000) * 0.045; // 8% -> 12.5%
  } else if (taxableIncome < 120000) {
    baseRate = 0.125 + ((taxableIncome - 80000) / 40000) * 0.035; // 12.5% -> 16%
  } else if (taxableIncome < 180000) {
    baseRate = 0.16 + ((taxableIncome - 120000) / 60000) * 0.03; // 16% -> 19%
  } else if (taxableIncome < 300000) {
    baseRate = 0.19 + ((taxableIncome - 180000) / 120000) * 0.035; // 19% -> 22.5%
  } else {
    baseRate = Math.min(0.225 + ((taxableIncome - 300000) / 200000) * 0.03, 0.28);
  }

  // Marital status adjustment (splitting or discount ~20-30%)
  if (isMarried) {
    baseRate *= 0.78;
  }

  // Children adjustment for cantonal tax
  if (hasChildren && childrenCount > 0) {
    baseRate *= Math.max(0.65, 1 - childrenCount * 0.06);
  }

  // Scale by canton's empirical tax index
  const adjustedCombinedRate = baseRate * canton.taxIndex;
  const totalCombinedTax = taxableIncome * adjustedCombinedRate;

  // Split between Canton and Municipality
  // In Switzerland, municipal tax is typically 80% - 130% of cantonal tax
  // On average, Canton is ~52%, Municipality is ~48%
  let cantonalShare = 0.52;
  if (cantonCode === 'BS') {
    // Basel-Stadt has unified communal/cantonal tax
    cantonalShare = 1.0;
  } else if (cantonCode === 'GE') {
    cantonalShare = 0.65;
  } else if (cantonCode === 'ZG') {
    cantonalShare = 0.55;
  }

  const cantonalTax = totalCombinedTax * cantonalShare;
  const municipalTax = totalCombinedTax * (1 - cantonalShare);

  return { cantonalTax, municipalTax };
}

/**
 * Helper to compute individual social security deductions for one person
 */
export function calculatePersonSocialSecurity(
  grossAnnual: number,
  months: number,
  age: number,
  nbuRate: number = 1.2,
  ktgRate: number = 0.8
): SocialSecurityDeductions {
  // AHV / IV / EO: 5.30% uncapped
  const ahvRate = 5.3;
  const ahvAnnual = grossAnnual * (ahvRate / 100);
  const ahvMonthly = ahvAnnual / months;

  // ALV: 1.10% capped at CHF 148,200
  const alvRate = 1.1;
  const alvInsuredSalary = Math.min(grossAnnual, UVG_ALV_CEILING);
  const alvAnnual = alvInsuredSalary * (alvRate / 100);
  const alvMonthly = alvAnnual / months;

  // NBU: Non-occupational accident (capped at 148,200)
  const nbuInsuredSalary = Math.min(grossAnnual, UVG_ALV_CEILING);
  const nbuAnnual = nbuInsuredSalary * (nbuRate / 100);
  const nbuMonthly = nbuAnnual / months;

  // KTG: Daily sickness allowance
  const ktgAnnual = grossAnnual * (ktgRate / 100);
  const ktgMonthly = ktgAnnual / months;

  // BVG / LPP: Occupational Pension (2nd Pillar)
  let bvgCoordinatedSalary = 0;
  let bvgAnnual = 0;
  const bvgRate = getBvgEmployeeRate(age);

  if (grossAnnual >= BVG_ENTRY_THRESHOLD) {
    const rawCoordinated = grossAnnual - BVG_COORDINATION_DEDUCTION;
    bvgCoordinatedSalary = Math.min(
      Math.max(rawCoordinated, BVG_MIN_COORDINATED_SALARY),
      BVG_MAX_COORDINATED_SALARY
    );
    bvgAnnual = bvgCoordinatedSalary * (bvgRate / 100);
  }
  const bvgMonthly = bvgAnnual / months;

  const totalDeductionsAnnual =
    ahvAnnual + alvAnnual + nbuAnnual + ktgAnnual + bvgAnnual;
  const totalDeductionsMonthly = totalDeductionsAnnual / months;
  const effectiveSocialRate =
    grossAnnual > 0 ? (totalDeductionsAnnual / grossAnnual) * 100 : 0;

  return {
    ahvRate,
    ahvAnnual,
    ahvMonthly,
    alvRate,
    alvAnnual,
    alvMonthly,
    nbuRate,
    nbuAnnual,
    nbuMonthly,
    ktgRate,
    ktgAnnual,
    ktgMonthly,
    bvgRate,
    bvgCoordinatedSalary,
    bvgAnnual,
    bvgMonthly,
    totalDeductionsAnnual,
    totalDeductionsMonthly,
    effectiveSocialRate,
  };
}

/**
 * Main Calculation Function with Dual-Income Separate Calculation
 */
export function calculateSwissSalary(inputs: CalculatorInputs): CalculationResult {
  const {
    grossSalary,
    salaryPeriod,
    numberOfMonths,
    cantonCode,
    maritalStatus,
    spouseGrossSalary = 0,
    spouseSalaryPeriod = 'annual',
    spouseNumberOfMonths = 12,
    spouseAge = 32,
    spousePillar3aContribution = 0,
    childrenUnder16,
    childrenEducation,
    age,
    isChurchMember = false,
    spouseIsChurchMember = false,
    pillar3aContribution = 0,
    includeHealthInsurance = false,
    nbuRate = 1.2,
    ktgRate = 0.8,
  } = inputs;

  const canton = CANTONS_DATA[cantonCode] || CANTONS_DATA.ZH;
  const isMarried = maritalStatus.startsWith('married');
  const isDualIncome = maritalStatus === 'married_dual_income';
  const totalChildren = childrenUnder16 + childrenEducation;

  // 1. Primary Earner Salary
  const primaryGrossAnnual =
    salaryPeriod === 'monthly' ? grossSalary * numberOfMonths : grossSalary;
  const primaryGrossMonthly = primaryGrossAnnual / numberOfMonths;

  const primarySocial = calculatePersonSocialSecurity(
    primaryGrossAnnual,
    numberOfMonths,
    age,
    nbuRate,
    ktgRate
  );

  const primaryNetBeforeTaxAnnual =
    primaryGrossAnnual - primarySocial.totalDeductionsAnnual;
  const primaryNetBeforeTaxMonthly = primaryNetBeforeTaxAnnual / numberOfMonths;

  // 2. Spouse Salary (if Married Dual Income)
  let spouseGrossAnnual = 0;
  let spouseGrossMonthly = 0;
  let spouseSocial = calculatePersonSocialSecurity(0, spouseNumberOfMonths, spouseAge, nbuRate, ktgRate);
  let spouseNetBeforeTaxAnnual = 0;
  let spouseNetBeforeTaxMonthly = 0;

  if (isDualIncome && spouseGrossSalary > 0) {
    spouseGrossAnnual =
      spouseSalaryPeriod === 'monthly'
        ? spouseGrossSalary * spouseNumberOfMonths
        : spouseGrossSalary;
    spouseGrossMonthly = spouseGrossAnnual / spouseNumberOfMonths;
    spouseSocial = calculatePersonSocialSecurity(
      spouseGrossAnnual,
      spouseNumberOfMonths,
      spouseAge,
      nbuRate,
      ktgRate
    );
    spouseNetBeforeTaxAnnual =
      spouseGrossAnnual - spouseSocial.totalDeductionsAnnual;
    spouseNetBeforeTaxMonthly = spouseNetBeforeTaxAnnual / spouseNumberOfMonths;
  }

  // 3. Child & Family Allowances
  const childAllowanceMonthly = childrenUnder16 * canton.childAllowanceMonthly;
  const childAllowanceAnnual = childAllowanceMonthly * 12;

  const educationAllowanceMonthly =
    childrenEducation * canton.educationAllowanceMonthly;
  const educationAllowanceAnnual = educationAllowanceMonthly * 12;

  const totalAllowanceAnnual = childAllowanceAnnual + educationAllowanceAnnual;
  const totalAllowanceMonthly = childAllowanceMonthly + educationAllowanceMonthly;

  const familyAllowances: FamilyAllowances = {
    childAllowanceAnnual,
    childAllowanceMonthly,
    educationAllowanceAnnual,
    educationAllowanceMonthly,
    totalAllowanceAnnual,
    totalAllowanceMonthly,
  };

  // 4. Combined Household Taxable Income Calculation
  const householdGrossAnnual = primaryGrossAnnual + spouseGrossAnnual;
  const totalSocialAnnual =
    primarySocial.totalDeductionsAnnual + spouseSocial.totalDeductionsAnnual;
  const totalSocialMonthly =
    primarySocial.totalDeductionsMonthly + spouseSocial.totalDeductionsMonthly;

  const primaryPillar3aCapped = Math.min(Math.max(0, pillar3aContribution), 7056);
  const spousePillar3aCapped = isDualIncome
    ? Math.min(Math.max(0, spousePillar3aContribution), 7056)
    : 0;
  const totalPillar3a = primaryPillar3aCapped + spousePillar3aCapped;

  const insuranceDeduction = isMarried
    ? FEDERAL_INSURANCE_DEDUCTION_MARRIED
    : FEDERAL_INSURANCE_DEDUCTION_SINGLE;
  const childDeductionsTotal = totalChildren * FEDERAL_CHILD_DEDUCTION;

  // Swiss dual-earner deduction (Zweitverdienerabzug): 50% of the lower income, min 3,400, max 13,600
  let dualIncomeDeduction = 0;
  if (isDualIncome && spouseGrossAnnual > 0 && primaryGrossAnnual > 0) {
    const lowerIncome = Math.min(primaryGrossAnnual, spouseGrossAnnual);
    dualIncomeDeduction = Math.min(Math.max(lowerIncome * 0.5, 3400), 13600);
  }

  const estimatedTaxableIncome = Math.max(
    0,
    householdGrossAnnual +
      totalAllowanceAnnual -
      totalSocialAnnual -
      totalPillar3a -
      (isDualIncome ? FEDERAL_PROFESSIONAL_DEDUCTION * 2 : FEDERAL_PROFESSIONAL_DEDUCTION) -
      insuranceDeduction -
      childDeductionsTotal -
      dualIncomeDeduction
  );

  let federalTaxAnnual = calculateFederalTax(estimatedTaxableIncome, isMarried);
  const federalTaxMonthly = federalTaxAnnual / 12;

  const { cantonalTax, municipalTax } = calculateCantonalAndMunicipalTax(
    estimatedTaxableIncome,
    cantonCode,
    maritalStatus,
    totalChildren > 0,
    totalChildren
  );

  const cantonalTaxAnnual = cantonalTax;
  const cantonalTaxMonthly = cantonalTaxAnnual / 12;

  const municipalTaxAnnual = municipalTax;
  const municipalTaxMonthly = municipalTaxAnnual / 12;

  // Church Tax (calculated for primary and spouse individually)
  const primaryShareRatio =
    isDualIncome && householdGrossAnnual > 0
      ? primaryGrossAnnual / householdGrossAnnual
      : 1;

  let primaryChurchTax = 0;
  let spouseChurchTax = 0;

  if (canton.hasChurchTax && cantonalTaxAnnual > 0) {
    if (isDualIncome) {
      if (isChurchMember) {
        primaryChurchTax =
          cantonalTaxAnnual * primaryShareRatio * (canton.churchTaxRate / 100);
      }
      if (spouseIsChurchMember) {
        spouseChurchTax =
          cantonalTaxAnnual * (1 - primaryShareRatio) * (canton.churchTaxRate / 100);
      }
    } else {
      if (isChurchMember) {
        primaryChurchTax = cantonalTaxAnnual * (canton.churchTaxRate / 100);
      }
    }
  }

  const churchTaxAnnual = primaryChurchTax + spouseChurchTax;
  const churchTaxMonthly = churchTaxAnnual / 12;

  const totalTaxAnnual =
    federalTaxAnnual + cantonalTaxAnnual + municipalTaxAnnual + churchTaxAnnual;
  const totalTaxMonthly = totalTaxAnnual / 12;

  const effectiveTaxRate =
    householdGrossAnnual > 0 ? (totalTaxAnnual / householdGrossAnnual) * 100 : 0;

  const tax: TaxDeductions = {
    federalTaxAnnual,
    federalTaxMonthly,
    cantonalTaxAnnual,
    cantonalTaxMonthly,
    municipalTaxAnnual,
    municipalTaxMonthly,
    churchTaxAnnual,
    churchTaxMonthly,
    totalTaxAnnual,
    totalTaxMonthly,
    effectiveTaxRate,
    taxableIncomeEstimated: estimatedTaxableIncome,
  };

  // 5. Apportion Tax Between Primary and Spouse
  const baseTaxesAnnual = federalTaxAnnual + cantonalTaxAnnual + municipalTaxAnnual;
  let primaryTaxShareAnnual = totalTaxAnnual;
  let spouseTaxShareAnnual = 0;

  if (isDualIncome && householdGrossAnnual > 0) {
    primaryTaxShareAnnual = baseTaxesAnnual * primaryShareRatio + primaryChurchTax;
    spouseTaxShareAnnual = baseTaxesAnnual * (1 - primaryShareRatio) + spouseChurchTax;
  }

  const primaryNetPayAnnual =
    primaryGrossAnnual -
    primarySocial.totalDeductionsAnnual +
    totalAllowanceAnnual -
    primaryTaxShareAnnual;
  const primaryNetPayMonthly = primaryNetPayAnnual / numberOfMonths;

  const primaryResult = {
    label: 'You (Primary Earner)',
    grossSalaryAnnual: primaryGrossAnnual,
    grossSalaryMonthly: primaryGrossMonthly,
    salaryPeriod,
    numberOfMonths,
    age,
    socialSecurity: primarySocial,
    netBeforeTaxAnnual: primaryNetBeforeTaxAnnual,
    netBeforeTaxMonthly: primaryNetBeforeTaxMonthly,
    taxShareAnnual: primaryTaxShareAnnual,
    taxShareMonthly: primaryTaxShareAnnual / numberOfMonths,
    effectiveTaxRate:
      primaryGrossAnnual > 0
        ? (primaryTaxShareAnnual / primaryGrossAnnual) * 100
        : 0,
    federalTaxAnnual: federalTaxAnnual * primaryShareRatio,
    cantonalTaxAnnual: cantonalTaxAnnual * primaryShareRatio,
    municipalTaxAnnual: municipalTaxAnnual * primaryShareRatio,
    churchTaxAnnual: primaryChurchTax,
    netPayAnnual: primaryNetPayAnnual,
    netPayMonthly: primaryNetPayMonthly,
    totalRetentionRate:
      primaryGrossAnnual > 0 ? (primaryNetPayAnnual / primaryGrossAnnual) * 100 : 0,
    pillar3a: primaryPillar3aCapped,
  };

  let spouseResult: typeof primaryResult | undefined = undefined;

  if (isDualIncome) {
    const spouseNetPayAnnual =
      spouseGrossAnnual -
      spouseSocial.totalDeductionsAnnual -
      spouseTaxShareAnnual;
    const spouseNetPayMonthly = spouseNetPayAnnual / spouseNumberOfMonths;

    spouseResult = {
      label: 'Spouse',
      grossSalaryAnnual: spouseGrossAnnual,
      grossSalaryMonthly: spouseGrossMonthly,
      salaryPeriod: spouseSalaryPeriod,
      numberOfMonths: spouseNumberOfMonths,
      age: spouseAge,
      socialSecurity: spouseSocial,
      netBeforeTaxAnnual: spouseNetBeforeTaxAnnual,
      netBeforeTaxMonthly: spouseNetBeforeTaxMonthly,
      taxShareAnnual: spouseTaxShareAnnual,
      taxShareMonthly: spouseTaxShareAnnual / spouseNumberOfMonths,
      effectiveTaxRate:
        spouseGrossAnnual > 0
          ? (spouseTaxShareAnnual / spouseGrossAnnual) * 100
          : 0,
      federalTaxAnnual: federalTaxAnnual * (1 - primaryShareRatio),
      cantonalTaxAnnual: cantonalTaxAnnual * (1 - primaryShareRatio),
      municipalTaxAnnual: municipalTaxAnnual * (1 - primaryShareRatio),
      churchTaxAnnual: spouseChurchTax,
      netPayAnnual: spouseNetPayAnnual,
      netPayMonthly: spouseNetPayMonthly,
      totalRetentionRate:
        spouseGrossAnnual > 0
          ? (spouseNetPayAnnual / spouseGrossAnnual) * 100
          : 0,
      pillar3a: spousePillar3aCapped,
    };
  }

  // 6. Overall Combined Net Take-Home Pay
  const netPayAnnual = isDualIncome
    ? primaryNetPayAnnual + (spouseResult?.netPayAnnual || 0)
    : primaryNetPayAnnual;
  const netPayMonthly = isDualIncome
    ? primaryNetPayMonthly + (spouseResult?.netPayMonthly || 0)
    : primaryNetPayMonthly;

  const netBeforeTaxAnnual = primaryNetBeforeTaxAnnual + spouseNetBeforeTaxAnnual;
  const netBeforeTaxMonthly = primaryNetBeforeTaxMonthly + spouseNetBeforeTaxMonthly;

  // 7. Health Insurance Benchmark
  const adultHealthMonthly = canton.avgHealthInsuranceMonthly * (isMarried ? 2 : 1);
  const childHealthMonthly = totalChildren * 110;
  const healthInsuranceMonthly = includeHealthInsurance
    ? adultHealthMonthly + childHealthMonthly
    : 0;
  const healthInsuranceAnnual = healthInsuranceMonthly * 12;

  const disposableIncomeAnnual = netPayAnnual - healthInsuranceAnnual;
  const disposableIncomeMonthly = disposableIncomeAnnual / numberOfMonths;

  // 8. Employer Social Costs (for primary employer)
  const ahvEmployerAnnual = primarySocial.ahvAnnual;
  const alvEmployerAnnual = primarySocial.alvAnnual;
  const bvgEmployerAnnual = primarySocial.bvgAnnual;
  const fakEmployerAnnual = primaryGrossAnnual * 0.018;
  const buEmployerAnnual = Math.min(primaryGrossAnnual, UVG_ALV_CEILING) * 0.002;

  const totalEmployerCostAnnual =
    primaryGrossAnnual +
    ahvEmployerAnnual +
    alvEmployerAnnual +
    bvgEmployerAnnual +
    fakEmployerAnnual +
    buEmployerAnnual;
  const totalEmployerCostMonthly = totalEmployerCostAnnual / numberOfMonths;

  const employerCost: EmployerContributions = {
    ahvEmployerAnnual,
    alvEmployerAnnual,
    bvgEmployerAnnual,
    fakEmployerAnnual,
    buEmployerAnnual,
    totalEmployerCostAnnual,
    totalEmployerCostMonthly,
  };

  const totalRetentionRate =
    householdGrossAnnual > 0 ? (netPayAnnual / householdGrossAnnual) * 100 : 0;

  return {
    inputs,
    canton,
    isDualIncome,
    primaryResult,
    spouseResult,
    grossSalaryAnnual: isDualIncome ? householdGrossAnnual : primaryGrossAnnual,
    grossSalaryMonthly: isDualIncome ? primaryGrossMonthly + spouseGrossMonthly : primaryGrossMonthly,
    socialSecurity: isDualIncome
      ? {
          ...primarySocial,
          totalDeductionsAnnual: totalSocialAnnual,
          totalDeductionsMonthly: totalSocialMonthly,
          effectiveSocialRate: householdGrossAnnual > 0 ? (totalSocialAnnual / householdGrossAnnual) * 100 : 0,
        }
      : primarySocial,
    familyAllowances,
    netBeforeTaxAnnual,
    netBeforeTaxMonthly,
    tax,
    netPayAnnual,
    netPayMonthly,
    disposableIncomeAnnual,
    disposableIncomeMonthly,
    healthInsuranceAnnual,
    healthInsuranceMonthly,
    employerCost,
    totalRetentionRate,
  };
}

/**
 * Calculate comparisons for all 26 cantons given the same input profile
 */
export function calculateAllCantonsComparison(
  inputs: CalculatorInputs
): Array<{
  canton: typeof CANTONS_DATA[string];
  netPayAnnual: number;
  netPayMonthly: number;
  totalTaxAnnual: number;
  effectiveTaxRate: number;
  childAllowanceAnnual: number;
  healthInsuranceAnnual: number;
  disposableAnnual: number;
  differenceToSelected: number;
}> {
  const currentResult = calculateSwissSalary(inputs);
  const results = Object.keys(CANTONS_DATA).map((cantonKey) => {
    const cantonInputs: CalculatorInputs = { ...inputs, cantonCode: cantonKey };
    const res = calculateSwissSalary(cantonInputs);
    return {
      canton: res.canton,
      netPayAnnual: res.netPayAnnual,
      netPayMonthly: res.netPayMonthly,
      totalTaxAnnual: res.tax.totalTaxAnnual,
      effectiveTaxRate: res.tax.effectiveTaxRate,
      childAllowanceAnnual: res.familyAllowances.totalAllowanceAnnual,
      healthInsuranceAnnual: res.healthInsuranceAnnual,
      disposableAnnual: res.disposableIncomeAnnual,
      differenceToSelected: res.netPayAnnual - currentResult.netPayAnnual,
    };
  });

  // Sort by highest net pay
  return results.sort((a, b) => b.netPayAnnual - a.netPayAnnual);
}

/**
 * Format currency in Swiss Francs (CHF)
 */
export function formatCHF(amount: number, decimals: number = 0): string {
  if (isNaN(amount)) return 'CHF 0';
  const rounded = decimals > 0 ? amount.toFixed(decimals) : Math.round(amount).toString();
  // Format with Swiss apostrophe or thin space for thousands: e.g. CHF 85'000
  const parts = rounded.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, "'");
  return `CHF ${parts.join('.')}`;
}

export function formatPercent(rate: number, decimals: number = 2): string {
  return `${rate.toFixed(decimals)}%`;
}
