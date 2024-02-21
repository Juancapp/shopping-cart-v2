import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Select from "../Select";
import Searchbar from "../Searchbar";
import { categoryOptions, orderOptions } from "./constants";
import Radio from "../Radio";
import { Category, Order, OrderBy } from "../../../types";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

function Navbar() {
  const [filters, setFilters] = useState({
    title: "",
    category: Category.ALL,
    order: Order.DEFAULT,
    orderBy: OrderBy.PRICE,
  });

  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const handleSearch = (value: string) => {
    setFilters((prevValue) => {
      return { ...prevValue, title: value };
    });
  };

  const handleCategorySelect = (value: Category) => {
    setFilters((prevValue) => {
      return { ...prevValue, category: value };
    });
  };

  const handleOrderSelect = (value: Order) => {
    setFilters((prevValue) => {
      return { ...prevValue, order: value };
    });
  };

  const handleRadio = (value: OrderBy) => {
    setFilters((prevValue) => {
      return { ...prevValue, orderBy: value };
    });
  };

  useEffect(() => {
    let arrFilters = Object.entries(filters);

    for (let i = 0; i < arrFilters.length; i++) {
      queryParams.set(arrFilters[i][0], arrFilters[i][1]);

      if (arrFilters[i][0] === "title" && !arrFilters[i][1].length) {
        queryParams.delete("title");
        continue;
      }
      if (
        arrFilters[i][0] === "category" &&
        arrFilters[i][1] === Category.ALL
      ) {
        queryParams.delete("category");
        continue;
      }
      if (
        arrFilters[i][0] === "orderBy" &&
        arrFilters[i - 1][1] === Order.DEFAULT
      ) {
        queryParams.delete("orderBy");
        queryParams.delete("order");
        continue;
      }
    }

    searchParams[1](queryParams);
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
          onChange={(e) => handleCategorySelect(e.target.value as Category)}
        />
        <Select
          label="Order"
          name="order"
          options={orderOptions}
          onChange={(e) => handleOrderSelect(e.target.value as Order)}
        />
        <Radio
          values={[OrderBy.PRICE, OrderBy.RATE]}
          name="orderBy"
          onChange={(e) => handleRadio(e.target.value as OrderBy)}
          disabled={filters.order === Order.DEFAULT}
          selectedValue={filters.orderBy}
        />
      </div>
    </div>
  );
}

export default Navbar;
