"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import { initialInvoiceData } from "@/lib/constants";
import { calculateTotals } from "@/utils/calculation";
import { InvoiceData, InvoiceItem } from "@/types/invoice";

interface InvoiceContexType {
  invoice: InvoiceData;
  updateInvoice: (updates: Partial<InvoiceData>) => void;
  addItem: () => void;
  updateItem: (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => void;
  removeItem: (index: number) => void;
}

const InvoiceContext = createContext<InvoiceContexType | undefined>(undefined);

export const InvoiceProvider = ({ children }: { children: ReactNode }) => {
  const [invoice, setInvoice] = useState<InvoiceData>(initialInvoiceData);

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    const newInvoive = { ...invoice, ...updates };

    if (updates.items || updates.taxRate !== undefined) {
      const { subTotal, taxAmount, total } = calculateTotals(
        updates.items || invoice.items,
        updates.taxRate !== undefined ? updates.taxRate : invoice.taxRate
      );
      newInvoive.subTotal = subTotal;
      newInvoive.taxAmount = taxAmount;
      newInvoive.total = total;
    }

    setInvoice(newInvoive);
  };

  const addItem = () => {
    setInvoice((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now().toString(),
          description: "",
          quantity: 1,
          rate: 0,
          amount: 0,
        },
      ],
    }));
  };

  const updateItem = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const newItems = [...invoice.items];
    newItems[index] = { ...newItems[index], [field]: value };

    if (field === "quantity" || field === "rate") {
      const quantityValie = newItems[index].quantity;
      const rateValue = newItems[index].rate;

      let quantity: number;
      if (typeof quantityValie === "string") {
        quantity = quantityValie === "" ? 0 : Number(quantityValie);
      } else {
        quantity = quantityValie;
      }

      let rate: number;
      if (typeof rateValue === "string") {
        rate = rateValue === "" ? 0 : Number(rateValue);
      } else {
        rate = rateValue;
      }

      newItems[index].amount = quantity * rate;
    }

    updateInvoice({ items: newItems });
  };

  const removeItem = (index: number) => {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <InvoiceContext.Provider
      value={{ invoice, updateInvoice, addItem, updateItem, removeItem }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);

  if (context === undefined) {
    throw new Error("useInvoiceContext must be used within a InvoiceProvider");
  }

  return context;
};
