export interface ProductsTableColumnsProps {
  id: number;
  label: string;
}
export const ProductsTableColumns: ProductsTableColumnsProps[] = [
  { id: 1, label: "Id" },
  { id: 2, label: "Name" },
  { id: 3, label: "Category" },
  { id: 4, label: "Stock" },
  // { id: 5, label: "Status" },
  { id: 6, label: "Images" },
  { id: 7, label: "Price" },
  { id: 8, label: "Edit" },
];
export interface ProductsTableDataProps {
  id: string;
  name: string;
  category: object;
  user: object;
  total: number;
  payment_mode: string;
  coupon: object;
  status: string;
}
