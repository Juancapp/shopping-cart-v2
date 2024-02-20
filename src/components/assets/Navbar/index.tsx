import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Select from "../Select";
import Searchbar from "../Searchbar";
import Radio from "../Radio";
import { Category, Order, OrderBy } from "../../../types";
import { categoryOptions, orderOptions } from "./constants";
import { useEffect, useState } from "react";

function Navbar() {
  const [filters, setFilters] = useState({
    category: Category.ALL,
    order: Order.DEFAULT,
    title: "",
    orderBy: OrderBy.PRICE,
  });

  const handleChangeCategory = (value: Category) => {
    setFilters((prevValue) => {
      return { ...prevValue, category: value };
    });
  };

  const handleChangeOrder = (value: Order) => {
    setFilters((prevValue) => {
      return { ...prevValue, order: value };
    });
  };

  const handleSearch = (value: string) => {
    setFilters((prevValue) => {
      return { ...prevValue, title: value };
    });
  };

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <div className="bg-blue-950 p-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex">
          <BuildingStorefrontIcon className="text-white w-8" />
          <p className="text-white">Cocoa</p>
        </div>
        <ShoppingCartIcon className="text-white w-8" />
      </div>
      <Searchbar handleClick={handleSearch} />
      <div className="flex flex-col justify-center gap-2 md:gap-0 items-center md:flex-row">
        <Select
          label="Category"
          name="category"
          options={categoryOptions}
          onChange={(e: { target: { value: any } }) =>
            handleChangeCategory(e.target.value)
          }
        />
        <Select
          label="Order"
          name="order"
          options={orderOptions}
          onChange={(e: { target: { value: any } }) =>
            handleChangeOrder(e.target.value)
          }
        />
        <Radio values={[OrderBy.PRICE, OrderBy.RATE]} name="orderBy" />
      </div>
    </div>
  );
}

export default Navbar;
