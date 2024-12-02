import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog';
import { deleteProduct } from '@/app/actions/products/delete-product';
import React from 'react';
import { toast } from 'sonner';

interface DeleteProductDialoagContentProps {
  productId: string;
}
const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialoagContentProps) => {
  const handleContinueClik = async () => {
    try {
      await deleteProduct({ id: productId });
      toast.success('Produto excluído com sucesso.');
    } catch (error) {
      console.error(error);
      toast.error('Ocorreu um erro inesperado!');
    }
  };
  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <AlertDialogAction onClick={handleContinueClik}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
