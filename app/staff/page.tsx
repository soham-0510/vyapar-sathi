'use client';

import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { Plus, MessageCircle, Send } from 'lucide-react';

const staffMembers = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    role: 'Head Barista',
    status: 'Active',
    joinDate: '2023-06-15',
    avatar: '👨‍💼',
  },
  {
    id: 2,
    name: 'Priya Singh',
    role: 'Counter Staff',
    status: 'Active',
    joinDate: '2023-08-20',
    avatar: '👩‍💼',
  },
  {
    id: 3,
    name: 'Amit Patel',
    role: 'Delivery Executive',
    status: 'Active',
    joinDate: '2023-10-10',
    avatar: '👨‍💼',
  },
  {
    id: 4,
    name: 'Neha Sharma',
    role: 'Manager',
    status: 'On Leave',
    joinDate: '2023-04-05',
    avatar: '👩‍💼',
  },
];

export default function StaffPage() {
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
      <SterlingGateNavigation />
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
              <h1 className="text-4xl font-bold mb-2">Staff</h1>
              <p className="text-muted-foreground">
                Manage your team members and their roles
              </p>
            </div>
            <button className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors">
              <Plus className="w-5 h-5" />
              Add Staff
            </button>
          </motion.div>

          {/* Staff Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffMembers.map((staff, index) => (
              <motion.div
                key={staff.id}
                custom={index + 1}
                variants={fadeUpVariants}
                initial="hidden"
                animate="visible"
                className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary/30 transition-all group"
              >
                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{staff.avatar}</div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        staff.status === 'Active'
                          ? 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200'
                          : 'bg-gray-50 dark:bg-gray-950 text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {staff.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-1">{staff.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{staff.role}</p>

                  <div className="text-xs text-muted-foreground mb-6">
                    Joined {new Date(staff.joinDate).toLocaleDateString()}
                  </div>

                  {/* Hover Actions */}
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors text-sm">
                      <Send className="w-4 h-4" />
                      Request
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-accent text-foreground rounded-lg font-medium hover:bg-accent/80 transition-colors text-sm">
                      <MessageCircle className="w-4 h-4" />
                      Message
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
