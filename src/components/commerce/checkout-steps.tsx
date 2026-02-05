'use client';

import React from 'react';
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
    <div className="flex items-center justify-center gap-0 w-full max-w-lg mx-auto">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id;
        const isCurrent = currentStep === step.id;

        return (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <button
              onClick={() => isCompleted && onStepClick(step.id)}
              disabled={!isCompleted}
              className={`flex items-center gap-2 ${isCompleted ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                  isCompleted
                    ? 'bg-accent text-white'
                    : isCurrent
                      ? 'bg-accent text-white'
                      : 'bg-secondary text-muted-foreground'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span
                className={`text-sm font-medium hidden sm:block ${
                  isCurrent || isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </button>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 ${
                  currentStep > step.id ? 'bg-accent' : 'bg-secondary'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
