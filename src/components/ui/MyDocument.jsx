import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import { Image } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
    borderBottom: "1 solid #ccc",
    paddingBottom: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 6,
    fontWeight: "bold",
    color: "#333",
  },
  customerInfo: {
    fontSize: 11,
    color: "#555",
  },
  img: {
    width: 60,
    height: 60,
    objectFit: "contain",
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f2f2f2",
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 6,
    fontSize: 11,
  },
  tableColHeader: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#222",
  },
  totalContainer: {
    marginTop: 20,
    alignItems: "flex-end",
  },
  total: {
    fontSize: 13,
    marginBottom: 4,
  },
  grandTotal: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
    marginTop: 6,
  },
});

export const MyDocument = ({
  date,
  id,
  total,
  products,
  shipping,
  tax,
  subTotal,
  orderList,
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>ORDER CONFIRMATION</Text>
          <Text style={styles.customerInfo}>Order ID: {id}</Text>
          <Text style={styles.customerInfo}>Date: {date}</Text>
          <Text style={styles.customerInfo}>Name: {orderList?.fullName}</Text>
          <Text style={styles.customerInfo}>
            Company: {orderList?.Company_Name}
          </Text>
          <Text style={styles.customerInfo}>
            Phone: {orderList?.Phone_Number}
          </Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image src={`/pin.png`} style={{ width: 14, height: 14 }} />
            <Text style={styles.customerInfo}>{orderList?.Street_Address}</Text>
          </View>
        </View>
        <Image src="/shops.png" style={styles.img} />
      </View>

      {/* Table */}
      {products.map((product, i) => (
        <View
          key={i}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #d1d5db",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
            <Image
              src={`${product.product_img}`}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ fontSize: 16, fontWeight: 400 }}>
              {product.product_name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 12, color: "#9ca3af" }}>
              Qty: {product.quantity}
            </Text>
            <Text>${product.price}</Text>
          </View>
        </View>
      ))}

      {/* Totals */}
      <View style={styles.totalContainer}>
        <Text style={styles.total}>Subtotal: ${subTotal}</Text>
        <Text style={styles.total}>Shipping: ${shipping}</Text>
        <Text style={styles.total}>Tax: ${tax}</Text>
        <Text style={styles.grandTotal}>Grand Total: ${total}</Text>
      </View>
    </Page>
  </Document>
);
