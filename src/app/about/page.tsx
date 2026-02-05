import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Leaf, Award, Users } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'About Guzel',
  description:
    'Discover Guzel\'s story - our mission to create sustainable, high-quality fashion for the modern woman.',
};

export default async function AboutPage() {
  const t = await getTranslations('about');

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative h-96 sm:h-[500px] lg:h-[600px] bg-secondary overflow-hidden flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt="Guzel - Our Story"
          fill
          className="object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            {t('hero_title')}
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('hero_subtitle')}
          </p>
        </div>
      </div>

      {/* Brand Story Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-24">
          {/* Image */}
          <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=800&q=80"
              alt="Guzel Design Studio"
              fill
              className="object-cover"
            />
          </div>

          {/* Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-6">
              {t('story_title')}
            </h2>
            <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
              <p>
                {t('story_text_1')}
              </p>
              <p>
                {t('story_text_2')}
              </p>
              <p>
                {t('story_text_3')}
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Values */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-12">
            {t('mission_title')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sustainability */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Leaf className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value_sustainability')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('value_sustainability_text')}
              </p>
            </div>

            {/* Quality Craftsmanship */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value_quality')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('value_quality_text')}
              </p>
            </div>

            {/* Inclusive Community */}
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-8 h-8 text-accent" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {t('value_inclusive')}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t('value_inclusive_text')}
              </p>
            </div>
          </div>
        </div>

        {/* Founder Section */}
        <div className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Quote */}
            <div>
              <blockquote className="text-2xl sm:text-3xl font-serif italic text-foreground mb-6">
                {t('founder_quote')}
              </blockquote>
              <p className="text-lg font-semibold text-foreground mb-1">
                {t('founder_name')}
              </p>
              <p className="text-muted-foreground">
                {t('founder_title')}
              </p>
            </div>

            {/* Image */}
            <div className="relative h-96 sm:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80"
                alt="Elena Rivera, Guzel Founder"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Behind the Scenes */}
        <div className="mb-24">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground text-center mb-12">
            {t('behind_scenes')}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&q=80"
                alt="Design Process"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4">Design Process</p>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Fabric Selection"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4">{t('behind_scenes_1')}</p>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&q=80"
                alt="Craftsmanship"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4">{t('behind_scenes_2')}</p>
              </div>
            </div>

            <div className="relative h-72 sm:h-96 rounded-lg overflow-hidden group">
              <Image
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Quality Control"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white font-semibold p-4">{t('behind_scenes_3')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            {t('cta_title')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta_text')}
          </p>
          <Button asChild size="lg" className="font-semibold">
            <Link href="/shop">{t('shop_collections')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
