import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DeliveriesList from "../components/DeliveriesList";
import DeliveryForm from "../components/DeliveryForm";

const Stack = createNativeStackNavigator();

const Deliveries = (props) => {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={DeliveriesList} />
      <Stack.Screen name="Form">
        {(screenProps) => (
          <DeliveryForm {...screenProps} setProducts={props.setProducts} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default Deliveries;
