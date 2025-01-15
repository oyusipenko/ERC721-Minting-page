"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type ModalType = "CONFIRM" | null;

interface ModalPayload {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  [key: string]: unknown;
}

interface IModalContext {
  modalType: ModalType;
  modalProps: ModalPayload;
  openModal: (type: ModalType, props?: ModalPayload) => void;
  closeModal: () => void;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<ModalPayload>({});

  const openModal = (type: ModalType, props: ModalPayload = {}) => {
    setModalType(type);
    setModalProps(props);
  };

  const closeModal = () => {
    setModalType(null);
    setModalProps({});
  };

  const value: IModalContext = {
    modalType,
    modalProps,
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};
