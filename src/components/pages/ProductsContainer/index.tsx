import { useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../../services/products/query";
import { ProductData } from "../../../types";

function ProductsContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObj: { [key: string]: string } = {};

  for (let [key, value] of searchParams) {
    paramsObj[key] = value;
  }

  const query = useProductsQuery(paramsObj);

  const page = parseInt(paramsObj.page) || 1;

  const data = query?.data?.data as unknown as ProductData;

  if (query.isLoading) return <h1>cargando</h1>;

  if (query.isError) return <h1>Error</h1>;

  const handlePreviousPage = () => {
    paramsObj.page = (page - 1).toString();
    setSearchParams(paramsObj);
  };

  const handleNextPage = () => {
    paramsObj.page = (page + 1).toString();
    setSearchParams(paramsObj);
  };

  return (
    <div>
      <h1>Products</h1>
      <div>{data?.totalPages}</div>
      <div>Page: {page}</div>
      {page > 1 && <button onClick={handlePreviousPage}>Previous</button>}
      {page < data?.totalPages && (
        <button onClick={handleNextPage}>Next</button>
      )}
    </div>
  );
}

export default ProductsContainer;
