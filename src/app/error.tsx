'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-red-100 rounded-full blur-3xl transform scale-150" />
        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-soft-lg mx-auto border-4 border-red-50">
          <AlertCircle className="w-12 h-12 text-red-300" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto space-y-4"
      >
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Something went wrong
        </h1>
        <p className="text-muted-foreground">
          We apologize for the inconvenience. An unexpected error has occurred.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
           <p className="text-xs text-red-500 bg-red-50 p-2 rounded-lg font-mono break-all max-w-[300px] mx-auto">
             {error.message}
           </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
          <Button 
            onClick={reset}
            size="lg" 
            className="rounded-full shadow-soft hover:shadow-soft-lg gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
          </Button>
          <Button asChild variant="ghost" size="lg" className="rounded-full hover:bg-secondary/20 gap-2">
            <Link href="/">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
