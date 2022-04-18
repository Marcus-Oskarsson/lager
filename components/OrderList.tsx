import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

import orderModel from "../models/orders";
import { Base, Typography } from "../styles";

const OrderList = ({ route, navigation }) => {
  let { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState([]);

  async function reloadOrders() {
    setAllOrders(await orderModel.getOrders());
  }

  if (reload) {
    reloadOrders();
    route.params = false;
  }

  useEffect(() => {
    reloadOrders();
  }, []);

  const listOfOrders = allOrders
    .filter((order) => order.status === "Ny")
    .map((order, index) => {
      return (
        <TouchableOpacity
          style={Base.button}
          key={index}
          onPress={() => {
            navigation.navigate("Details", {
              order: order,
            });
          }}
        >
          <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
            {order.name}
          </Text>
        </TouchableOpacity>
      );
    });
  return (
    <ScrollView style={Base.base}>
      <Text style={{ ...Typography.header3, ...Typography.normalTextColor }}>
        Alla ordrar
      </Text>
      {listOfOrders}
    </ScrollView>
  );
};

export default OrderList;
