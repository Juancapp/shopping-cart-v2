import Select from "../Select";
import Searchbar from "../Searchbar";
import { categoryOptions, orderOptions } from "./constants";
import Radio from "../Radio";
import { Category, Order, OrderBy } from "../../../types";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Cart from "./assets/Cart";
import NavMenu from "../NavMenu";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Ping from "../Ping";

function Navbar() {
  const searchParams = useSearchParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const orderParam = queryParams.get("order");
  const orderByParam = queryParams.get("orderBy");
  const navigate = useNavigate();

  const [navigation, setNavigation] = useState([
    { name: "Home", href: "/home", current: location.pathname === "/home" },
    {
      name: "My Purchases",
      href: "/purchases",
      current: location.pathname === "purchases",
    },
    {
      name: "Documentation",
      href: "/documentation",
      current: location.pathname === "/documentation",
    },
  ]);

  const handleClick = (name: string) => {
    setNavigation(
      navigation.map((nav) => {
        return { ...nav, current: nav.name === name };
      })
    );
  };

  useEffect(() => {
    navigation.forEach((item) => {
      if (item.current === true) {
        return navigate(item.href);
      }
    });
  }, [navigation]);

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

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-gray-900 flex flex-col gap-2 pb-5 px-4">
      <Disclosure as="nav" className="bg-inherit">
        {({ open }) => (
          <>
            <div className="">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <p
                      className="text-white text-xl font-bold cursor-pointer"
                      onClick={() => navigate("/home")}
                    >
                      CC
                    </p>
                  </div>
                  <div className="hidden sm:ml-6 md:ml-20 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => handleClick(item.name)}
                          className={classNames(
                            item.current
                              ? "shadow-2xl text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium cursor-pointer flex"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                          {item.name === "Documentation" && <Ping />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="flex gap-0 lg:gap-12 items-center">
                    <Cart />
                    <NavMenu />
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    onClick={() => handleClick(item.name)}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                    {item.name === "Documentation" && <Ping />}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
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
