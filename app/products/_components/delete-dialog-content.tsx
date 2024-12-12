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
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { toast } from 'sonner';

interface DeleteProductDialoagContentProps {
  productId: string;
}
const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialoagContentProps) => {
  const { execute: executeDeleteProduct } = useAction(deleteProduct, {
    onError: ({ error: { validationErrors, serverError } }) => {
      toast.error('Ocorreu um erro ao deletar produto.');
    },
    onSuccess: () => {
      toast.success('O produtos foi deletado com sucesso!');
    },
  });
  const handleContinueClick = () => {
    executeDeleteProduct({ id: productId });
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
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
