import React, { useEffect, useRef } from 'react';
import { useRouter } from '../router';

interface AdPlacementProps {
  slot?: string;
  format?: 'auto' | 'horizontal' | 'rectangle';
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export const AdPlacement: React.FC<AdPlacementProps> = ({
  slot = '1234567890',
  format = 'auto',
  className = '',
}) => {
  const { meta, is404 } = useRouter();
  const adRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  // Strict check: No ads on legal/about/contact/terms/privacy or 404 pages
  if (!meta.allowAds || is404) {
    return null;
  }

  useEffect(() => {
    // Only attempt to push when window.adsbygoogle is available and hasn't been pushed for this element
    if (typeof window !== 'undefined' && !pushedRef.current) {
      try {
        if (window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          pushedRef.current = true;
        }
      } catch (err) {
        // Suppress silently if AdSense already populated or blocked
      }
    }
  }, []);

  return (
    <div
      ref={adRef}
      className={`w-full my-6 text-center overflow-hidden transition-all ${className}`}
      aria-label="Advertisement"
    >
      <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium mb-1">
        Advertisement
      </div>
      <div className="min-h-[90px] w-full flex items-center justify-center bg-slate-100/70 rounded-xl border border-dashed border-slate-300/80 p-2">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', width: '100%' }}
          data-ad-client="ca-pub-8017910120366285"
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};
