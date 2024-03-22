import { useEffect, useMemo, useState } from "react";
import { usePurchases } from "../../../services/purchases/query";
import { useUser } from "../../../services/user/query";
import { Purchase, Status } from "../../../types";
import Button, { ButtonVariant } from "../../assets/Button";
import Modal from "../../assets/Modal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Pdf from "../../assets/Pdf";
import { formatDate } from "../../../helpers/date";
import Clock from "../../assets/Clock";

import { usePurchaseMutation } from "../../../services/purchases/mutations";

type PurchaseTable = Omit<Purchase, "totalQuantity" | "user">;

enum ReqEnum {
  PUT = "put",
  DELETE = "delete",
}

function Purchases() {
  const userQuery = useUser();

  const headers = [
    "Date",
    "Products",
    "Total price",
    "Status",
    "Credit Card",
    "Generate PDF",
  ];

  const purchasesQuery = usePurchases(userQuery?.data?.data?._id!);

  const purchasesData =
    purchasesQuery?.data?.pages.flatMap((page) => page.data.purchases) || [];

  const purchaseMutation = usePurchaseMutation(userQuery?.data?.data?._id!);

  const [modal, setModal] = useState({ type: ReqEnum.DELETE, id: "" });

  useEffect(() => {
    purchasesQuery?.refetch();
  }, [userQuery?.data?.data?._id]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        purchasesQuery?.hasNextPage &&
        !purchasesQuery?.isFetchingNextPage
      ) {
        purchasesQuery?.fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [purchasesQuery?.hasNextPage, purchasesQuery?.isFetchingNextPage]);

  useEffect(() => {
    const interval = setInterval(() => {
      purchasesQuery.refetch();
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const tableData: PurchaseTable[] = useMemo(
    () =>
      purchasesData.map((purchase) => {
        {
          const filteredPurchase = {
            createdAt: purchase?.createdAt!,
            products: purchase.products,
            totalPrice: purchase.totalPrice,
            status: purchase.status,
            cardNumber: purchase.cardNumber,
            _id: purchase._id,
          };

          return filteredPurchase;
        }
      }),

    [purchasesQuery]
  );

  const modalOptions = {
    [ReqEnum.DELETE]: {
      h1: "Cancel",
      title: "¿Cancel purchase? Your money will be refunded",
    },

    [ReqEnum.PUT]: {
      h1: "Force to Success",
      title:
        "Force to Success? Your purchase can not be cancelled and refunded",
    },
  };

  return (
    <>
      {!!modal.id.length && (
        <Modal>
          <h1 className="text-white text-2xl mb-3">
            {modalOptions[modal.type].h1}
          </h1>
          <p className="text-white mb-3 text-sm">
            {modalOptions[modal.type].title}
          </p>
          <div className="flex self-end gap-3">
            <Button
              variant={ButtonVariant.PRIMARY}
              text="Cancel"
              onClick={() =>
                setModal((prevValue) => {
                  return { ...prevValue, id: "" };
                })
              }
            ></Button>
            <Button
              variant={ButtonVariant.BLACK}
              text="Confirm"
              onClick={async () => {
                const res = await purchaseMutation.mutateAsync({
                  id: modal.id,
                  reqType: modal.type,
                });
                if (res.status < 400) {
                  setModal({ ...modal, id: "" });
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
                                <div className="flex flex-col">
                                  <span>
                                    Purchase must be "success" to generate PDF
                                  </span>
                                  <span>or</span>
                                  <span
                                    className="text-red-600 cursor-pointer"
                                    onClick={() =>
                                      setModal({
                                        type: ReqEnum.PUT,
                                        id: purchase._id,
                                      })
                                    }
                                  >
                                    Force purchase to success
                                  </span>
                                </div>
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
                                  {key === "status" &&
                                    purchase.status === Status.PENDING && (
                                      <div className="relative">
                                        <Clock
                                          minutes={Math.round(
                                            (Number(new Date()) -
                                              Number(
                                                new Date(purchase.createdAt!)
                                              )) /
                                              60000
                                          )}
                                        />
                                      </div>
                                    )}
                                  {key === "totalPrice" && "$"}
                                  {key === "cardNumber" && "****"}
                                  {key !== "createdAt"
                                    ? purchase[key]
                                    : formatDate(purchase[key]!)}
                                </p>
                                {key === "status" &&
                                  purchase[key] === Status.PENDING && (
                                    <Button
                                      text="cancel"
                                      variant={ButtonVariant.RED}
                                      onClick={() =>
                                        setModal({
                                          type: ReqEnum.DELETE,
                                          id: purchase._id,
                                        })
                                      }
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
      {purchasesQuery.isFetchingNextPage && <h1>Loading...</h1>}
    </>
  );
}

export default Purchases;
