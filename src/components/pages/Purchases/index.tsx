import { useEffect, useMemo, useState } from "react";
import { usePurchases } from "../../../services/purchases/query";
import { useUser } from "../../../services/user/query";
import { Purchase, Status } from "../../../types";
import Button, { ButtonVariant } from "../../assets/Button";
import { usePurchaseMutation } from "../../../services/purchases/mutations";
import Modal from "../../assets/Modal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "../../assets/Pdf";
import { formatDate } from "../../../helpers/date";

type PurchaseTable = Omit<Purchase, "totalQuantity" | "user">;

function Purchases() {
  const userQuery = useUser();

  const purchasesQuery = usePurchases(userQuery?.data?.data?._id!);

  const purchaseMutation = usePurchaseMutation();

  const purchasesData = purchasesQuery?.data?.data || [];

  const [modalId, setModalId] = useState("");

  useEffect(() => {
    purchasesQuery.refetch();
  }, [userQuery?.dataUpdatedAt]);

  const tableData: PurchaseTable[] = useMemo(
    () =>
      purchasesData.map((purchase) => {
        {
          const filteredPurchase = {
            createdAt: formatDate(purchase?.createdAt!),
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
    <>
      {!!modalId.length && (
        <Modal>
          <h1 className="text-white text-2xl mb-3">Cancel</h1>
          <p className="text-white mb-3 text-sm">
            ¿Cancel purchase? Your money will be refunded{" "}
          </p>
          <div className="flex self-end gap-3">
            <Button
              variant={ButtonVariant.PRIMARY}
              text="Cancel"
              onClick={() => setModalId("")}
            ></Button>
            <Button
              variant={ButtonVariant.BLACK}
              text="Confirm"
              onClick={async () => {
                const res = await purchaseMutation.mutateAsync(modalId);
                if (res.status < 400) {
                  setModalId("");
                }
              }}
            ></Button>
          </div>
        </Modal>
      )}
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
                              purchase.status === Status.PENDING ? (
                                <p>
                                  Purchase must be "success" to generate PDF
                                </p>
                              ) : (
                                <PDFDownloadLink
                                  document={
                                    <Pdf
                                      userName={userQuery?.data?.data?.name!}
                                      purchase={
                                        purchasesData.find(
                                          (foundPurchase) =>
                                            foundPurchase?._id! ===
                                            purchase?._id!
                                        )!
                                      }
                                    />
                                  }
                                  fileName={`${purchase.createdAt}-${userQuery?.data?.data?.name}-Cocoa-Purchase.pdf`}
                                  className="text-blue-700"
                                >
                                  {({ loading, error }) =>
                                    error
                                      ? "Error generating document"
                                      : loading
                                      ? "Loading document..."
                                      : "Generate PDF"
                                  }
                                </PDFDownloadLink>
                              )
                            ) : (
                              <>
                                <p
                                  className={`whitespace-no-wrap ${
                                    key === "status"
                                      ? purchase[key] === Status.SUCCESS
                                        ? "text-green-600 font-bold mb-2"
                                        : "text-yellow-600 font-bold mb-2"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {key === "totalPrice" && "$"}
                                  {purchase[key]}
                                </p>
                                {key === "status" &&
                                  purchase[key] === Status.PENDING && (
                                    <Button
                                      text="cancel"
                                      variant={ButtonVariant.RED}
                                      onClick={() => setModalId(purchase._id)}
                                    />
                                  )}
                              </>
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
    </>
  );
}

export default Purchases;
