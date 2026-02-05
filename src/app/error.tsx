'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-16 h-16 text-accent" />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
          Something went wrong!
        </h1>
        <p className="text-muted-foreground text-base md:text-lg mb-2">
          We encountered an unexpected error. Please try again.
        </p>
        {error.message && (
          <p className="text-sm text-muted-foreground mb-8 break-words">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} size="lg" className="inline-flex items-center gap-2">
            <RotateCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/">Go Home</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
