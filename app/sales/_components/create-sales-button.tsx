'use client';
import { Button } from '@/app/_components/ui/button';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import React, { useState } from 'react';
import UpsertSheetContent from './upsert-sheet-content';
import { ComboboxOption } from '@/app/_components/ui/combobox';
import { PlusIcon } from 'lucide-react';
import { ProductDTO } from '@/app/_data-access/product/get-products';

interface CreateSalesButtonProps {
  products: ProductDTO[];
  productOptions: ComboboxOption[];
}

const CreateSalesButton = (props: CreateSalesButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-green-600">
          <PlusIcon size={20} />
          Nova Venda
        </Button>
      </SheetTrigger>
      <UpsertSheetContent
        isOpen={sheetIsOpen}
        setSheetIsOpen={setSheetIsOpen}
        {...props}
      />
    </Sheet>
  );
};

export default CreateSalesButton;
