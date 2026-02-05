import { HeroSection } from '@/components/sections/hero';
import { FeaturedCategoriesSection } from '@/components/sections/featured-categories';
import { NewArrivalsCarouselSection } from '@/components/sections/new-arrivals-carousel';
import { EditorialBannerSection } from '@/components/sections/editorial-banner';
import { BestsellersSection } from '@/components/sections/bestsellers';
import { BrandValuesSection } from '@/components/sections/brand-values';
import { NewsletterSection } from '@/components/sections/newsletter';
import { InstagramGridSection } from '@/components/sections/instagram-grid';

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <FeaturedCategoriesSection />
      <NewArrivalsCarouselSection />
      <EditorialBannerSection />
      <BestsellersSection />
      <BrandValuesSection />
      <NewsletterSection />
      <InstagramGridSection />
    </div>
  );
}
