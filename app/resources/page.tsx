'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { Plus, Edit, Repeat2, Trash2 } from 'lucide-react';
import { useState } from 'react';

const resources = [
  {
    id: 1,
    name: 'Premium Coffee Beans',
    stock: 45,
    reorderLevel: 10,
    status: 'In Stock',
  },
  {
    id: 2,
    name: 'Espresso Cups',
    stock: 8,
    reorderLevel: 20,
    status: 'Low Stock',
  },
  {
    id: 3,
    name: 'Milk',
    stock: 120,
    reorderLevel: 50,
    status: 'In Stock',
  },
  {
    id: 4,
    name: 'Sugar Packets',
    stock: 2,
    reorderLevel: 50,
    status: 'Critical',
  },
];

export default function ResourcesPage() {
  const [sortBy, setSortBy] = useState('name');

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200';
      case 'Low Stock':
        return 'bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-200';
      case 'Critical':
        return 'bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-200';
      default:
        return '';
    }
  };

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
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-4xl font-bold mb-2">Resources</h1>
              <p className="text-muted-foreground">
                Manage your inventory and stock levels
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Add Resource
            </button>
          </motion.div>

          {/* Filters */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-lg border border-border p-4 mb-6"
          >
            <div className="flex items-center gap-4 flex-wrap">
              <div>
                <label className="text-sm font-medium mr-2">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="name">Name</option>
                  <option value="stock">Stock Level</option>
                  <option value="status">Status</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Resources Table */}
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-lg border border-border overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-accent/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Stock Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Reorder Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {resources.map((resource, index) => (
                    <tr
                      key={resource.id}
                      className="border-b border-border hover:bg-accent/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium">{resource.name}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold">{resource.stock} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-muted-foreground">{resource.reorderLevel} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            resource.status
                          )}`}
                        >
                          {resource.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                            <Edit className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                            <Repeat2 className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-accent rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
