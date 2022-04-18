import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Base, Typography, Forms } from "../styles";

import Delivery from "../interfaces/Delivery";
import Product from "../interfaces/product";
import productModel from "../models/products";
import deliveryModel from "../models/delivery";

import ProductDropDown from "./ProductDropDown";
import DateDropDown from "./DateDropDown";

const DeliveryForm = ({ navigation }) => {
  const [delivery, setDelivery] = useState<Partial<Delivery>>({});
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [validDelivery, setValidDelivery] = useState<boolean>(false);

  const checkDelivery = () => {
    if (
      delivery.product_id !== undefined &&
      delivery.delivery_date !== undefined &&
      delivery.amount !== undefined
    ) {
      setValidDelivery(true);
    }
  };

  const handleCommentUpdate = (text: string) => {
    setDelivery({ ...delivery, comment: text });
    checkDelivery();
  };

  const handleAmountUpdate = (x: string) => {
    setDelivery({ ...delivery, amount: parseInt(x) });
    checkDelivery();
  };

  const addDelivery = async () => {
    await deliveryModel.addDelivery(delivery);
    const updatedProduct = {
      ...currentProduct,
      stock: (currentProduct.stock || 0) + (delivery.amount || 0),
    };

    await productModel.updateStock(updatedProduct);

    navigation.navigate("List", { reload: true });
  };

  const buttonDeliveryValid = (
    <TouchableOpacity onPress={addDelivery}>
      <View style={Base.buttonValid}>
        <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
          Lägg till inleverans
        </Text>
      </View>
    </TouchableOpacity>
  );
  const buttonDeliveryInvalid = (
    <TouchableOpacity onPress={addDelivery} disabled>
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
        Ny inleverans
      </Text>
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Kommentar
      </Text>
      <TextInput
        style={{ ...Forms.input, ...Typography.normalTextColor }}
        onChangeText={handleCommentUpdate}
        value={delivery?.comment}
        maxLength={140}
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Antal
      </Text>
      <TextInput
        style={{ ...Forms.input, ...Typography.normalTextColor }}
        onChangeText={handleAmountUpdate}
        value={delivery?.amount?.toString() ? delivery.amount.toString() : "0"}
        keyboardType="numeric"
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Produkt
      </Text>
      <ProductDropDown
        delivery={delivery}
        setDelivery={setDelivery}
        setCurrentProduct={setCurrentProduct}
        checkDelivery={checkDelivery}
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Datum för inleverans
      </Text>
      <DateDropDown
        delivery={delivery}
        setDelivery={setDelivery}
        checkDelivery={checkDelivery}
      />
      {validDelivery ? buttonDeliveryValid : buttonDeliveryInvalid}
    </ScrollView>
  );
};

export default DeliveryForm;
