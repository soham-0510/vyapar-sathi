'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';

const payments = [
  {
    id: 1,
    supplier: 'ABC Suppliers',
    amount: 5200,
    dueDate: '2024-02-16',
    status: 'Overdue',
    days: -3,
  },
  {
    id: 2,
    supplier: 'Global Coffee Co',
    amount: 8500,
    dueDate: '2024-02-20',
    status: 'Due Soon',
    days: 2,
  },
  {
    id: 3,
    supplier: 'Premium Goods Ltd',
    amount: 3200,
    dueDate: '2024-02-25',
    status: 'Pending',
    days: 7,
  },
  {
    id: 4,
    supplier: 'Local Distributors',
    amount: 2100,
    dueDate: '2024-01-25',
    status: 'Paid',
    days: null,
  },
];

export default function PaymentsPage() {
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

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200';
      case 'Due Soon':
        return 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-200';
      case 'Overdue':
        return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-200';
      default:
        return 'bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Paid':
        return <CheckCircle className="w-5 h-5" />;
      case 'Overdue':
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const totalDue = payments
    .filter((p) => p.status !== 'Paid')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <main className="bg-background text-foreground min-h-screen relative">
      <SterlingGateNavigation />
      <Header isLoggedIn={true} />
      <ElegantBackgroundShapes />

      <div className="pt-24 pb-12 px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Payments</h1>
            <p className="text-muted-foreground">
              Track supplier payments and due dates
            </p>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-xl p-6 border border-border"
            >
              <p className="text-muted-foreground text-sm mb-1">Total Due</p>
              <p className="text-3xl font-bold text-primary">₹{totalDue.toLocaleString()}</p>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-xl p-6 border border-border"
            >
              <p className="text-muted-foreground text-sm mb-1">Payments This Month</p>
              <p className="text-3xl font-bold">₹28,500</p>
            </motion.div>

            <motion.div
              custom={3}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="bg-card rounded-xl p-6 border border-border"
            >
              <p className="text-muted-foreground text-sm mb-1">Overdue</p>
              <p className="text-3xl font-bold text-destructive">₹5,200</p>
            </motion.div>
          </div>

          {/* Payments List */}
          <motion.div
            custom={4}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {payments.map((payment, index) => (
              <div
                key={payment.id}
                className={`bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-all group ${getStatusStyles(
                  payment.status
                ).split(' ').slice(0, 2).join(' )} bg-opacity-10`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div
                      className={`p-3 rounded-lg ${getStatusStyles(
                        payment.status
                      ).split(' ').slice(2).join(' ')} bg-opacity-20`}
                    >
                      {getStatusIcon(payment.status)}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {payment.supplier}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(payment.dueDate).toLocaleDateString()}
                        </div>
                        {payment.days !== null && (
                          <div>
                            {payment.days < 0
                              ? `Overdue by ${Math.abs(payment.days)} days`
                              : `Due in ${payment.days} days`}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold mb-2">
                      ₹{payment.amount.toLocaleString()}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusStyles(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>

                {payment.status !== 'Paid' && (
                  <div className="mt-4 pt-4 border-t border-current border-opacity-20 flex gap-2">
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                      Pay Now
                    </button>
                    <button className="px-4 py-2 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm">
                      Schedule Payment
                    </button>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
