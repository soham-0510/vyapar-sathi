'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { AlertCircle, TrendingUp, Package, Users } from 'lucide-react';

export default function DashboardPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.05,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const healthScore = 78;
  const alerts = [
    {
      id: 1,
      type: 'low-stock',
      title: 'Low Stock Alert',
      item: 'Coffee Beans',
      description: 'Only 2 bags remaining',
      color: 'bg-orange-50 dark:bg-orange-950',
      textColor: 'text-orange-700 dark:text-orange-200',
    },
    {
      id: 2,
      type: 'payment-due',
      title: 'Payment Due',
      item: 'ABC Suppliers',
      description: 'Payment due in 2 days',
      color: 'bg-red-50 dark:bg-red-950',
      textColor: 'text-red-700 dark:text-red-200',
    },
    {
      id: 3,
      type: 'dead-stock',
      title: 'Dead Stock',
      item: 'Old Espresso Cups',
      description: '45 days without sales',
      color: 'bg-gray-50 dark:bg-gray-950',
      textColor: 'text-gray-700 dark:text-gray-200',
    },
    {
      id: 4,
      type: 'staff-shortage',
      title: 'Staff Shortage',
      item: 'Counter Staff',
      description: '1 staff member absent today',
      color: 'bg-yellow-50 dark:bg-yellow-950',
      textColor: 'text-yellow-700 dark:text-yellow-200',
    },
  ];

  const stats = [
    { label: 'Total Revenue', value: '₹45,230', icon: TrendingUp, color: 'text-primary' },
    { label: 'Active Products', value: '324', icon: Package, color: 'text-secondary' },
    { label: 'Team Members', value: '8', icon: Users, color: 'text-primary' },
    { label: 'Suppliers', value: '12', icon: AlertCircle, color: 'text-secondary' },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      <SterlingGateNavigation />
      <Header isLoggedIn={true} />

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              Welcome to Your Dashboard
            </h1>
            <p className="text-muted-foreground">
              Here's what's happening with your business today
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  custom={index + 1}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-muted-foreground text-sm mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Health Score Section */}
          <motion.div
            custom={5}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-3 gap-6 mb-12"
          >
            <div className="md:col-span-1 bg-card rounded-xl p-8 border border-border">
              <h3 className="text-lg font-semibold mb-4">Business Health Score</h3>
              <div className="relative flex items-center justify-center mb-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-primary to-secondary opacity-20" />
                <div className="absolute text-center">
                  <p className="text-4xl font-bold text-primary">{healthScore}</p>
                  <p className="text-sm text-muted-foreground">/ 100</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Your business is performing well. Keep up the good work!
              </p>
            </div>

            {/* AI Summary */}
            <div className="md:col-span-2 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 border border-primary/20">
              <h3 className="text-lg font-semibold mb-4">Daily AI Summary</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Your inventory turnover is 12% higher than last week</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Best performing product: Premium Coffee Blend</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Recommended action: Increase Coffee Beans stock</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span>Upcoming payment due: ABC Suppliers in 2 days</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Active Alerts */}
          <div className="mb-8">
            <motion.h3
              custom={6}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="text-2xl font-bold mb-6"
            >
              Active Alerts
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-6">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  custom={7 + index}
                  variants={fadeUpVariants}
                  initial="hidden"
                  animate="visible"
                  className={`${alert.color} rounded-xl p-6 border border-current border-opacity-20 hover:shadow-lg transition-all group cursor-pointer`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className={`${alert.textColor} font-semibold text-sm mb-1`}>
                        {alert.title}
                      </p>
                      <p className={`${alert.textColor} font-bold text-lg`}>
                        {alert.item}
                      </p>
                    </div>
                    <AlertCircle
                      className={`w-6 h-6 ${alert.textColor} opacity-60`}
                    />
                  </div>
                  <p
                    className={`${alert.textColor} text-sm opacity-75 mb-4`}
                  >
                    {alert.description}
                  </p>
                  <div className="flex gap-2">
                    <button className="text-sm px-3 py-1.5 bg-current bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all font-medium">
                      View Details
                    </button>
                    <button className="text-sm px-3 py-1.5 bg-current bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all font-medium">
                      Take Action
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
