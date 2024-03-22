import { Document, Text, Page, StyleSheet, View } from "@react-pdf/renderer";
import { Purchase } from "../../../types";
import { formatDate } from "../../../helpers/date";

function Pdf({ purchase, userName }: { purchase: Purchase; userName: string }) {
  const styles = StyleSheet.create({
    page: { backgroundColor: "white", padding: 10 },
    section: { color: "white", textAlign: "center", margin: 30 },
    viewContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      border: "2px solid black",
    },
    view: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "2px solid black",
      paddingHorizontal: "10px",
      alignContent: "center",
    },
    lastView: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottom: "0",
      paddingHorizontal: "10px",
      alignContent: "center",
    },

    productText: {
      width: "33%",
      fontSize: "12px",
      textAlign: "center",
      marginTop: "9px",
    },

    lastProductText: {
      width: "100%",
      fontSize: "12px",
      textAlign: "right",
    },

    lastColumn: {
      width: "33%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },

    infoView: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
    },
  });

  const headers = ["Product", "Price per unit", "Total"];

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.viewContainer}>
          <View style={styles.view}>
            {headers.map((header, index) => {
              return <Text key={index}>{header}</Text>;
            })}
          </View>
          {purchase.products.map((product) => {
            return (
              <View key={product.product._id} style={styles.view}>
                <Text style={styles.productText}>{product.product.title}</Text>
                <Text style={styles.productText}>${product.product.price}</Text>
                <View style={styles.lastColumn}>
                  <Text style={styles.lastProductText}>
                    x {product.quantity}
                  </Text>
                  <Text style={styles.lastProductText}>
                    ${Number(product.product.price) * Number(product.quantity)}
                  </Text>
                </View>
              </View>
            );
          })}
          <View style={styles.lastView}>
            <Text style={styles.productText}>
              {formatDate(purchase.createdAt!)}
            </Text>
            <View style={styles.lastColumn}>
              <Text style={styles.lastProductText}>
                Total quantity: {purchase.totalQuantity}
              </Text>
              <Text style={styles.lastProductText}>
                Total price: ${purchase.totalPrice}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.infoView}>
          <View>
            <Text>Payment method: **** {purchase.cardNumber}</Text>
            <Text>User: {userName}</Text>
            <Text>COCOA SA</Text>
          </View>
          <Text
            style={{
              fontSize: "14px",
            }}
          >
            Order id: #{purchase._id}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export default Pdf;
