import { useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { DataTable } from "react-native-paper";

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
  }, [products]);

  const list = products.map((product: Product, index) => (
    <Text
      key={index}
      style={{ ...Typography.normal, ...Typography.normalTextColor }}
    >
      {product.name}: {product.stock}st.
    </Text>
  ));

  // NYTT:
  const table = products.map((product: Product, index) => {
    return (
      <DataTable.Row key={index}>
        <DataTable.Cell style={{ flex: 3 }}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            {product.name}
          </Text>
        </DataTable.Cell>
        <DataTable.Cell style={{ flex: 1 }}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            {product.stock}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    );
  });

  return (
    <DataTable style={Base.paddingBottom}>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 3 }}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            Produkt
          </Text>
        </DataTable.Title>
        <DataTable.Title style={{ flex: 1 }}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
            Antal
          </Text>
        </DataTable.Title>
      </DataTable.Header>
      {table}
    </DataTable>
  );

  // return <View style={Base.paddingBottom}>{list}</View>;
};

export default Stock;
