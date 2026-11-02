import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface RouteMeta {
  title: string;
  description: string;
  canonicalPath: string;
  h1: string;
  allowAds: boolean;
}

export const ROUTE_METADATA: Record<string, RouteMeta> = {
  '/': {
    title: 'Swiss Salary Calculator 2025/2026 | Gross to Net Lohnrechner Schweiz',
    description: 'Calculate your exact Swiss net take-home pay, social security (AHV/ALV/BVG), and estimated federal, cantonal, and municipal taxes across all 26 cantons.',
    canonicalPath: '/',
    h1: 'Swiss Gross-to-Net Salary Calculator',
    allowAds: true,
  },
  '/budget/': {
    title: 'Swiss Budget & Living Cost Calculator | LohnLab.ch',
    description: 'Plan your monthly living costs, mandatory health insurance, rent, savings, and disposable income in Switzerland using official BFS benchmark guidelines.',
    canonicalPath: '/budget/',
    h1: 'Swiss Household Budget & Living Cost Calculator',
    allowAds: true,
  },
  '/compare-cantons/': {
    title: 'Compare Swiss Cantons: Salary & Tax Comparison | LohnLab.ch',
    description: 'Compare net take-home salary, cantonal tax rates, and tax multipliers across all 26 Swiss cantons from Zurich and Zug to Geneva and Bern.',
    canonicalPath: '/compare-cantons/',
    h1: '26 Cantons Salary & Tax Comparison',
    allowAds: true,
  },
  '/payslip/': {
    title: 'Illustrative Swiss Payslip Preview (Estimated Lohnabrechnung) | LohnLab.ch',
    description: 'View an illustrative, itemized Swiss payslip preview detailing employee gross salary, statutory social contributions, and estimated income tax withholding.',
    canonicalPath: '/payslip/',
    h1: 'Illustrative Swiss Payslip Preview',
    allowAds: true,
  },
  '/guide/': {
    title: 'Swiss Salary & Payroll Guide: Gross vs. Net, BVG, and Taxes | LohnLab.ch',
    description: 'A comprehensive, transparent guide to understanding Swiss payroll, 12 vs 13 payments, social deductions, pillar 2 pensions, and tax assessment.',
    canonicalPath: '/guide/',
    h1: 'Complete Swiss Salary & Payroll Guide',
    allowAds: true,
  },
  '/methodology/': {
    title: 'Calculation Methodology, Statutory Rates & Sources (2025/2026) | LohnLab.ch',
    description: 'Transparent mathematical formulas, statutory BSV/ESTV rates, BVG age scales, cross-border treaty rules, and known limitations used by LohnLab.ch.',
    canonicalPath: '/methodology/',
    h1: 'Calculation Methodology & Official Sources',
    allowAds: true,
  },
  '/about/': {
    title: 'About LohnLab.ch | Independent Swiss Financial Resource',
    description: 'Learn about LohnLab.ch, an independent, client-side educational resource dedicated to making Swiss salaries, taxes, and living costs transparent.',
    canonicalPath: '/about/',
    h1: 'About LohnLab.ch',
    allowAds: false, // Strict policy: no ads on informational/legal screens
  },
  '/contact/': {
    title: 'Contact LohnLab.ch | Direct Editorial & Technical Contact',
    description: 'Get in touch with the creator of LohnLab.ch regarding calculation feedback, rate updates, or feature recommendations.',
    canonicalPath: '/contact/',
    h1: 'Contact LohnLab.ch',
    allowAds: false, // Strict policy: no ads on contact screen
  },
  '/privacy/': {
    title: 'Privacy Policy (Datenschutzerklärung) | LohnLab.ch',
    description: 'LohnLab.ch privacy policy: 100% ephemeral client-side salary computing, revDSG and GDPR compliance, and transparent Google AdSense cookie management.',
    canonicalPath: '/privacy/',
    h1: 'Privacy Policy (Datenschutzerklärung)',
    allowAds: false, // Strict policy: no ads on legal policy screens
  },
  '/terms/': {
    title: 'Terms of Service | LohnLab.ch',
    description: 'Terms of service for using LohnLab.ch. All calculations are provided for educational estimation purposes and do not constitute official tax advice.',
    canonicalPath: '/terms/',
    h1: 'Terms of Service',
    allowAds: false, // Strict policy: no ads on legal policy screens
  },
};

/**
 * Normalizes any pathname to match canonical route key.
 * E.g., "" or "/" -> "/"
 * "/budget" or "/budget/" -> "/budget/"
 */
export function normalizePath(path: string): string {
  if (!path || path === '/' || path === '') return '/';
  const clean = path.split('?')[0].split('#')[0];
  const withTrailing = clean.endsWith('/') ? clean : `${clean}/`;
  return withTrailing;
}

interface RouterContextType {
  currentPath: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
  meta: RouteMeta;
  is404: boolean;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const CANONICAL_ORIGIN = 'https://lohnlab.ch';

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return normalizePath(window.location.pathname);
    }
    return '/';
  });

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const target = normalizePath(to);
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState({}, '', target);
      } else if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(normalizePath(window.location.pathname));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const meta = ROUTE_METADATA[currentPath] || {
    title: 'Page Not Found (404) | LohnLab.ch',
    description: 'The requested Swiss salary calculator or guide page could not be found. Explore our calculators and resources.',
    canonicalPath: currentPath,
    h1: 'Page Not Found (404)',
    allowAds: false,
  };

  const is404 = !ROUTE_METADATA[currentPath];

  // Dynamically update document title, description, and canonical link
  useEffect(() => {
    if (typeof document === 'undefined') return;

    document.title = meta.title;

    // Update or create meta description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Update or create canonical link
    let canonicalTag = document.querySelector('link[rel="canonical"]');
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    const fullCanonical = `${CANONICAL_ORIGIN}${meta.canonicalPath === '/' ? '/' : meta.canonicalPath}`;
    canonicalTag.setAttribute('href', fullCanonical);

    // Update OpenGraph
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', meta.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', meta.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', fullCanonical);
    } else {
      const newOgUrl = document.createElement('meta');
      newOgUrl.setAttribute('property', 'og:url');
      newOgUrl.setAttribute('content', fullCanonical);
      document.head.appendChild(newOgUrl);
    }
  }, [meta]);

  return (
    <RouterContext.Provider value={{ currentPath, navigate, meta, is404 }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter(): RouterContextType {
  const ctx = useContext(RouterContext);
  if (!ctx) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return ctx;
}
