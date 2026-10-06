"use client";

import React, { createContext, useContext, useState } from "react";

interface ModalData {
  isOpen: boolean;
  serviceType: string;
  serviceName: string;
  amount: number;
}

interface BookingModalContextType {
  modalData: ModalData;
  openBookingModal: (serviceName: string, serviceType?: string, amount?: number) => void;
  closeBookingModal: () => void;
}

const BookingModalContext = createContext<BookingModalContextType | undefined>(undefined);

export function BookingModalProvider({ children }: { children: React.ReactNode }) {
  const [modalData, setModalData] = useState<ModalData>({
    isOpen: false,
    serviceType: "Puja",
    serviceName: "",
    amount: 1100,
  });

  const openBookingModal = (serviceName: string, serviceType = "Puja", amount = 1100) => {
    setModalData({
      isOpen: true,
      serviceName,
      serviceType,
      amount,
    });
  };

  const closeBookingModal = () => {
    setModalData((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <BookingModalContext.Provider value={{ modalData, openBookingModal, closeBookingModal }}>
      {children}
    </BookingModalContext.Provider>
  );
}

export function useBookingModal() {
  const context = useContext(BookingModalContext);
  if (!context) {
    throw new Error("useBookingModal must be used within a BookingModalProvider");
  }
  return context;
}