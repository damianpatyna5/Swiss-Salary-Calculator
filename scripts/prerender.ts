import fs from 'node:fs';
import path from 'node:path';
import { ROUTE_METADATA, CANONICAL_ORIGIN } from '../src/router';

const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error('dist directory does not exist. Run "vite build" first.');
  process.exit(1);
}

const templatePath = path.join(distDir, 'index.html');
const templateHtml = fs.readFileSync(templatePath, 'utf-8');

console.log('Generating pre-rendered static routes for search crawlers...');

// Route descriptions & fallback static initial content for crawler indexation
const ROUTE_CONTENT: Record<string, string> = {
  '/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Swiss Gross-to-Net Salary Calculator</h1>
      <p class="text-slate-600 mt-2">Estimate your exact take-home pay, statutory social security contributions (AHV, IV, EO, ALV), age-based occupational pension fund deductions (BVG), and estimated income taxes across all 26 Swiss cantons.</p>
    </header>
  `,
  '/budget/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Swiss Household Budget & Living Cost Calculator</h1>
      <p class="text-slate-600 mt-2">Plan housing rent, mandatory health insurance premiums (KVG/LAMal), utilities, groceries, and savings based on official BFS household budget survey benchmarks.</p>
    </header>
  `,
  '/compare-cantons/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">26 Cantons Salary & Tax Comparison</h1>
      <p class="text-slate-600 mt-2">Compare net take-home salary, cantonal tax rates, and tax multipliers across all 26 Swiss cantons holding your compensation and household profile constant.</p>
    </header>
  `,
  '/payslip/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Illustrative Swiss Payslip Preview (Estimated Lohnabrechnung)</h1>
      <p class="text-slate-600 mt-2">An itemized preview of employee gross compensation, statutory 1st and 2nd pillar social deductions, and estimated tax withholdings.</p>
    </header>
  `,
  '/guide/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Complete Swiss Salary & Payroll Guide</h1>
      <p class="text-slate-600 mt-2">Understand Swiss payroll structure, gross vs. net earnings, the 13th month salary, pillar 2 pension age brackets, and withholding tax vs. regular tax assessment.</p>
    </header>
  `,
  '/methodology/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Calculation Methodology, Statutory Rates & Sources (2025/2026)</h1>
      <p class="text-slate-600 mt-2">Documented mathematical formulas, statutory BSV/ESTV rates, BVG age scales, cross-border treaty rules (France 1983, Geneva 1973, Germany Art. 15a, Italy 2024), and known limitations.</p>
    </header>
  `,
  '/about/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">About LohnLab.ch</h1>
      <p class="text-slate-600 mt-2">An independent Swiss digital project created to provide transparent, private, client-side gross-to-net salary and budget calculations.</p>
    </header>
  `,
  '/contact/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Contact LohnLab.ch</h1>
      <p class="text-slate-600 mt-2">Direct email contact: contact@lohnlab.ch for calculation feedback, statutory rate updates, or technical questions.</p>
    </header>
  `,
  '/privacy/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Privacy Policy (Datenschutzerklärung)</h1>
      <p class="text-slate-600 mt-2">100% ephemeral client-side salary computing. Compliant with Swiss Federal Act on Data Protection (revDSG) and EU GDPR. Google AdSense cookie disclosure.</p>
    </header>
  `,
  '/terms/': `
    <header class="max-w-4xl mx-auto py-8">
      <h1 class="text-3xl font-extrabold text-slate-900">Terms of Service</h1>
      <p class="text-slate-600 mt-2">Non-binding mathematical simulation and educational estimation disclaimer. Governed by Swiss law.</p>
    </header>
  `,
};

function renderPage(meta: typeof ROUTE_METADATA[string], initialContentHtml: string): string {
  let html = templateHtml;

  // Replace title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${meta.title}</title>`);

  // Replace meta description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${meta.description}" />`
  );

  // Replace canonical link
  const canonicalUrl = `${CANONICAL_ORIGIN}${meta.canonicalPath === '/' ? '/' : meta.canonicalPath}`;
  html = html.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace OpenGraph
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${meta.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${meta.description}" />`
  );
  html = html.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // If ads are not allowed on this route, remove the adsense script from static markup
  if (!meta.allowAds) {
    html = html.replace(/<script async src="https:\/\/pagead2\.googlesyndication\.com.*?<\/script>/is, '');
  }

  // Pre-seed the initial HTML content inside #root for crawlers before hydration
  html = html.replace('<div id="root"></div>', `<div id="root">${initialContentHtml}</div>`);

  return html;
}

// Generate for all routes
for (const [routePath, meta] of Object.entries(ROUTE_METADATA)) {
  const content = ROUTE_CONTENT[routePath] || '';
  const rendered = renderPage(meta, content);

  if (routePath === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), rendered, 'utf-8');
    console.log(`✓ Pre-rendered / -> dist/index.html`);
  } else {
    const cleanDir = routePath.replace(/^\//, '').replace(/\/$/, '');
    const targetDir = path.join(distDir, cleanDir);
    fs.mkdirSync(targetDir, { recursive: true });
    fs.writeFileSync(path.join(targetDir, 'index.html'), rendered, 'utf-8');
    console.log(`✓ Pre-rendered ${routePath} -> dist/${cleanDir}/index.html`);
  }
}

// Generate 404.html without ads
const notFoundMeta = {
  title: 'Page Not Found (404) | LohnLab.ch',
  description: 'The requested Swiss salary calculator page could not be found.',
  canonicalPath: '/404.html',
  h1: 'Page Not Found (404)',
  allowAds: false,
};
const notFoundHtml = renderPage(
  notFoundMeta,
  `<div class="max-w-xl mx-auto py-16 text-center">
    <h1 class="text-3xl font-extrabold text-slate-900">404 - Page Not Found</h1>
    <p class="text-slate-600 mt-3">The requested page could not be found. <a href="/" class="text-red-600 underline">Return to Swiss Salary Calculator</a></p>
  </div>`
);
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');
console.log('✓ Pre-rendered 404 -> dist/404.html');

console.log('Static pre-rendering completed successfully!');
