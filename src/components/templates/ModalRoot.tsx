"use client";

import { useModalContext } from "@/src/context";
import { ConfirmModal } from "@/src/components";

export default function ModalRoot() {
  const { modalType } = useModalContext();

  switch (modalType) {
    case "CONFIRM":
      return <ConfirmModal />;
    default:
      return null;
  }
}
