import Select from "../Select";
import Searchbar from "../Searchbar";
import { categoryOptions, orderOptions } from "./constants";
import Radio from "../Radio";
import { Category, Order, OrderBy } from "../../../types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Cart from "./assets/Cart";

function Navbar() {
  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const orderParam = queryParams.get("order");
  const orderByParam = queryParams.get("orderBy");
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    title: "",
    category: categoryParam || Category.ALL,
    order: orderParam || Order.DEFAULT,
    orderBy: orderByParam || OrderBy.PRICE,
  });

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

  const setQueryParams = () => {
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

    queryParams.set("page", (1).toString());

    searchParams[1](queryParams);
  };

  useEffect(() => {
    if (location.pathname === "/home") {
      setQueryParams();
    }
  }, [filters]);

  return (
    <div className="bg-gray-900 p-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <p
          className="text-white font-bold cursor-pointer"
          onClick={() => navigate("/home")}
        >
          CC
        </p>
        <Cart />
      </div>
      {location.pathname === "/home" && (
        <>
          <Searchbar
            handleClick={handleSearch}
            initialValue={queryParams.get("title")!}
          />
          <div className="flex flex-col justify-center gap-2 md:gap-0 items-center md:flex-row">
            <Select
              label="Category"
              name="category"
              options={categoryOptions}
              onChange={(e) => handleCategorySelect(e.target.value as Category)}
              defaultValue={categoryParam as Category}
            />
            <Select
              label="Order"
              name="order"
              options={orderOptions}
              onChange={(e) => handleOrderSelect(e.target.value as Order)}
              defaultValue={orderParam as Order}
            />
            <Radio
              values={[OrderBy.PRICE, OrderBy.RATE]}
              name="orderBy"
              onChange={(e) => handleRadio(e.target.value as OrderBy)}
              disabled={filters.order === Order.DEFAULT}
              selectedValue={filters.orderBy as OrderBy}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
