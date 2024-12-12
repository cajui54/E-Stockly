import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/app/_components/ui/alert-dialog';
import {
  deleteProduct,
  deleteProductAction,
} from '@/app/actions/products/delete-product';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { toast } from 'sonner';

interface DeleteProductDialoagContentProps {
  productId: string;
}
const DeleteProductDialogContent = ({
  productId,
}: DeleteProductDialoagContentProps) => {
  const {} = useAction(deleteProductAction, {
    onError: (error) => {
      toast.error('Ocorreu um erro ao deletar produto.');
    },
    onSuccess: () => {
      toast.success('O produtos foi deletado com sucesso!');
    },
  });
  const handleContinueClick = async () => {
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
        <AlertDialogAction onClick={handleContinueClick}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

export default DeleteProductDialogContent;
