import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../../services/products/query";
import { ProductData } from "../../../types";
import { useEffect, useState } from "react";
import Card from "../../assets/Card";
import { useUserStore } from "../../../zustand/store";

function ProductsContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj: { [key: string]: string } = {};

  for (let [key, value] of searchParams) {
    paramsObj[key] = value;
  }

  const user = useUserStore((state) => state.user);
  const products = "products" in user ? user.products : [];
  const userId = "_id" in user ? user._id : "";

  const query = useProductsQuery(paramsObj);

  const data = query?.data?.data as unknown as ProductData;

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
      {query.isLoading ? (
        <div className="flex space-x-2 animate-pulse">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 box-content">
          {data?.products.map((product, index) => {
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
      )}
      <div className="flex flex-row">
        {page > 1 && (
          <button onClick={() => handlePreviousPage()}>Previous</button>
        )}
        <div>
          {page} of {data?.totalPages}
        </div>
        {page < data?.totalPages && (
          <button onClick={() => handleNextPage()}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
