'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const t = useTranslations('contact');

  const FAQ_ITEMS = [
    {
      id: 1,
      question: t('faq_1_q'),
      answer: t('faq_1_a'),
    },
    {
      id: 2,
      question: t('faq_2_q'),
      answer: t('faq_2_a'),
    },
    {
      id: 3,
      question: t('faq_3_q'),
      answer: t('faq_3_a'),
    },
    {
      id: 4,
      question: t('faq_4_q'),
      answer: t('faq_4_a'),
    },
    {
      id: 5,
      question: t('faq_5_q'),
      answer: t('faq_5_a'),
    },
  ];

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData);
    setSubmitted(true);

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: 'general',
      message: '',
    });

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('form_name')} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('form_name_placeholder')}
                  className="w-full"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('form_email')} <span className="text-red-500">*</span>
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('form_email_placeholder')}
                  className="w-full"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('form_subject')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm font-medium text-foreground hover:bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                  required
                >
                  <option value="general">{t('form_subject_general')}</option>
                  <option value="order">{t('form_subject_order')}</option>
                  <option value="returns">{t('form_subject_returns')}</option>
                  <option value="wholesale">{t('form_subject_wholesale')}</option>
                  <option value="press">{t('form_subject_press')}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  {t('form_message')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('form_message_placeholder')}
                  rows={6}
                  className="w-full px-3 py-2 rounded-md border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent resize-none"
                  required
                />
              </div>

              {/* Success Message */}
              {submitted && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <p className="text-sm font-semibold text-green-800">
                    Thank you for your message! We'll get back to you soon.
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" size="lg" className="w-full font-semibold">
                {t('form_send')}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{t('info_email_label')}</h3>
              </div>
              <p className="text-muted-foreground ml-13">
                <a
                  href={`mailto:${t('info_email')}`}
                  className="hover:text-foreground transition-colors"
                >
                  {t('info_email')}
                </a>
              </p>
              <p className="text-xs text-muted-foreground mt-1 ml-13">
                {t('info_email_note')}
              </p>
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{t('info_phone_label')}</h3>
              </div>
              <p className="text-muted-foreground ml-13">
                <a
                  href={`tel:${t('info_phone')}`}
                  className="hover:text-foreground transition-colors"
                >
                  {t('info_phone')}
                </a>
              </p>
              <p className="text-xs text-muted-foreground mt-1 ml-13">
                {t('info_phone_note')}
              </p>
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{t('info_address_label')}</h3>
              </div>
              <p className="text-muted-foreground ml-13">
                {t('info_address')}
              </p>
            </div>

            {/* Hours */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">{t('info_hours_label')}</h3>
              </div>
              <div className="text-muted-foreground ml-13 text-sm space-y-1">
                <div>{t('info_hours_weekday')}</div>
                <div>{t('info_hours_saturday')}</div>
                <div>{t('info_hours_sunday')}</div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 border-t border-border">
              <h3 className="text-sm font-semibold text-foreground mb-3">{t('info_follow')}</h3>
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', href: 'https://www.instagram.com/guzel_tayibe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
                  { name: 'Facebook', href: '#' },
                  { name: 'Pinterest', href: '#' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mb-20">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-6">
            {t('info_address_label')}
          </h2>
          <div className="bg-secondary rounded-lg h-96 flex items-center justify-center border-2 border-border">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">
                {t('info_address')}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Map integration coming soon
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-8">
            {t('faq_title')}
          </h2>

          <Accordion type="single" collapsible className="border-t border-border">
            {FAQ_ITEMS.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="border-b">
                <AccordionTrigger className="text-base font-semibold py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
