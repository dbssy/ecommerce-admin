import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';

import { useStoreModal } from '@/hooks/use-store-modal';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Um nome deve ser fornecido!' }),
});

export function StoreModal() {
  const [isLoading, setIsLoading] = useState(false);

  const { isOpen, onClose } = useStoreModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      const { data } = await axios.post('/api/stores', values);

      window.location.assign(`/${data.id}`);

      toast.success('Loja criada com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao criar a loja!');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Criar loja"
      description="Adicione uma nova loja para gerenciar os produtos e as categorias"
      onClose={onClose}
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Minha Loja"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full pt-6 space-x-2 flex items-center justify-end">
                <Button
                  variant="outline"
                  disabled={isLoading}
                  onClick={onClose}
                >
                  Cancelar
                </Button>

                <Button type="submit" disabled={isLoading}>
                  Continuar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
