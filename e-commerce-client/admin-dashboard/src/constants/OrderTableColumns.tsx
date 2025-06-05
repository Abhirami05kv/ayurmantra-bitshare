export interface OrderTableColumnsProps {
id:number,
label:string
}

export const OrderTableColumns: OrderTableColumnsProps[] = [
    { id: 1, label: "Order Id" },
    { id: 2, label: "Order date", },
    { id: 3, label: "Customer",},
    { id: 4, label: "Email" },
    { id: 5, label: "Status" },
    { id: 6, label: "Total" },
    { id: 7, label: "Payment Mode" },
    { id: 8, label: "Coupon" },
  ];
  