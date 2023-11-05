'use client';

import axios from 'axios';
import { Copy, Edit, MoreHorizontal, Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

import { AlertModal } from '@/components/modals/alert-modal';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { ColorColumn } from './columns';

interface ICellActionsProps {
  data: ColorColumn;
}

export function CellActions({ data }: ICellActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const params = useParams();

  async function onConfirm() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/${params.storeId}/colors/${data.id}`);

      toast.success('A cor foi deletada com sucesso!');
      router.refresh();
    } catch (error) {
      toast.error('Certifique-se de remover todos os produtos primeiro.');
    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  }

  function onCopy(id: string) {
    navigator.clipboard.writeText(id);

    toast.success(
      'O ID da cor foi copiado com sucesso para a área de transferência!',
    );
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-8 h-8 p-0">
            <span className="sr-only">Abrir menu</span>
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-2" /> Copiar ID
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" /> Atualizar
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash className="w-4 h-4 mr-2" /> Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
