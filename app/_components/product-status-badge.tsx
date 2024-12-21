import React from 'react';
import { Badge } from './ui/badge';
import { ProductStatusDto } from '../_data-access/product/get-products';
const getStatusLabel = (status: string) => {
  if (status === 'IN_STOCK') {
    return 'Em estoque';
  }
  return 'Esgotado';
};
interface ProductStatusBadgeProps {
  status: ProductStatusDto;
}
const ProductStatusBadge = ({ status }: ProductStatusBadgeProps) => {
  const label = getStatusLabel(status);
  return (
    <Badge
      className={`hover:bg-neutral-600 ${
        label === 'Em estoque'
          ? 'bg-green-200 text-green-900'
          : 'bg-gray-300 text-gray-950'
      }`}
    >
      {label}
    </Badge>
  );
};

export default ProductStatusBadge;
