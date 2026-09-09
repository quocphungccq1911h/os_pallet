'use client';

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingCTA } from './FloatingCTA';
import { QuoteModalProvider, useQuoteModal } from '@/context/QuoteModalContext';

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
    </>
  );
};

export const AppShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <QuoteModalProvider>
      <ShellInner>{children}</ShellInner>
    </QuoteModalProvider>
  );
};
