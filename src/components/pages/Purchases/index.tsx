import { useEffect, useMemo } from "react";
import { usePurchases } from "../../../services/purchases/query";
import { useUser } from "../../../services/user/query";
import { Purchase, Status } from "../../../types";

function Purchases() {
  const userQuery = useUser();

  const purchasesQuery = usePurchases(userQuery?.data?.data?._id!);
  type PurchaseTable = Omit<Purchase, "totalQuantity" | "user">;

  const purchasesData = purchasesQuery?.data?.data || [];

  useEffect(() => {
    purchasesQuery.refetch();
  }, [userQuery?.dataUpdatedAt]);

  const tableData: PurchaseTable[] = useMemo(
    () =>
      purchasesData.map((purchase) => {
        {
          const filteredPurchase = {
            createdAt: purchase.createdAt,
            products: purchase.products,
            totalPrice: purchase.totalPrice,
            status: purchase.status,
            _id: purchase._id,
          };

          return filteredPurchase;
        }
      }),

    [purchasesQuery]
  );

  const headers = ["Date", "Products", "Total price", "Status", "Generate PDF"];

  return (
    <div className="p-10">
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr className="px-10 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((purchase: PurchaseTable) => {
              const keys = Object.keys(purchase) as (keyof PurchaseTable)[];
              return (
                <tr key={purchase._id} className="hover:bg-gray-100">
                  {keys.map((key, index) => {
                    return (
                      <td
                        key={index}
                        className="px-10 py-5 border-b border-gray-200 bg-white text-sm"
                      >
                        {key !== "products" ? (
                          key === "_id" ? (
                            <button className="text-blue-600 hover:text-blue-900">
                              Generate PDF
                            </button>
                          ) : (
                            <p
                              className={`whitespace-no-wrap ${
                                key === "status"
                                  ? purchase[key] === Status.SUCCESS
                                    ? "text-green-600 font-bold"
                                    : "text-yellow-600 font-bold"
                                  : "text-gray-900"
                              }`}
                            >
                              {key === "totalPrice" && "$"}
                              {purchase[key]}
                            </p>
                          )
                        ) : (
                          purchase[key].map((product, index) => (
                            <div key={index}>
                              <p>{product.product.title}</p>
                              <p>x{product.quantity}</p>
                              <img
                                className="h-12"
                                src={product.product.image}
                                alt={product.product.title}
                              />
                            </div>
                          ))
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Purchases;
