import { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import config from "../config/config.json";

//  6d5ab8aa5e88042749994cd5c2e8096a
export default function Stock() {
  return (
    <View>
      <Text style={styles.text}>Lagerförteckning</Text>
      <StockList />
    </View>
  );
}

interface Product {
  id: number;
  article_number: string | undefined;
  name: string;
  description: string | undefined;
  specifiers: string | object | undefined;
  stock: number | undefined;
  location: string | undefined;
  price: number | undefined;
}

function StockList() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const result = await (
      await fetch(`${config.BASE_URL}/products?api_key=${config.API_KEY}`)
    ).json();
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const list = products.map((product: Product, index) => (
    <Text key={index}>
      {product.name} - {product.stock}
    </Text>
  ));

  return <View>{list}</View>;
}

const styles = StyleSheet.create({
  text: {
    color: "#333",
    fontSize: 24,
  },
});
