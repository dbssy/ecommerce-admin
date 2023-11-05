'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard } from '@prisma/client';
import axios from 'axios';
import { Trash } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { AlertModal } from '@/components/modals/alert-modal';
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
import { ImageUpload } from '@/components/ui/image-upload';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  label: z.string().min(1, { message: 'Um nome deve ser fornecido!' }),
  imageUrl: z.string().min(1, { message: 'Uma imagem deve ser fornecida!' }),
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface IBillboardFormProps {
  initialData: Billboard | null;
}

export function BillboardForm({ initialData }: IBillboardFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? 'Editar anúncio' : 'Criar novo anúncio';
  const description = initialData
    ? 'Edite o seu anúncio'
    : 'Comece a vender com um novo anúncio';
  const toastMessage = initialData
    ? 'Anúncio atualizado com sucesso!'
    : 'Anúncio criado com sucesso!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const params = useParams();
  const router = useRouter();

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: '',
    },
  });

  async function onSubmit(data: BillboardFormValues) {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/billboards`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/billboards`);

      toast.success(toastMessage);
    } catch (error) {
      toast.error('Ocorreu um erro, tente novamente!');
    } finally {
      setIsLoading(false);
    }
  }

  async function onDelete() {
    try {
      setIsLoading(true);

      await axios.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`,
      );

      router.refresh();
      router.push(`/${params.storeId}/billboards`);

      toast.success('O anúncio foi excluído com sucesso!');
    } catch (error) {
      toast.error(
        'Certifique-se de remover todas as categorias que utilizem esse anúncio primeiro.',
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
        <Heading title={title} description={description} />

        {initialData && (
          <Button
            disabled={isLoading}
            variant="destructive"
            size="icon"
            onClick={() => setIsOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>

      <Separator />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagem</FormLabel>

                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange('')}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>

                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoading}
                      placeholder="Nome anúncio"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isLoading} className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>

      <Separator />
    </>
  );
}
