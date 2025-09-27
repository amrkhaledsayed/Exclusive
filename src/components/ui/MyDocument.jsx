import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: 'Helvetica',
    backgroundColor: '#ffffff',
    color: '#333333',
  },

  // Header Styles
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    letterSpacing: 1,
  },
  orderDetails: {
    flexDirection: 'row',
    gap: 20,
  },
  orderId: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    backgroundColor: '#f3f4f6',
    padding: '6 12',
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#6b7280',
    alignSelf: 'center',
  },
  logo: {
    width: 80,
    height: 80,
  },

  // Divider
  divider: {
    height: 2,
    backgroundColor: '#e5e7eb',
    marginBottom: 25,
  },

  // Customer Section
  customerSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 15,
    borderBottom: '1px solid #d1d5db',
    paddingBottom: 5,
  },
  customerGrid: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 30,
  },
  customerColumn: {
    flex: 1,
  },
  customerLabel: {
    fontSize: 9,
    color: '#6b7280',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  customerValue: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  pinIcon: {
    width: 10,
    height: 10,
  },

  // Products Section
  productsSection: {
    marginBottom: 25,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    borderBottom: '2px solid #e2e8f0',
  },
  headerText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
    textTransform: 'uppercase',
    flex: 1,
    textAlign: 'center',
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12 8',
    borderBottom: '1px solid #f1f5f9',
    minHeight: 60,
  },
  productInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
    gap: 12,
  },
  productImage: {
    width: 45,
    height: 45,
    borderRadius: 6,
    border: '1px solid #e5e7eb',
  },
  productName: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
    flex: 1,
  },
  quantity: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
  price: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'center',
    flex: 1,
    fontWeight: '500',
  },
  itemTotal: {
    fontSize: 11,
    color: '#374151',
    textAlign: 'right',
    flex: 1,
    fontWeight: 'bold',
  },

  // Summary Section
  summarySection: {
    backgroundColor: '#f8fafc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 25,
    border: '1px solid #e2e8f0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 11,
    color: '#374151',
    fontWeight: '500',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTop: '2px solid #d1d5db',
  },
  totalLabel: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    color: '#059669',
    fontWeight: 'bold',
  },

  // Footer
  footer: {
    textAlign: 'center',
    marginTop: 30,
    paddingTop: 20,
    borderTop: '1px solid #e5e7eb',
  },
  footerText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footerNote: {
    fontSize: 9,
    color: '#6b7280',
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
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>ORDER CONFIRMATION</Text>
          <View style={styles.orderDetails}>
            <Text style={styles.orderId}>Order #{id}</Text>
            <Text style={styles.date}>{date}</Text>
          </View>
        </View>
        <Image src="/shops.png" style={styles.logo} />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Customer Information Section */}
      <View style={styles.customerSection}>
        <Text style={styles.sectionTitle}>BILLING & SHIPPING INFORMATION</Text>
        <View style={styles.customerGrid}>
          <View style={styles.customerColumn}>
            <Text style={styles.customerLabel}>Customer Name</Text>
            <Text style={styles.customerValue}>{orderList?.fullName}</Text>
          </View>
          <View style={styles.customerColumn}>
            <Text style={styles.customerLabel}>Company</Text>
            <Text style={styles.customerValue}>{orderList?.Company_Name}</Text>
          </View>
        </View>
        <View style={styles.customerGrid}>
          <View style={styles.customerColumn}>
            <Text style={styles.customerLabel}>Phone Number</Text>
            <Text style={styles.customerValue}>{orderList?.Phone_Number}</Text>
          </View>
          <View style={styles.customerColumn}>
            <Text style={styles.customerLabel}>Delivery Address</Text>
            <View style={styles.addressRow}>
              <Image src="/pin.png" style={styles.pinIcon} />
              <Text style={styles.customerValue}>
                {orderList?.Street_Address}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Products Section */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>ORDER ITEMS</Text>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Item</Text>
          <Text style={styles.headerText}>Qty</Text>
          <Text style={styles.headerText}>Price</Text>
          <Text style={styles.headerText}>Total</Text>
        </View>

        {/* Product Items */}
        {products.map((product, i) => (
          <View key={i} style={styles.productRow}>
            <View style={styles.productInfo}>
              <Image src={product.product_img} style={styles.productImage} />
              <Text style={styles.productName}>{product.product_name}</Text>
            </View>
            <Text style={styles.quantity}>{product.quantity}</Text>
            <Text style={styles.price}>${product.price}</Text>
            <Text style={styles.itemTotal}>
              ${(product.price * product.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.summarySection}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal:</Text>
          <Text style={styles.summaryValue}>${subTotal}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Shipping:</Text>
          <Text style={styles.summaryValue}>${shipping}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax:</Text>
          <Text style={styles.summaryValue}>${tax}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>GRAND TOTAL:</Text>
          <Text style={styles.totalValue}>${total}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Thank you for your business!</Text>
        <Text style={styles.footerNote}>
          For any questions about this order, please contact our support team.
        </Text>
      </View>
    </Page>
  </Document>
);
