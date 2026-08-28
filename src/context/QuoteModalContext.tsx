'use client';

import React, { createContext, useContext, useState } from 'react';
import { QuoteModal } from '@/components/QuoteModal';

interface QuoteModalContextType {
  openQuoteModal: (productSlug?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const QuoteModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [productSlug, setProductSlug] = useState<string | undefined>(undefined);

  const openQuoteModal = (slug?: string) => {
    setProductSlug(slug);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setProductSlug(undefined);
  };

  return (
    <QuoteModalContext.Provider value={{ openQuoteModal, closeQuoteModal }}>
      {children}
      <QuoteModal isOpen={isOpen} onClose={closeQuoteModal} defaultProductSlug={productSlug} />
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = () => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    return {
      openQuoteModal: () => {},
      closeQuoteModal: () => {},
    };
  }
  return context;
};
