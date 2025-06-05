export interface GiftcardTableColumnsProps {
    id: number;
    label: string;
  }

export const GiftcardTableColumns: GiftcardTableColumnsProps[] = [
  { id: 1, label: "Id" },
  { id: 2, label: "Name" },
  { id: 3, label: "Amount" },
  { id: 4, label: "Purchase Value" },
  { id: 5, label: "Image" },
  { id: 6, label: "Status" },
  // { id: 7, label: "Redeem" },
  { id: 7, label: "Edit" },
];
