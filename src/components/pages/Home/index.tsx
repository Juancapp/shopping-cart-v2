import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../../services/products/query";
import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../../assets/Loader";
import { JSX } from "react/jsx-runtime";
import { useUser } from "../../../services/user/query";
import { useToastStore } from "../../../zustand/store";
import { ToastType } from "../../../zustand/types";
import PageButton from "../../assets/PageButton";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { ChevronRightIcon } from "@heroicons/react/20/solid";

let loaders: JSX.Element[] = [];

for (let i = 0; i < 9; i++) {
  loaders.push(<Loader key={i} />);
}

function ProductsContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj: { [key: string]: string } = {};

  for (let [key, value] of searchParams) {
    paramsObj[key] = value;
  }

  const useUserQuery = useUser();
  const user = useUserQuery?.data?.data;
  const products = user?.products?.length ? user?.products : [];
  const userId = user?._id || "";
  const productsQuery = useProductsQuery(paramsObj);
  const data = productsQuery?.data?.data;
  const { setToast } = useToastStore((state) => state);

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (productsQuery?.isError) {
      setToast(ToastType.ERROR, "Products not found");
    }
  }, [productsQuery?.isError]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    paramsObj.page = page.toString();
    setSearchParams(paramsObj);
  }, [page]);

  return (
    <div className="px-[5%] py-20 flex flex-col gap-20 items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 box-content">
        {productsQuery?.isFetching
          ? loaders.map((loader) => loader)
          : data?.products.map((product, index) => {
              return (
                <Card
                  {...product}
                  products={products}
                  userId={userId}
                  key={index}
                />
              );
            })}
      </div>
      <div className="flex flex-row gap-3 items-center">
        <PageButton disabled={page <= 1} onClick={() => handlePreviousPage()}>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </PageButton>
        {data?.products.length && (
          <p className="text-gray-700">
            page {page} of {data?.totalPages}
          </p>
        )}

        <PageButton
          disabled={!data?.products.length || page >= data?.totalPages!}
          onClick={() => handleNextPage()}
        >
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </PageButton>
      </div>
    </div>
  );
}

export default ProductsContainer;
