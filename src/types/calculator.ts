export type MaritalStatus = 'single' | 'married_single_income' | 'married_dual_income';

export type ChurchAffiliation = 'none' | 'roman_catholic' | 'reformed' | 'christian_catholic';

export type TaxationType = 'ordinary' | 'quellensteuer';

export type AgeGroup = 'under_25' | '25_34' | '35_44' | '45_54' | '55_65' | 'over_65';

export interface CantonInfo {
  code: string;
  name: string;
  nameDe: string;
  nameFr: string;
  capital: string;
  language: 'de' | 'fr' | 'it' | 'bi';
  childAllowanceMonthly: number; // For children < 16
  educationAllowanceMonthly: number; // For children 16-25 in training
  taxIndex: number; // Relative tax burden index (national median ~1.0)
  cantonalMultiplier: number; // %
  avgMunicipalMultiplier: number; // %
  churchTaxRate: number; // % of cantonal tax
  hasChurchTax: boolean; // false for GE and NE (voluntary)
  avgHealthInsuranceMonthly: number; // KVG basic health insurance adult benchmark
}

export interface CalculatorInputs {
  grossSalary: number; // CHF
  salaryPeriod: 'monthly' | 'annual';
  numberOfMonths: 12 | 13;
  cantonCode: string;
  maritalStatus: MaritalStatus;
  // Spouse details for Married (Dual Income)
  spouseGrossSalary: number; // CHF
  spouseSalaryPeriod: 'monthly' | 'annual';
  spouseNumberOfMonths: 12 | 13;
  spouseAge: number;
  spousePillar3aContribution: number;
  // Children & Family
  childrenUnder16: number;
  childrenEducation: number; // 16-25 in education
  age: number; // Used for BVG
  isChurchMember: boolean; // Yes / No
  taxationType: TaxationType;
  pillar3aContribution: number; // Max CHF 7,056 for employees
  includeHealthInsurance: boolean;
  nbuRate?: number; // Statutory default 1.2%
  ktgRate?: number; // Statutory default 0.8%
}

export interface SocialSecurityDeductions {
  // AHV / IV / EO (1st Pillar)
  ahvRate: number;
  ahvAnnual: number;
  ahvMonthly: number;
  // ALV (Unemployment)
  alvRate: number;
  alvAnnual: number;
  alvMonthly: number;
  // NBU (Non-occupational accident)
  nbuRate: number;
  nbuAnnual: number;
  nbuMonthly: number;
  // KTG (Daily sickness allowance)
  ktgRate: number;
  ktgAnnual: number;
  ktgMonthly: number;
  // BVG / LPP (Occupational Pension - 2nd Pillar)
  bvgRate: number;
  bvgCoordinatedSalary: number;
  bvgAnnual: number;
  bvgMonthly: number;
  // Totals
  totalDeductionsAnnual: number;
  totalDeductionsMonthly: number;
  effectiveSocialRate: number; // % of gross
}

export interface FamilyAllowances {
  childAllowanceAnnual: number;
  childAllowanceMonthly: number;
  educationAllowanceAnnual: number;
  educationAllowanceMonthly: number;
  totalAllowanceAnnual: number;
  totalAllowanceMonthly: number;
}

export interface TaxDeductions {
  federalTaxAnnual: number;
  federalTaxMonthly: number;
  cantonalTaxAnnual: number;
  cantonalTaxMonthly: number;
  municipalTaxAnnual: number;
  municipalTaxMonthly: number;
  churchTaxAnnual: number;
  churchTaxMonthly: number;
  totalTaxAnnual: number;
  totalTaxMonthly: number;
  effectiveTaxRate: number; // % of taxable / gross
  taxableIncomeEstimated: number;
}

export interface EmployerContributions {
  ahvEmployerAnnual: number;
  alvEmployerAnnual: number;
  bvgEmployerAnnual: number;
  fakEmployerAnnual: number; // Family allowance compensation fund ~1.5%
  buEmployerAnnual: number; // Occupational accident insurance ~0.2%
  totalEmployerCostAnnual: number;
  totalEmployerCostMonthly: number;
}

export interface IndividualSalaryResult {
  label: string;
  grossSalaryAnnual: number;
  grossSalaryMonthly: number;
  salaryPeriod: 'monthly' | 'annual';
  numberOfMonths: 12 | 13;
  age: number;
  socialSecurity: SocialSecurityDeductions;
  netBeforeTaxAnnual: number;
  netBeforeTaxMonthly: number;
  taxShareAnnual: number;
  taxShareMonthly: number;
  effectiveTaxRate: number;
  netPayAnnual: number;
  netPayMonthly: number;
  totalRetentionRate: number;
  pillar3a: number;
}

export interface CalculationResult {
  inputs: CalculatorInputs;
  canton: CantonInfo;
  isDualIncome: boolean;
  // Primary Earner individual result
  primaryResult: IndividualSalaryResult;
  // Spouse individual result (if dual income)
  spouseResult?: IndividualSalaryResult;
  // Combined or Selected Summary
  grossSalaryAnnual: number;
  grossSalaryMonthly: number;
  socialSecurity: SocialSecurityDeductions;
  familyAllowances: FamilyAllowances;
  netBeforeTaxAnnual: number;
  netBeforeTaxMonthly: number;
  tax: TaxDeductions;
  netPayAnnual: number; // Disbursed salary (Nettolohn nach Steuern)
  netPayMonthly: number;
  disposableIncomeAnnual: number;
  disposableIncomeMonthly: number;
  healthInsuranceAnnual: number;
  healthInsuranceMonthly: number;
  employerCost: EmployerContributions;
  totalRetentionRate: number; // Net / Gross %
}

