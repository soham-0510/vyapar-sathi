'use client';

import { useState } from 'react';
import { X, Menu, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface HeaderProps {
  isLoggedIn?: boolean;
  hideMenu?: boolean;
}

export function Header({ isLoggedIn = false, hideMenu = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Resources', href: '/resources' },
    { label: 'Payments', href: '/payments' },
    { label: 'Staff', href: '/staff' },
    { label: 'Suppliers', href: '/suppliers' },
    { label: 'Dead Stock', href: '/dead-stock' },
    { label: 'AI Assistant', href: '/ai-assistant' },
    { label: 'Profile', href: '/profile' },
    { label: 'Settings', href: '/settings' },
  ];

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
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && !hideMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-lg"
            onClick={() => setIsMenuOpen(false)}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 p-2 hover:bg-accent rounded-lg transition-colors text-foreground"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex flex-col items-center justify-center min-h-screen gap-8 px-4">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-3xl font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: menuItems.length * 0.05 }}
                  className="mt-8 pt-8 border-t border-border flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5 text-destructive" />
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.location.href = '/';
                    }}
                    className="text-xl font-semibold text-destructive hover:text-red-700 transition-colors"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
