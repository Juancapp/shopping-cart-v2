export enum OrderBy {
  PRICE = "price",
  RATE = "rate",
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
  id: string;
  title: string;
  description: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  image: string;
}

export interface ProductData {
  page: number;
  totalPages: number;
  products: Product[];
}
