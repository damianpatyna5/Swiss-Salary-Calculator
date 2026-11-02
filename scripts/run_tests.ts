import { calculateSwissSalary, getBvgEmployeeRate } from '../src/utils/calculator';
import { ROUTE_METADATA, normalizePath } from '../src/router';
import { CalculatorInputs } from '../src/types/calculator';

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    console.log(`  ✓ PASS: ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('--- Test Suite 1: Statutory Social Contributions & Worked Example ---');
const baseInputs: CalculatorInputs = {
  grossSalary: 80000,
  salaryPeriod: 'annual',
  numberOfMonths: 12,
  cantonCode: 'ZH',
  maritalStatus: 'single',
  spouseGrossSalary: 0,
  spouseSalaryPeriod: 'annual',
  spouseNumberOfMonths: 12,
  spouseAge: 32,
  spouseIsChurchMember: false,
  childrenUnder16: 0,
  childrenEducation: 0,
  age: 32,
  isChurchMember: false,
  taxationType: 'ordinary',
  includeHealthInsurance: false,
  nbuRate: 1.2,
  ktgRate: 0.8,
  residenceStatus: 'resident',
};

const res80k = calculateSwissSalary(baseInputs);
assert(Math.abs(res80k.socialSecurity.ahvAnnual - 4240.0) < 0.1, 'AHV/IV/EO annual is exactly 5.3% of 80,000 (CHF 4,240.00)');
assert(Math.abs(res80k.socialSecurity.alvAnnual - 880.0) < 0.1, 'ALV annual is 1.1% of 80,000 (CHF 880.00)');
assert(Math.abs(res80k.socialSecurity.bvgAnnual - 1899.63) < 0.5, 'BVG annual for age 32 is 3.5% of coordinated CHF 54,275 (~CHF 1,899.63)');
assert(Math.abs(res80k.socialSecurity.totalDeductionsAnnual - 8619.63) < 1.0, 'Total social deductions match worked example (~CHF 8,619.63)');
assert(Math.abs(res80k.netBeforeTaxAnnual - 71380.37) < 1.0, 'Net salary before tax matches worked example (~CHF 71,380.37)');
assert(res80k.netPayAnnual > 63000 && res80k.netPayAnnual < 65000, `Net take-home pay is within expected Zurich range (~CHF 64,081, actual: CHF ${Math.round(res80k.netPayAnnual)})`);

console.log('\n--- Test Suite 2: ALV Ceiling & Surtax Abolition ---');
const highIncomeInputs: CalculatorInputs = {
  ...baseInputs,
  grossSalary: 250000,
};
const res250k = calculateSwissSalary(highIncomeInputs);
// Max ALV ceiling is CHF 148,200 * 1.1% = CHF 1,630.20
assert(
  Math.abs(res250k.socialSecurity.alvAnnual - 1630.20) < 0.5,
  `ALV is capped at CHF 1,630.20 for salaries exceeding CHF 148,200 (actual: CHF ${res250k.socialSecurity.alvAnnual})`
);

console.log('\n--- Test Suite 3: BVG Statutory Age Scales ---');
assert(getBvgEmployeeRate(22) === 0.7, 'Under 25 employee BVG risk rate is 0.7%');
assert(getBvgEmployeeRate(30) === 3.5, 'Age 25-34 employee BVG rate is 3.5%');
assert(getBvgEmployeeRate(40) === 5.0, 'Age 35-44 employee BVG rate is 5.0%');
assert(getBvgEmployeeRate(50) === 7.5, 'Age 45-54 employee BVG rate is 7.5%');
assert(getBvgEmployeeRate(60) === 9.0, 'Age 55-65 employee BVG rate is 9.0%');

console.log('\n--- Test Suite 4: 12 vs 13 Month Frequency Consistency ---');
const inputs13m: CalculatorInputs = {
  ...baseInputs,
  numberOfMonths: 13,
};
const res13m = calculateSwissSalary(inputs13m);
assert(
  Math.abs(res80k.netPayAnnual - res13m.netPayAnnual) < 1.0,
  'Annual net pay is identical whether scheduled over 12 or 13 payment periods'
);
assert(
  Math.abs(res13m.netPayMonthly * 13 - res13m.netPayAnnual) < 2.0,
  'Monthly net pay on 13-month schedule correctly equals annual net divided by 13'
);

console.log('\n--- Test Suite 5: Route Normalization & Ad Eligibility ---');
assert(normalizePath('/') === '/', 'Root path normalizes to "/"');
assert(normalizePath('/budget') === '/budget/', '"/budget" normalizes to "/budget/"');
assert(normalizePath('/compare-cantons/') === '/compare-cantons/', '"/compare-cantons/" remains unchanged');
assert(normalizePath('/methodology?query=test') === '/methodology/', 'Query params stripped and path normalized');

const canonicalRoutes = [
  '/',
  '/budget/',
  '/compare-cantons/',
  '/payslip/',
  '/guide/',
  '/methodology/',
  '/about/',
  '/contact/',
  '/privacy/',
  '/terms/',
];

for (const route of canonicalRoutes) {
  const meta = ROUTE_METADATA[route];
  assert(!!meta, `Route ${route} is defined in ROUTE_METADATA`);
  assert(meta.title.length > 10, `Route ${route} has descriptive title (${meta.title})`);
  assert(meta.description.length > 20, `Route ${route} has descriptive meta description`);
}

// Strict AdSense policy check
assert(ROUTE_METADATA['/about/'].allowAds === false, 'Ads strictly disabled on /about/');
assert(ROUTE_METADATA['/contact/'].allowAds === false, 'Ads strictly disabled on /contact/');
assert(ROUTE_METADATA['/privacy/'].allowAds === false, 'Ads strictly disabled on /privacy/');
assert(ROUTE_METADATA['/terms/'].allowAds === false, 'Ads strictly disabled on /terms/');
assert(ROUTE_METADATA['/'].allowAds === true, 'Ads enabled on content route /');
assert(ROUTE_METADATA['/methodology/'].allowAds === true, 'Ads enabled on content route /methodology/');

console.log(`\n========================================`);
console.log(`Results: ${passed} Passed, ${failed} Failed`);
console.log(`========================================`);

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All automated tests passed successfully!');
}
