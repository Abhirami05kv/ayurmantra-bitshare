export interface User {
    id: number;
    name: string;
    email: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    status: string;
    image: string[];
  }
  
  export interface Cart {
    id: number;
    user: User;
    product?: Product; 
  }
  