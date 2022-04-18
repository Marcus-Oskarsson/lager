import { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";

import config from "../.config/config.json";
import Product from "../interfaces/product";
import { Base, Typography } from "../styles";

const Stock = ({ products, setProducts }) => {
  return (
    <View>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        LAGERFÖRTECKNING
      </Text>
      <StockList products={products} setProducts={setProducts} />
    </View>
  );
};

const StockList = ({ products, setProducts }) => {
  const getProducts = async () => {
    const result = await (
      await fetch(`${config.BASE_URL}/products?api_key=${config.API_KEY}`)
    ).json();
    setProducts(result.data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const list = products.map((product: Product, index) => (
    <Text
      key={index}
      style={{ ...Typography.normal, ...Typography.normalTextColor }}
    >
      {product.name}: {product.stock}st.
    </Text>
  ));

  return <View style={Base.paddingBottom}>{list}</View>;
};

export default Stock;
