declare type CategoryDataProps = {
  id: string;
  name: string;
  categoryCount:number;
  isactive:boolean;
  description:string;
  products:Product[];
  status:string
  };


  declare type ProductDataProps = {
    categoryId:string;
    description:string;
    id:number;
    image:string;
    name:string;
    price:number;
    status:string;
    stock:number;
    category:string
    imageUrls:string
  }

  declare type CartDataProps = {
    categoryId:string;
    description:string;
    id:number;
    image:string;
    name:string;
    price:number;
    status:string;
    stock:number;
    category:string
    imageUrls:string
    quantity:number;
    productId:number
  }


declare type GiftCard ={
  id: number;
  title: string;
  description?: string | null;
  image: string;
  expiryDate: string; 
  is_active: boolean;
  createdAt: string; 
  status: string;
  purchaseAmount: number;
  usableAmount: number;
  balance: string;
  code: string;
  is_redeemed: boolean;
  paymentStatus: string;
}