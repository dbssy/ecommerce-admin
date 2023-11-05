'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';

interface AlertModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose(): void;
  onConfirm(): void;
}

export function AlertModal({
  isOpen,
  isLoading,
  onClose,
  onConfirm,
}: AlertModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title="Você tem certeza?"
      description="Essa ação é irreversível!"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="w-full pt-6 space-x-2 flex items-center justify-end">
        <Button disabled={isLoading} variant="outline" onClick={onClose}>
          Cancelar
        </Button>

        <Button disabled={isLoading} variant="destructive" onClick={onConfirm}>
          Confirmar
        </Button>
      </div>
    </Modal>
  );
}
