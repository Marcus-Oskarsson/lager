import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Base, Typography } from "../styles";
import { useState, useEffect } from "react";

import deliveryModel from "../models/delivery";

const DeliveriesList = ({ route, navigation }) => {
  const [allDeliveries, setAllDeliveries] = useState([]);
  let { reload } = route.params || false;

  const reloadDeliveries = async () => {
    setAllDeliveries(await deliveryModel.getDeliveries());
  };

  if (reload) {
    reloadDeliveries();
    route.params = false;
  }

  useEffect(() => {
    reloadDeliveries();
  }, []);

  const listOfDeliveries = allDeliveries.map((delivery, index) => {
    return (
      <View
        style={{ ...Base.base, ...Base.smallBorder, ...Base.marginBottom }}
        key={index}
      >
        <Text style={{ ...Typography.normalTextColor, ...Typography.header3 }}>
          {delivery.amount}st. {delivery.product_name}
        </Text>
        <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
          Leveransdatum: {delivery.delivery_date}
        </Text>
        <Text style={{ ...Typography.normalTextColor, ...Typography.normal }}>
          Kommentar: {delivery.comment}
        </Text>
      </View>
    );
  });

  return (
    <ScrollView style={Base.base}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Inleveranser
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Form");
        }}
      >
        <View style={Base.button}>
          <Text style={{ ...Typography.normalTextColor, ...Typography.button }}>
            Skapa en inleverans
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={{ ...Typography.header3, ...Typography.header3color }}>
        Tidigare inleveranser
      </Text>
      {listOfDeliveries}
    </ScrollView>
  );
};

export default DeliveriesList;
