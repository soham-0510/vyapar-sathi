'use client';

import { User } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn?: boolean;
  hideMenu?: boolean;
}

export function Header({ isLoggedIn = false, hideMenu = false }: HeaderProps) {

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 md:px-6 py-4 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">V</span>
            </div>
            <span className="font-bold text-lg hidden sm:inline text-foreground">
              Vyapar Sathi
            </span>
          </Link>

          {!hideMenu && (
            <div className="flex items-center gap-3">
              <Link
                href="/profile"
                className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
                aria-label="Profile"
              >
                <User className="w-6 h-6" />
              </Link>
              {/* Menu button is handled by SterlingGateNavigation - spacer to avoid overlap */}
              <div className="w-24" />
            </div>
          )}
        </div>
      </header>

    </>
  );
}
