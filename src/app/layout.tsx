import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, DM_Sans, Noto_Sans_Arabic, Noto_Sans_Hebrew } from "next/font/google";
import "./globals.css";
import { cookies } from "next/headers";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { localeDirection, type Locale } from "@/i18n/config";
import { CartProvider } from "@/lib/contexts/cart-context";
import { WishlistProvider } from "@/lib/contexts/wishlist-context";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageGate } from "@/components/language-gate";
import { ToastProvider } from "@/components/ui/toast-provider";
import { BackToTop } from "@/components/ui/back-to-top";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif-secondary",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

const notoHebrew = Noto_Sans_Hebrew({
  subsets: ["hebrew"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hebrew",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Güzel | Curated Style for the Modern Woman",
    template: "%s | Güzel",
  },
  description:
    "Discover Güzel - curated fashion for the modern woman. Premium fabrics, ethical production, effortless sophistication.",
  metadataBase: new URL("https://Güzel-shop.vercel.app"),
  openGraph: {
    title: "Güzel | Curated Style for the Modern Woman",
    description:
      "Discover Güzel - curated fashion for the modern woman. Premium fabrics, ethical production, effortless sophistication.",
    url: "https://Güzel-shop.vercel.app",
    siteName: "Güzel",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Güzel",
    description: "Curated fashion for the modern woman",
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = (cookieStore.get("Güzel_LOCALE")?.value || "en") as Locale;
  const direction = localeDirection[locale];
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${playfair.variable} ${cormorant.variable} ${dmSans.variable} ${notoArabic.variable} ${notoHebrew.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <LanguageGate>
            <CartProvider>
              <WishlistProvider>
                <ToastProvider>
                  <Header />
                  <main id="main-content">{children}</main>
                  <Footer />
                  <BackToTop />
                </ToastProvider>
              </WishlistProvider>
            </CartProvider>
          </LanguageGate>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
