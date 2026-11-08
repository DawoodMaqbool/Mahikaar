"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { mainNav, routes } from "@/lib/site";

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface border-b border-outline-variant/40">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link
          href={routes.home}
          onClick={closeMenu}
          aria-label="Mahikaar — Home"
          className="flex items-center gap-3.5 min-w-fit focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
        >
          {/* Crest only; the name beside it is real text, so it stays sharp and uses the web fonts. */}
          <Image
            src="/brand/mahikaar-crest.svg"
            alt=""
            width={31}
            height={40}
            className="h-10 w-auto"
          />
          <span className="flex flex-col">
            <span className="type-headline-sm tracking-tight text-on-surface leading-tight">
              Mahikaar
            </span>
            <span className="hidden sm:block type-label-sm uppercase tracking-[0.2em] text-secondary font-medium">
              Made-to-Order Footwear • Lahore
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden wide:flex items-center space-x-7 tracking-wider">
          {mainNav.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`type-label-md uppercase transition-colors py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary ${
                  current
                    ? "text-primary font-semibold border-b border-secondary pb-1"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5 min-w-fit">
          <Link
            href={routes.quote}
            className="hidden lg:inline-flex min-h-12 items-center justify-center px-5 py-3 bg-ink text-surface hover:bg-secondary hover:text-on-secondary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
          >
            <span className="type-label-md uppercase tracking-[0.18em]">Request a Quote</span>
          </Link>
          <button
            type="button"
            className="wide:hidden -mr-2 min-h-12 min-w-12 flex items-center justify-center text-on-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>

      {/* Below the wide breakpoint the desktop nav is hidden, so the same links live in this panel. */}
      <nav
        id="mobile-nav"
        aria-label="Main"
        hidden={!menuOpen}
        className="wide:hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-outline-variant/40 bg-surface"
      >
        <ul className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4 divide-y divide-outline-variant/30">
          {mainNav.map((link) => {
            const current = isCurrent(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  aria-current={current ? "page" : undefined}
                  className={`block py-4 type-label-md uppercase tracking-wider focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary ${
                    current ? "text-primary" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="pt-4 lg:hidden">
            <Link
              href={routes.quote}
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-center px-5 py-3.5 bg-ink text-surface hover:bg-secondary transition-colors type-label-md uppercase tracking-[0.18em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Request a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
