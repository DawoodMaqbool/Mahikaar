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
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/95 backdrop-blur-md border-b border-outline-variant/40">
      <div className="h-20 w-full max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        <Link
          href={routes.home}
          onClick={closeMenu}
          aria-label="Māhikar Atelier — Home"
          className="flex items-center gap-3.5 group min-w-fit"
        >
          {/* Crest only; the name beside it is real text, so it stays sharp and uses the web fonts. */}
          <Image
            src="/brand/mahikar-crest.svg"
            alt=""
            width={31}
            height={40}
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-95"
          />
          <span className="flex flex-col">
            <span className="type-headline-sm tracking-tight text-on-surface leading-tight">
              Māhikar
            </span>
            <span className="hidden sm:block type-label-sm uppercase tracking-[0.2em] text-secondary font-medium">
              Atelier &amp; Manufacture • Lahore
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
                className={`type-label-md uppercase transition-colors py-1 ${
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
            href={routes.contact}
            className="hidden xl:inline-flex items-center type-label-sm uppercase tracking-[0.18em] text-secondary hover:text-on-surface transition-colors"
          >
            Atelier Direct
          </Link>
          <Link
            href={routes.quote}
            className="relative hidden lg:inline-flex items-center justify-center px-5 py-2.5 bg-primary-container text-surface hover:bg-secondary hover:text-on-secondary transition-all duration-200 border border-secondary-container/30 shadow-[0_2px_8px_-2px_rgba(28,27,26,0.15)] group"
          >
            <span className="type-label-md uppercase tracking-[0.18em]">Request a Quote</span>
            <span
              aria-hidden="true"
              className="absolute -inset-px border border-secondary-container/40 pointer-events-none group-hover:border-secondary"
            />
          </Link>
          <div
            aria-hidden="true"
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
          >
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
          <button
            type="button"
            className="wide:hidden -mr-2 p-2 text-on-surface"
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
        className="wide:hidden border-t border-outline-variant/40 bg-surface"
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
                  className={`block py-4 type-label-md uppercase tracking-wider ${
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
              className="flex justify-center px-5 py-3.5 bg-primary-container text-surface hover:bg-secondary transition-colors type-label-md uppercase tracking-[0.18em]"
            >
              Request a Quote
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
