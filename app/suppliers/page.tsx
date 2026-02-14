'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { Plus, Phone, Repeat2 } from 'lucide-react';

const suppliers = [
  {
    id: 1,
    name: 'ABC Suppliers',
    category: 'Coffee & Beans',
    rating: 4.5,
    lastOrder: '2024-02-10',
    avatar: '🏢',
  },
  {
    id: 2,
    name: 'Global Coffee Co',
    category: 'Premium Imports',
    rating: 4.8,
    lastOrder: '2024-02-12',
    avatar: '🌍',
  },
  {
    id: 3,
    name: 'Premium Goods Ltd',
    category: 'Equipment',
    rating: 4.2,
    lastOrder: '2024-02-08',
    avatar: '⚙️',
  },
  {
    id: 4,
    name: 'Local Distributors',
    category: 'Daily Supplies',
    rating: 4.0,
    lastOrder: '2024-02-05',
    avatar: '🚚',
  },
  {
    id: 5,
    name: 'Eco Packaging',
    category: 'Packaging',
    rating: 4.6,
    lastOrder: '2024-02-14',
    avatar: '📦',
  },
  {
    id: 6,
    name: 'Tech Solutions',
    category: 'POS & Software',
    rating: 4.4,
    lastOrder: '2024-01-30',
    avatar: '💻',
  },
];

export default function SuppliersPage() {
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
    <main className="bg-background text-foreground min-h-screen">
      <Header isLoggedIn={true} />

      <div className="pt-24 pb-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Suppliers</h1>
              <p className="text-muted-foreground">
                Connect and manage your supplier relationships
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Add Supplier
            </button>
          </motion.div>

          {/* Suppliers Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliers.map((supplier, index) => (
              <motion.div
                key={supplier.id}
                custom={index + 1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
              >
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{supplier.avatar}</div>
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="font-semibold text-sm">{supplier.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{supplier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {supplier.category}
                  </p>

                  <div className="text-xs text-muted-foreground mb-6">
                    Last order:{' '}
                    {new Date(supplier.lastOrder).toLocaleDateString()}
                  </div>

                  {/* Hover Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                      <Phone className="w-4 h-4" />
                      Contact
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm">
                      <Repeat2 className="w-4 h-4" />
                      Reorder
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
