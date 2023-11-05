'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface IModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  children?: React.ReactNode;
  onClose(): void;
}

export function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
}: IModalProps) {
  function onChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
