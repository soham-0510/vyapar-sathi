'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { TrendingDown, Gift, Share2, Trash2 } from 'lucide-react';

const deadStockItems = [
  {
    id: 1,
    product: 'Vintage Coffee Cups',
    daysSinceLastSale: 67,
    quantity: 12,
    value: 3600,
  },
  {
    id: 2,
    product: 'Manual Espresso Machine',
    daysSinceLastSale: 89,
    quantity: 1,
    value: 12000,
  },
  {
    id: 3,
    product: 'Ceramic Sugar Bowls',
    daysSinceLastSale: 45,
    quantity: 24,
    value: 2400,
  },
  {
    id: 4,
    product: 'Decorative Plates',
    daysSinceLastSale: 73,
    quantity: 8,
    value: 1600,
  },
];

export default function DeadStockPage() {
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

  const totalDeadStockValue = deadStockItems.reduce(
    (sum, item) => sum + item.value,
    0
  );

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
            <h1 className="text-4xl font-bold mb-2">Dead Stock</h1>
            <p className="text-muted-foreground">
              Identify and manage slow-moving inventory
            </p>
          </motion.div>

          {/* Summary Card */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-destructive/10 to-orange-50 dark:from-destructive/20 dark:to-orange-950/20 rounded-xl p-8 border border-destructive/20 mb-8"
          >
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-6 h-6 text-destructive" />
              <h3 className="text-lg font-semibold">Blocked Capital</h3>
            </div>
            <p className="text-3xl font-bold text-destructive">
              ₹{totalDeadStockValue.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Total value of dead stock items
            </p>
          </motion.div>

          {/* Dead Stock Items */}
          <div className="space-y-4">
            {deadStockItems.map((item, index) => (
              <motion.div
                key={item.id}
                custom={index + 2}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl border border-border p-6 hover:border-destructive/30 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.product}</h3>
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div>
                        <span className="font-semibold text-foreground">
                          {item.daysSinceLastSale} days
                        </span>{' '}
                        since last sale
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          {item.quantity}
                        </span>{' '}
                        units
                      </div>
                      <div>
                        <span className="font-semibold text-foreground">
                          ₹{item.value.toLocaleString()}
                        </span>{' '}
                        value
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1 px-3 py-1 bg-destructive/10 rounded-full">
                      <TrendingDown className="w-4 h-4 text-destructive" />
                      <span className="text-sm font-medium text-destructive">
                        Dead Stock
                      </span>
                    </div>
                  </div>
                </div>

                {/* Suggested Actions */}
                <div className="bg-accent/30 rounded-lg p-4 mb-4">
                  <p className="text-sm font-medium mb-3">Suggested Actions:</p>
                  <div className="flex flex-wrap gap-2">
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium text-sm transition-colors">
                      <Gift className="w-4 h-4" />
                      Discount
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium text-sm transition-colors">
                      <Share2 className="w-4 h-4" />
                      Bundle
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium text-sm transition-colors">
                      <Share2 className="w-4 h-4" />
                      Nearby Business
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg font-medium text-sm transition-colors">
                      <Trash2 className="w-4 h-4" />
                      Dispose
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
