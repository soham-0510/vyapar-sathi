'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/header';
import { SterlingGateNavigation } from '@/components/ui/sterling-gate-navigation';
import { ElegantBackgroundShapes } from '@/components/elegant-background';
import { ChevronRight, Check } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Business Details',
    description: 'Tell us about your business',
    fields: [
      { name: 'businessType', label: 'Business Type', type: 'select' },
      { name: 'employeeCount', label: 'Number of Employees', type: 'number' },
    ],
  },
  {
    id: 2,
    title: 'Add First Product',
    description: 'Add your first product or resource',
    fields: [
      { name: 'productName', label: 'Product Name', type: 'text' },
      { name: 'quantity', label: 'Initial Stock', type: 'number' },
    ],
  },
  {
    id: 3,
    title: 'Add Supplier',
    description: 'Add your first supplier',
    fields: [
      { name: 'supplierName', label: 'Supplier Name', type: 'text' },
      { name: 'supplierCategory', label: 'Category', type: 'text' },
    ],
  },
  {
    id: 4,
    title: 'Complete Setup',
    description: 'You are all set!',
    fields: [],
  },
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.1,
      },
    }),
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleComplete = () => {
    // Redirect to dashboard after onboarding
    window.location.href = '/dashboard';
  };

  return (
    <main className="bg-background text-foreground min-h-screen">
      <Header hideMenu={true} />

      <section className="relative min-h-screen pt-32 pb-20 px-4 md:px-6 overflow-hidden flex items-center justify-center">
        <ElegantBackgroundShapes />

        <div className="w-full max-w-2xl relative z-10">
          {/* Progress Bar */}
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Setup Your Business</h2>
              <span className="text-muted-foreground text-sm">
                Step {currentStep + 1} of {steps.length}
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full bg-border rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>

          {/* Step Indicators */}
          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-3 mb-12"
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentStep(index)}
                  disabled={index > currentStep}
                  className={`w-10 h-10 rounded-full font-semibold flex items-center justify-center transition-all ${
                    index <= currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-border text-muted-foreground'
                  } disabled:cursor-not-allowed`}
                >
                  {index < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 h-0.5 ${
                      index < currentStep ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Step Content */}
          <motion.div
            key={currentStep}
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-card rounded-xl border border-border p-8 mb-8"
          >
            <h3 className="text-2xl font-bold mb-2">{currentStepData.title}</h3>
            <p className="text-muted-foreground mb-8">{currentStepData.description}</p>

            {currentStepData.id === 4 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <p className="text-xl font-semibold mb-4">
                  Your setup is complete!
                </p>
                <p className="text-muted-foreground mb-8">
                  You can now start managing your business with Vyapar Sathi.
                </p>
                <a
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Go to Dashboard
                  <ChevronRight className="w-5 h-5" />
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {currentStepData.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium mb-2">
                      {field.label}
                    </label>
                    {field.type === 'select' ? (
                      <select className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
                        <option>Select {field.label}</option>
                        <option>Retail Shop</option>
                        <option>Café</option>
                        <option>Restaurant</option>
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        placeholder={field.label}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-4"
          >
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex-1 px-4 py-3 bg-border text-foreground rounded-lg font-semibold hover:bg-border/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={currentStep === steps.length - 1 ? handleComplete : handleNext}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              {currentStep !== steps.length - 1 && (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
