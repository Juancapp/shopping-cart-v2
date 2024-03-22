export enum OrderBy {
  PRICE = "price",
  RATE = "rating.rate",
}

export enum Category {
  ALL = "all",
  ELECTRONICS = "electronics",
  MENS_CLOTHING = `men's clothing`,
  WOMENS_CLOTHING = `women's clothing`,
  JEWELERY = "jewelery",
}

export enum Order {
  DEFAULT = "default",
  DESCENDENT = "desc",
  ASCENDENT = "asc",
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

export enum FirstTime {
  TRUE = "true",
  FALSE = "false",
}

export type PaymentMethodType = {
  number: string;
  expiryDate: string;
  cvc: string;
  isDefault: boolean;
};

export interface User {
  _id: string;
  name: string;
  products: { quantity: number; product: Product }[];
  firstTime: FirstTime;
  paymentMethods: PaymentMethodType[];
}

export interface ProductsData {
  page: number;
  totalPages: number;
  products: Product[];
}

export enum Status {
  PENDING = "pending",
  SUCCESS = "success",
}
export interface Purchase {
  _id: string;
  user: string;
  totalPrice: number;
  totalQuantity: number;
  products: { quantity: number; product: Product }[];
  status: Status;
  createdAt?: string;
  cardNumber: string;
}
