import React, { AnchorHTMLAttributes } from 'react';
import { useRouter, normalizePath } from '../router';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  href,
  replace,
  onClick,
  children,
  className,
  ...rest
}) => {
  const { navigate } = useRouter();
  const normalized = normalizePath(href);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Allow normal browser behavior for modified clicks (cmd/ctrl/shift/alt or middle click)
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    // Internal navigation
    if (href.startsWith('/') || href.startsWith('#')) {
      e.preventDefault();
      navigate(normalized, { replace });
    }
  };

  return (
    <a href={normalized} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
};
