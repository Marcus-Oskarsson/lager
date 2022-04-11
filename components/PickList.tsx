import { useEffect } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

import orderModel from "../models/orders";
import productModel from "../models/products";

import { Base, Typography } from "../styles";

export default function PickList({ route, navigation, setProducts }) {
  const { order } = route.params;

  useEffect(() => {
    async () => {
      setProducts(await productModel.getProducts());
    };
  }, []);

  async function pick() {
    await orderModel.pickOrder(order);
    navigation.navigate("List", { reload: true });
  }

  const orderItemsList = order.order_items.map((item, index) => {
    return (
      <Text
        key={index}
        style={{ ...Typography.normal, ...Typography.normalTextColor }}
      >
        {item.name}
        {"\n"}Antal: {item.amount}
        {"\n"}lager: {item.stock} {"\n"}Hylla: {item.location}
      </Text>
    );
  });

  let inStock = true;
  for (let i = 0; i < order.order_items.length; i++) {
    if (order.order_items[i].amount > order.order_items[i].stock) {
      inStock = false;
    }
  }

  const btnPick = (
    <TouchableOpacity style={Base.button} onPress={pick}>
      <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
        Plocka order
      </Text>
    </TouchableOpacity>
  );
  const btnNotInStock = (
    <TouchableOpacity style={Base.buttonDisable} onPress={pick} disabled>
      <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
        Ej i lager
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={Base.base}>
      <Text style={{ ...Typography.normal, ...Typography.normalTextColor }}>
        {order.name}
      </Text>
      <Text style={{ ...Typography.normal, ...Typography.normalTextColor }}>
        {order.address}
      </Text>
      <Text style={{ ...Typography.normal, ...Typography.normalTextColor }}>
        {order.zip} {order.city}
      </Text>

      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Produkter:
      </Text>

      {orderItemsList}
      {inStock ? btnPick : btnNotInStock}
    </ScrollView>
  );
}
