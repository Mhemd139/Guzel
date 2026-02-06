'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface CheckoutStepsProps {
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function CheckoutSteps({ currentStep, onStepClick }: CheckoutStepsProps) {
  const t = useTranslations('commerce');

  const steps = [
    { id: 1, label: t('checkout_step_shipping') },
    { id: 2, label: t('checkout_step_delivery') },
    { id: 3, label: t('checkout_step_review') },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary -translate-y-1/2 rounded-full z-0" />
        
        {/* Animated Progress Line */}
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 rounded-full z-0"
          initial={{ width: '0%' }}
          animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />

        {steps.map((step) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <motion.button
                onClick={() => isCompleted && onStepClick(step.id)}
                disabled={!isCompleted}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-4 transition-colors duration-300 shadow-soft ${
                  isCompleted
                    ? 'bg-primary border-primary text-white cursor-pointer'
                    : isCurrent
                      ? 'bg-background border-primary text-primary'
                      : 'bg-background border-secondary text-muted-foreground cursor-default'
                }`}
                whileHover={isCompleted ? { scale: 1.1 } : {}}
                animate={isCurrent ? { scale: 1.1, boxShadow: "0 0 0 4px rgba(139, 90, 52, 0.2)" } : { scale: 1, boxShadow: "none" }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </motion.div>
                ) : (
                  step.id
                )}
              </motion.button>
              <span
                className={`text-sm font-medium absolute top-full mt-2 w-32 text-center transition-colors duration-300 ${
                  isCurrent ? 'text-foreground font-semibold' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
