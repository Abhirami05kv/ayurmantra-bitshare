declare type DrawerModeProps = {
  isEdit?: boolean;
  isAdd?: boolean;
};
declare type CategoryDataProps = {
  id: string;
  name: string;
  description: string;
  isactive: boolean;
  categoryCount: number;
  status:string
};
type OrderDataProps = {
  id: number;
  date: string;
  price: string;
  status: string;
  paymentMethod: string | null;
  address: string | null;
  email: string | null;
  username: string | null;
  user: {
    name: string;
    email: string;
    userId: number;
  };
  orderItems: {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
    price: number;
    totalPrice: string;
  }[];
};

declare type CouponDataProps ={
  coupon_code?: string;
  discount_percentage?: string;
  discount_type?: string;
  discount_value?: string;
  expiry_date?: string;
  id?: number;
  isUsed?: boolean;
  is_active?: boolean;
  min_purchase?: number;
  usage_limit?: number;
  used_count?: number;
}

declare type GiftCard ={
  balance?: number|string;
  code?: string;
  createdAt?: string;
  description?: string | null;
  expiryDate?: string;
  id?: number;
  image?: string;
  is_active?: boolean;
  is_redeemed?: boolean;
  paymentStatus?: string;
  purchaseAmount: number|string;
  status?: string;
  title: string;
  usableAmount: number|string;
}