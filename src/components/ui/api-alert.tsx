'use client';

import { Copy, Server } from 'lucide-react';
import toast from 'react-hot-toast';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

const textMap: Record<ApiAlertProps['variant'], string> = {
  public: 'Public',
  admin: 'Admin',
};

const variantMap: Record<ApiAlertProps['variant'], BadgeProps['variant']> = {
  public: 'secondary',
  admin: 'destructive',
};

export function ApiAlert({
  title,
  description,
  variant = 'public',
}: ApiAlertProps) {
  function onCopy() {
    navigator.clipboard.writeText(description);
    toast.success('Copiado para a área de transferência!');
  }

  return (
    <Alert>
      <Server className="w-4 h-4" />

      <AlertTitle className="flex items-center gap-x-2">
        {title}

        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="bg-muted rounded px-[0.3rem] py-[0.2rem] text-sm font-semibold font-mono relative">
          {description}
        </code>

        <Button variant="outline" size="icon" onClick={onCopy}>
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
}
