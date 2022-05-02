import { ScrollView, View, Text, TouchableOpacity, Button } from "react-native";
import { useState, useEffect } from "react";

import orderModel from "../../models/orders";
import Order from "../../interfaces/order";
import { Base, Typography } from "../../styles";

const ShipList = ({ route, navigation }) => {
  let { reload } = route.params || false;
  const [allOrders, setAllOrders] = useState<Partial<Order[]>>([]);

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
    .filter((order) => order.status === "Packad")
    .map((order, index) => {
      return (
        <TouchableOpacity
          style={Base.button}
          key={index}
          onPress={() => {
            navigation.navigate("Order", {
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
    <View style={Base.base}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Ordrar redo att skickas
      </Text>
      {listOfOrders}
    </View>
  );
};

export default ShipList;
