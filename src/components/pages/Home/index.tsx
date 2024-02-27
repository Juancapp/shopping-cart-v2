import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../../services/products/query";
import { useEffect, useState } from "react";
import Card from "./Card";
import Loader from "../../assets/Loader";
import { JSX } from "react/jsx-runtime";
import { useUser } from "../../../services/user/query";

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

  const [page, setPage] = useState(1);

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
      <h1 className="text-5xl font-extrabold w-fit">PRODUCTS</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 box-content">
        {productsQuery.isFetching
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
      <div className="flex flex-row">
        {page > 1 && (
          <button onClick={() => handlePreviousPage()}>Previous</button>
        )}
        <div>
          {page} of {data?.totalPages}
        </div>
        {page < data?.totalPages! && (
          <button onClick={() => handleNextPage()}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
