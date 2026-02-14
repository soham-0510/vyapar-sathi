'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { Edit2, Save, Lock, Bell, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [isEditingBusiness, setIsEditingBusiness] = useState(false);
  const [personalData, setPersonalData] = useState({
    fullName: 'Raj Kumar',
    phone: '+91-9876-543210',
    email: 'raj@vyaparsathi.com',
    role: 'Owner',
  });
  const [businessData, setBusinessData] = useState({
    businessName: 'Kumar Trading Co.',
    businessType: 'Retail',
    address: 'Mumbai, India',
    workingHours: '9 AM - 9 PM',
  });

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

  const handlePersonalChange = (field: string, value: string) => {
    setPersonalData({ ...personalData, [field]: value });
  };

  const handleBusinessChange = (field: string, value: string) => {
    setBusinessData({ ...businessData, [field]: value });
  };

  return (
    <main className="bg-background text-foreground min-h-screen relative">
      <SterlingGateNavigation />
      <Header isLoggedIn={true} />
      <ElegantBackgroundShapes />

      <div className="pt-24 pb-12 px-4 md:px-6 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Profile Header Card */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-2xl p-8 mb-8 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary-foreground">RK</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">{personalData.fullName}</h1>
            <p className="text-lg text-primary font-semibold mb-1">
              {businessData.businessName}
            </p>
            <p className="text-muted-foreground">{businessData.businessType}</p>
            <p className="text-sm text-muted-foreground mt-3">{businessData.address}</p>
          </motion.div>

          {/* Personal Information */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Personal Information</h2>
              <button
                onClick={() => setIsEditingPersonal(!isEditingPersonal)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                {isEditingPersonal ? (
                  <>
                    <Save className="w-5 h-5" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Edit
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {['fullName', 'phone', 'email', 'role'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize">
                    {field === 'fullName' ? 'Full Name' : field === 'phone' ? 'Phone' : field}
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingPersonal}
                    value={personalData[field as keyof typeof personalData]}
                    onChange={(e) =>
                      handlePersonalChange(field, e.target.value)
                    }
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Business Details */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Business Details</h2>
              <button
                onClick={() => setIsEditingBusiness(!isEditingBusiness)}
                className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
              >
                {isEditingBusiness ? (
                  <>
                    <Save className="w-5 h-5" />
                    Save
                  </>
                ) : (
                  <>
                    <Edit2 className="w-5 h-5" />
                    Edit
                  </>
                )}
              </button>
            </div>

            <div className="space-y-4">
              {['businessName', 'businessType', 'address', 'workingHours'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-muted-foreground mb-2 capitalize">
                    {field === 'businessName'
                      ? 'Business Name'
                      : field === 'businessType'
                      ? 'Business Type'
                      : field === 'workingHours'
                      ? 'Working Hours'
                      : field}
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingBusiness}
                    value={businessData[field as keyof typeof businessData]}
                    onChange={(e) =>
                      handleBusinessChange(field, e.target.value)
                    }
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Account Settings */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card border border-border rounded-2xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <div className="space-y-4">
              {/* Change Password */}
              <button className="w-full flex items-center gap-4 p-4 hover:bg-accent rounded-lg transition-colors border border-border">
                <Lock className="w-6 h-6 text-primary" />
                <div className="text-left flex-1">
                  <p className="font-semibold">Change Password</p>
                  <p className="text-sm text-muted-foreground">
                    Update your security credentials
                  </p>
                </div>
              </button>

              {/* Notification Preferences */}
              <button className="w-full flex items-center gap-4 p-4 hover:bg-accent rounded-lg transition-colors border border-border">
                <Bell className="w-6 h-6 text-primary" />
                <div className="text-left flex-1">
                  <p className="font-semibold">Notification Preferences</p>
                  <p className="text-sm text-muted-foreground">
                    Manage email and push notifications
                  </p>
                </div>
              </button>

              {/* Theme Toggle */}
              <div className="p-4 border border-border rounded-lg flex items-center justify-between">
                <div className="flex-1">
                  <p className="font-semibold">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Switch between light and dark mode
                  </p>
                </div>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="px-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Logout Section */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <button
              onClick={() => window.location.href = '/'}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg font-semibold transition-colors border border-destructive/30"
            >
              <LogOut className="w-6 h-6" />
              Logout
            </button>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
