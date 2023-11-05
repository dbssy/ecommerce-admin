'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Billboard, Category } from '@prisma/client';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Um nome deve ser fornecido!' }),
  billboardId: z.string().min(1, { message: 'Um anúncio deve ser fornecido!' }),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface ICategoryFormProps {
  initialData: Category | null;
  billboards: Billboard[];
}

export function CategoryForm({ initialData, billboards }: ICategoryFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title = initialData ? 'Editar categoria' : 'Criar nova categoria';
  const description = initialData
    ? 'Edite a sua categoria'
    : 'Comece a vender em uma nova categoria';
  const toastMessage = initialData
    ? 'Categoria atualizada com sucesso!'
    : 'Categoria criada com sucesso!';
  const action = initialData ? 'Salvar mudanças' : 'Criar';

  const params = useParams();
  const router = useRouter();

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: '',
      billboardId: '',
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    try {
      setIsLoading(true);

      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          data,
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/categories`);

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
        `/api/${params.storeId}/categories/${params.categoryId}`,
      );

      router.refresh();
      router.push(`/${params.storeId}/categories`);

      toast.success('A categoria foi excluída com sucesso!');
    } catch (error) {
      toast.error(
        'Certifique-se de remover todos os produtos que utilizam essa categoria primeiro.',
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
                      placeholder="Nome da categoria"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anúncio</FormLabel>

                  <Select
                    disabled={isLoading}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Selecione um anúncio"
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {billboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

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
