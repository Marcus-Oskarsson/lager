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
import ProductDropDown from "./ProductDropDown";

const DeliveryForm = ({ navigation }) => {
  const [delivery, setDelivery] = useState<Partial<Delivery>>({});
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

  const handleCommentUpdate = (text: string) => {
    // Testar såhär istället
    console.log(text);
    setDelivery({ ...delivery, comment: text });
  };

  const handleAmountUpdate = (x: string) => {
    // Testar såhär istället
    console.log(x);
    setDelivery({ ...delivery, amount: parseInt(x) });
  };

  const addDelivery = () => {
    console.log(delivery);
  };

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
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Antal
      </Text>
      <TextInput
        style={{ ...Forms.input, ...Typography.normalTextColor }}
        onChangeText={handleAmountUpdate}
        value={delivery?.amount?.toString()}
        keyboardType="numeric"
      />
      <Text style={{ ...Typography.label, ...Typography.normalTextColor }}>
        Produkt
      </Text>
      <ProductDropDown
        delivery={delivery}
        setDelivery={setDelivery}
        setCurrentProduct={setCurrentProduct}
      />
      <TouchableOpacity onPress={addDelivery}>
        {/* Borde kolla om all information som behövs finns med! */}
        <View style={Base.button}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
            Lägg till inleverans
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DeliveryForm;

// Kom ihåg att ändra alla knappar så de har en view i sej!
