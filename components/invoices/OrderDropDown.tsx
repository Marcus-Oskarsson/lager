import { useState, useEffect } from "react";
import { Picker } from "@react-native-picker/picker";

import OrderModel from "../../models/orders";
import Order from "../../interfaces/order";
import { Typography } from "../../styles/";
import invoices from "../../models/invoice";

const OrderDropDown = (props) => {
  //BORDE DET VARA SAMMA USESTATE SOM TIDIGARE?
  const [orders, setOrders] = useState<Order[]>([]);
  let ordersHash: any = {};

  const reloadProducts = async () => {
    setOrders(await OrderModel.getOrders());
  };

  useEffect(() => {
    reloadProducts();
  }, []);

  const itemsList = orders
    .filter((order) => order.status_id === 200)
    .map((order, index) => {
      ordersHash[order.id] = order;
      return (
        <Picker.Item
          key={index}
          label={order.name}
          value={order.id}
          style={Typography.normal}
        />
      );
    });

  return (
    <Picker
      style={Typography.normalTextColor}
      selectedValue={props.invoice?.order_id}
      onValueChange={(itemValue) => {
        props.setInvoice({ ...props.invoice, order_id: itemValue });
        props.setCurrentOrder(ordersHash[itemValue]);
      }}
    >
      {itemsList}
    </Picker>
  );
};

export default OrderDropDown;
