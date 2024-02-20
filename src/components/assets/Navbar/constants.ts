import { Category, Order } from "../../../types";

export const categoryOptions = [
  {
    value: Category.ALL,
    title: "All",
  },
  {
    value: Category.MENS_CLOTHING,
    title: "Men's Clothing",
  },
  {
    value: Category.WOMENS_CLOTHING,
    title: "Women's Clothing",
  },
  {
    value: Category.JEWERLERY,
    title: "Jewelery",
  },
  {
    value: Category.ELECTRONICS,
    title: "Electronics",
  },
];

export const orderOptions = [
  {
    value: Order.DEFAULT,
    title: "Default",
  },
  {
    value: Order.ASCENDENT,
    title: "Ascendent",
  },
  {
    value: Order.DESCENDENT,
    title: "Descendent",
  },
];
