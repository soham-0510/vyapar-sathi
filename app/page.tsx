'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, BarChart3, Users, Package, Zap } from 'lucide-react';
import { Header } from '@/components/header';
import { ElegantBackgroundShapes } from '@/components/elegant-background';

export default function LandingPage() {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  const features = [
    {
      icon: BarChart3,
      title: 'Smart Analytics',
      description: 'Real-time insights into your business performance',
    },
    {
      icon: Package,
      title: 'Inventory Management',
      description: 'Track stock levels and manage resources efficiently',
    },
    {
      icon: Users,
      title: 'Staff & Suppliers',
      description: 'Coordinate with your team and suppliers seamlessly',
    },
    {
      icon: Zap,
      title: 'AI Assistant',
      description: 'Get intelligent recommendations to grow your business',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your account and add your business details',
    },
    {
      number: '02',
      title: 'Setup',
      description: 'Add your products, suppliers, and team members',
    },
    {
      number: '03',
      title: 'Grow',
      description: 'Use AI-powered insights to optimize your operations',
    },
  ];

  return (
    <main className="bg-background text-foreground">
      <Header hideMenu={true} />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-6 overflow-hidden flex items-center">
        <ElegantBackgroundShapes />

        <div className="max-w-5xl mx-auto w-full relative z-10">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <div className="w-2 h-2 bg-primary rounded-full" />
              <span className="text-sm font-medium text-primary">
                Empower Your Business
              </span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight"
          >
            Manage Your Business with <span className="text-primary">AI Power</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-balance"
          >
            Vyapar Sathi is your AI-powered operations assistant designed
            specifically for small businesses. Manage inventory, suppliers, staff,
            and payments all in one place.
          </motion.p>

          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-8 py-4 bg-card text-card-foreground border border-border rounded-lg font-semibold hover:bg-accent transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools to manage every aspect of your small business
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="p-8 bg-card rounded-xl border border-border hover:border-primary/30 transition-all hover:shadow-lg"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Get up and running in three simple steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {step.number}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 w-8 h-0.5 bg-primary/20" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto bg-primary text-primary-foreground rounded-2xl p-12 text-center">
          <motion.h2
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Ready to Transform Your Business?
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg mb-8 opacity-90"
          >
            Join thousands of small business owners using Vyapar Sathi to grow
            their operations.
          </motion.p>
          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-foreground text-primary rounded-lg font-semibold hover:bg-primary-foreground/90 transition-colors"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20 py-12 px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-muted-foreground">
          <p>
            © 2024 Vyapar Sathi. All rights reserved. Empowering small
            businesses with AI.
          </p>
        </div>
      </footer>
    </main>
  );
}
