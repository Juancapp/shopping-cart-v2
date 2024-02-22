import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../../services/products/query";
import { ProductData } from "../../../types";
import { useEffect, useState } from "react";

function ProductsContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj: { [key: string]: string } = {};

  for (let [key, value] of searchParams) {
    paramsObj[key] = value;
  }

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

  if (query.isLoading) return <h1>cargando</h1>;

  if (query.isError) return <h1>Error</h1>;

  return (
    <div className="px-40 py-20 flex flex-col gap-20 items-center">
      <h1 className="text-5xl w-fit">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 box-content">
        {data?.products.map((product) => {
          return (
            <div
              className="hover:shadow-xl cursor-pointer px-10 py-3 flex flex-col items-center"
              key={product.id}
            >
              <img
                src={product.image}
                alt={product.title}
                className="object-contain w-full h-2/3 box-content"
              />
              <p className="font-bold text-center">{product.title}</p>
              <p>Price: {product.price}</p>
              <p>Rating: {product?.rating?.rate}</p>
            </div>
          );
        })}
        <div>{data?.totalPages}</div>
        <div>Page: {page}</div>
        {page > 1 && (
          <button onClick={() => handlePreviousPage()}>Previous</button>
        )}
        {page < data?.totalPages && (
          <button onClick={() => handleNextPage()}>Next</button>
        )}
      </div>
    </div>
  );
}

export default ProductsContainer;
