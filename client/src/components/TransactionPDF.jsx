import React from "react";
import { Document, Page, Text, View, Image } from "@react-pdf/renderer";
import BarberBossImage from "assets/profile.jpg";

const TransactionPDF = ({ facturaData }) => {
  const lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  return (
    <Document>
      <Page
        size="A4"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            padding: 10,
          }}
        >
          <Text style={{ color: "#3388af", fontSize: "42px" }}>
            Facturado por {facturaData ? facturaData.vendorName : "..."}
          </Text>
          <Text>Hola {facturaData ? facturaData.clientName : "..."}</Text>
          <Image
            src={BarberBossImage}
            alt="random image"
            style={{ maxWidth: "600px", maxHeight: "400" }}
          />
          <Text
            style={{
              color: "gray",
              fontStyle: "italic",
              fontSize: "30px",
            }}
          >
            Esta es tu factura por la compra de
          </Text>
          {facturaData &&
            facturaData.products.map((product) => (
              <Text key={product.productId}>
                {product.description} x{product.units} unds = {product.totalValue}
              </Text>
            ))}
          <Text style={{ textAlign: "justify", marginTop: "22px" }}>
            {facturaData ? facturaData.clienteName : null}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TransactionPDF;