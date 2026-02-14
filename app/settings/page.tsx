'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { Moon, Sun, LogOut, Save } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [businessName, setBusinessName] = useState('My Coffee Shop');
  const [businessEmail, setBusinessEmail] = useState('owner@coffeeshop.com');
  const [businessPhone, setBusinessPhone] = useState('+91 98765 43210');

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.05,
      },
    }),
  };

  return (
    <main className="bg-background text-foreground min-h-screen relative">
      <SterlingGateNavigation />
      <Header isLoggedIn={true} />
      <ElegantBackgroundShapes />

      <div className="pt-24 pb-12 px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and business settings
            </p>
          </motion.div>

          {/* Business Information */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl border border-border p-8 mb-6"
          >
            <h3 className="text-xl font-bold mb-6">Business Information</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Email
                </label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Business Phone
                </label>
                <input
                  type="tel"
                  value={businessPhone}
                  onChange={(e) => setBusinessPhone(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                <Save className="w-5 h-5" />
                Save Changes
              </button>
            </div>
          </motion.div>

          {/* Theme Settings */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl border border-border p-8 mb-6"
          >
            <h3 className="text-xl font-bold mb-6">Appearance</h3>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">
                Choose your preferred theme
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    theme === 'light'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Sun className="w-5 h-5" />
                  <span className="font-medium">Light</span>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                    theme === 'dark'
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/30'
                  }`}
                >
                  <Moon className="w-5 h-5" />
                  <span className="font-medium">Dark</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl border border-border p-8 mb-6"
          >
            <h3 className="text-xl font-bold mb-6">Account</h3>

            <div className="space-y-4">
              <div className="pb-4 border-b border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Email Address
                </p>
                <p className="font-medium">owner@coffeeshop.com</p>
              </div>

              <div className="pb-4">
                <button className="text-primary font-medium hover:underline">
                  Change Password
                </button>
              </div>
            </div>
          </motion.div>

          {/* Danger Zone */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-8"
          >
            <h3 className="text-xl font-bold mb-4 text-destructive">
              Danger Zone
            </h3>

            <button className="flex items-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground rounded-lg font-semibold hover:bg-destructive/90 transition-colors">
              <LogOut className="w-5 h-5" />
              Logout
            </button>

            <p className="text-sm text-muted-foreground mt-4">
              Once you log out, you will be redirected to the login page.
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
