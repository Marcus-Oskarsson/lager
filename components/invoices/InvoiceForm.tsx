import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Base, Typography, Forms } from "../../styles";

import Invoice from "../../interfaces/Invoice";
import Order from "../../interfaces/order";
import invoiceModel from "../../models/invoice";
import orderModel from "../../models/orders";

import OrderDropDown from "./OrderDropDown";
import DateDropDown from "./DateDropDown";

const InvoiceForm = ({ route, navigation }) => {
  const [invoice, setInvoice] = useState<Partial<Invoice>>({});
  const [currentOrder, setCurrentOrder] = useState<Partial<Order>>({});

  let validDelivery = true;
  let checkInvoice = () => {
    // Ej klar
    return true;
  };

  const totalSum = () => {
    let total = 0;
    currentOrder.order_items.forEach((orderItem) => {
      total += orderItem.price * orderItem.amount;
    });
    return total;
  };

  const addInvoice = async () => {
    setInvoice({ ...invoice, total_price: totalSum() });
    await invoiceModel.addInvoice(invoice);
    await orderModel.updateOrder(currentOrder, 600);
    console.log(invoice);
  };

  const buttonDeliveryValid = (
    <TouchableOpacity onPress={addInvoice}>
      <View style={Base.buttonValid}>
        <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
          Lägg till Faktura
        </Text>
      </View>
    </TouchableOpacity>
  );
  const buttonDeliveryInvalid = (
    <TouchableOpacity onPress={addInvoice} disabled>
      <View style={Base.buttonDisable}>
        <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
          Saknas information
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ ...Base.base }}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Ny faktura
      </Text>
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Order
      </Text>
      <OrderDropDown
        invoice={invoice}
        setInvoice={setInvoice}
        setCurrentOrder={setCurrentOrder}
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Fakturadatum
      </Text>
      <DateDropDown invoice={invoice} setInvoice={setInvoice} />
      {validDelivery ? buttonDeliveryValid : buttonDeliveryInvalid}
    </ScrollView>
  );
};

export default InvoiceForm;
