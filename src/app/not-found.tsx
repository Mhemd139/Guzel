'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mb-8"
      >
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform scale-150" />
        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-soft-lg mx-auto">
          <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold border-4 border-white shadow-md"
          >
            ?
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md mx-auto space-y-4"
      >
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg">
          We couldn't find the page you were looking for. It might have been moved or doesn't exist.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild size="lg" className="rounded-full shadow-soft hover:shadow-soft-lg">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full bg-white hover:bg-secondary/20">
            <Link href="/shop">
              <Search className="w-4 h-4 mr-2" />
              Browse Shop
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
