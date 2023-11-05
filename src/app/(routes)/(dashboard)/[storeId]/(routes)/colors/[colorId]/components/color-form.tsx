'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Color } from '@prisma/client';
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
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Um nome deve ser fornecido!' }),
  value: z
    .string()
    .min(4, { message: 'Um valor deve ser fornecido!' })
    .max(9)
    .regex(/^#/, { message: 'O valor deve ser um código hexadecimal.' }),
});

type ColorFormValues = z.infer<typeof formSchema>;

interface IColorFormProps {
  initialData: Color | null;
}

export function ColorForm({ initialData }: IColorFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? 'Editar cor' : 'Criar nova cor';
  const description = initialData
    ? 'Edite a sua cor'
    : 'Comece a vender em diferentes cores';
  const toastMessage = initialData
    ? 'Cor atualizada com sucesso!'
    : 'Cor criada com sucesso!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const params = useParams();
  const router = useRouter();

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      value: '',
    },
  });

  async function onSubmit(data: ColorFormValues) {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/colors/${params.colorId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/colors`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/colors`);

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

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

      router.refresh();
      router.push(`/${params.storeId}/colors`);

      toast.success('A cor foi excluída com sucesso!');
    } catch (error) {
      toast.error(
        'Certifique-se de remover todos os produtos que utilizem essa cor primeiro.',
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
            color="icon"
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>

                  <FormControl>
                    <Input {...field} disabled={isLoading} placeholder="Nome" />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cor</FormLabel>

                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        {...field}
                        disabled={isLoading}
                        placeholder="Cor"
                      />

                      <div
                        className="border rounded-full p-4"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
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
