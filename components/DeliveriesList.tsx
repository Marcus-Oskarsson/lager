import { View, Text, TouchableOpacity } from "react-native";

import { Base, Typography } from "../styles";

const DeliveriesList = ({ navigation }) => {
  return (
    <View style={Base.base}>
      <Text style={{ ...Typography.header2, ...Typography.header2color }}>
        Inleveranser
      </Text>
      {/* {listOfDeliveries} */}

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
    </View>
  );
};

export default DeliveriesList;
