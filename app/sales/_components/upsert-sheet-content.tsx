'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/app/_components/ui/sheet';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form';
import { Input } from '@/app/_components/ui/input';
import { Combobox, ComboboxOption } from '@/app/_components/ui/combobox';
import { Button } from '@/app/_components/ui/button';
import { CheckIcon, PlusIcon } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/app/_components/ui/table';
import { formatCurrency } from '@/app/_helpers/currency';
import UpsertSalesTableDropdownMenu from './upsert-table-dropdown-menu';
import { upsetSale } from '@/app/actions/sales/upsert-sales';
import { toast } from 'sonner';
import { useAction } from 'next-safe-action/hooks';

import { flattenValidationErrors } from 'next-safe-action';
import { ProductDTO } from '@/app/_data-access/product/get-products';
import { Product } from '@prisma/client';
const formShema = z.object({
  productId: z.string().uuid({ message: 'Produto é obrigatório!' }),
  quantity: z.coerce.number().int().positive(),
});

type FormSchema = z.infer<typeof formShema>;
interface SelectedProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
interface UpesertSheetContentProps {
  isOpen: boolean;
  saleId?: string;
  products: ProductDTO[];
  productOptions: ComboboxOption[];
  setSheetIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultSelectedProducts?: SelectedProduct[];
}

const UpsertSheetContent = ({
  isOpen,
  saleId,
  products,
  productOptions,
  setSheetIsOpen,
  defaultSelectedProducts,
}: UpesertSheetContentProps) => {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formShema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  });
  const { execute: executeCreateSale } = useAction(upsetSale, {
    onError: ({ error: { validationErrors, serverError } }) => {
      const flatternedErrors = flattenValidationErrors(validationErrors);

      toast.error(serverError ?? flatternedErrors.formErrors[0]);
    },
    onSuccess: () => {
      toast.success('Venda realizada com sucesso.');
      setSheetIsOpen(false);
      setSelectedProduct([]);
      form.reset();
    },
  });
  const [selectedProducts, setSelectedProduct] = useState<SelectedProduct[]>(
    defaultSelectedProducts ?? [],
  );

  const onDelete = (productId: string) => {
    setSelectedProduct((currentProduct) => {
      return currentProduct.filter((product) => product.id !== productId);
    });
  };

  const productsTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);
  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setSelectedProduct([]);
    }
  }, [form, isOpen]);
  useEffect(() => {
    setSelectedProduct(defaultSelectedProducts ?? []);
  }, [defaultSelectedProducts]);
  const onSubmit = (data: FormSchema) => {
    const selectedProduct = products.find(
      (product) => product.id === data.productId,
    );
    if (!selectedProduct) return;

    setSelectedProduct((currenctProducts) => {
      const existingProduct = currenctProducts.find(
        (product) => product.id === selectedProduct.id,
      );
      if (existingProduct) {
        const productIsOutOfStock =
          existingProduct.quantity + data.quantity > selectedProduct.stock;
        if (productIsOutOfStock) {
          form.setError('quantity', {
            message: 'Quantidade indisponível em estoque.',
          });
          return currenctProducts;
        }
        form.reset();
        return currenctProducts.map((product) => {
          if (product.id === selectedProduct.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            };
          }
          return product;
        });
      }

      const productIsOutOfStock = data.quantity > selectedProduct.stock;
      if (productIsOutOfStock) {
        form.setError('quantity', {
          message: 'Quantidade indisponível em estoque.',
        });
        return currenctProducts;
      }
      form.reset();
      return [
        ...currenctProducts,
        {
          ...selectedProduct,
          price: Number(selectedProduct.price),
          quantity: data.quantity,
        },
      ];
    });
  };
  const onSubmitSales = async () => {
    executeCreateSale({
      id: saleId,
      products: selectedProducts.map((product) => ({
        id: product.id,
        quantity: product.quantity,
      })),
    });
  };
  return (
    <SheetContent className="!max-w-[35rem]">
      <SheetHeader>
        <SheetTitle>{!saleId ? 'Nova Venda' : 'Editar Venda'}</SheetTitle>
        <SheetDescription>
          {!saleId
            ? 'Insira as informações da venda abaixo.'
            : 'Edite as informações da venda abaixo.'}
        </SheetDescription>
      </SheetHeader>

      <Form {...form}>
        <form className="space-y-6 py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    options={productOptions}
                    placeholder="Selecione um produto"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'ghost'}
            disabled={form.formState.isSubmitting}
            className="w-full gap-2"
          >
            <PlusIcon /> Adicionar produto à venda
          </Button>
        </form>
      </Form>

      <Table>
        <TableCaption>Lista dos produtos adicionados à venda.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Preço Unitário</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                {formatCurrency(product.price * product.quantity)}
              </TableCell>
              <TableCell>
                <UpsertSalesTableDropdownMenu
                  product={product}
                  onDelete={onDelete}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>{formatCurrency(productsTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <SheetFooter className="pt-8">
        <Button
          className="w-full gap-2"
          disabled={selectedProducts.length === 0}
          onClick={onSubmitSales}
        >
          <CheckIcon size={20} />
          Finalizar venda
        </Button>
      </SheetFooter>
    </SheetContent>
  );
};

export default UpsertSheetContent;
