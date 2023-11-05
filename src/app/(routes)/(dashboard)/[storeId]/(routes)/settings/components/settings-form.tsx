'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Store } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useOrigin } from '@/hooks/use-origin';

import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Um nome deve ser fornecido!' }),
});

type SettingsFormValues = z.infer<typeof formSchema>;

interface SettingsFormProps {
  initialData: Store;
}

export function SettingsForm({ initialData }: SettingsFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(data: SettingsFormValues) {
    try {
      setIsLoading(true);

      await axios.patch(`/api/stores/${params.storeId}`, data);

      router.refresh();

      toast.success('Loja atualizada com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro, tente novamente!');
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);

      await axios.delete(`/api/stores/${params.storeId}`);

      router.refresh();
      router.push('/');

      toast.success('A loja foi excluída com sucesso!');
    } catch (error) {
      toast.error(
        'Certifique-se de remover todos os produtos e categorias primeiro.',
      );
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        isLoading={isLoading}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
      />

      <div className="flex items-center justify-between">
        <Heading
          title="Configurações"
          description="Gerencie as configurações da sua loja"
        />

        <Button
          disabled={isLoading}
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(true)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Nome da Loja"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="ml-auto">
            Salvar mudanças
          </Button>
        </form>
      </Form>

      <Separator />

      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
}
