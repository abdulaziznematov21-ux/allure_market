import type { Metadata } from 'next';
import { Bodoni_Moda, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RackShowcaseModal from '@/components/RackShowcaseModal';
import LookDrawer from '@/components/LookDrawer';
import AppointmentModal from '@/components/AppointmentModal';
import ToastNotification from '@/components/ToastNotification';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';

const serifFont = Bodoni_Moda({
  variable: '--font-serif',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const sansFont = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const monoFont = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ALLURE // ATELIER — Monolithic Luxury Streetwear & Archival Tailoring',
  description:
    'Luxury and streetwear fashion house. Vol. IV Archival presentation of dense monolithic silhouettes, laser-welded seams, and uncompromised material permanence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${serifFont.variable} ${sansFont.variable} ${monoFont.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen bg-[#FFFFFF] text-[#0D0D0D] flex flex-col font-sans selection:bg-[#000000] selection:text-[#FFFFFF]">
        <ShopProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <RackShowcaseModal />
          <LookDrawer />
          <AppointmentModal />
          <ToastNotification />
        </ShopProvider>
      </body>
    </html>
  );
}
