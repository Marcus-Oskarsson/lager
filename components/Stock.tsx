import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import config from "../.config/config.json";

//  6d5ab8aa5e88042749994cd5c2e8096a
export default function Stock() {
  return (
    <View>
      <Text style={styles.textHeader}>LAGERFÖRTECKNING</Text>
      <StockList />
    </View>
  );
}

function StockList() {
  const [products, setProducts] = useState<any[]>([]);

  const getProducts = async () => {
    const result = await (
      await fetch(`${config.BASE_URL}/products?api_key=${config.API_KEY}`)
    ).json();
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const list = products.map((product, index) => (
    <Text key={index} style={styles.productText}>
      {product.name}: {product.stock}st.
    </Text>
  ));

  return <View style={styles.productList}>{list}</View>;
}

const styles = StyleSheet.create({
  textHeader: {
    color: "#1f2484",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 16,
  },
  productText: {
    color: "#efefef",
    fontSize: 14,
    lineHeight: 10,
    paddingVertical: 12,
  },
  productList: {
    paddingBottom: 24,
  },
});
