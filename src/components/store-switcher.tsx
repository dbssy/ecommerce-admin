'use client';

import { Store } from '@prisma/client';
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Store as StoreIcon,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export function StoreSwitcher({ items = [], className }: StoreSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentStore = formattedItems.find(
    (item) => item.value === params.storeId,
  );

  function onStoreSelect(store: { value: string; label: string }) {
    setIsOpen(false);

    router.push(`/${store.value}`);
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Selecione uma loja"
          className={cn('w-[200px] justify-between', className)}
        >
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label}
          <ChevronsUpDown className="w-4 h-4 shrink-0 opacity-50 ml-auto" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Pesquisar uma Loja..." />

            <CommandEmpty>Nenhuma loja foi encontrada.</CommandEmpty>

            <CommandGroup heading="Lojas">
              {formattedItems.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                  className="text-sm"
                >
                  <StoreIcon className="w-4 h-4 mr-2" />
                  {store.label}

                  <Check
                    className={cn(
                      'w-4 h-4 ml-auto',
                      currentStore?.value === store.value
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />

          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Criar Loja
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
