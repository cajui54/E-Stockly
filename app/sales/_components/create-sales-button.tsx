'use client';
import { Button } from '@/app/_components/ui/button';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import React, { useState } from 'react';
import UpsertSheetContent from './upsert-sheet-content';
import { Product } from '@prisma/client';
import { ComboboxOption } from '@/app/_components/ui/combobox';

interface CreateSalesButtonProps {
  products: Product[];
  productOptions: ComboboxOption[];
}

const CreateSalesButton = (props: CreateSalesButtonProps) => {
  const [sheetIsOpen, setSheetIsOpen] = useState<boolean>(false);
  return (
    <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
      <SheetTrigger asChild>
        <Button className="bg-green-600">Nova Venda</Button>
      </SheetTrigger>
      <UpsertSheetContent setSheetIsOpen={setSheetIsOpen} {...props} />
    </Sheet>
  );
};

export default CreateSalesButton;
