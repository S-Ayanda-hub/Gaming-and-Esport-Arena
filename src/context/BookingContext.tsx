import React, { createContext, useContext, useMemo, useState } from 'react';
import { findOffering, Offering } from '../data/offerings';

// Bulk discount rules from the wireframes. Only the matching tier applies
// and discounts are never combined.
export const discountRateFor = (quantity: number): number => {
  if (quantity >= 4) return 0.15;
  if (quantity === 3) return 0.10;
  if (quantity === 2) return 0.05;
  return 0;
};

export type Quote = {
  offering: Offering;
  quantity: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  total: number;
};

type BookingContextValue = {
  selectedId: string;
  selectOffering: (id: string) => void;
  quantity: number;
  setQuantity: (n: number) => void;
  quote: Quote;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = useState('escape-room-challenge');
  const [quantity, setQuantity] = useState(2);

  const quote = useMemo<Quote>(() => {
    const offering = findOffering(selectedId);
    const subtotal = offering.fee * quantity;
    const discountRate = discountRateFor(quantity);
    const discountAmount = Math.round(subtotal * discountRate);
    return {
      offering,
      quantity,
      subtotal,
      discountRate,
      discountAmount,
      total: subtotal - discountAmount,
    };
  }, [selectedId, quantity]);

  const value = useMemo(
    () => ({ selectedId, selectOffering: setSelectedId, quantity, setQuantity, quote }),
    [selectedId, quantity, quote],
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider');
  return ctx;
}
