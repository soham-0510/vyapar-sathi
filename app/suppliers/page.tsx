'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { Plus, Phone, Repeat2, X } from 'lucide-react';

interface Supplier {
  id: number;
  name: string;
  category: string;
  rating: number;
  lastOrder: string;
  avatar: string;
  phone?: string;
  email?: string;
  address?: string;
}

const defaultSuppliers: Supplier[] = [
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
  const [suppliers, setSuppliers] = useState<Supplier[]>(defaultSuppliers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    phone: '',
    email: '',
    address: '',
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSupplier = () => {
    if (!formData.name.trim() || !formData.category.trim()) return;

    const newSupplier: Supplier = {
      id: Date.now(),
      name: formData.name,
      category: formData.category,
      rating: 0,
      lastOrder: new Date().toISOString().split('T')[0],
      avatar: '🏪',
      phone: formData.phone,
      email: formData.email,
      address: formData.address,
    };

    setSuppliers((prev) => [newSupplier, ...prev]);
    setFormData({ name: '', category: '', phone: '', email: '', address: '' });
    setShowAddForm(false);
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
              <h1 className="text-4xl font-bold mb-2">Suppliers</h1>
              <p className="text-muted-foreground">
                Connect and manage your supplier relationships
              </p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Supplier
            </button>
          </motion.div>

          {/* Add Supplier Form Card */}
          <AnimatePresence>
            {showAddForm && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8 overflow-hidden"
              >
                <div className="bg-card rounded-xl border border-primary/30 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Add New Supplier</h2>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      aria-label="Close form"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Supplier Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter supplier name"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Category <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        placeholder="e.g., Equipment, Raw Materials"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="+91-XXXX-XXXXXX"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="supplier@example.com"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                        Address
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        placeholder="Full address"
                        className="w-full px-4 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:border-primary transition-colors text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 mt-6">
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="px-5 py-2.5 border border-border rounded-lg font-medium hover:bg-accent transition-colors text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleAddSupplier}
                      disabled={!formData.name.trim() || !formData.category.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                      Add Supplier
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                      <span className="text-yellow-500">&#9733;</span>
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
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm">
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
