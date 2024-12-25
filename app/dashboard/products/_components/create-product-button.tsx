'use client';
import React, { useState } from 'react';
import { Dialog, DialogTrigger } from '../../../_components/ui/dialog';
import { PlusIcon } from 'lucide-react';
import { Button } from '@/app/_components/ui/button';
import UpsertProductDialogContent from './upsert-dialog-content';

const CreateProductButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  return (
    <div>
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
        <DialogTrigger asChild>
          <Button className="gap-2">
            <PlusIcon size={20} />
            Novo produto
          </Button>
        </DialogTrigger>
        <UpsertProductDialogContent setDialogIsOpen={setDialogIsOpen} />
      </Dialog>
    </div>
  );
};

export default CreateProductButton;
