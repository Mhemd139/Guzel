import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20">
      <div className="text-center max-w-md">
        <h1 className="font-serif text-6xl md:text-7xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl md:text-2xl text-foreground font-medium mb-2">Page Not Found</p>
        <p className="text-muted-foreground text-base md:text-lg mb-8">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default" size="lg">
            <Link href="/" className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/shop">Browse Shop</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
