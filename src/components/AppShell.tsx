'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { OrderNotificationToast } from './OrderNotificationToast';
import { QuoteModalProvider, useQuoteModal } from '@/context/QuoteModalContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { usePathname } from 'next/navigation';

const ShellInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { openQuoteModal } = useQuoteModal();
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header onOpenQuoteModal={() => openQuoteModal()} />
      <main>{children}</main>
      <Footer />
      <FloatingCTA onOpenQuoteModal={() => openQuoteModal()} />
      <OrderNotificationToast />
    </>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LanguageProvider>
      <QuoteModalProvider>
        <ShellInner>{children}</ShellInner>
      </QuoteModalProvider>
    </LanguageProvider>
  );
};
